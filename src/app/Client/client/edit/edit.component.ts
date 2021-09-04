import { ClientService } from './../../../Service/Client/client.service';
import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: ClientService) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);


  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.editClient(this.data).subscribe(e=>{console.log(e)},er=>{console.log(er)});
    this.dataService.GetAllClients().subscribe(e=>e);
    this.dialogRef.close();

  }

}
