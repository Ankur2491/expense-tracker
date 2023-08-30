import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';
import { ExpenseService } from '../expense.service';
@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent {
  selectedDate: any;
  selectedMode = "add";
  category: string = "";
  subCategories = [];
  selectedSubCat: string = "";
  expenseName: String = "";
  expenseValue:any;
  homeId: any;
  loading = false;
  datePickerConfig = {
    max: dayjs(new Date())
  }
constructor(private _router: Router, private _activatedRoute: ActivatedRoute,private toastr: ToastrService, private _expService: ExpenseService) {
    let extras = this._router.getCurrentNavigation()?.extras;
    this.subCategories = extras?.state?.['sub'];
    let routeSplit = decodeURIComponent(this._router.url).split('/');
    this.category = routeSplit[1];
}
add() {
  this.selectedMode = "add";
}
view() {
  this._router.navigate([`${this.category}/expense-details/viewExpense`], {'state': {'sub': this.subCategories}});
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
}
