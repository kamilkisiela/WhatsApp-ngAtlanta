import { Component } from '@angular/core';

@Component({
  selector: 'app-select',
  template: `
    <a class="data-source ngrx" routerLink="/ngrx"></a>
    <a class="data-source loona" routerLink="/graphql"></a>
    <a class="data-source fake" routerLink="/fake"></a>
  `,
  styles: [
    `
      :host {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-evenly;
      }

      a.data-source {
        display: flex;
        height: 300px;
        flex: 1 0;
        cursor: pointer;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
      }

      a.data-source:hover {
        opacity: 0.5;
      }

      a.loona {
        background-image: url('/assets/use-loona.png');
      }

      a.fake {
        background-image: url('/assets/use-fake.png');
      }

      a.ngrx {
        background-image: url('/assets/use-ngrx.png');
      }

      a.data-source img {
        display: block;
        max-width: 200px;
        max-height: 100px;
      }
    `,
  ],
})
export class SelectComponent {}
