import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { AppState } from '../app.state';
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
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private taskService: TaskService
  ) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      switchMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => loadTasksSuccess({ tasks: tasks })),
          catchError((error) => of(loadTasksFailure({ error })))
        )
      )
    )
  );

  addTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      switchMap((action) =>
        this.taskService.addTask(action.task).pipe(
          map((task) => addTaskSuccess({ task })),
          catchError((error) => of(addTaskFailure({ error })))
        )
      )
    )
  );

  updateTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateTask),
        switchMap((updatedTask) => {
          return this.taskService.updateTask(updatedTask.task);
        })
      ),
    { dispatch: false }
  );

  removeTasks$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeTask),
        switchMap((action) => {
          return this.taskService.deleteTask(action.id as number);
        })
      ),
    { dispatch: false }
  );
}
