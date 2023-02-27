import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './materials/materials.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { DescriptionProductsComponent } from './description-products/description-products.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactService } from './service/service';
import { HttpClientModule } from '@angular/common/http';
import { BodyComponent } from './components/body/body.component';
import { BuyProductComponent } from './components/buy-product/buy-product.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterAccountComponent } from './components/register-account/register-account.component';
import { LoginPageService } from './service/login-page.service';
import { AngularFireModule } from '@angular/fire/compat';
import { MenComponent } from './components/men/men.component';
import { WomenComponent } from './components/women/women.component';
import { RouterOutletComponent } from './components/router-outlet/router-outlet.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { SideBarComponent } from './components/admin/side-bar/side-bar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';
import { ProductsListComponent } from './components/admin/products-list/products-list.component';
import { EditProductComponent } from './components/admin/edit-product/edit-product.component';
import { ProductFormComponent } from './shared/product-form/product-form.component';

const firebaseConfig = {
  apiKey: "AIzaSyCqHhq_Eoe-moIKFHp-FCPBY51htJZZ964",
  authDomain: "e-commerce-9e124.firebaseapp.com",
  projectId: "e-commerce-9e124",
  storageBucket: "e-commerce-9e124.appspot.com",
  messagingSenderId: "892398915755",
  appId: "1:892398915755:web:9398bc12626ed27b76e7ee",
  measurementId: "G-GCRP0NK1X4"
};


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DescriptionProductsComponent,
    ContactComponent,
    BodyComponent,
    BuyProductComponent,
    MyCartComponent,
    LoginPageComponent,
    RegisterAccountComponent,
    MenComponent,
    WomenComponent,
    RouterOutletComponent,
    AdminPanelComponent,
    AddProductComponent,
    AdminDashboardComponent,
    SideBarComponent,
    ProductsListComponent,
    EditProductComponent,
    ProductFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    OverlayModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],

  providers: [ContactService, LoginPageService],
  bootstrap: [AppComponent],

})
export class AppModule { }
