import { Vehicle } from '../model'
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Config} from '../../configuration/config';
import {Component} from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class VehicleService {
  baseUrl:string=Config.baseUrl+"vehicles"
  publicIP;

  constructor(private http:HttpClient) { 
    // this.http.get('https://api.ipify.org?format=json').subscribe(data => {
    //   this.publicIP=data['ip'];
    // });
  }
  getVehicles(query?:string){
    var userid=localStorage.getItem('userId')
    if(query==""){
      query="undefined"
    }
    return this.http.get<Vehicle[]>(this.baseUrl+ '/'+userid+'/'+query);
  }
  getVehicleById(pId:number){
    localStorage.setItem('pid',pId.toString())
    return this.http.get<Vehicle>(this.baseUrl+ '/' + pId)
  }
  addVehicle(vehicle:Vehicle){
    vehicle.userid=localStorage.getItem('userId')
    return this.http.post(this.baseUrl,vehicle)
  }
  editVehicle(vehicle:Vehicle){
    console.log(vehicle)
    return this.http.put(this.baseUrl + '/' +vehicle.id,vehicle)
  }
  delete(pId: number) {
    return this.http.delete(this.baseUrl + '/' + pId);
  }
  public getIPAddress()  
  {  
    this.http.get('https://api.ipify.org?format=json').subscribe(data => {
      this.publicIP=data['ip'];
    });
  }  
}
