import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { NavbarComponent } from 'src/patient/shared/navbar/navbar.component';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports:[CommonModule,RouterModule,NavbarComponent,]
})
export class PatientDashboardComponent implements OnInit {
  patientName: string | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  async fetchUserData() {
    try {
      this.loading = true;

      // Check if we're in the browser environment before using sessionStorage
      if (typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined') {
        const token = sessionStorage.getItem('token');
        if (token) {
          const decodedToken: { username: string } = jwtDecode(token);
          const username = decodedToken.username;
          const response = await axios.get(`http://localhost:5000/api/patients/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.patientName = response.data.name;
        } else {
          this.router.navigate(['/login']);
        }
      } else {
        // Handle case where sessionStorage is unavailable (e.g., server-side rendering)
        console.error('sessionStorage is not available');
        //this.router.navigate(['/login']);
      }
    } catch (err) {
      console.log(err);
      this.error = 'Failed to load patient information';
    } finally {
      this.loading = false;
    }
  }

  handleGetAppointmentClick() {
    this.router.navigate(['/patient/appointments']);
  }

  handleBookAppointmentClick() {
    this.router.navigate(['/patient/book-appointment']);
  }

  handleGetMedicalHistory() {
    this.router.navigate(['/patient/get-history']);
  }

  handleViewBills() {
    this.router.navigate(['/patient/showBill']);
  }
}
