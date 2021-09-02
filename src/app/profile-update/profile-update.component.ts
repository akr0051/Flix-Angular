import { Component, OnInit,Input } from '@angular/core';

// Angular material
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// API Call
import { UserRegistrationService } from '../fetch-api-data.service'
@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})

export class ProfileUpdateComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  
  /**
   *
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
   */
  constructor(
    public fetchApiData:UserRegistrationService,    
    public dialogRef: MatDialogRef<ProfileUpdateComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // edit user info
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((resp) => {
      this.dialogRef.close();
      console.log(resp);
      localStorage.setItem('user', resp.Username);
      this.snackBar.open('Profile updated successfully!', 'OK', {
        duration: 2000
      });
    }, (res) => {
      console.log(res);
      this.snackBar.open(res, 'OK', {
        duration: 2000
      });
    });
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

}
