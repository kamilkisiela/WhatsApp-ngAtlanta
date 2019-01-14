import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'message-form',
  template: `
    <form (ngSubmit)="submit()" autocomplete="off">
      <mat-form-field appearance="outline">
        <mat-label>Compose a new message</mat-label>
        <input matInput placeholder="Message..." [formControl]="message" />
        <mat-icon matSuffix>send</mat-icon>
        <mat-hint>Hit "enter" to send a message</mat-hint>
      </mat-form-field>
    </form>
  `,
  styles: [
    `
      form {
        display: block;
      }

      mat-form-field {
        padding: 10px 15px;
        display: block;
      }
    `,
  ],
})
export class MessageFormComponent {
  @Output('message') onMessage = new EventEmitter<string>();

  message = new FormControl('');

  submit() {
    if (this.message.value) {
      this.onMessage.emit(this.message.value);
      this.message.reset('');
    }
  }
}
