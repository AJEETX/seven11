import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit,ViewChild } from '@angular/core';
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
  location=''
  haserror=false
  error :any={error:''};
  @ViewChild('auto') auto;

  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, 
    private router: Router,private spinnerService: Ng4LoadingSpinnerService,
    private authservice:AuthService) { 
      this.registerForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        location: [null, Validators.required]
      });
    }
  ngOnInit() {
    this.authservice.logout();
  }
    get f() { return this.registerForm.controls; }
    onSubmit() {
      this.submitted = true;
      this.haserror=false

      if (this.registerForm.invalid) {
          return;
      }
      this.spinnerService.show()
      this.loading = true;
     this.authservice.register(this.f.firstname.value,this.f.lastname.value,this.f.username.value, this.f.location.value.name,
      this.f.password.value)
      .subscribe(data=>{
        console.log(data)
        this.spinnerService.hide()
        this.router.navigate(['login'])
      },
      error=>{
        if(error && error.status==401){
          this.error = error;
        }else{
          this.error={
            error:'Server error'
          }
          this.haserror=true
        }
        this.submitted = false;
        this.spinnerService.hide()
        this.loading = false;
    })
    }
    keyword = 'name';
    public states = [
      {
        id: 1,
        name: 'ACT',
      },
      {
        id: 2,
        name: 'NSW',
      },
      {
        id: 3,
        name: 'VIC',
      },
      {
        id: 4,
        name: 'QLD',
      },
      {
        id: 5,
        name: 'SA',
      },
      {
        id: 6,
        name: 'WA',
      },
      {
        id: 7,
        name: 'NT',
      },
      {
        id: 8,
        name: 'TAS',
      }
    ];
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
        this.registerForm.controls.location.setValue(item.name);
    }
  
    onChangeSearch(search: string) {
      // fetch remote data from here
      // And reassign the 'data' which is binded to 'data' property.
    }
  
    onFocused(e) {
      // do something
    }

  }
