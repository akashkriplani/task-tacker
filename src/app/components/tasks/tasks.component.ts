import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from './../../services/task.service';
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

  constructor(
    private tasksService: TaskService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.subscriptions$.add(
      this.tasksService.getTasks().subscribe((tasks: Task[]): void => {
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
    this.subscriptions$.add(
      this.tasksService.deleteTask(task).subscribe(() => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      })
    );
  }

  toggleReminder(task: Task): void {
    task.reminder = !task.reminder;
    this.subscriptions$.add(this.tasksService.updateTask(task).subscribe());
  }

  addTask(task: Task): void {
    this.subscriptions$.add(
      this.tasksService.addTask(task).subscribe((task) => {
        this.tasks.push(task);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
