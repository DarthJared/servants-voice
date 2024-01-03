import { Component } from '@angular/core';
import { QuotesService } from '../quotes.service';
import { CommonModule, NgForOf } from '@angular/common';
import { QuoteDisplayComponent } from '../quote-display/quote-display.component';
import { QuoteAdderComponent } from '../quote-adder/quote-adder.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faQuoteLeft, faQuoteRight} from "@fortawesome/free-solid-svg-icons";
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

  get filteredQuotes() {
    return this.quotes.filter((quote: any) => {
      let passingFilters = true;
      if (this.searchText !== '') {
        passingFilters = quote.quote.toLowerCase().includes(this.searchText.toLowerCase());
      }
      if (this.selectedTags.length > 0) {
        passingFilters = passingFilters && this.selectedTags.every((tagId: number) => quote.tags.includes(tagId));
      }
      return passingFilters;
    });
  }
  private _filteredQuotes: any[] = [];
  quoteAdderVisible = false;
  sidePanelVisible = false;

  get tags() {
    return this._tags;
  };
  set tags(tags: any[]) {
    this._tags = tags.sort((a, b) => a.name.localeCompare(b.name))
  }

  private _tags: any[] = [];

  faQuoteLeft = faQuoteLeft;
  faQuoteRight = faQuoteRight;

  searchText = '';

  tagPillColors = [
    '#432535',
    '#396C7A',
    '#455240',
    '#5E3F41',
    '#344757',
    '#23857A',
    '#3C455B',
    '#735363',
    '#703900',
    '#244A65'
  ];

  selectedTags: number[] = [];

  constructor(private quotesService: QuotesService) {
    quotesService.getQuotes().subscribe((res: any) => {
      this.setQuotes(res);
    });

    quotesService.getTags().subscribe((res: any) => {
      this.setTags(res);
    });
  }

  setQuotes(res: any) {
    this.quotes = res.items[0].quotes ?? [];
  }

  setTags(res: any) {
    this.tags = res.items[0].tags ? res.items[0].tags.map((tag: any) => {
      tag.color = this.tagPillColors[tag.id % this.tagPillColors.length];
      return tag;
    }) : [];
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
      this.setQuotes(res);
    });
    this.hideQuoteAdder();
  }

  addTag(tag: any) {
    this.tags.push(tag);
    this.quotesService.updateTags(this.tags).subscribe((res: any) => {
      this.setTags(res);
    });
  }

  updateQuote(quote: any, index: number) {
    this.quotes[index] = quote;
    this.quotesService.updateQuotes(this.quotes).subscribe((res: any) => {
      this.setQuotes(res);
    });
  }

  removeQuote(index: number) {
    this.quotes.splice(index, 1);
    this.quotesService.updateQuotes(this.quotes).subscribe((res: any) => {
      this.setQuotes(res);
    });
  }

  deleteTag(tagId: number) {
    const updatedQuotes = this.quotes.map((quote: any) => {
      if (quote.tags) {
        quote.tags = quote.tags.filter((tag: number) => tag !== tagId);
      }
      return quote;
    });
    this.quotesService.updateQuotes(updatedQuotes).subscribe((res: any) => {
      this.setQuotes(res);
    });

    const updatedTags = this.tags.filter((tag: any) => tag.id !== tagId);
    this.quotesService.updateTags(updatedTags).subscribe((res: any) => {
      this.setTags(res);
    });
  }

  displaySidePanel() {
    this.sidePanelVisible = true;
  }

  hideSidePanel() {
    this.sidePanelVisible = false;
  }

  applySearch(search: string) {
    this.searchText = search;
    this.hideSidePanel();
  }

  setSelectedTags(tags: number[]) {
    this.selectedTags = tags;
  }

  addTagFilter(tagId: number) {
    if (!this.selectedTags.includes(tagId)) {
      this.selectedTags.push(tagId);
    }
    else {
      this.selectedTags = this.selectedTags.filter((tag: number) => tag !== tagId);
    }
  }
}
