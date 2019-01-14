import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NgRxRootComponent } from './ngrx-root.component';
import { SharedModule } from '../shared/shared.module';
import { WhatsappModule } from '../whatsapp';

const routes: Routes = [
  {
    path: '',
    component: NgRxRootComponent,
  },
];

@NgModule({
  declarations: [NgRxRootComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    WhatsappModule,
  ],
  providers: [],
})
export class NgRxModule {}
