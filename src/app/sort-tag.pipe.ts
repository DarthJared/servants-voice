import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortTag',
  standalone: true
})
export class SortTagPipe implements PipeTransform {

  transform(tagIds: number[], tags: any[]): any[] {
    return tags.sort((a, b) => a.name.localeCompare(b.name)).filter(tag => tagIds.includes(tag.id));
  }

}
