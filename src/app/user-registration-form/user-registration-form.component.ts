import { Component, OnInit, Input } from '@angular/core';

//API Call 
import { UserRegistrationService } from '../fetch-api-data.service';

// Angular material
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

 /**
   *
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
   */
constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

// This is the function responsible for sending the form inputs to the backend
registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      localStorage.setItem('username', response.user.username);
      localStorage.setItem('token', response.token);

     this.dialogRef.close(); 
     this.snackBar.open('User registered', 'OK', {
        duration: 2000
     });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

  }