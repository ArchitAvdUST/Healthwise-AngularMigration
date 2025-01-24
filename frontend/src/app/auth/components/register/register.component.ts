import {CommonModule} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Router} from '@angular/router';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
} from 'rxjs';
import {AuthService} from 'src/auth/service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup; // Reactive Form group
  currentStep = 1; // Current step index (starts from step 1)
  passwordStrength: string | null = null; // The text displaying strength
  passwordStrengthClass: string | null = null; // Class for styling the strength
  usernameExists: boolean | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize form with validations
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      age: ['', Validators.required],
      sex: ['', Validators.required],
      address: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });

    this.form.get('password')?.valueChanges.subscribe((password) => {
      this.checkPasswordStrength(password);
    });

    this.form
      .get('username')
      ?.valueChanges.pipe(
        debounceTime(500), // Wait for 500ms after typing
        distinctUntilChanged(), // Only trigger if value changes
        switchMap((username) => {
          if (username && username.length > 2) {
            return this.authService.checkUsername(username); // Call the API
          }
          this.usernameExists = null;
          return of(null);
          // Return null if username is too short
        }),
        catchError((err) => {
          if (err instanceof HttpErrorResponse && err.status === 406) {
            this.usernameExists = true; // Username is already taken
            this.errorMessage = 'Username is already taken'; // Display message
          } else {
            console.error('Error checking username:', err);
            this.usernameExists = null; // Reset on other errors
            this.errorMessage = 'Error checking username'; // Reset error message
          }
          return of('error'); // Return null in case of error
        })
      )
      .subscribe((response) => {
        console.log(response);
        if (response) {
          if (response === 'error') {
            this.usernameExists = null;
          } else {
            this.usernameExists = false; // API response contains 'exists' property
          }
        } else {
          this.usernameExists = null;
        }
      });
  }

  checkPasswordStrength(password: string): void {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasLetter && hasDigit && hasSymbol) {
      this.passwordStrength = 'Strong';
      this.passwordStrengthClass = 'strong';
    } else if (hasLetter && hasDigit) {
      this.passwordStrength = 'Average';
      this.passwordStrengthClass = 'average';
    } else if (hasLetter) {
      this.passwordStrength = 'Poor';
      this.passwordStrengthClass = 'poor';
    } else {
      this.passwordStrengthClass = 'invalid';
    }
  }

  // Getter for password control
  get passwordControl() {
    return this.form.get('password');
  }

  passwordsMatch(): boolean {
    // Check if password and confirm password match
    return (
      this.form.controls['password'].value ===
      this.form.controls['confirmPassword'].value
    );
  }

  // Getter for the sex form control
  get sexControl() {
    return this.form.get('sex');
  }

  // Method to handle the button click and update the 'sex' field
  selectSex(value: string): void {
    // Update the form control with the selected value
    this.sexControl?.setValue(value);
  }

  // Navigate to the next step
  nextStep(): void {
    console.log(this.currentStep);
    this.currentStep++;
  }

  // Navigate to the previous step
  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Handle form submission
  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      // Call the backend API to register the user
      this.authService
        .register(this.form.value.username, this.form.value.password, 'patient')
        .subscribe(
          (response) => {
            console.log('Registration successful:', response);
            // Navigate to login page after successful registration
            this.router.navigate(['/patient/dashboard']);
          },
          (error) => {
            console.error('Registration failed:', error);
            if (error.status === 400) {
              // Handle validation errors from server
              this.form.setErrors({serverError: error.error.message});
            } else {
              // Handle other errors
              this.form.setErrors({
                serverError: 'Registration failed. Please try again.',
              });


            }
          }
        );

        this.authService.registerPatient(this.form.value.name,this.form.value.age,this.form.value.sex,this.form.value.email,this.form.value.phone,this.form.value.address,this.form.value.username).subscribe(
          (response) => {
            console.log('Patient Registration successful:', response);
            // Navigate to login page after successful registration
          },
          (error) => {
            console.error('Patient Registration failed:', error);
          }
        );
      // Here, you would typically send the form data to your server
    } else {
      this.form.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }
}
