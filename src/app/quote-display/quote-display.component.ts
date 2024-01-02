import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quote-display',
  standalone: true,
  imports: [],
  templateUrl: './quote-display.component.html',
  styleUrl: './quote-display.component.css'
})
export class QuoteDisplayComponent {
  @Input() quote: any;
  @Input() index: number = 0;
}
