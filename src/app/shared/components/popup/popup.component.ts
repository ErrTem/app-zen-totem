import { Component, Input } from "@angular/core";

@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.sass"],
})

export class PopupComponent {
  @Input() title: string = "";
  @Input() subtitle: string = "";
  @Input() icon: string = "";
  @Input() destination: string = "";



}
