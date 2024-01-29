import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TagAdderComponent} from "../tag-adder/tag-adder.component";
import {QuoteAdderComponent} from "../quote-adder/quote-adder.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faPenToSquare, faTag, faClipboard} from "@fortawesome/free-solid-svg-icons";
import {SortTagPipe} from "../sort-tag.pipe";
import {HighlighterPipe} from "../highlighter.pipe";
import {ClipboardModule} from "@angular/cdk/clipboard";

@Component({
  selector: 'app-quote-display',
  standalone: true,
  imports: [NgForOf, CommonModule, FormsModule, TagAdderComponent, QuoteAdderComponent, FontAwesomeModule, SortTagPipe, HighlighterPipe, ClipboardModule],
  templateUrl: './quote-display.component.html',
  styleUrl: './quote-display.component.css'
})
export class QuoteDisplayComponent {
  @Input()
  get quote() {
    return this._quote;
  };
  set quote(quote: any) {
    const [month, year] = quote.session.split(' ');
    this.quoteMonth = month;
    this.quoteYear = parseInt(year);
    this._quote = quote;
  }
  @Input() index: number = 0;
  @Input() tags: any[] = [];
  @Input() selectedTags: number[] = [];
  @Input() searchText: string = '';
  @Output() updateQuote = new EventEmitter<any>();
  @Output() addTag = new EventEmitter<any>();
  @Output() deleteQuote = new EventEmitter<string>();
  @Output() removeTag = new EventEmitter<number>();
  @Output() addTagFilter = new EventEmitter<number>();
  @Output() removeTagFilter = new EventEmitter<number>();

  quoteMonth: string = 'April';
  quoteYear: number = 1971;
  faPenToSquare = faPenToSquare;
  faTag = faTag;
  faClipboard = faClipboard;

  private _quote: any;

  addTagsVisible = false;
  updateQuoteVisible = false;

  showAddTags() {
    this.addTagsVisible = true;
  }

  hideAddTags() {
    this.addTagsVisible = false;
  }

  setTags(tags: number[]) {
    this.quote.tags = tags;
    this.updateQuote.emit(this.quote);
    this.hideAddTags();
  }

  addTags(tag: any) {
    this.addTag.emit(tag);
  }

  showUpdateQuote() {
    this.updateQuoteVisible = true;
  }

  hideUpdateQuote() {
    this.updateQuoteVisible = false;
  }

  updateQuoteData(quote: any) {
    this.quote = quote;
    this.updateQuote.emit(this.quote);
  }

  removeQuote() {
    this.deleteQuote.emit('remove');
  }

  deleteTag(tag: number) {
    this.removeTag.emit(tag);
  }

  filterByTag(tag: number) {
    this.addTagFilter.emit(tag);
  }

  addToClipboard() {

  }
}
