import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'product', component: ProductComponent },
  { path: 'contacts', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
