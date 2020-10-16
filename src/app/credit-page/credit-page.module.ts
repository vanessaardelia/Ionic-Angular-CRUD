import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditPagePageRoutingModule } from './credit-page-routing.module';

import { CreditPagePage } from './credit-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditPagePageRoutingModule
  ],
  declarations: [CreditPagePage]
})
export class CreditPagePageModule {}
