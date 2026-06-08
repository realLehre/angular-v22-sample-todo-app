import { Component, input, output } from '@angular/core';
import { Task, TaskForm } from '../tasks.model';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
})
export class TaskComponent {
  task = input<Task>();
  taskAction = output<{type: 'edit' | 'delete', id: string}>()

  protected onEdit() {
    this.taskAction.emit({type: 'edit', id: this.task()?.id!})
  }

  protected onDelete() {
    this.taskAction.emit({type: 'delete', id: this.task()?.id!})
  }
}
