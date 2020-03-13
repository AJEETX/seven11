import { AuthService } from './../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loading = false;
  submitted = false;
  returnUrl: string;
  error :any={error:''};
  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private authservice:AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  this.authservice.logout();

  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authservice.login(this.f.username.value, this.f.password.value)
          .subscribe( data => {
            if(this.authservice.loggedIn())
            {
                this.router.navigate([this.returnUrl]);
            }
            else{
              this.router.navigate(['login']);
            }
              },
              error => {
                if(error && error.status==400){
                  this.error = error;
                }else{
                  this.error={
                    error:'Server error'
                  }
                }
                  this.loading = false;
              });
    }
}
