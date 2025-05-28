import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isVisible" class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded shadow-lg transition-all z-50"
        [ngClass]="{'bg-green-500': !isError, 'bg-red-500': isError}">
        {{ message }}
    </div>
  `,
  styles: ``,
})
export class NotificationBannerComponent {
  isVisible = false;
  message = '';
  isError = false;

  showBanner(msg: string, isError = false): void {
    this.message = msg;
    this.isError = isError;
    this.isVisible = false;
    setTimeout(() => {
        this.isVisible = true;
        console.log('Banner message:',{msg, isError});
        setTimeout(() => (this.isVisible = false), 800); }, 10);

    }
}
