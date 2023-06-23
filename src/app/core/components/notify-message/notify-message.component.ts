import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EMPTY_STRING } from "@shared/constants/empty-string";

@Component({
  selector: 'app-notify-message',
  templateUrl: './notify-message.component.html',
  styleUrls: ['./notify-message.component.sass']
})
export class NotifyMessageComponent {

  @Input() message!: string | null;
  @Output() close = new EventEmitter<void>();

  constructor() {
  }

  getMessage(): string | null {
    if (this.message !== null) {
      if (this.isError()) {
        return this.message.replace('error:', EMPTY_STRING);
      } else if (this.isSuccess()) {
        return this.message.replace('success:', EMPTY_STRING);
      }
    }

    return null;
  }

  isError(): boolean {
    return this.message !== null && this.message.startsWith('error:');
  }

  isSuccess(): boolean {
    return this.message !== null && this.message.startsWith('success:');
  }
  closeBanner(): void {
    this.close.emit();
  }
}
