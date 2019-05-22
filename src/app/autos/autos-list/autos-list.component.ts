import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { DataService } from '../../../../../webview/src/app/data.service';
import { Response } from '../autos-classes/response';
import { ResponsePdf } from '../autos-classes/response-pdf';
import { Cotizacion } from '../autos-classes/cotizacion';
import { Plan } from '../autos-classes/plan';
import { Amparo } from '../autos-classes/amparo';
import { Asistencia } from '../autos-classes/asistencia';

import { DataAutomaticRequest } from '../autos-classes/data-automatic-request';
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

  public tableData3: TableData;
  public color:string;
	public inputs:string;
	public auth:string;
	public errores:any;
	@Input() cont_cot: number;
	public manualEnable: boolean;
  public productName = 'autos';
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
  
  

  constructor(private dataService: DataService, private route: ActivatedRoute) {
  
   this.cont_cot = 0;
	 
    this.inputs = this.route.snapshot.params['precotizacion'];
    dataService.request = {
      cotizacion_id: +this.inputs,
      cotizaciones_automaticas: null,
      cotizaciones_manuales: null,
    };

    this.route.queryParamMap.subscribe(params => {      
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

 
	
	getResponseWeb(cotizacion): void {
    this.dataService.getResponseWeb(cotizacion, this.productName)
		.subscribe(response => {
				this.response = response;
        this.data = response.data;
        this.loading=false;
				console.log(this.response.data);
			}			
		);
	}
	
	getResponsePdf(request): void{
    
    
	this.dataService.postQuote(request, this.productName)
			.subscribe(responsepdf => {
				this.responsepdf = responsepdf;				
				this.responsepdf.data = responsepdf.data;				
				if(this.responsepdf.status){
          this.loading=false;
					window.location.href = this.responsepdf.data.internal_message;				
				}	
				else{					
					alert(this.responsepdf.data.internal_message);		
				}
      });
      
     
	}

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
    this.loading=true;
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
    this.loading=true;
    
    // No muestra la cotización manual por defecto
    this.showManualQuote = false;

    this.buttonStatus = true;

    // Llamado para poblar la tabla con las cotizaciones dado el id de cotización
    this.getResponseWeb(this.inputs);   
   

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
