import { Pipe, PipeTransform } from '@angular/core';
import { Award } from '../model/award.model';

@Pipe({
  name: 'categoryPipe'
})
export class CategoryPipePipe implements PipeTransform {
  transform(items: Award[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => {
      return item.category.name.localeCompare(filter) === 0;
    });
  }
}
