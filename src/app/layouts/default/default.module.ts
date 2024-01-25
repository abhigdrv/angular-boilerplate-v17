import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { DefaultHeaderComponent } from './default-header/default-header.component';
import { DefaultFooterComponent } from './default-footer/default-footer.component';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    DefaultComponent,
    DefaultHeaderComponent,
    DefaultFooterComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    DefaultRoutingModule
  ]
})
export class DefaultModule { }
