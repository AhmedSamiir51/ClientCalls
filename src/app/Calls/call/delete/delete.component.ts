import { CallService } from './../../../Service/Calls/call.service';
import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,@Inject(MAT_DIALOG_DATA) public data: any, public dataService: CallService) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteCall(this.data.Call_Id,this.data.Client_Id).subscribe(e=>{console.log(e)},er=>{console.log(er)});
    this.dialogRef.close();

  }


}
