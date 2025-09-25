import { Pipe, PipeTransform } from '@angular/core';
import { SortType } from './common.utils';

@Pipe({
  name: 'authorSort',
  standalone: true
})
export class AuthorSortPipe implements PipeTransform {

  transform(authors: {[key: string]: number}, sortType: SortType): any[] {
    const rv = Object.keys(authors).sort((a: any, b: any) => {
      if (sortType === SortType.Alphabetical) {
        return a.localeCompare(b);
      } else {
        return authors[b] - authors[a];
      }
    }).map((author: string) => {
      return {
        name: author,
        count: authors[author]
      };
    });

    return rv;
  }

}
