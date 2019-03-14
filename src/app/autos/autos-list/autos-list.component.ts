import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { DataService } from '../../../../../webview/src/app/data.service';
import { Response } from '../../../../../webview/src/app/response/response';
import { ResponsePdf } from '../../../../../webview/src/app/response-pdf/response-pdf';
import { Cotizacion } from '../../../../../webview/src/app/cotizacion/cotizacion';
import { Plan } from '../../../../../webview/src/app/plan/plan';
import { Amparo } from '../../../../../webview/src/app/amparo/amparo';
import { Asistencia } from '../../../../../webview/src/app/asistencia/asistencia';

import { DataAutomaticRequest } from '../../data-automatic-request/data-automatic-request';
import { FormBuilder, FormGroup} from '@angular/forms';


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

  public tableData2: TableData2;
  public tableData3: TableData;
  public color:string;
	public inputs:string;
	public auth:string;
	public errores:any;
	public cont_cot:number;
	public manualEnable: boolean;

	manualQuoteForm: FormGroup;

  constructor(private dataService: DataService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
	this.cont_cot = 0;  
    this.inputs = this.route.snapshot.params['precotizacion'];
    dataService.request = {
      cotizacion_id: +this.inputs,
      cotizaciones_automaticas: null,
      cotizaciones_manuales: null,
    };

    this.route.queryParamMap.subscribe(params => {
      // TODOD: Cambiarlo porque no solo trae los errores sino también la auth
      this.errores = params;

      // TODO: Optimizar esto!!!
      let mensaje_errores = [];
      for (let error_index in this.errores.params) {
        if (error_index != 'auth') {
          if (error_index != 'partner_id') {
            mensaje_errores.push(this.errores.params[error_index]);
          }
        }
      }
      dataService.auth = this.errores.params.auth;
      dataService.partner = this.errores.params.partner_id;

      if(this.errores.params.manual_quote == 1){
        this.manualEnable = true;
      }
      else {
        this.manualEnable = false;
      }
      this.errores = mensaje_errores;
    });
  }

  showManualQuote: boolean;
		
	response: Response;
	responsepdf: ResponsePdf;
	data: Cotizacion;
	typeplan: Plan;
	amparos: Amparo;
	asistencia: Asistencia;
	buttonStatus: boolean;
	loading: boolean;
	cotizacionesArray = [];
	
	getResponseWeb(cotizacion): void {
    this.dataService.getResponseWeb(cotizacion)
		.subscribe(response => {
				this.response = response;
				this.data = response.data;				
			}			
		);
	}
	
	getResponsePdf(request): void{
	this.dataService.postQuote(request)
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

	// Submit del formulario de cotizaciones manuales
  onSubmit() {
    // stop here if form is invalid
    if (this.manualQuoteForm.invalid) {
      return;
    }
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
			console.log(this.dataService.request);
			this.getResponsePdf(this.dataService.request);
	}

  /**
   *
   * @param selectedId: Id de la aseguradora
   * @param selectedPlan: Id del plan de la aseguradora elegido
   * @param element: Cotización elegida
   * @constructor
   */
  Select(selectedId, selectedPlan, element) {

    let automaticQuotesSelected = {} as DataAutomaticRequest;

	  // Valida si el checkbox ha sido activado
	  if(element == true){	
		  // Asigna el valor de las propiedades de DataRequest {Aseguradora, Plan}, con los parametros de esta función.	
		  automaticQuotesSelected.id = selectedId;
		  automaticQuotesSelected.plan = selectedPlan;
		  
		  // Inserta cotizacion seleccionada en el array de cotizaciones
		  this.cotizacionesArray.push(automaticQuotesSelected);
		  // Actualiza la propiedad cotizaciones de la clase Request con la cotización seleccionada.	
      this.dataService.request.cotizaciones_automaticas = this.cotizacionesArray;
		  // Contador aumenta
		  this.cont_cot += 1;
		  console.log("Cont: " + this.cont_cot); 
	  }
	  else { // Si se desactiva el checkbox	
		  // Asigna el valor de las propiedades de DataRequest {Aseguradora, Plan}, con los parametros de esta función.	
      automaticQuotesSelected.id = selectedId;
      automaticQuotesSelected.plan = selectedPlan;
		  
		  // Se elimina del array el elemento desactivado, se utiliza la función 
		  // deepIndexOf para encontrar la posición del arreglo de este elemento
		  this.cotizacionesArray.splice(this.deepIndexOf(this.cotizacionesArray ,automaticQuotesSelected), 1);
		  
		  // Actualiza la propiedad cotizaciones de la clase Request
		  this.dataService.request.cotizaciones_automaticas = this.cotizacionesArray;
		  // Contador disminuye
		  this.cont_cot -= 1;
		  console.log("Cont: " + this.cont_cot);
	  }
  }

  // Muestra la primera fila para agregar una cotización manual
  showManual(){
    this.showManualQuote = true;
  }

  ngOnInit() {

    // No muestra la cotización manual por defecto
    this.showManualQuote = false;

    this.buttonStatus = true;

    // TODO: Parece que esto no se esta usando bien. CP
    this.loading = true;

    // Llamado para poblar la tabla con las cotizaciones dado el id de cotización
    this.getResponseWeb(this.inputs);

    if(this.getResponseWeb){
      // TODO: Parece que esto no se esta usando bien. CP
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
}
