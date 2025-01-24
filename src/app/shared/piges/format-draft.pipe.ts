import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDraft',
  standalone: false,
})
export class FormatDraftPipe implements PipeTransform {
  transform(object: Object, daft: boolean): boolean {
    return true;
  }
}
