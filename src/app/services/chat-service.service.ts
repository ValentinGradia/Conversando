import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chat } from '../interfaces/chat';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private firestore: AngularFirestore) { }

  async agregarMensaje(chat : Chat, collection: string)
  {
    try
    {
      await this.firestore.collection(collection).add({
        Correo : chat.Correo,
        Fecha : chat.Fecha,
        Mensaje : chat.Mensaje
      });
    }
    catch(error){throw error;}
  }
  
  
  traerChats(collection : string) : Observable<any>
  {
    const chats = this.firestore.collection(collection).get();
    return chats;
  }
}
