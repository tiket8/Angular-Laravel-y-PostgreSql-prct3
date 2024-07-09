// cotiene la logica del regsitro el metodo register envia los datos nuevos al backen los guada en un token y redirige al homevomponent

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(public userService: UsersService, public router: Router) {}

  register() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden. Por favor, inténtelo de nuevo.';
      return;
    }

    const user = {
      email: this.email,
      password: this.password,
      password_confirmation: this.confirmPassword // Asegúrate de enviar password_confirmation
    };

    this.userService.register(user).subscribe(
      data => {
        this.userService.setToken(data.token);
        this.router.navigateByUrl('/home');
      },
      error => {
        this.errorMessage = error.error.message || 'Error al registrar el usuario. Por favor, inténtelo de nuevo.';
      }
    );
  }
}
