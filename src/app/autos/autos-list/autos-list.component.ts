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

import { DataResponsePdf } from '../../../../../webview/src/app/data-response-pdf/data-response-pdf';
import { DataRequest } from '../../../../../webview/src/app/data-request/data-request';


// TODO: Revisar para eliminar ya que Valencia argumenta que son solo para el ejemplo
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
  styleUrls: ['./autos-list.component.scss'],
  styles: [`
    :host >>> .alert-custom {
      color: #99004d;
      background-color: #f169b470;
      border-color: #800040;
    }
  `]
})
export class AutosListComponent implements OnInit {

  public tableData1: TableData;
  public tableData2: TableData2;
  public tableData3: TableData;
  public color:string;
	public inputs:string;
	public auth:string;
	public partner:string;
	public deploy:string;
	public errores:any;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
	  this.inputs = this.route.snapshot.params['precotizacion'];
	  this.request = {
		  cotizacion_id : +this.inputs,		  
		  cotizaciones : null
		};
		
		this.route.queryParamMap.subscribe(params=>{
		  // TODOD: Cambiarlo porque no solo trae los errores sino también la auth
			this.errores=params;						

			// TODO: Optimizar esto!!!
			let mensaje_errores=[];
			for (let error_index in this.errores.params){				
				if(error_index != 'auth'){
					if(error_index != 'partner_id')
					{
						mensaje_errores.push(this.errores.params[error_index]);				
					}					
				}				
			}
			console.log(mensaje_errores);
			
			dataService.auth=this.errores.params.auth;	
			this.auth = dataService.auth;			
			dataService.partner=this.errores.params.partner_id;
			this.partner = dataService.partner;
			this.errores=mensaje_errores;			
		});	  
  }  
		
	response: Response;
	responsepdf: ResponsePdf;
	resp: Response;
	data: Cotizacion;
	datapdf: DataResponsePdf;
	internal_message: Cotizacion;
	insurances: Aseguradora;
	typeplan: Plan;
	amparos: Amparo;
	asistencia: Asistencia;
	vehiculo: Vehiculo;	
	buttonStatus: boolean;
	loading: boolean;
	request: Request;
	cotizaciones: DataRequest;
	datarequest: DataRequest;	
	cotizacionesArray = [];
	
	getResponseWeb(cotizacion, auth, partner): void {
    this.dataService.getResponseWeb(cotizacion, auth, partner)
		.subscribe(response => {
				this.response = response;
				this.data = response.data;
				this.response.data = response.data;
				this.response.data.vehiculo = this.response.data.vehiculo;
				this.insurances = this.response.data.insurances;
				this.data.insurances = this.response.data.insurances;
				this.response.data.insurances = this.response.data.insurances;
				this.response.data.insurances.typeplan = this.response.data.insurances.typeplan;
			}			
		);
	}
	
	getResponsePdf(request, auth, partner): void{
	this.dataService.postQuote(request, auth, partner)
			.subscribe(responsepdf => {
				this.responsepdf = responsepdf;				
				this.responsepdf.data = responsepdf.data;				
				if(this.responsepdf.status){
					window.location.href = this.responsepdf.data.internal_message;				
				}	
				else{					
					alert(this.responsepdf.data.internal_message);		
				}
			}
			);			
	}
	
	

  ngOnInit() {

    this.buttonStatus = true;
    this.loading = true;

    // Llamado para poblar la tabla con las cotizaciones dado el id de cotización
    this.getResponseWeb(this.inputs, this.auth, this.partner);

    if(this.getResponseWeb){
        this.loading = false;
    }
	

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
			this.getResponsePdf(this.request, this.auth, this.partner);
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
