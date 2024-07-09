// la logica para manejar el inicio de sesion
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';  //recuerda inicializar variables
  password: string = '';
  errorMessage: string = '';

  constructor(public userService: UsersService, public router: Router) {}

  //metodo login evia credenciales al backend guarda el token en la coockies y redirige al homecomponent
  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }
    const user = { email: this.email, password: this.password };
    this.userService.login(user).subscribe(
      data => {
        this.userService.setToken(data.token);
        this.router.navigateByUrl('/home');
      },
      error => {
        this.errorMessage = error.error.message || 'Error al iniciar sesión. Usuario o contrasenia mal.';
      }
    );
  }
}