
import { CallComponent } from './Calls/call/call.component';
import { ClientComponent } from './Client/client/client.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './Calls/call/create/create.component';

const routes: Routes = [
  {path:"",component:ClientComponent},

  {path:"home",component:ClientComponent},
  {path:"home/calls/:id",component:CallComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
