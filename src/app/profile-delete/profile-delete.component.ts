import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// API Call
import { UserRegistrationService } from '../fetch-api-data.service';

// Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.scss']
})
export class ProfileDeleteComponent implements OnInit {
  
  /**
   * @param fetchApiData
   * @param snackBar
   * @param router
   */
  constructor(public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  // user confirms to delete account
  removeUserAccount(): void {
    this.fetchApiData.deleteUser().subscribe(
      (resp: any) => {
        this.snackBar.open(
          'Your account has successfully been deleted!',
          'OK',
          {
            duration: 2000,
          }
        );
  
        localStorage.clear();
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });

        this.router.navigate(['/welcome']).then(() => {
          window.location.reload();
        });
      }
    );
  }
  // user cancels deleting account
  cancel(): void {
    this.router.navigate(['/profile']).then(() => {
      window.location.reload();
    });
  }

}