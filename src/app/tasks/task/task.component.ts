import { Component, input } from '@angular/core';
import { Task, TaskForm } from '../tasks.model';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
})
export class TaskComponent {
  task = input<Task>();
}
