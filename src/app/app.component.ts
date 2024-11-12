import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,CommonModule,FormsModule],
  providers:[HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


  constructor(
    private router: Router,
  ) {}

  title = 'practica';
  autor:string ="Carlos A. Soto Gonzalez";
  autentification :boolean=false; 

  tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  ngInit(){
    const autentification = localStorage.getItem("token") as string;
    if(autentification.length>=0){
      this.autentification=true;
    }
  }
  logout(){
    localStorage.setItem ('token', '');
    this.router.navigate(['/']);
  }
}
