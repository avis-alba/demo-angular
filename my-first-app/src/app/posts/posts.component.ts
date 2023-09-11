import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MyCustomPaginatorIntl } from './paginator-intl.service';
import { Post, PostsService } from './posts.service';
import { Observable, catchError, delay, map, merge, startWith, switchMap, throwError } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

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
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatProgressSpinner) spinner: MatProgressSpinner;

  constructor(
    private auth: AuthService,
    private router: Router,
    private postServ: PostsService) {

      auth.isAuthDynamic.subscribe((isAuth) => {
        if (!isAuth) this.router.navigate(['/login']);
      });
  }

  ngAfterViewInit(): void {

    this.paginator.page
    .pipe(
      startWith({}),
      switchMap(() => {

        this.isLoadingResults = true;
        return this.postServ.download(this.paginator.pageIndex)

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
    
    // addData() {
    //   const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    //   this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    //   this.table.renderRows();
    // }
  
    // removeData() {
    //   this.dataSource.pop();
    //   this.table.renderRows();
    // }
}
