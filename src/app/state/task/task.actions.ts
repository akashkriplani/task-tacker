import { createAction, props } from '@ngrx/store';
import { Task } from '../../Task';

export const TASK_PREFIX = '[Task Page]';

export const addTask = createAction(
  `${TASK_PREFIX} add task`,
  props<{ task: Task }>()
);

export const addTaskSuccess = createAction(
  `${TASK_PREFIX} add task success`,
  props<{ task: Task }>()
);

export const addTaskFailure = createAction(
  `${TASK_PREFIX} add task error`,
  props<{ error: string }>()
);

export const loadTasks = createAction(`${TASK_PREFIX} load tasks`);

export const loadTasksSuccess = createAction(
  `${TASK_PREFIX} Task Load Success`,
  props<{ tasks: Task[] }>()
);

export const loadTasksFailure = createAction(
  `${TASK_PREFIX} Task Load Failure`,
  props<{ error: string }>()
);

export const removeTask = createAction(
  `${TASK_PREFIX} remove task`,
  props<{ id: number | undefined }>()
);

export const updateTask = createAction(
  `${TASK_PREFIX} update task`,
  props<{ task: Task }>()
);
