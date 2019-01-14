import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { WhatsappComponent } from './whatsapp.component';
import { ChatsPageComponent } from './pages/chats-page.component';
import { ChatPageComponent } from './pages/chat-page.component';
import { LoadingComponent } from './ui/loading/loading.component';
import { AvatarComponent } from './ui/avatar/avatar.component';
import { ChatItemComponent } from './ui/chats/chat-item.component';
import {
  ChatMessagesComponent,
  MessageComponent,
} from './ui/chat/messages.component';
import { MessageFormComponent } from './ui/chat/message-form.component';

@NgModule({
  declarations: [
    WhatsappComponent,
    ChatsPageComponent,
    ChatPageComponent,
    LoadingComponent,
    AvatarComponent,
    ChatItemComponent,
    ChatMessagesComponent,
    MessageComponent,
    MessageFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule
  ],
  exports: [WhatsappComponent],
  providers: [],
})
export class WhatsappModule {}
