import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';  

import { DataService } from '../../../../../webview/src/app/data.service';
import { Response } from '../../../../../webview/src/app/response/response';
import { ResponsePdf } from '../../../../../webview/src/app/response-pdf/response-pdf';
import { Request } from '../../../../../webview/src/app/request/request';
import { Cotizacion } from '../../../../../webview/src/app/cotizacion/cotizacion';
import { Aseguradora } from '../../../../../webview/src/app/aseguradora/aseguradora';
import { Plan } from '../../../../../webview/src/app/plan/plan';
import { Amparo } from '../../../../../webview/src/app/amparo/amparo';
import { Asistencia } from '../../../../../webview/src/app/asistencia/asistencia';
import { Vehiculo } from '../../../../../webview/src/app/vehiculo/vehiculo';

import { DataResponse } from '../../../../../webview/src/app/data-response/data-response';
import { DataResponsePdf } from '../../../../../webview/src/app/data-response-pdf/data-response-pdf';
import { DataRequest } from '../../../../../webview/src/app/data-request/data-request';

declare interface Table_With_Checkboxes {
  id?: number;
  check: boolean;
  product_name: string;
  type: string;
  qty?: number;
  price: string;
  amount?: string;
}
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
declare interface TableData2 {
  headerRow: string[];
  dataRows: Table_With_Checkboxes[];
}

@Component({
  selector: 'app-autos-list',
  templateUrl: './autos-list.component.html',
  styleUrls: ['./autos-list.component.scss']
})
export class AutosListComponent implements OnInit {

  public tableData1: TableData;
  public tableData2: TableData2;
  public tableData3: TableData;
  public color:string;
  public inputs:string;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
	  this.inputs = this.route.snapshot.params['precotizacion'];
	  
	  this.request = {
		  cotizacion_id : +this.inputs,		  
		  cotizaciones : null
	  };
	  
  }  
		
	response: Response;
	responsepdf: ResponsePdf;
	resp: Response;
	data: DataResponse;
	datapdf: DataResponsePdf;
	internal_message: Cotizacion;
	insurances: Aseguradora;
	typeplan: Plan;
	amparos: Amparo;
	asistencia: Asistencia;
	vehiculo: Vehiculo;	
	buttonStatus: boolean;
	request: Request;
	datarequest: DataRequest;	
	cotizacionesArray = [];
	
	
	/*getResponse(): void {
    this.dataService.getResponse2()
		.subscribe(response => {
				this.response = response;				
				this.response.data = response.data;				
				this.response.data.internal_message = this.response.data.internal_message;				
				this.response.data.vehiculo = this.response.data.vehiculo;
				this.response.data.insurances = this.response.data.insurances;
				this.response.data.insurances.typeplan = this.response.data.insurances.typeplan;
				console.log(this.response);
				//this.response.data.internal_message.insurances.typeplan.amparos = this.response.data.internal_message.typeplan.amparos;
				//this.response.data.internal_message.insurances.typeplan.asistencia = this.response.data.internal_message.typeplan.asistencia;
				//console.log(this.response);
			}
		);
		
	}*/
		
	/*
	getResponse(): void {
    this.dataService.getResponse()
		.subscribe(response => {
				this.response = response;
				console.log(this.response[0]);
				this.response.data = response[0].data;				
				this.response.data.internal_message = this.response.data.internal_message;				
				this.response.data.internal_message.vehiculo = this.response.data.internal_message.vehiculo;
				this.response.data.internal_message.insurances = this.response.data.internal_message.insurances;
				this.response.data.internal_message.insurances.typeplan = this.response.data.internal_message.insurances.typeplan;
				//this.response.data.internal_message.insurances.typeplan.amparos = this.response.data.internal_message.typeplan.amparos;
				//this.response.data.internal_message.insurances.typeplan.asistencia = this.response.data.internal_message.typeplan.asistencia;
				//console.log(this.response);
			}
		);
	}*/

	getResponseWeb(cotizacion): void {
    this.dataService.getResponseWeb(cotizacion)
		.subscribe(response => {
				this.response = response;
				console.log(this.response);
				this.response.data = response.data;								
				this.response.data.vehiculo = this.response.data.vehiculo;
				this.response.data.insurances = this.response.data.insurances;
				this.response.data.insurances.typeplan = this.response.data.insurances.typeplan;				
			}
		);
	}
	
	getResponsePdf(request): void{
	this.dataService.postQuote(request)
			.subscribe(responsepdf => {
				this.responsepdf = responsepdf;
				console.log(this.responsepdf);
				this.responsepdf.data = responsepdf.data;				
				}
			);
	}
	
	

  ngOnInit() {
	
	
	//this.buttonStatus = true;
	
	console.log("Precotizacion: " + this.inputs);
	
	//this.getResponse();
	this.getResponseWeb(this.inputs);
	  
    /*this.tableData1 = {
      headerRow: [ '#', 'Name', 'Job Position', 'Since', 'Salary', 'Actions'],
      dataRows: [
        ['1', 'Andrew Mike', 'Develop', '2013', '99,225',''],
        ['2', 'John Doe', 'Design', '2012', '89,241', ''],
        ['3', 'Alex Mike', 'Design', '2010', '92,144', 'btn-neutral'],
        ['4', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-neutral'],
        ['5', 'Paul Dickens', 'Communication', '2015', '69,201', 'btn-round'],
        ['6', 'Manuel Rico', 'Manager', '2012', '99,201', 'btn-round']
      ]
    };*/
    /*this.tableData2 = {
       headerRow: [ 'Daños a Terceros', 'Pérdidas Totales', 'Pérdidas Parciales', 'Conductor Elegido',
        'Carro Taller / GRUA', 'Gastos de Transporte Perdida Total', 'Vehículo Reemplazo Totales / Parciales', 'Accidentes Personales', 'Prima'],
     
      dataRows: [
        {id: 1, product_name: 'Moleskine Agenda', type: 'Office', qty: 25, price: '49', amount: '1225',  check: false},
        {id: 2, product_name: 'Stabilo Pen', type: 'Office', qty: 30, price: '10', amount: '300',  check: true},
        {id: 3, product_name: 'A4 Paper Pack', type: 'Office', qty: 50, price: '10.99', amount: '109',  check: true},
        {id: 4, product_name: 'Apple iPad', type: 'Meeting', qty: 10, price: '499.00', amount: '4990',  check: false},
        {id: 5, product_name: 'Apple iPhone', type: 'Communication', qty: 10, price: '599.00', amount: '5990',  check: false}
      ]
    };*/
    this.tableData3 = {
      
      headerRow: [ 'Daños a Terceros', 'Pérdidas Totales', 'Pérdidas Parciales', 'Conductor Elegido',
        'Carro Taller / GRUA', 'Gastos de Transporte Perdida Total', 'Vehículo Reemplazo Totales / Parciales', 'Accidentes Personales', 'Prima'],
      dataRows: [
        ['https://s3.amazonaws.com/dev.vivoo/img/logos_aseguradoras/sbs.jpg', '3.000', 'by Saint Laurent', 'Black', '5 Servicios', '5 Servicios / 330 Km', '1.999.999', '3390'],
        ['logo-allianz.png', '800',  'by Balmain', 'Black', 'M', '499', '2', '998'],
        ['logo-axa.jpeg', '1.000', 'by Prada', 'Red', 'M', '200', '1', '200']
      ]
    };
  }
  getTotal1() {
    var total = 0;
    for( var i = 0; i < this.tableData2.dataRows.length; i++ ){
      var integer = parseInt(this.tableData2.dataRows[i].amount)
      total += integer;
    }
    return total;
  };
  getTotal2() {
    var total = 0;
    for( var i = 0; i < this.tableData3.dataRows.length; i++ ){
      var integer = parseInt(this.tableData3.dataRows[i][7])
      total += integer;
    }
    return total;
  };
  
	// Función para encontrar la posición del objeto buscado dentro de un array.
	deepIndexOf(arr, obj) {
	  return arr.findIndex(function (cur) {
		return Object.keys(obj).every(function (key) {
		  return obj[key] === cur[key];
		});
	  });
	}
	
	// Función para invocar el EndPoint de precotización-pdf
	sendRequest() {
			console.log(this.request);
			this.getResponsePdf(this.request);
	}
  
  Select(selectedId, selectedPlan, element) {  	  
	  // cotizacion: de tipo DataRequest (Modelo Solicitud Webservice)
	  let cotizacion = {} as DataRequest;
	  
	  // Valida si el checkbox ha sido activado
	  if(element == true){	
		  // Asigna el valor de las propiedades de DataRequest {Aseguradora, Plan}, con los parametros de esta función.	
		  cotizacion.aseguradora_id = selectedId;
		  cotizacion.plan = selectedPlan;		  
		  
		  // Inserta cotizacion seleccionada en el array de cotizaciones
		  this.cotizacionesArray.push(cotizacion);
		  // Actualiza la propiedad cotizaciones de la clase Request con la cotización seleccionada.	
		  this.request.cotizaciones = this.cotizacionesArray;	  
		  
		  // Imprime la posición del elmento
		  console.log(this.deepIndexOf(this.cotizacionesArray ,cotizacion));
	  }
	  else { // Si se desactiva el checkbox	
		  // Asigna el valor de las propiedades de DataRequest {Aseguradora, Plan}, con los parametros de esta función.	
		  cotizacion.aseguradora_id = selectedId;
		  cotizacion.plan = selectedPlan;
		  
		  // Se elimina del array el elemento desactivado, se utiliza la función 
		  // deepIndexOf para encontrar la posición del arreglo de este elemento
		  this.cotizacionesArray.splice(this.deepIndexOf(this.cotizacionesArray ,cotizacion), 1);
		  
		  // Actualiza la propiedad cotizaciones de la clase Request
		  this.request.cotizaciones = this.cotizacionesArray;
	  }	  			  
  }
  
 

}
