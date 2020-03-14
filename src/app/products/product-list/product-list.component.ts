import { VehicleService } from '../../service/vehicle.service';
import { Vehicle } from '../../model';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:Vehicle[]
  user:string
  userId:string
  admin:boolean
  loading=false
  error :any={error:''};

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

  constructor(private router:Router, private service:VehicleService,private spinnerService: Ng4LoadingSpinnerService) {
    if(localStorage.getItem('user')){
      this.loading=true
      this.spinnerService.show();
     this.user=localStorage.getItem('user')
      if(localStorage.getItem('userId'))
      this.userId=localStorage.getItem('userId')
      this.service.getVehicles()
      .subscribe(data=>{
          this.products=data
          this.loading=false
          this.spinnerService.hide()
      })     
    }
    else{
      this.router.navigate(['/login']);
    }
   }
  ngOnInit() {
    this.loading=true
    this.spinnerService.show();
    this.searchField = new FormControl()
    this.searchField.valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe(term => {
    this.spinnerService.show();
    this.service.getVehicles(term)
      .subscribe(data=>{
        console.log(data)
        this.loading=false
        this.spinnerService.hide()
        this.products=data
      })
    });
  }
  addProduct():void{
    this.loading=true
    this.spinnerService.show();
    this.router.navigate(['add-vehicle'])
  }
  editProduct(product: Vehicle): void {
    this.loading=true
    this.spinnerService.show();
    localStorage.removeItem("pid");
    localStorage.setItem("pid", product.pId.toString());
    this.router.navigate(['edit-vehicle']);
  };
  deleteProduct(product: Vehicle): void {
    this.loading=true
    this.spinnerService.show();

    this.service.delete(product.pId)
      .subscribe( data => {
      this.loading=false
    this.spinnerService.hide();
    this.products = this.products.filter(u => u !== product);
      },
      error => {
        if(error && error.status==400){
          this.error = error;
        }else{
          this.error={
            error:'Server error'
          }
        }
          this.loading = false;
          this.spinnerService.hide();
          this.router.navigate(['/login']);
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
