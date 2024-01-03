import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faXmark, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FormsModule} from "@angular/forms";
import {CommonModule, NgForOf} from "@angular/common";

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, NgForOf, CommonModule, ],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePanelComponent {
  @Output() hideSidePanel = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();
  @Output() selectTags = new EventEmitter<number[]>();

  @Input() searchText: string = '';
  @Input() tags: any[] = [];
  @Input() selectedTags: number[] = [];

  faXmark = faXmark;
  faMagnifyingGlass = faMagnifyingGlass;

  hidePanel() {
    this.hideSidePanel.emit('hide');
  }

  searchQuotes() {
    this.search.emit(this.searchText);
  }

  addRemoveTagFromList(tag: number) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    } else {
      this.selectedTags.push(tag);
    }

    this.selectTags.emit(this.selectedTags);
  }

  clearFilters() {
    this.selectedTags = [];
    this.selectTags.emit(this.selectedTags);
    this.searchText = '';
    this.search.emit(this.searchText);
  }

  doNothing(event: any) {
    event.stopPropagation();
  }
}
