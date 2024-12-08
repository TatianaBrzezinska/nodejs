import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
})
export class AppComponent {
  private wsSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      const userId = this.authService.getUserId();
      if (userId) {
        this.wsSubscription = this.webSocketService.connect(userId).subscribe({
          next: (message) => {
            if (message === 'Your token expired. Login again') {
              alert(message);
              this.authService.logout();
              window.location.href = '/auth/login';
            }
          },
          error: (error) => {
            console.error('WebSocket error:', error);
          },
          complete: () => {
            console.log('WebSocket conection is completed.');
          }
        });
      }
    }
  }

  ngOnDestroy() {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
    this.webSocketService.disconnect();
  }

  logout() {
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
