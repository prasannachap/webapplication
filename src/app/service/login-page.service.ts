import { Injectable } from '@angular/core';
import { userForLogin } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { GET_ALL_USERS_URL } from 'src/constant/constant';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/fireBase';
// import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginPageService {
  loading: boolean = false;
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
  }
  getAllUsers = async (): Promise<userForLogin[]> => {
    const response = await this.httpClient
      .get<userForLogin[]>(GET_ALL_USERS_URL)
      .toPromise();
    return new Promise((resolve) => {
      resolve(response as userForLogin[] | any);
    });
  }

  logIn(email: string, password: string, route: string) {
    this.loading = true
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        this.router.navigate([route])
        this.loading = false;
        const user = userCredential.user;
        return true;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return false;
      });
  }
}
