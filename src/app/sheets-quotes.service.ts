import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from "rxjs";

type UpdatedQuote = AddedQuote & {
  id: number;
}

type AddedQuote = {
  quote: string;
  author: string;
  talkTitle: string;
  month: string;
  year: string;
  tags: number[];
};

type UpdatedTag = AddedTag & {
  id: number;
}

type AddedTag = {
  name: string;
};

@Injectable({
  providedIn: 'root'
})
export class SheetsQuotesService {

  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public getQuotes() {
    return this.http.get(`${this.baseUrl}/quotes`);
  }

  public addQuote(quoteInfo: AddedQuote) {
    return this.http.post(`${this.baseUrl}/quotes`, quoteInfo);
  }

  public updateQuote(quoteInfo: UpdatedQuote) {
    return this.http.put(`${this.baseUrl}/quotes`, quoteInfo);
  }

  public deleteQuote(quoteId: number) {
    return this.http.delete(`${this.baseUrl}/quotes`, { body: { id: quoteId } });
  }  

  public getTags() {
    return this.http.get(`${this.baseUrl}/tags`);
  }

  public addTag(tagInfo: AddedTag) {
    return this.http.post(`${this.baseUrl}/tags`, tagInfo);
  }

  public updateTag(tagInfo: UpdatedTag) {
    return this.http.put(`${this.baseUrl}/tags`, tagInfo);
  }

  public deleteTag(tagId: number) {
    return this.http.delete(`${this.baseUrl}/tags`, { body: { id: tagId } });
  } 
}
