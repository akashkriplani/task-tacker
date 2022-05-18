import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../state/app.state';
import {
  addTask,
  loadTasks,
  removeTask,
  updateTask,
} from '../../state/task/task.actions';
import { selectAllTasks } from '../../state/task/task.selectors';
import { UiService } from './../../services/ui.service';
import { Task } from './../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  showAddTask: boolean = false;
  private subscriptions$: Subscription = new Subscription();

  constructor(private uiService: UiService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadTasks());

    this.subscriptions$.add(
      this.store.select(selectAllTasks).subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      })
    );

    this.subscriptions$.add(
      this.uiService.onToggle().subscribe((value: boolean) => {
        this.showAddTask = value;
      })
    );
  }

  deleteTask(task: Task): void {
    this.store.dispatch(removeTask({ id: task.id }));
  }

  toggleReminder(task: Task): void {
    this.store.dispatch(
      updateTask({ task: { ...task, reminder: !task.reminder } })
    );
  }

  addTask(task: Task): void {
    this.store.dispatch(addTask({ task }));
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
