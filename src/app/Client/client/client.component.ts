import { DeleteComponent } from './delete/delete.component';
import { ClientService } from './../../Service/Client/client.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

import * as XLSX from 'xlsx';
import { Client } from 'src/app/Service/Client/client';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  Filter=true;
  Name=false;
  Email=false;
  Phone=false;
  Age=false;
  fileName= 'ExcelSheet.xlsx';

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  Datasource: any =new MatTableDataSource
  displayedColumns: string[] = ['id','Name','Email','Age','Phone' , 'Action']
  constructor( public Service:ClientService, public dialog: MatDialog ) { }

  ngOnInit(): void {
   this.getAllclient()
  }

  AfterViewInit(){
   this.getAllclient()
  }

  getAllclient(){
    this.Service.GetAllClients().subscribe(e => {console.log(e);this.Datasource = new MatTableDataSource(e) ;
      this.Datasource.paginator = this.paginator;
    },er=>{console.log(er)});
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Datasource.filter = filterValue.trim().toLowerCase();
    if (this.Datasource.paginator) {
      this.Datasource.paginator?.firstPage();
    }
  }

  startEdit( Clint_Id:number,Name:string,Email:string, Age:number,Phone?:number){
    const dialogRef = this.dialog.open(EditComponent, {
      data: {Clint_Id: Clint_Id, Name: Name, Email: Email, Age: Age, Phone: Phone}
    });
    dialogRef.afterOpened().subscribe(e=>{this.getAllclient() })

    dialogRef.afterClosed().subscribe(result => {
    this.getAllclient()
   this.ngOnInit()
    });
   this.getAllclient()
   this.ngOnInit()

  }

  addNew() {
    const dialogRef = this.dialog.open(CreateComponent, {
      data: {issue: Client }
    });
   dialogRef.afterOpened().subscribe(e=>{this.getAllclient() })

    dialogRef.afterClosed().subscribe(result => {
    this.getAllclient()
   this.ngOnInit()
    });
   this.getAllclient()
  }

  deleteItem( Clint_Id:number,Name:string,Email:string, Age:number,Phone?:number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {Clint_Id: Clint_Id, Name: Name, Email: Email, Age: Age, Phone: Phone}
    });
    dialogRef.afterOpened().subscribe(e=>{this.getAllclient() })

    dialogRef.afterClosed().subscribe(result => {
    this.getAllclient()
   this.ngOnInit()
    });
   this.getAllclient()
  }


  exportexcel()
  {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  Filters(){
    this.Filter = !this.Filter

    }

    checked(){
    this.Name = !this.Name
    }

    checked2(){
      this.Email = !this.Email
    }

    checked3(){
      this.Age = !this.Age
    }
    checked4(){
      this.Phone = !this.Phone
    }

    Print(){
      window.print()
    }


}
