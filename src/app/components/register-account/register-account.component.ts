import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/fireBase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from 'src/fireBase';
import { NotificationServiceService } from 'src/app/service/notification-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { passwordValidator } from 'src/validators/validators';


@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss']
})
export class RegisterAccountComponent implements OnInit {
  data!: any[];

  constructor(
    private service: NotificationServiceService,
    private MatDialogRef: MatDialogRef<RegisterAccountComponent>,

  ) {

  }
  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    passWord: new FormControl('', [Validators.required, passwordValidator()])

  })

  register() {
    createUserWithEmailAndPassword(auth, this.registerForm.value.email as string, this.registerForm.value.passWord as string)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        this.registerData(user.uid);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // ..
      });
  }

  async registerData(uid: string) {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        id: uid,
        first: this.registerForm.value.firstName,
        last: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        passWord: this.registerForm.value.passWord
      });
      this.MatDialogRef.close('true');
      this.service.notificationSucess("Account registered successfully!!!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async read() {
    const querySnapshot = await getDocs(collection(db, "users"));

    const list: any[] = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    this.data = list;

  }

}
