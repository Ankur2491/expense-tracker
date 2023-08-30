import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('');
  currentStatus = this.messageSource.asObservable();

  constructor() { }

  changeStatus(message: string) {
    this.messageSource.next(message)
  }

}