// bienvenida muestra un mensaje de bienvenida despues de inciar sesion

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email: string = '';

  constructor(private userService: UsersService, private router: Router) {}
//metodo ng0Init obtiene la informacion del usuario del backen usando el token alamacenado en las cookies
  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(data => {
      this.email = data.email;
    });
  }

  logout() {
    this.userService.setToken(''); // elimina token
    this.router.navigateByUrl('/login'); // redirecciona a login
  }
}
