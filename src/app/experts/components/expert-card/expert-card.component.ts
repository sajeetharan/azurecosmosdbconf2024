import { Component, Input } from "@angular/core";
import { expert } from "../../interfaces/expert.interface";

@Component({
  selector: "app-expert-card",
  templateUrl: "./expert-card.component.html",
  styles: [
    `
      mat-card {
        margin-top: 20px;
        min-height: 70vh;
      }

      .mat-card-image {
        max-height: 60vh;
        max-width: 20vw;
      }
      .red-text {
        font-size: 20px;
        color: #fa7aa5 !important;
      }

      .blue-text {
        font-size: 20px;
        color: #09b0ec !important;
      }
    `,
  ],
})
export class expertCardComponent {
  @Input() expert!: expert;
  highlightStart = 30;
  constructor() {}
}
