import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private authservice:AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      location: ['', Validators.required]
    });
  this.authservice.logout();
  }
    get f() { return this.registerForm.controls; }
    onSubmit() {
      this.submitted = true;

      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
     this.authservice.register(this.f.firstname.value,this.f.lastname.value,this.f.username.value, this.f.location.value,
      this.f.password.value)
      .subscribe(data=>{
        console.log(data)
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
        this.loading = false;
    })
    }
}
