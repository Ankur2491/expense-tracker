import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reminder-details',
  templateUrl: './reminder-details.component.html',
  styleUrls: ['./reminder-details.component.css']
})
export class ReminderDetailsComponent{
  masterCat: Array<any> = [];
  allData:any;
  listOfData: any = {}
  selectedItems:any = [];
  miscItems: any = [];
  miscellaneousText = "";
  constructor(private http: HttpClient, private toastr: ToastrService){
    this.http.get("https://expense-tracker-api-rosy.vercel.app/groceryList").subscribe((data: any)=>{
      this.masterCat = Object.keys(data.groceryList);
      this.allData = data.groceryList;
      for(let key of this.masterCat) {
        this.listOfData[key] = Object.keys(this.allData[key])
      }
    })
    this.http.post("https://expense-tracker-api-rosy.vercel.app/getReminders", {homeId: localStorage.getItem('homeId')}).subscribe((data: any)=>{
      console.log(data);
      if(data.hasOwnProperty("Message") && data["Message"]== "No Reminders"){
        this.selectedItems = [];
      }
      else if(data.hasOwnProperty("miscReminders")){
        this.miscItems = data["miscReminders"];
        this.selectedItems = data["reminders"];
        
      }
      else{
      this.selectedItems = data["reminders"];
      }
    })
  }
  selectItem(item: string) {
    if(this.selectedItems.includes(item)){
      let index = this.selectedItems.indexOf(item);
      this.selectedItems.splice(index,1);
    }
    else{
    this.selectedItems.push(item);
    }
  }
  setReminder() {
    if(this.miscellaneousText.length>0){
      this.miscItems.push(this.miscellaneousText);
          if(this.selectedItems){
            this.http.post("https://expense-tracker-api-rosy.vercel.app/updateReminder", {homeId: localStorage.getItem('homeId'), 'reminders': this.selectedItems, 'miscReminders': this.miscItems}).subscribe(data=>{
              this.toastr.success('Reminder Saved!');
            })
          }
    }
    else if(this.selectedItems){
      this.http.post("https://expense-tracker-api-rosy.vercel.app/updateReminder", {homeId: localStorage.getItem('homeId'), 'reminders': this.selectedItems,'miscReminders': this.miscItems}).subscribe(data=>{
        this.toastr.success('Reminder Saved!');
      })
    }
  }
  removeMiscItem(item: string) {
    let index = this.miscItems.indexOf(item);
    this.miscItems.splice(index,1);
  }
}
