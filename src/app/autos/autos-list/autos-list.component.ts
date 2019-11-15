import {Component, OnInit, ViewChild, Input, ComponentFactoryResolver, ViewContainerRef, AfterViewInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { DataService } from '../../../../../webview/src/app/data.service';
import { Response } from '../autos-classes/response';
import { ResponsePdf } from '../autos-classes/response-pdf';
import { Cotizacion } from '../autos-classes/cotizacion';
import { Plan } from '../autos-classes/plan';
import { Amparo } from '../autos-classes/amparo';
import { Asistencia } from '../autos-classes/asistencia';

import { DataAutomaticRequest } from '../autos-classes/data-automatic-request';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import {Aseguradora} from '../autos-classes/aseguradora';
import {QuoteDirective} from '../quote.directive';
import {AutosRowListComponent} from '../autos-row-list/autos-row-list.component';


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

export class AutosListComponent implements OnInit, AfterViewInit {

    // @ViewChild('quote', {read: ViewContainerRef, static: true}) quote;
    @ViewChild(QuoteDirective, {static: true}) eldinamico: QuoteDirective;

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
	data: Cotizacion = null;
	typeplan: Plan;
	amparos: Amparo;
	asistencia: Asistencia;
	buttonStatus: boolean;
	loading: boolean;
	cotizacionesArray = [];
	public token: string;
    messages: string[] = [];
    public getQuotes = () => {
        return Observable.create((observer) => {
            this.socket.on('data', (message) => {
                observer.next(message);
            });
        });
    }
    private url = 'http://54.173.12.255:8201/';
    private socket;

    constructor(private dataService: DataService, private route: ActivatedRoute, private cfr: ComponentFactoryResolver) {

        this.socket = io(this.url + this.route.snapshot.params['precotizacion']);

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

            this.token = this.errores.params.token;

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

	getResponsePdf(request): void{


	this.dataService.postQuote(request, this.productName)
			.subscribe(responsepdf => {
				this.responsepdf = responsepdf;
				this.responsepdf.data = responsepdf.data;
				if(this.responsepdf.status){
					window.location.href = this.responsepdf.data.internal_message;
				}
				else{
					alert(this.responsepdf.data.internal_message);
				}
      });


	}

  /**
   *
   * @param selectedId: Id de la aseguradora
   * @param selectedPlan: Id del plan de la aseguradora elegido
   * @param element: Cotización elegida
   * @constructor
   */
  Selected(selectedId, selectedPlan, element) {

    let automaticQuotesSelected = {} as DataAutomaticRequest;
    //obtiene el id del check seleccionado
    let row_id=element.attributes.id.nodeValue
    //obtiene la cotizacion seleccionada
    let row= document.getElementById("row_"+row_id);
	  // Valida si el checkbox ha sido activado
	  if(element.checked == true){
      //Aplica estilo fila seleccionada
      row.className="selected_row";
		  // Asigna el valor de las propiedades de DataRequest {Aseguradora, Plan}, con los parametros de esta función.
		  automaticQuotesSelected.id = selectedId;
		  automaticQuotesSelected.plan = selectedPlan;

		  // Inserta cotizacion seleccionada en el array de cotizaciones
		  this.cotizacionesArray.push(automaticQuotesSelected);
		  // Actualiza la propiedad cotizaciones de la clase Request con la cotización seleccionada.
      this.dataService.request.cotizaciones_automaticas = this.cotizacionesArray;
		  // Contador aumenta
		  this.cont_cot += 1;
	  }
    else { // Si se desactiva el checkbox
      //Aplica estilo fila desseleccionada
      row.className="unselect_row";
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
    }
    console.log("Cont final: " + this.cont_cot);
    if(this.cont_cot>=10){
    alert("Ha alcanzado el limite de cotizaciones");
    element.checked=false;
    row.className="unselect_row";
    this.cont_cot -= 1;
    }

  }

    // Muestra la primera fila para agregar una cotización manual
    showManual() {
        this.showManualQuote = true;
    }

    ngOnInit() {

        this.loading=true;

        // No muestra la cotización manual por defecto
        this.showManualQuote = false;

        this.buttonStatus = true;

        // // Llamado para poblar la tabla con las cotizaciones dado el id de cotización
        // this.getResponseWeb(this.inputs);
        //
        //
        // this.tableData3 = {
        //   headerRow: [ 'Daños a Terceros', 'Pérdidas Totales', 'Pérdidas Parciales', 'Conductor Elegido',
        //     'Carro Taller / GRUA', 'Gastos de Transporte Perdida Total', 'Vehículo Reemplazo Totales / Parciales', 'Accidentes Personales', 'Prima'],
        //   dataRows: [
        //     ['https://s3.amazonaws.com/dev.vivoo/img/logos_aseguradoras/sbs.jpg', '3.000', 'by Saint Laurent', 'Black', '5 Servicios', '5 Servicios / 330 Km', '1.999.999', '3390'],
        //     ['logo-allianz.png', '800',  'by Balmain', 'Black', 'M', '499', '2', '998'],
        //     ['logo-axa.jpeg', '1.000', 'by Prada', 'Red', 'M', '200', '1', '200']
        //   ]
        // };

        let cf = this.cfr.resolveComponentFactory(AutosRowListComponent);
        let vcr = this.eldinamico.viewContainerRef;
        vcr.createComponent(cf, 0);

        this.loading = false;

        // this.getQuotes()
        // .subscribe((message: string) => {
        //     this.messages.push(message);
        //     this.loading = false;
        //     console.log(this.messages);
        // });

        // // Testing code
        // this.cont_cot += 5;
        //
        // let nInsurance = new Aseguradora;
        //
        // nInsurance.aseguradora_id = 12;
        // nInsurance.logo = 'https://s3.amazonaws.com/vivoo/img/logos_aseguradoras/sbs.jpg';
        // nInsurance.statusinsurance = true;
        // nInsurance.name = 'ACE';
        //
        // let nPlan = new Plan;
        //
        // nPlan.plan_name = 'Plan CP';
        // nPlan.prima_total = '66666';
        // nPlan.limite = 2040000000;
        // nPlan.limitedbt = 3040000000;
        // nPlan.limitemup = 4040000000;
        // nPlan.limitemdp = 0;
        //
        // console.log(nPlan);
        //
        // nInsurance.typeplan.push(nPlan);
        //
        // this.data.insurances.push(nInsurance);
        //
        // console.log('data.insurances');
        // console.log(this.data.insurances);
  }

    ngAfterViewInit() {
        let cf = this.cfr.resolveComponentFactory(AutosRowListComponent);
        let vcr = this.eldinamico.viewContainerRef;
        vcr.createComponent(cf, 0);
    }

  // otroDinamico(){
  //     let componentFactory = this.componentFactoryResolver.resolveComponentFactory(AutosRowListComponent);
  //     // let viewContainerRef = this.quote.viewContainerRef;
  //     // viewContainerRef.clear();
  //     // viewContainerRef.createComponent(componentFactory);
  //     this.quote.createComponent(componentFactory);
  //     this.quote.changeDetectorRef.detectChanges();
  // }

    // componenteDinamico() {
    //     let cf = this.componentFactoryResolver.resolveComponentFactory(AutosRowListComponent);
    //     let vcr = this.quote.viewContainerRef;
    //     vcr.createComponent(cf, 0);
    // }

    componenteDinamico(mensaje: string, color: string) {
        let cf = this.cfr.resolveComponentFactory(AutosRowListComponent);
        let vcr = this.eldinamico.viewContainerRef;
        vcr.createComponent(cf, 0);
    }
}
