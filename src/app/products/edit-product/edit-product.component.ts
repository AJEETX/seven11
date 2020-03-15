import { VehicleService } from '../../service/vehicle.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DatepickerOptions } from 'ng2-datepicker';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
formEdit:FormGroup
user:string
userId:string
loading=false
haserror=false
submitted=false
error :any={error:''};
keyword = 'name';
location:string

options: DatepickerOptions = {
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
  useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
};
public maxDate: Date = new Date ();

  constructor(private datePipe: DatePipe,private formBuilder:FormBuilder,
    private service:VehicleService,private router:Router,
    private spinnerService: Ng4LoadingSpinnerService) { 
      if(localStorage.getItem('user')){
        this.user=localStorage.getItem('user')
        if(localStorage.getItem('userId'))
        this.userId=localStorage.getItem('userId')
        if(localStorage.getItem('location'))
        this.location=localStorage.getItem('location')
      }else{
      this.router.navigate(['/login']);
      }
  }
  ngOnInit() {
    let pId= localStorage.getItem('pid')
    this.formEdit=this.formBuilder.group({
      pId:pId,
      id:[null,null],
      name:['',Validators.required],
      watch:[false,null],
      detail:[null,null],
      time:[null,null],
      amountlost:[0,null],
      location:[this.location,Validators.required],
      eventNo:['',Validators.required],
      date:[null,null],
      userId:[this.userId]
    })
    this.spinnerService.show()
    this.service.getVehicleById(parseInt(pId))
    .subscribe(data=>{
      this.spinnerService.hide()
      let currentDate = new DatePipe('en-US').transform(data.date, 'yyyy/MM/dd');
      console.log(currentDate)
      data.date=new Date(currentDate);
      console.log(data.date)
      this.formEdit.setValue(data)
    },
    error => {
      if(error && error.status==401){
        this.error = error;
        this.router.navigate(['/login']);
      }else{
        this.error={
          error:'Server error'
        }
        this.haserror=true
      }
        this.loading = false;
        this.spinnerService.hide();
    }) 
  }
  onSubmit(){
    this.loading = true;
    this.submitted=true;
    this.haserror=false
    this.spinnerService.show();
    if(this.formEdit.invalid)
      return;
    this.formEdit.controls.location.setValue(this.formEdit.controls.location.value.name)

    this.service.editVehicle(this.formEdit.value)
    .subscribe(data=>{
      this.loading = false;
        this.spinnerService.hide()
        this.router.navigate([''])
    },
    error => {
      this.loading = false;
      this.spinnerService.hide()
      if(error && error.status==401){
        this.error = error;
        this.router.navigate(['/login']);
      }else{
        this.error={
          error:'Server error'
        }
          this.haserror=true
        }
      });
  }
  back(){
    this.router.navigate([''])
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
      this.formEdit.controls.location.setValue(item.name);
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }
}
