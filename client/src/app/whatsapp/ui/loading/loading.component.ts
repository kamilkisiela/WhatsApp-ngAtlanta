import { Component } from '@angular/core';

// dark 673ab7
// light ffd740

@Component({
  selector: 'whatsapp-loading',
  template: `
    <div class="juggle">
      <div class="ball"></div>
      <div class="ball"></div>
      <div class="ball"></div>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
      }

      ody {
        background: #ffd740;
      }

      .juggle {
        width: 300px;
        height: 300px;
        position: absolute;
        top: 50%;
        margin-top: -150px;
        left: 50%;
        margin-left: -150px;
      }
      .juggle div {
        position: absolute;
        width: 21px;
        height: 21px;
        border-radius: 10.5px;
        background: #ffd740;
        margin-top: 150px;
        margin-left: 150px;
        animation: juggle 2.1s linear infinite;
      }
      .juggle div:nth-child(1) {
        animation-delay: -0.7s;
      }
      .juggle div:nth-child(2) {
        animation-delay: -1.4s;
      }

      @keyframes juggle {
        0% {
          transform: translateX(0px) translateY(0px);
        }
        12.5% {
          transform: translateX(27.5px) translateY(-57px) scale(1.1);
          background: #673ab7;
        }
        25% {
          transform: translateX(55px) translateY(0px);
          animation-timing-function: ease-out;
        }
        37.5% {
          transform: translateX(27.5px) translateY(57px);
        }
        50% {
          transform: translateX(0px) translateY(0px);
        }
        62.5% {
          transform: translateX(-27.5px) translateY(-57px) scale(1.1);
          animation-timing-function: ease-in;
        }
        75% {
          transform: translateX(-55px) translateY(0px);
          animation-timing-function: ease-out;
        }
        87.5% {
          transform: translateX(-27.5px) translateY(57px);
        }
        100% {
          transform: translateX(0px) translateY(0px);
        }
      }
    `,
  ],
})
export class LoadingComponent {}
