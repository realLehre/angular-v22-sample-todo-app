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
  taskFormModel = signal<TaskForm>(this.taskService.initialFormData);
  taskForm = form(this.taskFormModel);
  editing = signal(false);
  activeTaskId = signal<string | null>(null);

  protected onSubmit() {
    console.log(this.taskForm().value());
    const task = this.taskForm().value();
    if(!this.editing()) {
      this.taskService.addTask(task).subscribe({
        next: () => {
          this.resetState();
        },
        error: (err) => {
          console.error('Error adding task:', err);
        },
      });
    } else {
      this.taskService.editTask(this.activeTaskId()!, task).subscribe({
        next: () => {
          this.resetState();
        },
        error: (err) => {
          console.error('Error editing task:', err);
        },
      });

    }
  }

  protected onTaskAction($event: { type: 'edit' | 'delete'; id: string }) {
    this.activeTaskId.set($event.id);
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
      this.editing.set(true);
    }
  }

  protected resetState() {
    this.taskFormModel.set(this.taskService.initialFormData);
    this.tasks.reload();
    this.activeTaskId.set(null);
    this.editing.set(false);
  }
}
