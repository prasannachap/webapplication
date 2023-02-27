import { Component, OnInit } from '@angular/core';
import { LoginPageService } from '../service/login-page.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../fireBase";
import { MatDialog } from '@angular/material/dialog';
import { BodyComponent } from '../components/body/body.component';
import { RegisterAccountComponent } from '../components/register-account/register-account.component';
import { passwordValidator } from 'src/validators/validators';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  loading: boolean = false;

  constructor(
    private service: LoginPageService,
    private router: Router,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.getAllUsers();

  }

  async getAllUsers() {
    const user = await this.service.getAllUsers();
    return user;
  }

  userForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    passWord: new FormControl('', [Validators.required, passwordValidator()]),
    rememberMe: new FormControl(false, Validators.required)
  })


  // async submit() {
  //   let data = await this.getAllUsers();
  //   const val = data.some(x => (x.userName == this.userForm.value.userName && x.passWord == this.userForm.value.passWord))
  //   if (val) {
  //     // login
  //   } else {
  //     //fail
  //   }
  //   this.userForm.reset();
  // }


  logInn() {
    this.loading = true;
    this.service.logIn(this.userForm.value.userName as string, this.userForm.value.passWord as string, '/home/dashboard')
  }

  register() {
    const dialogRef = this.dialog.open(RegisterAccountComponent, {
      width: '800px',
      // data: id,
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }





}





