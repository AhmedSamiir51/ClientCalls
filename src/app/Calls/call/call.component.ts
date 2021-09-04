import { CallService } from './../../Service/Calls/call.service';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {
  Filter=true;
  phoneNumber=false;
  call_To=false;
  Date_Call=false;
  listss: any =new MatTableDataSource
  displayedColumns: string[] = ['PhoneNumber','Call_To','Date_Call','Action']
  fileName= 'ExcelSheet.xlsx';

 @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor( public service:CallService , public ar:ActivatedRoute, public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.refresh()
  }

  refresh() {
    this.service.GetAllCustomerCalls(this.ar.snapshot.params["id"]).subscribe(e=>{console.log(e);this.listss = new MatTableDataSource(e) ;
    this.listss.paginator = this.paginator;},er=>{console.log(er)})
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listss.filter = filterValue.trim().toLowerCase();
    if (this.listss?.paginator) {
      this.listss.paginator?.firstPage();
    }
  }

  startEdit( Call_Id:number,Client_Id:number,PhoneNumber:string,Call_To:string, Date_Call:Date){
    const dialogRef = this.dialog.open(EditComponent, {
      data: {Call_Id: Call_Id, Client_Id: Client_Id, PhoneNumber: PhoneNumber, Call_To: Call_To, Date_Call: Date_Call}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
      this.ngOnInit()
    });
    this.ngOnInit()
    this.refresh();
  }

  addNew(Call_Id?:number,Client_Id?:number,PhoneNumber?:string,Call_To?:string, Date_Call?:Date) {
    Client_Id=this.ar.snapshot.params["id"]
    const dialogRef = this.dialog.open(CreateComponent, {
      data: {Call_Id: Call_Id, Client_Id: Client_Id, PhoneNumber: PhoneNumber, Call_To: Call_To, Date_Call: Date_Call}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
      this.ngOnInit()
    });
    this.ngOnInit()
    this.refresh();
  }

  deleteItem( Call_Id:number,Client_Id:number,PhoneNumber:string,Call_To:string, Date_Call:Date) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {Call_Id: Call_Id, Client_Id: Client_Id, PhoneNumber: PhoneNumber, Call_To: Call_To, Date_Call: Date_Call}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
      this.ngOnInit()
    });
    this.ngOnInit()
    this.refresh();
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

  Print(){
    window.print();
  }

  checked(){
    this.phoneNumber = !this.phoneNumber
  }

  checked2(){
    this.call_To = !this.call_To
  }

  checked3(){
    this.Date_Call = !this.Date_Call
  }

}
