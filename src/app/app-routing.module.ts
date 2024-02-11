import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component:DefaultLayoutComponent,
    children:[
      {
        path: '',
        component:HomeComponent
      }
    ]
  },
  {
    path: 'main',
    component:MainLayoutComponent,
    children:[
      {
        path: '',
        component:HomeComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
