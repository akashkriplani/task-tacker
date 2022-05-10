import { Component, OnInit } from '@angular/core';
import { TaskService } from './../../services/task.service';
import { UiService } from './../../services/ui.service';
import { Task } from './../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  showAddTask: boolean = false;

  constructor(
    private tasksService: TaskService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((tasks: Task[]): void => {
      this.tasks = tasks;
    });

    this.uiService.onToggle().subscribe((value: boolean) => {
      this.showAddTask = value;
    });
  }

  deleteTask(task: Task): void {
    this.tasksService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    });
  }

  toggleReminder(task: Task): void {
    task.reminder = !task.reminder;
    this.tasksService.updateTask(task).subscribe();
  }

  addTask(task: Task): void {
    this.tasksService.addTask(task).subscribe((task) => {
      this.tasks.push(task);
    });
  }
}
