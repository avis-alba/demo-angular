import {Component, ViewChild} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MyCustomPaginatorIntl } from './paginator-intl.service';

export interface PeriodicElement {
  id: number;
  title: string;
  text: string;
  tools: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, title: 'Hydrogen Hydrogen Hydrogen', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores aut facere dolor excepturi hic, recusandae ex placeat odio quos sapiente aspernatur modi magnam dignissimos iure sequi officiis fugiat cupiditate numquam harum fuga non minus voluptatem nihil? Corrupti ex laudantium hic voluptatum officiis impedit incidunt, eligendi, provident quidem, corporis harum perspiciatis!', tools: 'H'},
  {id: 2, title: 'Helium', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores aut facere dolor excepturi hic, recusandae ex placeat odio quos sapiente aspernatur modi magnam dignissimos iure sequi officiis fugiat cupiditate numquam harum fuga non minus voluptatem nihil? Corrupti ex laudantium hic voluptatum officiis impedit incidunt, eligendi, providen', tools: 'He'},
  {id: 3, title: 'Lithium', text: 'lorem', tools: 'Li'},
  {id: 4, title: 'Beryllium', text: 'sit amet consectetur adipisicing elit. Maiores aut facere dolor excepturi hic, recusandae ex placeat odio quos sapiente aspernatur modi magnam dignissimos iure sequi officiis fugiat cupiditate numquam harum fuga non minus voluptatem nihil? Corrupti ex laudantium hic voluptatum officiis impedit inc', tools: 'Be'},
  {id: 5, title: 'Boron Boron Boron', text: 'lorem', tools: 'B'},
  {id: 6, title: 'Carbon', text: 'lorem', tools: 'C'},
  {id: 7, title: 'Nitrogen', text: 'lorem', tools: 'N'},
  {id: 8, title: 'Oxygen', text: 'lorem', tools: 'O'},
  {id: 9, title: 'Fluorine', text: 'lorem', tools: 'F'},
  {id: 10, title: 'Neon', text: 'lorem', tools: 'Ne'},
  {id: 11, title: 'Hydrogen', text: 'lorem', tools: 'H'},
  {id: 12, title: 'Helium', text: 'lorem', tools: 'He'},
  {id: 13, title: 'Lithium', text: 'lorem', tools: 'Li'},
  {id: 14, title: 'Beryllium', text: 'lorem', tools: 'Be'},
  {id: 15, title: 'Boron', text: 'sit amet consectetur adipisicing elit. Maiores aut facere dolor excepturi hic, recusandae ex placeat odio quos sapiente aspernatur modi magnam dignissimos iure sequi officiis fugiat cupiditate numquam harum fuga non minus voluptatem nihil? Corrupti ex laudantium hic voluptatum officiis impedit inc', tools: 'B'},
  {id: 16, title: 'Carbon', text: 'lorem', tools: 'C'},
  {id: 17, title: 'Nitrogen', text: 'lorem', tools: 'N'},
  {id: 18, title: 'Oxygen', text: 'lorem', tools: 'O'},
  {id: 19, title: 'Fluorine', text: 'lorem', tools: 'F'},
  {id: 20, title: 'Neon', text: 'lorem', tools: 'Ne'}
];

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
})
export class PostsComponent {
  constructor(
    private auth: AuthService,
    private router: Router) {

      auth.isAuthDynamic.subscribe((isAuth) => {
        if (!isAuth) this.router.navigate(['/login']);
      });
    }

    //////////////////////////////////////
  
    displayedColumns: string[] = ['id', 'text', 'tools'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
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
