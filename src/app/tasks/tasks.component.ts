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
        this.tasks.reload();
      },
      error: (err) => {
        console.error('Error adding task:', err);
      },
    });
  }

  protected onTaskAction($event: { type: 'edit' | 'delete'; id: string }) {
    if($event.type === 'delete') {
      if(confirm('Are you sure you want to delete this task?')) {
        this.taskService.deleteTask($event.id).subscribe({
          next: () => {
            this.tasks.reload();
            console.log('Task deleted successfully');
          },
          error: (err) => {
            console.error('Error deleting task:', err);
          },
        });
      }
    } else if($event.type === 'edit') {
      const task = this.tasks.value()?.find(t => t.id === $event.id);
      this.taskFormModel.set({...task!})
    }
  }
}
