import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faPlus, faCheck, faXmark, faTrash} from "@fortawesome/free-solid-svg-icons";
import {AreYouSureComponent} from "../are-you-sure/are-you-sure.component";

@Component({
  selector: 'app-tag-adder',
  standalone: true,
  imports: [NgForOf, CommonModule, FormsModule, FontAwesomeModule, AreYouSureComponent],
  templateUrl: './tag-adder.component.html',
  styleUrl: './tag-adder.component.css'
})
export class TagAdderComponent {
  @Input()
  get tags() {
    return this._tags.sort((a, b) => a.name.localeCompare(b.name));
  };
  set tags(tags: any[]) {
    this._tags = tags;
  }
  @Input() activeTags: number[] = [];
  @Input() darkenBack = false;
  @Output() setTags = new EventEmitter<number[]>();
  @Output() addTag = new EventEmitter<any>();
  @Output() removeTag = new EventEmitter<number>();

  displayConfirm = false;
  deleteTagId = -1;

  private _tags: any[] = [];

  newTagName: string = '';
  showNewTagInput = false;
  faPlus = faPlus;
  faCheck = faCheck;
  faXmark = faXmark;
  faTrash = faTrash;

  addRemoveTagFromList(tagId: number) {
    if (this.activeTags.includes(tagId)) {
      this.activeTags = this.activeTags.filter(t => t !== tagId);
    } else {
      this.activeTags.push(tagId);
    }
  }

  done() {
    this.setTags.emit(this.activeTags);
  }

  addNewTag() {
    const highestId = this.tags.reduce((acc, tag) => Math.max(acc, tag.id), -1);
    this.addTag.emit({
      name: this.newTagName,
      id: highestId + 1
    });
    this.activeTags.push(highestId + 1);
    this.hideNewTag();
  }

  showNewTag() {
    this.showNewTagInput = true;
    this.newTagName = '';
  }

  hideNewTag() {
    this.showNewTagInput = false;
  }

  isTagActive(tagId: number) {
    return this.activeTags.includes(tagId);
  }

  deleteTag(tagId: number) {
    console.log('tagId', tagId);
    this.removeTag.emit(tagId);
  }

  showConfirm(tagId: number) {
    this.deleteTagId = tagId;
    this.displayConfirm = true;
  }

  confirmSelected() {
    this.displayConfirm = false;
    this.deleteTag(this.deleteTagId);
  }

  cancelSelected() {
    this.deleteTagId = -1;
    this.displayConfirm = false;
  }
}
