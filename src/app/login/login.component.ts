import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { DataService } from 'src/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  createRoomId: string = "";
  joinRoomId: string = "";
  loading = false;
  createErrorMessage: string = "";
  createError = false;
  joinError = false;
  joinErrorMessage: String = "";
  constructor(private _service: ExpenseService, private _dataService: DataService){}
  createRoom() {
    this.loading = true;
    this._service.createAhome(this.createRoomId).subscribe(data=>{
      if(data.Error){
        this.createError = true;
        this.createErrorMessage = data.Error;
      }
      else{
        localStorage.setItem('homeId', this.createRoomId)
        this._dataService.changeStatus(this.createRoomId);
      }
      this.loading = false;
    })
  }
  joinRoom() {
    this.loading = true;
    this._service.joinAhome(this.joinRoomId).subscribe(data=>{
      if(data.Error){
        this.joinError = true;
        this.joinErrorMessage = data.Error;
      }
      else{
        localStorage.setItem('homeId', this.joinRoomId)
        this._dataService.changeStatus(this.joinRoomId);
      }
      this.loading = false;
    })
  }
}
