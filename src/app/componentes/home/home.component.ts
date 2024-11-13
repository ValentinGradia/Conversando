import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  standalone : true,
  imports : [FormsModule, RouterModule, CommonModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  constructor(private user : UsuarioService, private router: Router) { }

  ngOnInit() {
    console.log(this.user.correoUsuario);
  }

  cerrarSesion()
  {
    this.user.limpiarCorreo();
    this.router.navigateByUrl('/inicio');
  }

}
