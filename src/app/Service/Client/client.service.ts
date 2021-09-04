import { Client } from './client';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public http:HttpClient ) { }
  baseurl="https://localhost:44309/api"


  dataChange: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);



  GetAllClients(){
    return this.http.get<Client[]>(this.baseurl+"/Clients")
  }

  addClient(body:any){
    return this.http.post<Client>(this.baseurl+"/Clients/",body)
  }

  getCallById(i:number){

    return this.http.get<Client>(this.baseurl+"/Clients/"+i)
  }

  editClient(edit:Client){
    return this.http.put(this.baseurl+"/Clients/"+edit.Clint_Id,edit)
  }


  deleteClient(i:number){
    return this.http.delete(this.baseurl+"/Clients/"+i)
  }
}
