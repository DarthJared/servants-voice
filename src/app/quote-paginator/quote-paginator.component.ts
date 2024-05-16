import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-quote-paginator',
  standalone: true,
  imports: [NgForOf, CommonModule, FontAwesomeModule],
  templateUrl: './quote-paginator.component.html',
  styleUrl: './quote-paginator.component.css'
})
export class QuotePaginatorComponent {
  @Output() selectPage = new EventEmitter<number>();
  @Input() numPages: number = 0;
  @Input() currentPage: number = 0;

  faAngleLeft = faAngleLeft;
  faAnglesLeft = faAnglesLeft;
  faAngleRight = faAngleRight;
  faAnglesRight = faAnglesRight;

  goToPage(page: number) {
    if (page < 0 || page >= this.numPages) {
      return;
    }
    this.selectPage.emit(page);
  }
}

//
