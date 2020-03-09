import { VehicleService } from '../../service/vehicle.service';
import { Vehicle } from './../../product';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:Vehicle[]
  user:string
  admin:boolean
  loading=false
  error=''
  searchField: FormControl
  searches: string[] = [];
  colordanger:'red'
  colornormal:'black'
    //sorting
    key: string = 'name'; //set default
    reverse: boolean = false;
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
  p: number = 1;

  constructor(private router:Router, private service:VehicleService) {
    this.loading=true

    if(localStorage.getItem('user'))
    this.user=localStorage.getItem('user')
    this.service.getVehicles()
    .subscribe(data=>{
        this.products=data
        this.loading=false

    })
   }
  ngOnInit() {
    this.loading=true
    this.searchField = new FormControl()
    this.searchField.valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe(term => {
      this.service.getVehicles(term)
      .subscribe(data=>{
        console.log(data)
        this.loading=false
        this.products=data
      })
    });
  }
  addProduct():void{
    this.loading=true
    this.router.navigate(['add-product'])
  }
  editProduct(product: Vehicle): void {
    this.loading=true
    localStorage.removeItem("pid");
    localStorage.setItem("pid", product.pId.toString());
    this.router.navigate(['edit-product']);
  };
  deleteProduct(product: Vehicle): void {
    this.loading=true

    this.service.delete(product.pId)
      .subscribe( data => {
      this.loading=false
        this.products = this.products.filter(u => u !== product);
      },
      error => {
          this.error = error;
          this.loading = false;
      })
  };
  getUserDetail(){
    var id=localStorage.getItem('id')
    this.router.navigate(['/user']);
  }
  setMyStyles(product) {
    let styles = {
      'color': product.watch ? 'white' : 'black',
      'font-size': '.8em',
      'background-color':product.watch ?'red':'white'
    };
    return styles;
  }
}
