import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-html-cell-renderer',
  template: `
    <span [innerHTML]="value"></span>
  `,
})
export class BadgeComponent implements ICellRendererAngularComp {
  value: string;

  agInit(params: any): void {
    this.value = params.valueFormatted || params.value;
  }

  refresh(params: any): boolean {
    this.value = params.valueFormatted || params.value;
    return true;
  }
}
