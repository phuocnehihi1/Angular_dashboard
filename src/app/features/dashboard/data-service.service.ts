import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  data = new BehaviorSubject<any>('');
  currentData = this.data.asObservable();

  upDateData(data: any) {
    this.data.next(data);
  }
  constructor() {}
}
