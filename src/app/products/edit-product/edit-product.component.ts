import { ProductService } from '../../service/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
formEdit:FormGroup
user:string
loading=false
public maxDate: Date = new Date ();

  constructor(private formBuilder:FormBuilder,private service:ProductService,private router:Router) { 
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
    this.service.getProductById(parseInt(pId))
    .subscribe(data=>{
      this.formEdit.setValue(data)
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
