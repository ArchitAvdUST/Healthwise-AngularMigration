//import { HttpClient } from '@angular/common/http';
//import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from 'src/auth/service/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

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

    

    // Call the AuthService to send data to the backend API
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        // Handle success, e.g., store token, navigate, etc.
        console.log('Login successful:', response);
        sessionStorage.setItem('token', response.token);

        // Get user role from backend using token
        this.authService.getUserRole(this.loginForm.value.username,response.token).subscribe(
          (roleResponse) => {
            const userRole = roleResponse;

            console.log(userRole);
            // Route based on user role
            switch(userRole) {
              case 'patient':
                this.router.navigate(['/patient/dashboard']);
                break;
              case 'doctor': 
                this.router.navigate(['/doctor/dashboard']);
                break;
              case 'admin':
                this.router.navigate(['/admin/dashboard']); 
                break;
              case 'pharmacy':
                this.router.navigate(['/pharmacy/dashboard']);
                break;
              default:
                this.loginForm.setErrors({ invalidRole: true });
                console.error('Unknown user role');
            }
          },
          (error) => {
            console.error('Error getting user role:', error);
            this.loginForm.setErrors({ invalidRole: true });
          }
        );
      },
      (error) => {
        if (error.status === 404) {
          console.error('User not found');
        } else if (error.status === 401) {
          console.error('Username or password incorrect');
          this.loginForm.patchValue({
            username: '',
            password: ''
          });
          this.loginForm.setErrors({ invalidCredentials: true });
          console.log(this.loginForm.errors);
        } else if (error.status === 500) {
          console.error('Login failed');
          this.loginForm.setErrors({ invalidCredentials: true });
        }
      }
    );
  }
}