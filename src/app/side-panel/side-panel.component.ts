import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faXmark, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FormsModule} from "@angular/forms";
import {CommonModule, NgForOf} from "@angular/common";

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

interface AuthorCountMap {
  [key: string]: number;
}

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, NgForOf, CommonModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css',
  animations: [
    trigger('openClose', [
      state('open', style({
        left: '0px'
      })),
      state('closed', style({
        left: '-400px'
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ]),
  ]
})
export class SidePanelComponent {
  @Output() hideSidePanel = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();
  @Output() selectTags = new EventEmitter<Array<number | null>>();
  @Output() selectAuthors = new EventEmitter<string[]>();

  @Input() searchText: string = '';
  @Input() tags: any[] = [];
  @Input() untaggedCount: number = 0;
  @Input() selectedTags: Array<number | null> = [];
  @Input() authors: AuthorCountMap = {};
  @Input() selectedAuthors: string[] = [];
  @Input() sidePanelVisible: boolean = false;

  faXmark = faXmark;
  faMagnifyingGlass = faMagnifyingGlass;
  activeTab = 'tags';

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

  addRemoveAuthorFromList(author: string) {
    if (this.selectedAuthors.includes(author)) {
      this.selectedAuthors = this.selectedAuthors.filter(a => a !== author);
    } else {
      this.selectedAuthors.push(author);
    }

    this.selectAuthors.emit(this.selectedAuthors);
  }

  selectUntagged() {
    if (this.selectedTags.includes(null)) {
      this.selectedTags = [];
    }
    else {
      this.selectedTags = [null];
    }
    this.selectTags.emit(this.selectedTags);
  }

  clearFilters() {
    this.selectedTags = [];
    this.selectTags.emit(this.selectedTags);
    this.searchText = '';
    this.search.emit(this.searchText);
    this.selectedAuthors = [];
    this.selectAuthors.emit(this.selectedAuthors);
  }

  doNothing(event: any) {
    event.stopPropagation();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getDayCount() {
    let dayCount = 1
    let curDate = new Date('2022-01-17') // Start date was 1/16/2022 but for some reason it was you have to enter the next day to get the correct count
    const today = new Date();

    while(curDate <= today) {
      // let dayStr = `${curDate.getMonth() + 1}-${curDate.getDate()}-${curDate.getFullYear()}`
      // console.log(`${dayCount} - ${dayStr}`)

      curDate.setDate(curDate.getDate() + 1)
      dayCount++
    }
    return dayCount;
  }
}
