import { Component } from '@angular/core';
import { User } from 'src/models/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage{
  user = {} as User;

  constructor(private afAuth: AngularFireAuth,private router: Router) { }

  async register(user : User){
    try{
      if(user.password2 == user.password){
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
        if(result){
          this.router.navigateByUrl('/login');
        }
      }
    }
    catch(e){
      console.error(e);
    }
  }
}
