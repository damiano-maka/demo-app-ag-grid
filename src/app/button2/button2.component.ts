import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  template: `
    <button (click)="onClick($event)" >{{buttonText}}</button> {{value}}
  `,
})
export class FlightComponent implements ICellRendererAngularComp {
  value: any;
  buttonText: string = 'Default';

  agInit(params: ICellRendererParams & MyCellParams): void {
    this.value = params.value
   this.buttonText = params.buttonText ?? 'Default';
  }

  refresh(params: ICellRendererParams & MyCellParams): boolean {
    return false;
  }

  onClick(event: any){
    alert('Cell value is ' + this.value);
  }


}

export interface MyCellParams {
  buttonText?: string;
}