import { Component } from '@angular/core';
import { QuotesService } from '../quotes.service';
import { CommonModule, NgForOf } from '@angular/common';
import { QuoteDisplayComponent } from '../quote-display/quote-display.component';
import { QuoteAdderComponent } from '../quote-adder/quote-adder.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faComment} from "@fortawesome/free-solid-svg-icons";
import {HeaderComponent} from "../header/header.component";
import {SidePanelComponent} from "../side-panel/side-panel.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgForOf, CommonModule, QuoteDisplayComponent, QuoteAdderComponent, FontAwesomeModule, HeaderComponent, SidePanelComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  quotes: any[] = [];
  quoteAdderVisible = false;
  sidePanelVisible = false;

  tags: any[] = [];

  faComment = faComment;

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

  deleteTag(tagId: number) {
    console.log('Remove it')
    const updatedQuotes = this.quotes.map((quote: any) => {
      if (quote.tags) {
        quote.tags = quote.tags.filter((tag: number) => tag !== tagId);
      }
      return quote;
    });
    this.quotesService.updateQuotes(updatedQuotes).subscribe((res: any) => {
      this.quotes = res.items[0].quotes;
    });

    const updatedTags = this.tags.filter((tag: any) => tag.id !== tagId);
    this.quotesService.updateTags(updatedTags).subscribe((res: any) => {
      this.tags = res.items[0].tags;
    });
  }

  displaySidePanel() {
    this.sidePanelVisible = true;
  }

  hideSidePanel() {
    this.sidePanelVisible = false;
  }

  applySearch(search: string) {

  }
}
