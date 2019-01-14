import { Component, Input } from '@angular/core';

@Component({
  selector: 'avatar',
  template: `
    <img [src]="src" [alt]="name" />
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class AvatarComponent {
  @Input() name: string;

  get src() {
    return `https://ui-avatars.com/api/?rounded=true&background=673ab7&color=fff&name=${
      this.name
    }`;
  }
}
