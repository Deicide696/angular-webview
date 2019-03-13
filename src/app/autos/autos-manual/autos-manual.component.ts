import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Aseguradora} from '../../aseguradora/aseguradora';
import {DataAutomaticRequest} from '../../data-automatic-request/data-automatic-request';
import {DataService} from '../../data.service';
import {isNumber} from 'util';
import {DataManualRequest} from '../../classes/data-manual-request';
import {RceObject} from '../../classes/rce-object';

@Component({
  selector: 'app-autos-manual',
  templateUrl: './autos-manual.component.html',
  styleUrls: ['./autos-manual.component.scss']
})
export class AutosManualComponent implements OnInit {

  @Input() insurances: Aseguradora[];
  @Input() counterManual: number;
  @Input() selectedAutoQuotes: DataAutomaticRequest;

  cotizacionesArray = [];

  constructor(private dataService: DataService) {}

  selectManualQuote(element, insuranceSelected, rceValue, rceDeductible, ptd, pth, ppd, pph, conductor, carroTaller, grua, gastosTransporte, vrpt, vrpp, ap, prima){

    // Agregar la cotización al JSON global
    let manualQuoteSelected = {} as DataManualRequest;

    // Si se selecciona la cotización manual
    if(element.checked == true) {

      if(rceValue == '' || rceDeductible == '' || ptd == '' || pth == '' || ppd == '' || pph == '' || conductor == '' || carroTaller == ''
        || grua == '' || gastosTransporte == '' || vrpt == '' || vrpp == '' || ap == '' || prima == ''){
        // Modal informando el error y deselecciono el check
        element.checked = false;
      }
      else{

        // Validación de los campos que son booleanos

        // PTD
        if(ptd == 'S') {
          ptd = true;
        }

        else if(ptd == 'N') {
          ptd = false;
        }

        else {
          // Modal informando el error
        }

        // PTH
        if(pth == 'S') {
          pth = true;
        }

        else if(pth == 'N') {
          pth = false;
        }

        else {
          // Modal informando el error
        }

        // Carro Taller
        if(carroTaller == 'S') {
          carroTaller = true;
        }

        else if(carroTaller == 'N') {
          carroTaller = false;
        }

        else {
          // Modal informando el error
        }

        // Grua
        if(grua == 'S') {
          grua = true;
        }

        else if(grua == 'N') {
          grua = false;
        }

        else {
          // Modal informando el error
        }

        // AP
        if(ap == 'S') {
          ap = true;
        }

        else if(ap == 'N') {
          ap = false;
        }

        else {
          // Modal informando el error
        }


        // TODO: Validación del formato de la prima

        // Id de la aseguradora
        manualQuoteSelected.id = parseInt(insuranceSelected,10);

        // RCE
        let rceObject = {} as RceObject;

        let arrayRce = [];

        rceObject.value = rceValue;

        arrayRce.push(rceObject);

        manualQuoteSelected.rce = arrayRce;

        // Deducible RCE
        manualQuoteSelected.deducible_rce = rceDeductible;

        // PTD
        manualQuoteSelected.ptd = ptd;

        // PTH
        manualQuoteSelected.pth = pth;

        // PPD
        manualQuoteSelected.ppd = ppd;

        // PPH
        manualQuoteSelected.pph = pph;

        // Conductor
        manualQuoteSelected.conductor = conductor;

        // Carro Taller
        manualQuoteSelected.carro_taller = carroTaller;

        // Grua
        manualQuoteSelected.grua = grua;

        // Gastos Transporte
        manualQuoteSelected.gastos_transporte = gastosTransporte;

        // VRPT
        manualQuoteSelected.vrpt = vrpt;

        // VRPP
        manualQuoteSelected.vrpp = vrpp;

        // AP
        manualQuoteSelected.ap = ap;

        // Prima
        manualQuoteSelected.prima = parseInt(prima,10);

        // Agregar el objeto DataManualRequest a un array para luego ser agregado a las cotizaciones manuales
        this.cotizacionesArray.push(manualQuoteSelected);

        // Actualiza la propiedad cotizaciones de la clase Request con la cotización seleccionada.
        this.dataService.request.cotizaciones_manuales = this.cotizacionesArray;

        console.log(this.dataService.request);
      }
    }

    else {
      // Id de la aseguradora
      manualQuoteSelected.id = parseInt(insuranceSelected,10);

      // RCE
      let rceObject = {} as RceObject;

      let arrayRce = [];

      rceObject.value = rceValue;

      arrayRce.push(rceObject);

      manualQuoteSelected.rce = arrayRce;

      // Deducible RCE
      manualQuoteSelected.deducible_rce = rceDeductible;

      // PTD
      manualQuoteSelected.ptd = ptd;

      // PTH
      manualQuoteSelected.pth = pth;

      // PPD
      manualQuoteSelected.ppd = ppd;

      // PPH
      manualQuoteSelected.pph = pph;

      // Conductor
      manualQuoteSelected.conductor = conductor;

      // Carro Taller
      manualQuoteSelected.carro_taller = carroTaller;

      // Grua
      manualQuoteSelected.grua = grua;

      // Gastos Transporte
      manualQuoteSelected.gastos_transporte = gastosTransporte;

      // VRPT
      manualQuoteSelected.vrpt = vrpt;

      // VRPP
      manualQuoteSelected.vrpp = vrpp;

      // AP
      manualQuoteSelected.ap = ap;

      // Prima
      manualQuoteSelected.prima = parseInt(prima,10);

      this.cotizacionesArray.splice(this.deepIndexOf(this.cotizacionesArray ,manualQuoteSelected), 1);
    }
  }

  arrayFake(n: number): any[] {
    return Array(n);
  }

  // Función para encontrar la posición del objeto buscado dentro de un array.
  deepIndexOf(arr, obj) {
    return arr.findIndex(function (cur) {
      return Object.keys(obj).every(function (key) {
        return obj[key] === cur[key];
      });
    });
  }

  ngOnInit() {
    console.log(this.dataService.request);
  }

}
