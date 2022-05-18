import { createReducer, on } from '@ngrx/store';
import { Task } from './../../Task';
import {
  addTask,
  addTaskFailure,
  addTaskSuccess,
  loadTasks,
  loadTasksFailure,
  loadTasksSuccess,
  removeTask,
  updateTask,
} from './task.actions';

export interface TaskState {
  tasks: Task[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: TaskState = {
  tasks: [],
  error: '',
  status: 'pending',
};

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [
      ...state.tasks,
      {
        id: task.id,
        text: task.text,
        day: task.day,
        reminder: task.reminder,
      },
    ],
  })),
  on(addTaskFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  on(removeTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
  })),
  on(updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => {
      if (t.id === task.id) {
        return task;
      } else {
        return t;
      }
    }),
  })),
  on(loadTasks, (state) => ({ ...state, status: 'loading' })),
  // Handle successfully loaded todos
  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
    error: '',
    status: 'success',
  })),
  // Handle todos load failure
  on(loadTasksFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);
