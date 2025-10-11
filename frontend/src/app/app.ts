import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth'; // Import AuthService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink], // Add RouterLink
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent {
  // Inject AuthService to use it in the component and template
  constructor(public authService: AuthService) {}

  // Method to call the service's logout function
  logout(): void {
    this.authService.logout();
  }
}
