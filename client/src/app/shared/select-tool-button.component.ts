import { Component, Input } from '@angular/core';

@Component({
  selector: 'select-tool-button',
  template: `
    <div routerLink="/" title="Use a different tool">
      <div>using</div>
      <img [src]="src" [alt]="tool" />
    </div>
  `,
  styles: [
    `
      div {
        display: flex;
        align-items: center;
        padding-right: 15px;
        cursor: pointer;
      }

      div:hover {
        opacity: 0.5;
      }

      img {
        max-height: 35px;
      }
    `,
  ],
})
export class SelectToolButtonComponent {
  @Input() tool: string;

  get src() {
    return `/assets/logo-${this.tool}.png`;
  }
}
