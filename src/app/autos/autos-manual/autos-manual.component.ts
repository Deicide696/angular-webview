import {Component, Input, OnInit} from '@angular/core';
import {Aseguradora} from '../../aseguradora/aseguradora';
import {DataAutomaticRequest} from '../../data-automatic-request/data-automatic-request';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-autos-manual',
  templateUrl: './autos-manual.component.html',
  styleUrls: ['./autos-manual.component.scss']
})
export class AutosManualComponent implements OnInit {

  @Input() insurances: Aseguradora[];
  @Input() counterManual: number;
  @Input() selectedAutoQuotes: DataAutomaticRequest;

  constructor(private dataService: DataService) {}

  selectManualQuote(element, indexManualQuote){

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
    console.log(this.dataService.request);
  }

}
