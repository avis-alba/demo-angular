import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MyCustomPaginatorIntl } from './paginator-intl.service';
import { Post, PostsService } from './posts.service';
import { catchError, map, startWith, switchMap, throwError } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { PostFormComponent } from '../post-form/post-form.component';
import { LOADING_MESSAGES } from './posts.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
})
export class PostsComponent implements AfterViewInit {
  
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
  
  @ViewChild(MatTable) table: MatTable<Post>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatProgressSpinner) spinner: MatProgressSpinner;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _postServ: PostsService,
    public dialog: MatDialog) {

      _auth.isAuthDynamic.subscribe((isAuth) => {
        if (!isAuth) this._router.navigate(['/login']);
      });
    
      this.messages = LOADING_MESSAGES;
  }

  public ngAfterViewInit(): void {

    this.paginator.page
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
    });
  }

  public create(): void {

    const dialogRef = this.dialog.open(PostFormComponent, {
      data: {
        formTitle: 'Новый пост'
      }});

    dialogRef.afterClosed().subscribe(post => {

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
  }

  public delete(id: number): void {

    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe(isConfirmed => {

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
  }

  public edit(post: Post): void {

    const dialogRef = this.dialog.open(PostFormComponent, {
      data: {
        formTitle: 'Редактировать пост',
        ...post
      }});

    dialogRef.afterClosed().subscribe(editedPost => {

      if (!editedPost) return; //
      
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

  }
}
