import { required, schema } from '@angular/forms/signals';

export interface TaskForm {
  name: string;
  description: string;
  completed: boolean;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

export const formSchema = schema<TaskForm>((schemaPath) => {
  required(schemaPath.name, {
    message: 'Task name is required',
  });

  required(schemaPath.description, {
    message: 'Task description is required',
  });
});
