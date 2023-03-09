import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../Services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    private socketService:SocketService
  ) {
    this.socketService.listen('server').subscribe(data => {
      console.log(data);
    });
    this.socketService.emit("client","message is coming from client......");
   }

  ngOnInit(): void {
  }

}
