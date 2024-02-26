import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private _apiKey: string = 'r3YC8NNQfCKrBzQ2emaPW9IYOqJuKhcL';
  private _serviceURL: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient){}

  public get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag.toLowerCase();

    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag );
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  // public async searchTag(tag: string): Promise<void>{
  //   if(tag.length === 0) return;
  //   this.organizeHistory(tag);

  //   fetch('https://api.giphy.com/v1/gifs/search?api_key=r3YC8NNQfCKrBzQ2emaPW9IYOqJuKhcL&q=fortnite&limit=10')
  //     .then( resp => resp.json() )
  //     .then( data => console.log(data) )
  // }

  public searchTag(tag: string): void {
    if(tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', 10)
      .set('q', tag);

    this.http.get(`${ this._serviceURL }/search`, { params })
      .subscribe( resp => {
        console.log(resp)
      });
  }

}
