import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileDeleteComponent } from '../profile-delete/profile-delete.component';
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  user: any = {};
  movies: any = [];
  favourite: any = [];

  constructor(public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.userData = resp;
      this.user=resp;
      this.userData.Birthday = resp.Birthday.substr(0, 10);
      this.getMovies();
    })
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }

  removeFavoriteMovie(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((resp: any) => {

      this.snackBar.open('Removed from favorites!', 'OK', {
        duration: 2000,
      });
    });


    setTimeout(function () {
      window.location.reload();
    }, 2000);
  }

  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favourite.push(movie);
      }
    });
    console.log(this.favourite);
    return this.favourite;
  }

  editUserData(): void {
    this.dialog.open(ProfileUpdateComponent, {
      width: '350px'
    });
  }
 
  deleteUserData(): void {
    this.dialog.open(ProfileDeleteComponent, {
      width: '350px'
    });
  }
}