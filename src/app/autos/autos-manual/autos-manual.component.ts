import {Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {Aseguradora} from '../autos-classes/aseguradora';
import {DataAutomaticRequest} from '../autos-classes/data-automatic-request';
import {DataService} from '../../data.service';
import {isNumber} from 'util';
import {DataManualRequest} from '../autos-classes/data-manual-request';
import {RceObject} from '../autos-classes/rce-object';

@Component({
  selector: 'app-autos-manual',
  templateUrl: './autos-manual.component.html',
  styleUrls: ['./autos-manual.component.scss']
})
export class AutosManualComponent implements OnInit {

  @Input() insurances: Aseguradora[];
  @Input() counterManual: number;  
  @Input() selectedAutoQuotes: DataAutomaticRequest;
  @Input() cont_cot: number; 

  cotizacionesArray = [];

  constructor(private dataService: DataService) {}

  selectManualQuote(element, insuranceSelected, rceValue, rceDeductible, ptd, pth, ppd, pph, conductor, carroTaller, grua, gastosTransporte, vrpt, vrpp, ap, prima){

    // Agregar la cotización al JSON global
    let manualQuoteSelected = {} as DataManualRequest;
    //obtiene el id del check seleccionado
    let row_id=element.attributes.id.nodeValue
    //obtiene la cotizacion seleccionada
    let row= document.getElementById("manual_row_"+row_id); 
    // Si se selecciona la cotización manual
    if(element.checked == true) {
    
      if(rceValue == '' || rceDeductible == '' || ptd == '' || pth == '' || ppd == '' || pph == '' || conductor == '' || carroTaller == ''
        || grua == '' || gastosTransporte == '' || vrpt == '' || vrpp == '' || ap == '' || prima == ''){
        // Modal informando el error y deselecciono el check
        element.checked = false;
        alert("todos los campos son obligatorios");
      }
      else{
        //aplica estilo "seleccionado" a la fila
        row.className="selected_row";
        // Validación de los campos que son booleanos

        // PTD
        if(ptd == 'S') {
          ptd = true;
        }

        else if(ptd == 'N') {
          ptd = false;
        }

        // PTH
        if(pth == 'S') {
          pth = true;
        }

        else if(pth == 'N') {
          pth = false;
        }

        // PPD
        if(ppd == 'S') {
          ppd = true;
        }

        else if(ppd == 'N') {
          ppd = false;
        }

        // PPH
        if(pph == 'S') {
          pph = true;
        }

        // Conductor elegido
        if(conductor == 'S') {
          conductor = true;
        }

        else if(conductor == 'N') {
          conductor = false;
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

        // VRPT
        if(vrpt == 'S') {
          vrpt = true;
        }

        else if(vrpt == 'N') {
          vrpt = false;
        }

        // VRPP
        if(vrpp == 'S') {
          vrpp = true;
        }

        else if(vrpp == 'N') {
          vrpp = false;
        }

        // Gastos de Transporte
        if(gastosTransporte == 'S') {
          gastosTransporte = true;
        }

        else if(gastosTransporte == 'N') {
          gastosTransporte = false;
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

        let arrayRce = [];

        //split rce
        let arrayRceSplit = rceValue.split(",");
        
        //recorre split
        for(let rceItem of arrayRceSplit)
        {  
		
		
		//completa formato valor en millones
		rceItem=rceItem+'000000'
		
        //Instancia objeto por cada rce , asigna valor a la propiedad value y adiciona al arreglo de rce's 
        let rceObject = {} as RceObject;        
        rceObject.value = rceItem;        
        arrayRce.push(rceObject);
        }

        
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
        // Contador aumenta
		    this.cont_cot += 1;
		    console.log("Cont: " + this.cont_cot); 

        console.log(this.dataService.request);
      }
    }

    else {
      //aplica estilo "desseleccionado" a la fila
      row.className="unselect_row";
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

      // Contador aumenta
		  this.cont_cot -= 1;
		  console.log("Cont: " + this.cont_cot); 
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
  }

}
