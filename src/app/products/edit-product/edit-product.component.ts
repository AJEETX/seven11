import { ProductService } from '../../service/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
formEdit:FormGroup
user:string
loading=false
public myDatePickerOptions: IMyDpOptions = {
  dateFormat: 'dd mmm yyyy',
  disableSince:{
    year: new Date().getFullYear(), 
    month: new Date().getMonth(), 
    day: new Date().getDay()}
};
public maxDate: Date = new Date ();

  constructor(private datePipe: DatePipe,private formBuilder:FormBuilder,private service:ProductService,private router:Router) { 
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
      date:[new Date(),null]
    })
    this.service.getProductById(parseInt(pId))
    .subscribe(data=>{
      let currentDate = new DatePipe('en-US').transform(data.date, 'yyyy/MM/dd');
      data.date=new Date(currentDate);
      console.log(currentDate)
      this.formEdit.setValue(data)
      this.formEdit.patchValue({date: {
        date: {
            year: data.date.getFullYear(),
            month: data.date.getMonth() + 1,
            day: data.date.getDate()}
        }});
    })
  }
  onSubmit(){
    this.loading = true;

    this.service.editProduct(this.formEdit.value)
    .subscribe(data=>{
      this.router.navigate([''])
    })
  }
  back(){
    this.router.navigate([''])
  }
}
