import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-mi-users',
  templateUrl: './mi-users.component.html',
  standalone:true,
  imports:[CommonModule,AppComponent,FormsModule,NgxPaginationModule],
  providers:[UserService,HttpClient],
  
})
export class MiUsersComponent implements OnInit {



  users: any[] = [];
  messageSuccess : string ='';
  messageError : string ='';
  autentification : string='';
  emailToken:string='';

  searchName:string='';
  searchPage:number=0;
  searchSize:number=5;
  count = 0;
  list: any[]=[];


  constructor(private router: Router, private userService: UserService,private appComponent : AppComponent) {} // 
  
  validateSession(){
      try{
        this.autentification = localStorage.getItem("token") as string;
        this.emailToken = localStorage.getItem("email") as string;
        if (this.appComponent.tokenExpired(this.autentification)) {
          this.router.navigate(['/login']);
        }
      }catch(err){

      }
  }
  logout(){
    this.appComponent.logout();
  }
  ngOnInit() {
    this.validateSession();
    this.search();
  }
  newUser(){
    this.router.navigate(['/users/form']);
  }
  index(p:number){
    this.searchPage = p;
    this.search();
  }
  search() {

    this.userService.search(this.searchName,this.searchPage,this.searchSize).subscribe(res => {

      this.users = res.content;
      this.count = res.totalPages;
      this.list = [];
      for(var x=1;x<=this.count;x++){
        this.list.push(x);
      }


    });
  }

  editUser(id: number) {
    this.router.navigate(['/users/form/', id]);
  }

  deleteUser(id: number) {    
    this.userService.delete(id).subscribe((res: any) => {
      console.log('success');
      this.messageSuccess = "Se elimino el usuario";

      for(let i = 0; i < this.users.length; ++i){
        if (this.users[i].id === id) {
            this.users.splice(i,1);
        }
      }
    }, err => {
      this.messageError = "No se pudo eliminar el usuario";
    });
  }
  
}
