import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FakeRootComponent } from './fake-root.component';
import { SharedModule } from '../shared/shared.module';
import { WhatsappModule } from '../whatsapp';

const routes: Routes = [
  {
    path: '',
    component: FakeRootComponent,
  },
];

@NgModule({
  declarations: [FakeRootComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    WhatsappModule,
  ],
  providers: [],
})
export class FakeModule {}
