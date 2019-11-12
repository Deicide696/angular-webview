import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appQuote]'
})
export class QuoteDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
