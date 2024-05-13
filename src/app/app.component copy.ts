import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"
import "ag-grid-community/styles/ag-theme-material.css"
import { ButtonGridComponent } from './badge/button-grid.component';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AgGridAngular,ButtonGridComponent,JsonPipe],
  template:
`
  <ag-grid-angular 
    class="ag-theme-quartz"
    style="height: 500px;"
    [rowData]="rowData"
    [columnDefs]="colDefs"
    [defaultColDef]="defaultColDef"
    [rowSelection]="'multiple'"
    [pagination]="pagination"
    [paginationPageSize]="paginationPageSize"
    [paginationPageSizeSelector]="[10,20]"
    [rowClassRules]="rowClassRules"
    >
  </ag-grid-angular>
`,
  styleUrl: './app.component.css'
})
export class AppComponent {
 // Row Data: The data to be displayed.
 pagination = true;
 paginationPageSize = 10;

 rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
    { make: "Vauxhall", model: "Corsa", price: 18460, electric: false },
    { make: "Volvo", model: "EX30", price: 33795, electric: true },
    { make: "Mercedes", model: "Maybach", price: 175720, electric: false },
    { make: "Vauxhall", model: "Astra", price: 25795, electric: false },
    { make: "Fiat", model: "Panda", price: 13724, electric: false },
    { make: "Jaguar", model: "I-PACE", price: 69425, electric: true },
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
    { make: "Vauxhall", model: "Corsa", price: 18460, electric: false },
    { make: "Volvo", model: "EX30", price: 33795, electric: true },
    { make: "Mercedes", model: "Maybach", price: 175720, electric: false },
    { make: "Vauxhall", model: "Astra", price: 25795, electric: false },
    { make: "Fiat", model: "Panda", price: 13724, electric: false },
    { make: "Jaguar", model: "I-PACE", price: 69425, electric: true },
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
    { make: "Vauxhall", model: "Corsa", price: 18460, electric: false },
    { make: "Volvo", model: "EX30", price: 33795, electric: true },
    { make: "Mercedes", model: "Maybach", price: 175720, electric: false },
    { make: "Vauxhall", model: "Astra", price: 25795, electric: false },
    { make: "Fiat", model: "Panda", price: 13724, electric: false },
    { make: "Jaguar", model: "I-PACE", price: 69425, electric: true },
 
];

// Column Definitions: Defines the columns to be displayed.
colDefs: ColDef[] = [
  { field:"make",
  checkboxSelection:true,
  },
  { field: "model" },
  { field: "price",
   valueFormatter: (p : any) => '$' + p.value.toLocaleString(),
   cellClassRules:{
    "green-row" : p => p.value > 30000,
   }
  },
  { field: "electric"}
];

defaultColDef: ColDef = {
  flex: 1,
  minWidth: 100,
  filter:true,
  floatingFilter:true,
  editable:true,
};


rowClassRules = {
  "red-row": (p:any) => p.data.make == 'Toyota',
}
}


