import { CallService } from './../../../Service/Calls/call.service';
import { ClientService } from './../../../Service/Client/client.service';
import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: CallService  , public ar:ActivatedRoute) { }
  ngOnInit(): void {

      console.log(this.data.Client_Id );

  }



  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



  public confirmAdd(): void {
    this.dataService.addCall(this.data).subscribe(e=>{console.log("Aaaaaa") },er=>{console.log(er)});
    this.dialogRef.close();

  }





}
