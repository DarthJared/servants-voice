import { Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { QuoteDisplayComponent } from '../quote-display/quote-display.component';
import { QuoteAdderComponent } from '../quote-adder/quote-adder.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faQuoteLeft, faQuoteRight} from "@fortawesome/free-solid-svg-icons";
import {HeaderComponent} from "../header/header.component";
import {SidePanelComponent} from "../side-panel/side-panel.component";
import {QuotePaginatorComponent} from "../quote-paginator/quote-paginator.component";
import { SheetsQuotesService } from '../sheets-quotes.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgForOf, CommonModule, QuoteDisplayComponent, QuoteAdderComponent, FontAwesomeModule, HeaderComponent, SidePanelComponent, QuotePaginatorComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  get quotes() {
    return this._quotes;
  }
  set quotes(quotes: any[]) {
    this.authors = quotes.reduce((acc: any[], quote: any) => {
      if (!acc[quote.author]) {
        acc[quote.author] = 1;
      }
      else {
        acc[quote.author] += 1;
      }

      return acc;
    }, {});

    this._quotes = quotes;
  }
  private _quotes: any[] = [];

  private quotesPerPage = 20;
  currentPage = 0;

  totalQuotes = 0;

  numberOfPages = 0;

  get filteredQuotes() {
    const applicableQuotes = this.quotes.filter((quote: any) => {
      let passingFilters = true;
      if (this.searchText !== '') {
        passingFilters = quote.quote.toLowerCase().includes(this.searchText.toLowerCase());
      }
      if (this.selectedTags.length > 0) {
        passingFilters = passingFilters && (this.selectedTags.every((tagId: number | null) => quote.tags.includes(tagId)) || (this.selectedTags.length === 1 && this.selectedTags[0] === null && quote.tags.length === 0));
      }
      if (this.selectedAuthors.length > 0) {
        passingFilters = passingFilters && this.selectedAuthors.includes(quote.author);
      }
      return passingFilters;
    }).reverse();

    this.totalQuotes = applicableQuotes.length;
    this.numberOfPages = Math.ceil(this.totalQuotes / this.quotesPerPage);

    return applicableQuotes.slice(this.currentPage * this.quotesPerPage, (this.currentPage + 1) * this.quotesPerPage);
  }
  private _filteredQuotes: any[] = [];
  quoteAdderVisible = false;
  sidePanelVisible = false;
  authors: any = {};

  get tags() {
    return this._tags.map((tag: any) => {
      tag.count = this.quotes.filter((quote: any) => quote.tags.includes(tag.id)).length;
      return tag;
    });
  };
  set tags(tags: any[]) {
    this._tags = tags.sort((a, b) => a.name.localeCompare(b.name)).map((tag: any, index ) => {
      tag.color = this.tagPillColors[index % this.tagPillColors.length];
      return tag;
    });
  }

  get untaggedCount() {
    return this.quotes.filter((quote: any) => quote.tags.length === 0).length;
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

  selectedTags: Array<number | null> = [];
  selectedAuthors: string[] = [];

  constructor(private sheetsQuotesService: SheetsQuotesService) {
    sheetsQuotesService.getQuotes().subscribe((res: any) => {
      this.setQuotes(res);
    });

    sheetsQuotesService.getTags().subscribe((res: any) => {
      this.setTags(res);
    });
  }

  setQuotes(res: any) {
    this.quotes = res ?? [];
  }

  setTags(res: any) {
    this.tags = res ?? [];
  }

  showQuoteAdder() {
    this.quoteAdderVisible = true;
  }

  hideQuoteAdder() {
    this.quoteAdderVisible = false;
  }

  addQuote(newQuote: any) {
    const nextId = this.quotes.reduce((acc: number, quote: any) => {
      return quote.id > acc ? quote.id : acc;
    }, -1) + 1;
    newQuote.id = nextId;
    this.quotes.push(newQuote);
    this.sheetsQuotesService.addQuote(newQuote).subscribe();
    this.hideQuoteAdder();
  }

  addTag(tag: any) {
    const updatedTags = [...this.tags, tag];
    this.setTags(updatedTags);

    this.sheetsQuotesService.addTag(tag).subscribe();
  }

  updateQuote(quote: any) {
    this.sheetsQuotesService.updateQuote(quote).subscribe((res: any) => {
      this.setQuotes(res);
    });

    this.hideQuoteAdder();
  }

  removeQuote(quoteId: number) {
    this.sheetsQuotesService.deleteQuote(quoteId).subscribe((res: any) => {
      this.setQuotes(res);
    });
  }

  deleteTag(tagId: number) {
    this.sheetsQuotesService.deleteTag(tagId).subscribe((res: any) => {
      this.setQuotes(res.quotes);
      this.setTags(res.tags);
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
    this.changePage(0);
  }

  setSelectedTags(tags: Array<number | null>) {
    this.selectedTags = tags;
    this.changePage(0);
  }

  setSelectedAuthors(authors: string[]) {
    this.selectedAuthors = authors;
    this.changePage(0);
  }

  addTagFilter(tagId: number) {
    this.changePage(0);
    if (!this.selectedTags.includes(tagId)) {
      this.selectedTags.push(tagId);
    }
    else {
      this.selectedTags = this.selectedTags.filter((tag: number | null) => tag !== tagId);
    }
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}
