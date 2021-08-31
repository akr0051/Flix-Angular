import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// API Call
import { UserRegistrationService } from '../fetch-api-data.service';

// Angular Material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Component
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';
import { ProfileDeleteComponent } from '../profile-delete/profile-delete.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: any = [];
  movies: any = [];
  favorites: any = [];

  /**
   * @param fetchApiData
   * @param dialog
   * @param snackBar
   * @param router
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
  * Updates Profile
  **/ 
   editUserData(): void {
    this.dialog.open(ProfileUpdateComponent, {
      width: '350px'
    });
  }

  /**
  * Delete Profile
  **/  
  deleteUser(): void {
    this.dialog.open(ProfileDeleteComponent);
  }  

  /**
   * get user data
   */
  getUser(): void {
    const user = localStorage.getItem('user');
    console.log (user, "user")
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
      this.getMovies();
    });
  }

  /**
   * retrieve all favorited movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }

  /**
   * removes movie from user's list of favorites
   * @param movie_id
   * @returns
   */
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }

  /**
   * delete favorites from user
   */
  removeFavorites(id: string, title: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe(() => {
      this.snackBar.open(`${title} has been removed from your favorites!`, 'OK', {
        duration: 2000
      });
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    });
  }
  
}