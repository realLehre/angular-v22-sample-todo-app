import { Component, inject, signal } from '@angular/core';
import { TasksService } from './tasks.service';
import { TaskForm } from './tasks.model';
import { form, FormField } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';

@Component({
  templateUrl: './tasks.component.html',
  standalone: true,
  selector: 'app-tasks',
  imports: [FormField, FormsModule, TaskComponent],
})
export class TasksComponent {
  private readonly taskService = inject(TasksService);
  tasks = this.taskService.tasks;
  taskFormModel = signal<TaskForm>({
    name: '',
    description: '',
    completed: false,
  });
  taskForm = form(this.taskFormModel);

  protected onSubmit() {
    console.log(this.taskForm().value());
    const task = this.taskForm().value();
    this.taskService.addTask(task).subscribe({
      next: () => {
        this.taskForm().reset();
      },
      error: (err) => {
        console.error('Error adding task:', err);
      },
    });
  }
}
