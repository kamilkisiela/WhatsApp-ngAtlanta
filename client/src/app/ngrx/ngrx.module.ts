import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NgRxRootComponent } from './ngrx-root.component';
import { WhatsappModule } from '../whatsapp';
import { SharedModule } from '../shared/shared.module';
import { chatReducer } from './state/chat.reducer';
import { ChatEffects } from './state/chat.effects';
import { ChatsService } from './chats.service';
import { AppState } from './app.state';

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
    WhatsappModule,
    SharedModule,
    StoreModule.forRoot<AppState>({
      chats: chatReducer,
    }),
    EffectsModule.forRoot([ChatEffects]),
  ],
  providers: [ChatsService],
})
export class NgRxModule {}
