import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Inicio',
    pathMatch: 'full'
  },
  {
    path: 'Inicio',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'Acerca_de',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'Servicios',
    loadChildren: () => import('./pages/services-list/services-list.module').then( m => m.ServicesListPageModule)
  },
  {
    path: 'Productos',
    loadChildren: () => import('./pages/products-list/products-list.module').then( m => m.ProductsListPageModule)
  },
  {
    path: 'Contacto',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'recoverPassword/:token',
    loadChildren: () => import('./pages/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
  },
  {
    path: 'recoverPassword',
    loadChildren: () => import('./pages/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
  },
  {
    path: 'Producto/:productId',
    loadChildren: () => import('./pages/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'Servicio/:serviceId',
    loadChildren: () => import('./pages/services-detail/services-detail.module').then( m => m.ServicesDetailPageModule)
  },
  {
    path: 'map-site-editor/show/:sceneId',
    loadChildren: () => import('./pages/map-site-editor/map-site-editor.module').then( m => m.MapSiteEditorPageModule)
  },
  {
    path: 'map-site-editor/add-scene/:template',
    loadChildren: () => import('./pages/map-site-editor/map-site-editor.module').then( m => m.MapSiteEditorPageModule)
  },
  {
    path: 'map-site-editor/editor/:sceneId',
    loadChildren: () => import('./pages/map-site-editor/map-site-editor.module').then( m => m.MapSiteEditorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
