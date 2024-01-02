import { Component } from '@angular/core';
import { QuotesService } from '../quotes.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  quotes: any[] = [];

  constructor(private quotesService: QuotesService) {
    quotesService.getQuotes().subscribe((res: any) => {
      console.log(res);
      this.quotes = res.items[0].quotes;
    })
  }

}
