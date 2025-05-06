//app.component.ts

import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { LiveCodingComponent } from './live-coding/live-coding.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LiveCodingComponent, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lms-frontend';
  loading: boolean = true;

  constructor(private router: Router, private auth: AuthService) {
    setTimeout(() => {
      this.loading = false;
      const user = this.auth.getUser();

      if (user && user.role === 'student') {
        this.router.navigate(['/courses']);
      } else {
        this.router.navigate(['/welcome']);
      }
    }, 1500);
  }
}
