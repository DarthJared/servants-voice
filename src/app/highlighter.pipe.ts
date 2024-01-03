import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'highlighter',
  standalone: true
})
export class HighlighterPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: any, args: any): unknown {
    if(!args || args === '')
      return value;
    const re = new RegExp(args, 'igm');
    value = this.sanitized.bypassSecurityTrustHtml(value.replace(re, '<span style="background-color: #574b02; border-radius: 4px;">$&</span>'));
    return value;
  }

}
