import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  private _historial: string[] = [];

  constructor( private gifsService: GifsService) {}

  get historial() {
    return this.gifsService.historial
  }
 
  buscar(item: string) {
    
    this.gifsService.buscarGifs(item)
        
  }

}
