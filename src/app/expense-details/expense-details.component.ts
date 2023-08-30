import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as dayjs from 'dayjs';
import * as moment from 'moment';
import { ExpenseService } from '../expense.service';
import { DataService } from 'src/data.service';
import { single } from './data';
import { Color, ScaleType } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css']
})
export class ExpenseDetailsComponent implements OnInit {
  category: string = "";
  subCategories = [];
  selectedSubCat: string = "";
  expenseName: String = "";
  expenseValue:any;
  selectedDate: any;
  homeId: any;
  loading = false;
  chartPrepared = false;
  datePickerConfig = {
    max: dayjs(new Date())
  }
  addClicked=true;
  viewClicked=false;
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute,private toastr: ToastrService, private _expService: ExpenseService){
    let extras = this._router.getCurrentNavigation()?.extras;
    this.subCategories = extras?.state?.['sub'];
    let routeSplit = decodeURIComponent(this._router.url).split('/');
    this.category = routeSplit[1];
    // Object.assign(this, { single })
    this.view = [innerWidth / 1.3, 400];
  }







  single: any[] = [];
  multi: any[] = [];

  view: [number, number];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Dates';
  showYAxisLabel = true;
  yAxisLabel = 'Expense';

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454']
  };






  ngOnInit(): void {
    this.selectedDate = dayjs(new Date())
    // this._router.navigate([`${this.category}/expense-details/addExpense`], {'state': {'sub': this.subCategories}});
  }
  add() {
    this.viewClicked = false;
    this.addClicked = true;
  }
  onSelect(event: any) {
    console.log(event);
  }
  viewChart() {
    this.addClicked = false;
    this.viewClicked = true;
    let found = false;
    let obj = {'homeId':  localStorage.getItem('homeId'), 'category': this.category}
    this._expService.getCatExpense(obj).subscribe(data=>{
      let keySet = Object.keys(data);
      let chartArr:Array<any> = [];
      for(let key of keySet){
        let expObj = data[key];
        for(let exp of expObj) {
          for(let idx in chartArr){
            if(chartArr[idx]["name"]== exp.date){
              found = true;
              let objFound = chartArr[idx];
              objFound["value"] = objFound["value"] + exp.expenseValue;
              // console.log(objFound);
              chartArr[idx] = Object.assign({},objFound);
            }
          }
          // let obj = chartArr.filter((el, index)=>{el.name == exp.date})
          if(!found){
          let finalObj = {"name": exp.date, "value":exp.expenseValue}
          chartArr.push(finalObj);
          }
        found = false;
        } 
      }
      chartArr.sort((a,b)=>Date.parse(a.name)-Date.parse(b.name));
      // console.log(chartArr);
      // for(let idx in chartArr) {
      //   let obj = chartArr[idx];
      //   obj.name = moment(obj.name).format('DD-MMM-YYYY');
      //   chartArr[idx] = Object.assign({}, obj);
      // }
      this.single = [...chartArr];
      // Object.assign(this, { chartArr })
      this.chartPrepared = true;
    })
  }
  changeSubCat(e:any){
    this.selectedSubCat = e.target.value;
  }
  submitExpense() {
    if(this.selectedSubCat && this.expenseName && this.expenseValue && this.selectedDate){
      this.loading = true;
      let expenseObj = {'category': this.category, 'subCategory': this.selectedSubCat,
       'expenseName': this.expenseName, 'expenseValue': this.expenseValue,
       'date': `${this.selectedDate.month()+1}-${this.selectedDate.date()}-${this.selectedDate.year()}`,
       'homeId': localStorage.getItem('homeId')
      }
      this._expService.postExpense(expenseObj).subscribe(data=>{
        this.loading = false;
        if(data.status == 'success') {
          this.toastr.success('Expense Saved!',this.category);
        }
      })
      
    }
    else {
      this.toastr.error('Please enter all values!',this.category);
    }
  }

  onResize(event: any) {
    this.view = [event.target.innerWidth / 1.35, 400];
}
}

