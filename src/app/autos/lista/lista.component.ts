import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {QuoteDirective} from '../quote.directive';
import {AutosRowListComponent} from '../autos-row-list/autos-row-list.component';

import * as io from 'socket.io-client';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Cotizacion} from '../autos-classes/cotizacion';
import {ListaService} from './lista.service';
import {DataService} from '../../data.service';
import {ResponsePdf} from '../autos-classes/response-pdf';

@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

    @ViewChild(QuoteDirective, {static: true}) eldinamico: QuoteDirective;
    public display: string = 'none';
    public displayButton: string = 'none';
    response: Cotizacion;
    cotizacionesArray = [];
    responsepdf: ResponsePdf;
    public errores:any;
    getQuotes = () => {

        return Observable.create((observer) => {
            this.socket.on('data', (quote) => {

                // Variables para visualización de la interfaz
                this.loading = false;
                this.display = 'block';
                this.displayButton = 'inline-table';

                observer.next(quote);
            });
        });
    }
    private socket;
    private url = 'http://localhost:3000/';
    private loading: boolean = true;

    constructor(private route: ActivatedRoute, private cfr: ComponentFactoryResolver,
                private listaService: ListaService, private dataService: DataService) {

        this.socket = io(this.url + this.route.snapshot.params['precotizacion']);

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

            // this.token = this.errores.params.token;

            dataService.auth = this.errores.params.auth;
            dataService.partner = this.errores.params.partner_id;

            this.errores = mensaje_errores;
        });
    }

    ngOnInit() {

        this.getQuotes()
            .subscribe((newQuote: Cotizacion) => {
                this.response = newQuote;
                console.log(newQuote);
                this.addNewQuote(this.response);
            });

        this.listaService.clickableQuote.subscribe(quoteInfo => {

            if(quoteInfo.checked === true)
            {
                this.cotizacionesArray.push(quoteInfo.quote);
                console.log(this.cotizacionesArray);
            }

        });
    }

    addNewQuote(newQuote) {

        let cf = this.cfr.resolveComponentFactory(AutosRowListComponent);
        let vcr = this.eldinamico.viewContainerRef;
        let dynamicComponent = vcr.createComponent(cf, 0).instance;

        dynamicComponent.quote = newQuote;
    }

    sendRequest()
    {
        this.loading = true;
        this.getResponsePdf(this.dataService.request);
    }

    getResponsePdf(request): void
    {
        this.dataService.newPostQuote(request)
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
}
