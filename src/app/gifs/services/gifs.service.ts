import { HttpClient, HttpParams } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../Interface/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string ='OfTS0TONFcmMzNreVHuEhZ0PTPKgKVco';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs/'
  private _historial: string[] = [];

  //TO DO: Cambiar Any por subtipo correspondiente
  public resultado: Gif[] = [];


  get historial() {
    return [...this._historial];
  }

  constructor (private http: HttpClient)  {
      this._historial = JSON.parse(localStorage.getItem('historial')! ) || [];
      this.resultado = JSON.parse(localStorage.getItem('resp')!) || []
    }
  


  buscarGifs( query: string )  {

    query = query.trim().toLocaleLowerCase();

    if ( !this._historial.includes(query)){
      this._historial.unshift( query ); 
      this._historial = this._historial.splice(0,10)

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);


    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe( ( resp) => {
        console.log( resp.data )
        this.resultado = resp.data

        localStorage.setItem('resp', JSON.stringify(this.resultado) )
        
      })

  }

}
