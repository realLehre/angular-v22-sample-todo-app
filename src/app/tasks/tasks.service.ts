import { inject, Service } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Task, TaskForm } from './tasks.model';

@Service()
export class TasksService {
  private http = inject(HttpClient)
  baseUrl = 'https://6a248a2d420469ff067b1f54.mockapi.io/api/v1/';

  tasks = httpResource<Task[]>(() => ({
    url: `${this.baseUrl}tasks`
  }))

  addTask(task: TaskForm) {
    return this.http.post(`${this.baseUrl}tasks`, task)
  }
}
