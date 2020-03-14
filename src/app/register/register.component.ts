import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  loading = false;
  submitted = false;
  error :any={error:''};
  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, 
    private router: Router,private spinnerService: Ng4LoadingSpinnerService,
    private authservice:AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      location: ['', Validators.required],
      state:['',null]
    });
  this.authservice.logout();
  }
    get f() { return this.registerForm.controls; }
    onSubmit() {
      this.submitted = true;

      if (this.registerForm.invalid) {
          return;
      }
      this.spinnerService.show()
      this.loading = true;
     this.authservice.register(this.f.firstname.value,this.f.lastname.value,this.f.username.value, this.f.location.value,
      this.f.password.value)
      .subscribe(data=>{
        console.log(data)
        this.spinnerService.hide()
        this.router.navigate(['login'])
      },
      error=>{
        if(error && error.status==400){
          this.error = error;
        }else{
          this.error={
            error:'Server error'
          }
        }
        this.submitted = false;
        this.spinnerService.hide()
        this.loading = false;
    })
    }
    keyword = 'name';
    public countries = [
      {
        id: 1,
        name: 'Albania',
      },
      {
        id: 2,
        name: 'Belgium',
      },
      {
        id: 3,
        name: 'Denmark',
      },
      {
        id: 4,
        name: 'Montenegro',
      },
      {
        id: 5,
        name: 'Turkey',
      },
      {
        id: 6,
        name: 'Ukraine',
      },
      {
        id: 7,
        name: 'Macedonia',
      },
      {
        id: 8,
        name: 'Slovenia',
      },
      {
        id: 9,
        name: 'Georgia',
      },
      {
        id: 10,
        name: 'India',
      },
      {
        id: 11,
        name: 'Russia',
      },
      {
        id: 12,
        name: 'Switzerland',
      }
    ];
      selectEvent(item) {
      // do something with selected item
    }
  
    onChangeSearch(search: string) {
      // fetch remote data from here
      // And reassign the 'data' which is binded to 'data' property.
    }
  
    onFocused(e) {
      // do something
    }

  }
