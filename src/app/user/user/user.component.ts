import { User } from '../../model';
import { AuthService } from './../../service/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {DisableControlDirective} from '../../DisableControlDirective'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
userForm:FormGroup
user:string
loading = false;
submitted = false;
userdisabled=true;
username:string
keyword = 'name';
location=''

disableControl:DisableControlDirective
error = '';
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, 
    private router: Router,private spinnerService: Ng4LoadingSpinnerService,
    private authservice:AuthService) { 
      this.userForm = this.formBuilder.group({
        id:[],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', Validators.required],
        location: ['', Validators.required]
    });
    if(localStorage.getItem('user') && localStorage.getItem('username'))
    this.user=localStorage.getItem('user')
    this.spinnerService.show();
    this.username=localStorage.getItem('username')
      this.authservice.getUserById()
       .subscribe(data=>{
         this.userForm.setValue(data)
         this.spinnerService.hide()
       },
       error=>{
         this.error=error
       })
    }
  ngOnInit() {
  }
  get f() { return this.userForm.controls; }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.spinnerService.show();
    this.userForm.controls.location.setValue(this.userForm.controls.location.value.name)
    this.authservice.update(this.userForm.value)
    .subscribe(data=>{
    this.spinnerService.hide();

      this.router.navigate([''])
    })
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
      this.userForm.controls.location.setValue(item.name);
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }
}
