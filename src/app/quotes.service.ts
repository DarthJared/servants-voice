import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private http: HttpClient) { }

  public getQuotes() {
    return this.http.get('https://crudapi.co.uk/api/v1/quotes', {
      headers: {
        Authorization: 'Bearer vFSvPLKi2jzSnAldCwx0gEjJhlYElc_DauSjRztUBsCusTG3Ew'
      }
    });
  }
}
