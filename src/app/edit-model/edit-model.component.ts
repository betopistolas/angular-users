import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.component.html',
  styleUrl: './edit-model.component.css',
  standalone:true,
  imports:[CommonModule,FormsModule,AppComponent],
  providers:[UserService,HttpClient],
})
export class EditModelComponent implements OnInit{

  model : any = { id: '', name: '', email: '' ,  password: '', status: '' };
  errorMessage : string='';
  message : string = '';
  title : string="Nuevo Usuario";
  editForm:boolean=false;
  autentification : string='';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private appComponent : AppComponent
  ) {}

  validateSession(){
    this.autentification = localStorage.getItem("token") as string;
    if (this.appComponent.tokenExpired(this.autentification)) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {

    this.validateSession();
    const id = +this.route.snapshot.paramMap.get('id')!;
    if(id !=0){
      this.editForm=true;
    } 
    this.message;
    if(this.editForm){
      this.title = "Editar Usuario "+ id;
      this.model.id = id;
      this.getIdUser();
      this.getIdUser();
    }
  }

  getIdUser(): void {
    this.userService.getById(this.model.id).subscribe((res: any) => {
      console.log('success');
      
      this.model = res;
      this.model.name = res.name;
    }, err => {
      console.log(err);
      this.errorMessage = "No se encotro el usuario a editar. "+err;
    });
    
  }

  save(): void {

    if(this.editForm){
      this.userService.edit(
        this.model.id,
        this.model.email,
        this.model.name,
        this.model.password,
        this.model.status).subscribe(res => {
          this.model = res;
          this.model.name = res.name;
          this.message = "El usuario se edito correctamente";
        },err => {
            this.errorMessage = "El usuario No edito correctamente";
        }
      );
    } else {
      this.userService.save(
        this.model.email,
        this.model.name,
        this.model.password,
        this.model.status).subscribe(res => {
          this.router.navigate(['/users/']);
        },err => {
            this.errorMessage = "El usuario no correctamente";
        }
      );
      
    }
     // Redirige de vuelta a la lista
  }

  cancel(): void {
    this.router.navigate(['/users']); // Vuelve a la lista sin hacer cambios
  }
}
