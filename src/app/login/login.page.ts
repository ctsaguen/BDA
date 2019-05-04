import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'src/models/User';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  user = {} as User;

  constructor(private afAuth: AngularFireAuth,private router: Router) { }
      async login(user: User){
        try{
          const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
          if(result){
            this.router.navigateByUrl('/home');
          }
        }
        catch(e){
          console.error(e);
        }
      }

      register(){
        this.router.navigateByUrl('/register');
      }

  ngOnInit() {
  }

}
