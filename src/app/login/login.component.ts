import { AuthService } from './../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
  haserror=false
  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private authservice:AuthService,private spinnerService: Ng4LoadingSpinnerService) { }

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
        this.haserror=false

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.spinnerService.show();
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
                  this.error={
                    error:'Server error'
                  }
                this.loading = false;
                this.spinnerService.hide();
                this.haserror=true
              });
    }
}
