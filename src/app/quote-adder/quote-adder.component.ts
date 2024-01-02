import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quote-adder',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './quote-adder.component.html',
  styleUrl: './quote-adder.component.css'
})
export class QuoteAdderComponent {
  quote: string = '';
  author: string = '';
  talkTitle: string = '';
  session = {
    month: 'April',
    year: 1971
  };

  @Output() close = new EventEmitter<string>();
  @Output() add = new EventEmitter<any>();
  
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
      session: `${this.session.month} - ${this.session.year}`
    });
  }
}
