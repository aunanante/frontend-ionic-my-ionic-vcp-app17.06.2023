import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommercePage } from './commerce/commerce.page';
import { ProductPage } from './product/product.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'commerce',
    loadChildren: () => import('./commerce/commerce.module').then(m => m.CommercePageModule)
  },
  {
    path: 'commerces/:villeId',
    component: CommercePage
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductPageModule)
  },
  {
    path: 'products/:commerceId',
    component: ProductPage
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
