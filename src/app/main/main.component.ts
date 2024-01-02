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

  constructor(private quotesService: QuotesService) {
    quotesService.getQuotes().subscribe((res: any) => {
      console.log(res);
      this.quotes = res.items[0].quotes;
    })
  }

  showQuoteAdder() {
    this.quoteAdderVisible = true;
  }

  hideQuoteAdder() {
    this.quoteAdderVisible = false;
  }

  addQuote(newQuote: any) {
    this.quotes.push(newQuote);
    this.hideQuoteAdder();
  }

}
