import { Component, OnInit } from '@angular/core';
import { UiService } from './../../services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker';
  showAddTask: boolean = false;

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.uiService.onToggle().subscribe((value: boolean) => {
      this.showAddTask = value;
    });
  }

  toggleAddTask(): void {
    this.uiService.toggleAddTask();
  }
}
