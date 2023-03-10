import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket!: Socket;
  url = 'ws://localhost:5000';

  constructor() { 
    this.socket = io(this.url);
  }

  joinRoom(data:any){
    this.socket.emit('join',data);
  }

  sendMessage(data:any){
    //console.log("data........",data);
    this.socket.emit('message',data);
  }

    getMessage(): Observable<any> {
      return new Observable(observer => {
        this.socket.on('new message',(data:any) => {
          //console.log("new message......",data);
        observer.next(data);
      });
    });
  }
  // listen(eventName:any): Observable<any> {
  //   return new Observable(observer => {
  //     this.socket.on(eventName,(data:any) => {
  //       observer.next(data);
  //     });
  //   });
  // }

  // emit(eventName:any,data:any){
  //   this.socket.emit(eventName,data);
  // }

  // disconnect(){
  //   this.socket.disconnect();
  // }
}
