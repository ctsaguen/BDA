import { Component, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-recherche',
  templateUrl: './modal-recherche.page.html',
  styleUrls: ['./modal-recherche.page.scss'],
})
export class ModalRecherchePage {

  @Input() value: number;
  
  constructor(navParams: NavParams) { }

 

}
