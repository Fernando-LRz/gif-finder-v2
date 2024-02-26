import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template:`
    <h5>Buscar: </h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #tagInput
    >
  `
})

export class SearchBoxComponent {

  @ViewChild('tagInput') // tomar una referencia local
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ) {}

  public searchTag() {
    const tag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(tag);
    this.tagInput.nativeElement.value = '';
  }

}
