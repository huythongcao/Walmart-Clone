import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { CanComponentDeactivateGuard } from './guards/can-component-deactivate.guard';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [AuthGuard],   // không cho truy cập vào route nhưng vẫn tải xuống source code 
    canDeactivate: [CanComponentDeactivateGuard]
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
      // canActivate: [AuthGuard, AdminGuard],
      canLoad: [AdminGuard],    // không cho truy cập vào route nhưng không tải xuống source code 
  },
  { path: 'no-access', component: NoAccessComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
