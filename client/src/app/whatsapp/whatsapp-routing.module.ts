import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatsappComponent } from './whatsapp.component';
import { ChatsPageComponent } from './pages/chats-page.component';
import { ChatPageComponent } from './pages/chat-page.component';

const routes: Routes = [
  {
    path: 'whatsapp',
    component: WhatsappComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'chats',
      },
      {
        path: 'chats',
        component: ChatsPageComponent,
      },
      {
        path: 'chat/:chatId',
        component: ChatPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatsappRoutingModule {}
