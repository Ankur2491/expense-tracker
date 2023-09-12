import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'exp-tracker';
  homeId = "";
  constructor(private _router: Router, private _dataService: DataService, private _activatedRoute: ActivatedRoute){
    this._dataService.currentStatus.subscribe(data=>{
      if(data.length>0){
      this.homeId = data;
      this._router.navigateByUrl('/home')
      }
      else{
        this.homeId = "";
      }
    })
  }
  ngOnInit(): void {
    let homeId = localStorage.getItem('homeId');
    if(homeId){
      this.homeId = homeId;
      this._router.navigateByUrl('/home')
    }  
  }
  logout() {
    this._dataService.changeStatus("");
    localStorage.clear()
    this._router.navigateByUrl('/')
  }
  
}
