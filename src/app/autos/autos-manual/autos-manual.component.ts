import {Component, Input, OnInit} from '@angular/core';
import {Aseguradora} from '../../aseguradora/aseguradora';

@Component({
  selector: 'app-autos-manual',
  templateUrl: './autos-manual.component.html',
  styleUrls: ['./autos-manual.component.scss']
})
export class AutosManualComponent implements OnInit {

  @Input() insurances: Aseguradora[];
  @Input() counterManual: number;

  constructor() { }

  selectManualQuote(element, numberManualQuote){

    // Si se selecciona la cotización manual
    if(element == true) {

    }
    // Si ya no se selecciona la cotización manual
    else{

    }
  }

  arrayFake(n: number): any[] {
    console.log("Cotizaciones manuales permitidas:" + n);
    return Array(n);
  }

  ngOnInit() {

  }

}
