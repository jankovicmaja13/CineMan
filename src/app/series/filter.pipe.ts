import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../model/movie.model';

@Pipe({ name: 'appFilter' })
export class Filter  implements PipeTransform {

  transform(items: Movie[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return [];
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.name.toLocaleLowerCase().includes(searchText);
    });
  }


}
