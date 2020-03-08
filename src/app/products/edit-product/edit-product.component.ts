import { VehicleService } from '../../service/vehicle.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
formEdit:FormGroup
user:string
loading=false
error = '';

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

  constructor(private datePipe: DatePipe,private formBuilder:FormBuilder,private service:VehicleService,private router:Router) { 
    this.user=localStorage.getItem('user')
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
      amountlost:[null,null],
      location:[null,null],
      eventNo:['',Validators.required],
      date:[null,null]
    })
    this.service.getVehicleById(parseInt(pId))
    .subscribe(data=>{
      let currentDate = new DatePipe('en-US').transform(data.date, 'yyyy/MM/dd');
      console.log(currentDate)
      data.date=new Date(currentDate);
      console.log(data.date)
      this.formEdit.setValue(data)
    })
  }
  onSubmit(){
    this.loading = true;
    if(this.formEdit.invalid)
      return;
    this.service.editVehicle(this.formEdit.value)
    .subscribe(data=>{
      this.loading = false;
      this.router.navigate([''])
    },
    error => {
        this.error = error;
        this.loading = false;
    });
  }
  back(){
    this.router.navigate([''])
  }
}
