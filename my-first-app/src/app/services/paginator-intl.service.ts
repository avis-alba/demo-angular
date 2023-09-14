import {Injectable} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MyCustomPaginatorIntl implements MatPaginatorIntl {

  public changes = new Subject<void>();

  public firstPageLabel = `Первая страница`;
  public itemsPerPageLabel = `Постов на странице`;
  public lastPageLabel = `Последняя страница`;

  public nextPageLabel = 'Следующая страница';
  public previousPageLabel = 'Предыдущая страница';

  public getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Страница 1 из 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Страница ${page + 1} из ${amountPages}`;
  }
}
