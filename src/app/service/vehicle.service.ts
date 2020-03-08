import { Vehicle } from '../product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Config} from '../../configuration/config';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  baseUrl:string=Config.baseUrl+"vehicles"
  constructor(private http:HttpClient) { }
  getVehicles(query?:string){
    return this.http.get<Vehicle[]>(this.baseUrl+ '?q='+query);
  }
  getVehicleById(pId:number){
    localStorage.setItem('pid',pId.toString())
    return this.http.get<Vehicle>(this.baseUrl+ '/' + pId)
  }
  addVehicle(vehicle:Vehicle){
    return this.http.post(this.baseUrl,vehicle)
  }
  editVehicle(vehicle:Vehicle){
    console.log(vehicle)
    return this.http.put(this.baseUrl + '/' +vehicle.id,vehicle)
  }
  delete(pId: number) {
    return this.http.delete(this.baseUrl + '/' + pId);
  }
}
