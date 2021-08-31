import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Angular material
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  /**
  * @param snackBar
  * @param router
  */
  constructor(
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Show movies list
   */
  movies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Go to profile page
   */
  goToProfile(): void {
    this.router.navigate(['profile'])
  }

  /**
  * Log user out
  **/
  signOut(): void {
    localStorage.clear;
    this.router.navigate(['welcome']);
    this.snackBar.open('You are logged out!', 'OK', {
      duration: 2000
    });
  }
}