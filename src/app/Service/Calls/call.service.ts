import { Call } from './call';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(public http:HttpClient  ) { }
  baseurl="https://localhost:44309/api"

  GetAllCalls(){
    return this.http.get<Call[]>(this.baseurl+"/Calls")
  }
  GetAllCustomerCalls(id:number){
    return this.http.get<Call[]>(this.baseurl+"/Calls/GetCallsClients/"+id)
  }

  addCall(body:any){

    return this.http.post<Call>(this.baseurl+"/Calls",body)
  }
  getCallById(i:number,id:number){
    return this.http.get<Call>(this.baseurl+"/Calls/"+i+"/"+id)
  }

  editCall(edit:Call){
    return this.http.put(this.baseurl+"/Calls/"+edit.Call_Id,edit)
  }


  deleteCall(i:number,id:number){
    return this.http.delete(this.baseurl+"/Calls/"+i+"/"+id)
  }
}
