import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chat } from 'src/app/interfaces/chat';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import firebase from 'firebase/compat/app';
import { ToastController } from '@ionic/angular';

@Component({
  standalone : true,
  imports : [FormsModule, RouterModule, CommonModule],
  selector: 'app-primer-chat',
  templateUrl: './primer-chat.component.html',
  styleUrls: ['./primer-chat.component.scss'],
})
export class PrimerChatComponent  implements OnInit, OnDestroy {

  suscripcionChat : Subscription | null = null;
  correoUsuarioActual : string | null = null;
  mensaje : string = ''; 
  chats : Chat[] = [];

  chatsEnviados : Chat[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router, private chatService: ChatServiceService, private toast: ToastController) { }

  ngOnInit() {

    this.correoUsuarioActual = this.usuarioService.usuario.getValue();

    this.actualizarChats();
  }

  async actualizarChats() : Promise<void>
  {
    const observable = this.chatService.traerChats('PrimerChat');
    this.suscripcionChat= observable.subscribe((querySnapshot) => {
      querySnapshot.forEach((doc : any) => {
        const data = doc.data() as Chat;

        if (data.Fecha && data.Fecha instanceof firebase.firestore.Timestamp) {
          const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
          data.FechaFormateada = data.Fecha.toDate().toLocaleDateString('es-ES', options);
        }
        this.chats.push(data);
      });

      this.chats = [
        ...this.chats.sort((a: Chat, b: Chat) => {
          const fechaA = a.Fecha instanceof firebase.firestore.Timestamp ? a.Fecha.toDate() : a.Fecha;
          const fechaB = b.Fecha instanceof firebase.firestore.Timestamp ? b.Fecha.toDate() : b.Fecha;
      
          return fechaA.getTime() - fechaB.getTime();
        })
      ];

    })

  }

  enviarMensaje() : void
  {

    if(this.mensaje.length > 21)
    {
      this.presentToast();
    }
    else
    {
      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
      //this.chatService.agregarMensaje({Correo : this.correoUsuarioActual!,Mensaje: this.mensaje, Fecha : new Date() });
      var fechaEnviadoMensaje = new Date();
      var chat = {
        Correo : this.correoUsuarioActual!,Mensaje: this.mensaje, Fecha : fechaEnviadoMensaje, FechaFormateada : fechaEnviadoMensaje.toLocaleDateString('es-ES', options)
      };
  
      this.chats.push(chat);
      this.chatsEnviados.push(chat);
      this.mensaje = '';
    }
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Solo puedes mandar mensajes de maximo 21 caracteres',
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }

  volver() : void
  {
    this.chatsEnviados.forEach(chat => {
      this.chatService.agregarMensaje(chat, 'PrimerChat');
    });

    this.router.navigateByUrl('/home');
  }

  ngOnDestroy(): void {
    this.suscripcionChat?.unsubscribe();
  }

}
