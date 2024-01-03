import {Component, EventEmitter, Output} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-are-you-sure',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './are-you-sure.component.html',
  styleUrl: './are-you-sure.component.css'
})
export class AreYouSureComponent {
  @Output() cancel = new EventEmitter<string>();
  @Output() confirm = new EventEmitter<string>();
  faCheck = faCheck;
  faXmark = faXmark;

  cancelAction() {
    this.cancel.emit('cancel');
  }

  confirmAction() {
    this.confirm.emit('confirm');
  }
}
