import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TagAdderComponent} from "../tag-adder/tag-adder.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-quote-adder',
  standalone: true,
  imports: [CommonModule, FormsModule, TagAdderComponent],
  templateUrl: './quote-adder.component.html',
  styleUrl: './quote-adder.component.css'
})
export class QuoteAdderComponent {
  @Output() close = new EventEmitter<string>();
  @Output() add = new EventEmitter<any>();
  @Output() addTag = new EventEmitter<any>();
  @Output() removeQuote = new EventEmitter<string>();
  @Input() tags: any[] = [];
  @Input() addButtonText: string = 'Add Quote';
  @Input() activeTags: number[] = [];

  @Input() quote: string = '';
  @Input() author: string = '';
  @Input() talkTitle: string = '';
  @Input() sessionMonth: string = 'April';
  @Input() sessionYear: number = 1971;
  @Input() removeQuoteVisible: boolean = false;

  tagAdderVisible = false;

  closeAdder() {
    this.close.emit('close');
  }

  doNothing(event: any) {
    event.stopPropagation();
  }

  addQuote() {
    this.add.emit({
      quote: this.quote,
      author: this.author,
      talkTitle: this.talkTitle,
      session: `${this.sessionMonth} ${this.sessionYear}`,
      tags: this.activeTags
    });
  }

  showTagAdder() {
    this.tagAdderVisible = true;
  }

  hideTagAdder() {
    this.tagAdderVisible = false;
  }

  setTags(tags: number[]) {
    this.activeTags = tags;
    this.hideTagAdder();
  }

  addTags(tag: any) {
    this.addTag.emit(tag);
  }

  sendRemoveQuote() {
    this.removeQuote.emit('remove');
  }
}
