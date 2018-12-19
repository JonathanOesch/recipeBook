import { Component } from '@angular/core';
// import { HttpEvent, HttpEventType } from '@angular/common/http';

// Services
import { AuthService } from 'src/app/_services/auth.service';
import { DataStorageService } from 'src/app/_services/data-storage.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout () {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
