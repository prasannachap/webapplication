import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescriptionProductsComponent } from './description-products/description-products.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from 'src/auth-guard/auth.guard';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { MenComponent } from './components/men/men.component';
import { WomenComponent } from './components/women/women.component';
import { BodyComponent } from './components/body/body.component';
import { RouterOutletComponent } from './components/router-outlet/router-outlet.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { SideBarComponent } from './components/admin/side-bar/side-bar.component';
import { ProductsListComponent } from './components/admin/products-list/products-list.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LoginPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: RouterOutletComponent,
    children: [
      {
        path: 'description/:id',
        component: DescriptionProductsComponent,
        pathMatch: 'full',
      }, {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectLoggedInToDashboard }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'myCart',
        component: MyCartComponent,
        pathMatch: 'full',
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'men',
        component: MenComponent,
        pathMatch: 'full',
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'women',
        component: WomenComponent,
        pathMatch: 'full',
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'body',
        component: BodyComponent,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    children: [
      {
        path: 'orders',
        component: ProductsListComponent,
      },
      {
        path: 'productList',
        component: ProductsListComponent,
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
