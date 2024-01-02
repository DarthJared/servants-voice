import { Component } from '@angular/core';
import { QuotesService } from '../quotes.service';
import { CommonModule, NgForOf } from '@angular/common';
import { QuoteDisplayComponent } from '../quote-display/quote-display.component';
import { QuoteAdderComponent } from '../quote-adder/quote-adder.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgForOf, CommonModule, QuoteDisplayComponent, QuoteAdderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  quotes: any[] = [];
  quoteAdderVisible = false;

  tags: any[] = [];

  constructor(private quotesService: QuotesService) {
    quotesService.getQuotes().subscribe((res: any) => {
      console.log(res);
      this.quotes = res.items[0].quotes ?? [];
    });

    quotesService.getTags().subscribe((res: any) => {
      this.tags = res.items[0].tags ?? [];
    });
  }

  showQuoteAdder() {
    this.quoteAdderVisible = true;
  }

  hideQuoteAdder() {
    this.quoteAdderVisible = false;
  }

  addQuote(newQuote: any) {
    this.quotes.push(newQuote);
    this.quotesService.updateQuotes(this.quotes).subscribe((res: any) => {
      this.quotes = res.items[0].quotes;
    });
    this.hideQuoteAdder();
  }

  addTag(tag: any) {
    this.tags.push(tag);
    this.quotesService.updateTags(this.tags).subscribe((res: any) => {
      this.tags = res.items[0].tags;
    });
  }

  updateQuote(quote: any, index: number) {
    this.quotes[index] = quote;
    this.quotesService.updateQuotes(this.quotes).subscribe((res: any) => {
      this.quotes = res.items[0].quotes;
    });
  }

  removeQuote(index: number) {
    this.quotes.splice(index, 1);
    this.quotesService.updateQuotes(this.quotes).subscribe((res: any) => {
      this.quotes = res.items[0].quotes;
    });
  }
}
