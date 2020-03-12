import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { VehicleService } from '../../service/vehicle.service';
import { Router } from '@angular/router';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { DatepickerOptions } from 'ng2-datepicker';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addForm:FormGroup
  user:string
  message:string
  loading = false;
  error :any={error:''};
  location:string

  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    minDate: new Date(Date.now()), // Minimal selectable date
    maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: true, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };
    public maxDate: Date = new Date ();
  constructor(private currencyPipe : CurrencyPipe,
    private formBuilder:FormBuilder,
    private service:VehicleService,
    private router:Router,private atp: AmazingTimePickerService) {
    this.user=localStorage.getItem('user')
    this.location=localStorage.getItem('location')
   }

  ngOnInit() {
    // this.getIP();
    this.addForm=this.formBuilder.group({
      id:[Math.random().toString(36).substring(2, 15),null],
      name:['',Validators.required],
      watch:[true,null],
      detail:[null,null],
      date:[new Date(),null],
      amountlost:[0,null],
      location:[this.location,null],
      eventno:['',Validators.required],
      time:[null,null]
    })
  }
  getIP()  
  {  
    let ip= this.service.getIPAddress()  
    
      // this.addForm.controls.location.setValue(res.ip);  
    
  }  
  onSubmit(){
    this.loading = true;
    this.service.addVehicle(this.addForm.value)
    .subscribe(data=>{
      this.message=data['name'] +'added'
      this.router.navigate([''])
    },
    error => {
      if(error && error.status==400){
        this.error = error;
      }else{
        this.error={
          error:'some error'
        }
      }
        this.loading = false;
        this.router.navigate(['/login'])
      })
  }
  open(ev: any) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
    });
  }
back(){
  this.router.navigate([''])
  }
  formatMoney(value) {
    const temp = `${value}`.replace(/\,/g, "");
    return this.currencyPipe.transform(temp).replace("$", "");
  }
}
