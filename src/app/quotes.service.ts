import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  quotesUuid: string = '';
  tagsUuid: string = '';

  constructor(private http: HttpClient) { }

  public getQuotes() {
    return this.http.get('https://crudapi.co.uk/api/v1/quotes', {
      headers: {
        Authorization: 'Bearer vFSvPLKi2jzSnAldCwx0gEjJhlYElc_DauSjRztUBsCusTG3Ew'
      }
    }).pipe(
      tap((res: any) => {
        this.quotesUuid = res.items[0]._uuid;
      })
    );
  }
  public getTags() {
    return this.http.get('https://crudapi.co.uk/api/v1/tags', {
      headers: {
        Authorization: 'Bearer vFSvPLKi2jzSnAldCwx0gEjJhlYElc_DauSjRztUBsCusTG3Ew'
      }
    }).pipe(
      tap((res: any) => {
        this.tagsUuid = res.items[0]._uuid;
      })
    );
  }

  public updateQuotes(quotes: any[]) {
    return this.http.put('https://crudapi.co.uk/api/v1/quotes', [{
        '_uuid': this.quotesUuid,
        quotes
    }], {
      headers: {
        Authorization: 'Bearer vFSvPLKi2jzSnAldCwx0gEjJhlYElc_DauSjRztUBsCusTG3Ew'
      }
    });
  }

  public updateTags(tags: any[]) {
    return this.http.put('https://crudapi.co.uk/api/v1/tags', [{
        '_uuid': this.tagsUuid,
        tags
    }], {
      headers: {
        Authorization: 'Bearer vFSvPLKi2jzSnAldCwx0gEjJhlYElc_DauSjRztUBsCusTG3Ew'
      }
    });
  }
}
