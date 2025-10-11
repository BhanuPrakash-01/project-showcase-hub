import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['../../forms.css'], // We will update this in the next step
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required], // Added username field
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Added minlength validation
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.errorMessage = null;
    // Call the register method from our service
    this.authService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigate(['/']), // On success, go to homepage
      error: (err) => (this.errorMessage = err.error.message || 'Registration failed'),
    });
  }
}
