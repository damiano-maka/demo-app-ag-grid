import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { AsyncPipe } from '@angular/common';
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-theme-quartz.css"
import { BadgeComponent } from './badge/button-grid.component';
import { FlightComponent , MyCellParams } from './button2/button2.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports:[AgGridModule,AsyncPipe,AgGridAngular],
  template:
  `
  <ag-grid-angular
    style="width: 100%; height: 100vh"
    class="ag-theme-quartz-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData$ | async"
    (gridReady)="onGridReady($event)"
    [pagination]="pagination"
    [paginationPageSize]="paginationPageSize"
    [paginationPageSizeSelector]="[20,40]"
    [rowSelection]="'multiple'"
    [rowGroupPanelShow]="'onlyWhenGrouping'"
  ></ag-grid-angular>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  // Enable pagination with a page size of 20.
  pagination = true;  // Set the column to be flexible.
  paginationPageSize = 20; // Set the minimum width of the column.
   
  // Define the default column definition.
  public defaultColDef: ColDef = {
    flex: 1, // Set the column to be flexible.
    minWidth: 100,   // Set the minimum width of the column.
    filter:true,    // Enable filtering for the column.
    floatingFilter:true, // Enable floating filter for the column.
    enableRowGroup:true // Enable row grouping for the column.
  };

  // Define the observable for the row data.
  public rowData$!: Observable<any[]>;

  constructor(private http: HttpClient) {}
  
  // On grid ready, fetch the row data from the API.
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.http
      .get<any[]>("https://demo.angulararchitects.io/api/Passenger");
  }

  // Define the column definitions.
  public columnDefs: ColDef[] = [
    { field: 'id', headerName : "Passenger ID" ,
      checkboxSelection:true,
      flex :0.7,
      valueFormatter: (params) => {
        return " # " + params.data.id
      }
  
  
    },
    { 
      valueGetter: (params) => {
        return params.data.firstName + "   " + params.data.name;
      },
      headerName : "FirstName & Lastname"
    },
    { headerName: 'Miles',
      field: 'bonusMiles',
      cellRenderer: BadgeComponent,
      valueFormatter: (params) => {
        const miles = Number(params.value).toLocaleString('en');
        if (params.value > 400000) {
          return `${miles} Miles   <img src="../assets/badge.png" width="20" height="20" alt="Badge">`;
        } else {
          return `${miles} Miles`;
        }
      }
      ,},
      {
        field: 'passengerStatus' ,
        cellClassRules: {
          'gold-row': params => params.value === 'A',
          'eco-row': params => params.value === 'B',
        },
        valueFormatter: (params) => {
          if (params.value === 'A') {
            return ' Business Class';
          } else if (params.value === 'B') {
            return 'Economy Class';
          } else {
            return 'Status Unknown';
          }
        },
      },{
        field: 'id',
        cellRenderer: 'FlightComponent', 
        cellRendererParams: {
          buttonText: 'Name'
        } as MyCellParams
      }
  ];



}