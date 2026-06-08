import { inject, Service } from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { Task, TaskForm } from './tasks.model';

@Service()
export class TasksService {
  private http = inject(HttpClient);
  baseUrl = 'https://6a248a2d420469ff067b1f54.mockapi.io/api/v1/';
  initialFormData = {
    name: '',
    description: '',
    completed: false,
  };

  tasks = httpResource<Task[]>(() => `${this.baseUrl}tasks`);

  addTask(task: TaskForm) {
    return this.http.post(`${this.baseUrl}tasks`, task);
  }

  deleteTask(taskId: string) {
    return this.http.delete(`${this.baseUrl}tasks/${taskId}`);
  }

  editTask(taskId: string, data: Partial<TaskForm>) {
    return this.http.put(`${this.baseUrl}tasks/${taskId}`, data);
  }
}
