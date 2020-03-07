import { AuthService } from './service/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { ProductService } from './service/product.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing} from './app.routing'
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth/intercept';
import { UserComponent } from './user/user/user.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {DisableControlDirective} from './DisableControlDirective'
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListComponent,
    EditProductComponent,
    AddProductComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    DisableControlDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    ReactiveFormsModule,
    AmazingTimePickerModule,
    Ng2OrderModule,
    NgxPaginationModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ProductService,AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
