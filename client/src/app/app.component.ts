import { Component } from '@angular/core';
import { NetworkStatus } from './network.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <div class="network-spinner" *ngIf="http | async">
      <div class="msg">Network request in flight</div>
      <mat-spinner color="accent" diameter="30"></mat-spinner>
    </div>
  `,
  styles: [`
    .network-spinner {
      position: absolute;
      bottom: 120px;
      right: 120px;
      padding: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #f9f9f9;
      border-radius: 10px;
    }

    .network-spinner .msg {
      padding-right: 15px;
      color: #999;
      font-size: 12px;
    }
  `],
})
export class AppComponent {
  http: Observable<boolean>;

  constructor(network: NetworkStatus) {
    this.http = network.getHttpStatus();
  }
}
