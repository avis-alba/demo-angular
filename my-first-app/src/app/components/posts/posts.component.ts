import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MyCustomPaginatorIntl } from '../../services/paginator-intl.service';
import { PostsService } from '../../services/posts.service';
import { Subscription, catchError, map, startWith, switchMap, throwError } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { PostFormComponent } from '../post-form/post-form.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { Post } from 'src/app/utils/types';
import { LOADING_MESSAGES } from 'src/app/utils/const';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
})
export class PostsComponent implements AfterViewInit, OnDestroy {
  
  public displayedColumns: string[] = ['id', 'text', 'tools'];
  public dataSource: Post[] = [];

  public resultsLength: number = 0;
  public isLoadingResults:boolean = true;
  public isRateLimitReached:boolean = false;

  public error: boolean = false;
  public postError: boolean = false;
  public deleteError: boolean = false;
  public editError: boolean = false;

  public messages: {[key: string]: string};

  public isDialogOpen: boolean;
  public isTabActive: boolean;
  public subscriptions: Subscription[] = [];
  
  @ViewChild(MatTable) table: MatTable<Post>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatProgressSpinner) spinner: MatProgressSpinner;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _postServ: PostsService,
    public dialog: MatDialog) {

      const authSub: Subscription = _auth.isAuthDynamic.subscribe((isAuth) => {
        if (!isAuth) this._router.navigate(['/login']);
      });

      this.subscriptions.push(authSub);
    
      this.messages = LOADING_MESSAGES;

      this.isTabActive = true;
     
      window.onfocus = () => { this.isTabActive = true };
      window.onblur = () => { this.isTabActive = false };
  }

  public ngAfterViewInit(): void {

    const loadSub: Subscription = this.paginator.page
    .pipe(
      startWith({}),
      switchMap(() => {

        this.isLoadingResults = true;
        return this._postServ.download(this.paginator.pageIndex)

        .pipe(catchError((error) => {
          console.log(error);
          this.error = true;
          return throwError(() => null);
        }));
        
      }),
      map(data => {

        if (!(data instanceof Array)) return [];
        
        this.isLoadingResults = false;
        this.isRateLimitReached = data === null;
        
        if (data === null) {
          return [];
        }

        this.resultsLength = data.length;
        return data;
      })
    ).subscribe(posts => {

      this.dataSource = posts;
    })

    this.subscriptions.push(loadSub);

    const reloadSub: Subscription = this._postServ.reload.subscribe(() => {

      if (this.isDialogOpen || !this.isTabActive) return;

      this.isLoadingResults = true;

      const reloadDataSub: Subscription = this._postServ.download(this.paginator.pageIndex)
      .pipe(catchError((error) => {
        console.log(error);
        this.error = true;
        return throwError(() => null);
      }))
      .subscribe(posts => {

        this.dataSource = posts;
        this.isLoadingResults = false;
      })

      this.subscriptions.push(reloadDataSub);
    });

    this.subscriptions.push(reloadSub);
  }

  public ngOnDestroy(): void {

    this.subscriptions.forEach((sub) => { sub.unsubscribe() });
  }
 
  public create(): void {

    this.isDialogOpen = true;

    const dialogRef = this.dialog.open(PostFormComponent, {
      data: {
        formTitle: 'Новый пост'
      }});

    const createSub: Subscription = dialogRef.afterClosed().subscribe(post => {

      this.isDialogOpen = false;

      if (!post) return;

      post.id = Math.floor(Math.random() * 900) + 101;

      this._postServ.create(post)
      .pipe(catchError((error) => {
        console.log(error);
        this.postError = true;
        return throwError(() => null);
      }));

      this.dataSource.unshift(post);
      this.table.renderRows();
    });

    this.subscriptions.push(createSub);
  }

  public delete(id: number): void {

    this.isDialogOpen = true;

    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    const deleteSub: Subscription = dialogRef.afterClosed().subscribe(isConfirmed => {

      this.isDialogOpen = false;

      if (!isConfirmed) return;

      this._postServ.delete(id)
      .pipe(catchError((error) => {
        console.log(error);
        this.deleteError = true;
        return throwError(() => null);
      }));
  
      this.dataSource = this.dataSource.filter(post => post.id !== id);
      this.table.renderRows();
      
    });

    this.subscriptions.push(deleteSub);
  }

  public edit(post: Post): void {

    this.isDialogOpen = true;

    const dialogRef = this.dialog.open(PostFormComponent, {
      data: {
        formTitle: 'Редактировать пост',
        ...post
      }});

    const editSub: Subscription = dialogRef.afterClosed().subscribe(editedPost => {

      this.isDialogOpen = false;

      if (!editedPost) return;
      
      this._postServ.edit(post.id, editedPost)
      .pipe(catchError((error) => {
        console.log(error);
        this.editError = true;
        return throwError(() => null);
      }));

      const editedEl = this.dataSource.find(p => p.id === post.id);
      editedEl.body = editedPost.body;
      editedEl.title = editedPost.title;

      this.table.renderRows();
    });

    this.subscriptions.push(editSub);
  }
}