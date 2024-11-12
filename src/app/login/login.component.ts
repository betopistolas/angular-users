import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[CommonModule,FormsModule,AppComponent],
  providers:[LoginService,HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  email: string = '';
  password: string = '';
  messageError : string='';
  messageSuccess : string = '';
  autentification : string='';
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private appComponent : AppComponent
  ) {}

  validateSession(){
    
    try{
      this.autentification = localStorage.getItem("token") as string;
      console.log(this.autentification);
      console.log(this.appComponent.tokenExpired(this.autentification));
  
      if (this.appComponent.tokenExpired(this.autentification)) {
        localStorage.setItem ('token', '');
        //this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/users']);
      }
    }catch(e){
    }
  }

  ngOnInit() {
    this.validateSession();
  }

  onSubmit() {
    this.loginService.logIn(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.messageSuccess = "OK";
        localStorage.setItem ('token', response.token);
        localStorage.setItem ('email', response.correo);
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.messageSuccess = 'Invalid login credentials';
      },
    });
  }

}
