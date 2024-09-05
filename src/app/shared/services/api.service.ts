import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TTable } from '../../features/users-table/models/table.models';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);

  getUsersData$() {
    return this.http.get<TTable>('https://jsonplaceholder.typicode.com/comments')
      .pipe(delay(2000)); // Simulate network delay
  }
}
