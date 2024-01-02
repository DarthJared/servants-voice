import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-tag-adder',
  standalone: true,
  imports: [NgForOf, CommonModule, FormsModule],
  templateUrl: './tag-adder.component.html',
  styleUrl: './tag-adder.component.css'
})
export class TagAdderComponent {
  @Input() tags: any[] = [];
  @Input() activeTags: number[] = [];
  @Input() darkenBack = false;
  @Output() setTags = new EventEmitter<number[]>();
  @Output() addTag = new EventEmitter<any>();

  newTagName: string = '';
  showNewTagInput = false;

  tagChecked(event: any, tag: any) {
    if (event.target.checked) {
      this.activeTags.push(tag);
    } else {
      this.activeTags = this.activeTags.filter(t => t !== tag);
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

  doNothing(event: any) {
    event.stopPropagation();
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
}
