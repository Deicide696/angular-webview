import { Component, OnInit } from '@angular/core';


import { DataService } from '../../../../../webview/src/app/data.service';
import { Response } from '../../../../../webview/src/app/response/response';
import { Cotizacion } from '../../../../../webview/src/app/cotizacion/cotizacion';
import { Aseguradora } from '../../../../../webview/src/app/aseguradora/aseguradora';
import { Plan } from '../../../../../webview/src/app/plan/plan';
import { Amparo } from '../../../../../webview/src/app/amparo/amparo';
import { Asistencia } from '../../../../../webview/src/app/asistencia/asistencia';
import { Vehiculo } from '../../../../../webview/src/app/vehiculo/vehiculo';

import { DataResponse } from '../../../../../webview/src/app/data-response/data-response';

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

  constructor(private dataService: DataService) { }
  
	response: Response;
	resp: Response;
	data: DataResponse;
	internal_message: Cotizacion;
	insurances: Aseguradora;
	typeplan: Plan;
	amparos: Amparo;
	asistencia: Asistencia;
	vehiculo: Vehiculo;
	
	  
	getResponse(): void {
    this.dataService.getResponse()
		.subscribe(resp => {
				this.resp = resp;
				console.log(this.resp[0]);
				//this.response.data = response[0].data;				
				//this.response.data.internal_message = this.response.data.internal_message;				
				//this.response.data.internal_message.vehiculo = this.response.data.internal_message.vehiculo;
				//this.response.data.internal_message.insurances = this.response.data.internal_message.insurances;
				//this.response.data.internal_message.insurances.typeplan = this.response.data.internal_message.insurances.typeplan;
				//this.response.data.internal_message.insurances.typeplan.amparos = this.response.data.internal_message.typeplan.amparos;
				//this.response.data.internal_message.insurances.typeplan.asistencia = this.response.data.internal_message.typeplan.asistencia;
				//console.log(this.response);
			}
		);
	}

	getResponseWeb(): void {
    this.dataService.getResponseWeb()
		.subscribe(response => {
				this.response = response;
				console.log(this.response);
				this.response.data = response.data;				
				this.response.data.internal_message = this.response.data.internal_message;				
				this.response.data.internal_message.vehiculo = this.response.data.internal_message.vehiculo;
				this.response.data.internal_message.insurances = this.response.data.internal_message.insurances[0];
				this.response.data.internal_message.insurances.typeplan = this.response.data.internal_message.insurances[0].typeplan;
				//this.response.data.internal_message.insurances.typeplan.amparos = this.response.data.internal_message.typeplan.amparos;
				//this.response.data.internal_message.insurances.typeplan.asistencia = this.response.data.internal_message.typeplan.asistencia;
				//console.log(this.response);
			}
		);
	}
	

  ngOnInit() {
	  
	this.getResponse();
	this.getResponseWeb();
	  
    this.tableData1 = {
      headerRow: [ '#', 'Name', 'Job Position', 'Since', 'Salary', 'Actions'],
      dataRows: [
        ['1', 'Andrew Mike', 'Develop', '2013', '99,225',''],
        ['2', 'John Doe', 'Design', '2012', '89,241', ''],
        ['3', 'Alex Mike', 'Design', '2010', '92,144', 'btn-neutral'],
        ['4', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-neutral'],
        ['5', 'Paul Dickens', 'Communication', '2015', '69,201', 'btn-round'],
        ['6', 'Manuel Rico', 'Manager', '2012', '99,201', 'btn-round']
      ]
    };
    this.tableData2 = {
       headerRow: [ 'Daños a Terceros', 'Pérdidas Totales', 'Pérdidas Parciales', 'Conductor Elegido',
        'Carro Taller / GRUA', 'Gastos de Transporte Perdida Total', 'Vehículo Reemplazo Totales / Parciales', 'Accidentes Personales', 'Prima'],
     
      dataRows: [
        {id: 1, product_name: 'Moleskine Agenda', type: 'Office', qty: 25, price: '49', amount: '1225',  check: false},
        {id: 2, product_name: 'Stabilo Pen', type: 'Office', qty: 30, price: '10', amount: '300',  check: true},
        {id: 3, product_name: 'A4 Paper Pack', type: 'Office', qty: 50, price: '10.99', amount: '109',  check: true},
        {id: 4, product_name: 'Apple iPad', type: 'Meeting', qty: 10, price: '499.00', amount: '4990',  check: false},
        {id: 5, product_name: 'Apple iPhone', type: 'Communication', qty: 10, price: '599.00', amount: '5990',  check: false}
      ]
    };
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
  showElements() {
    for( var i = 0; i < this.tableData3.dataRows.length; i++ ){
      console.log(this.tableData3.dataRows[i][1])
    }
  }

}
