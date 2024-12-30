import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from 'src/auth/service/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Create a form group with username and password controls
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // 'required' validator
      password: ['', Validators.required], // 'required' validator
    });
  }

  // Submit form handler
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return; // Stop if the form is invalid
    }

    this.isSubmitting = true;

    // Call the AuthService to send data to the backend API
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        // Handle success, e.g., store token, navigate, etc.
        console.log('Login successful:', response);
        this.router.navigate(['/dashboard']); // Example redirection
      },
      (error) => {
        // Handle error
        console.error('Login failed:', error);
      }
    );
  }
}
