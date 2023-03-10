import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from '../../Services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit{
  @ViewChild('popup',{static:false}) popup:any;
  roomId!: string;
  messageText!: string;
  messageArray: {user:string,message:string}[] = [];
  phone!: string;
  currentUser!:any;
  selectedUser!:any;
  showScreen!:boolean;
  userList = [
    {
      id: 1,
      name: "aaa",
      phone: "8899889988"
    },
    {
      id: 2,
      name: "bbb",
      phone: "9988998899"
    }
  ]
d: any;
  constructor(
    private modalService: NgbModal,
    private socketService:SocketService
  ) {
    // this.socketService.listen('server').subscribe(data => {
    //   console.log(data);
    // });
    // this.socketService.emit("client","message is coming from client......");
   }

  ngOnInit(): void {
    this.socketService.getMessage().subscribe((data) => {
      console.log("getdata..........",data);
      
      this.messageArray.push(data);
    })
    // this.socketService.getMessage().subscribe(data => {
    //   console.log("data....",data);
      
    // })
  }

  ngAfterViewInit(): void {
    this.openModal(this.popup);
  }

  openModal(content:any){
    this.modalService.open(content)
  }

  login(dismiss:any,phone:any){
    this.currentUser = this.userList.filter((user) => {
      user.phone === phone
    });
    this.userList = this.userList.filter((user) =>{
      user.phone !== phone
    });
    //console.log(this.currentUser);    
    if(this.currentUser){
      this.showScreen = true;
      //dismiss();
    }
    this.selectUserHandler(phone);
  }

  selectUserHandler(phone:string){
    this.selectedUser = this.userList.find(user => user.phone === phone);
    //this.roomId = this.selectedUser.roomId(this.selectedUser.id);
    this.messageArray = [];
    this.join(this.currentUser.name);
  }

  join(userName:string){
    this.socketService.joinRoom({user:userName});
  }

  sendMessage(msg:any){
    this.messageText = msg
    this.socketService.sendMessage({
      // data:this.currentUser.name,
      message: this.messageText
    });
    this.messageText = '';
  }

}
