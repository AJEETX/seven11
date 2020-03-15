import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { VehicleService } from '../../service/vehicle.service';
import { Router } from '@angular/router';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { DatepickerOptions } from 'ng2-datepicker';
import { CurrencyPipe } from '@angular/common';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addForm:FormGroup
  submitted=false
  user:string
  userId:string
  message:string
  loading = false;
  error :any={error:''};
  haserror=false
  location:string
  public keyword = 'name';
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
    private router:Router,private atp: AmazingTimePickerService,
    private spinnerService: Ng4LoadingSpinnerService) {
      if(localStorage.getItem('user')){
        this.user=localStorage.getItem('user')
        this.location=localStorage.getItem('location')
        if(localStorage.getItem('userId'))
        this.userId=localStorage.getItem('userId')
        this.spinnerService.hide()
          this.addForm=this.formBuilder.group({
            id:[Math.random().toString(36).substring(2, 15),null],
            name:['',Validators.required],
            watch:[true,null],
            detail:[null,null],
            date:[new Date(),null],
            amountlost:[0,null],
            location: [this.location, Validators.required],
            eventno:['',Validators.required],
            time:[null,null],
            userId:[this.userId]
          })
    }else{
      this.router.navigate(['/login']);
    }
   }

  ngOnInit() {
    this.getIP()
  }
  public locations=[
    {
      id: 1,
      name: 'Charlestown',
    },
    {
      id: 2,
      name: 'New Castle',
    }
  ];
    selectEvent(item) {
      this.addForm.controls.location.setValue(item.name);
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }
  getIP()  
  {  
    let ip= this.service.getIPAddress()  
    // this.addForm.controls.location.setValue(res.ip);  
  }  
  onSubmit(){
    this.loading = true;
    this.submitted=true;
    this.haserror=false
    this.spinnerService.show();
    if(this.addForm.invalid)
    return;
    this.addForm.controls.location.setValue(this.addForm.controls.location.value.name)
    this.service.addVehicle(this.addForm.value)
    .subscribe(data=>{
      this.spinnerService.hide()
      this.message=data['name'] +'added'
      this.submitted=false;
      this.router.navigate([''])
    },
    error => {
      if(error && error.status==401){
        this.router.navigate(['/login'])
        this.error = error;
      }else{
        this.error={
          error:'Server error'
        }
        this.haserror=true
        this.loading = false;
        this.spinnerService.hide()
      }
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
