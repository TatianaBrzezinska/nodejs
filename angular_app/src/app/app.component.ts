import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit, OnDestroy {
  private wsSubscription: Subscription | undefined;
  private authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit() {
    console.log('AppComponent initialized');

    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          this.connectWebSocket();
        } else {
          this.disconnectWebSocket();
        }
      }
    );
  }

  ngOnDestroy() {
    this.disconnectWebSocket();
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private connectWebSocket() {
    const userId = this.authService.getUserId();
    if (userId) {
      console.log('Connecting to WebSocket...');
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
          console.log('WebSocket connection is completed.');
        },
      });
    }
  }

  private disconnectWebSocket() {
    console.log('Disconnecting WebSocket...');
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
      this.wsSubscription = undefined;
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
