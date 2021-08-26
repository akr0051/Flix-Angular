import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.scss']
})
export class ProfileDeleteComponent implements OnInit {
  
  constructor(public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }
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

  cancel(): void {
    this.router.navigate(['/profile']).then(() => {
      window.location.reload();
    });
  }

}