import {Component, EventEmitter, Output} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faXmark, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePanelComponent {
  @Output() hideSidePanel = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();

  searchText: string = '';

  faXmark = faXmark;
  faMagnifyingGlass = faMagnifyingGlass;

  hidePanel() {
    this.hideSidePanel.emit('hide');
  }

  searchQuotes() {
    this.search.emit(this.searchText);
  }
}
