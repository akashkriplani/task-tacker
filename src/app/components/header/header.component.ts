import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from './../../services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  title: string = 'Task Tracker';
  showAddTask: boolean = false;
  private subscription$!: Subscription;

  constructor(private uiService: UiService, private router: Router) {}

  ngOnInit(): void {
    this.subscription$ = this.uiService
      .onToggle()
      .subscribe((value: boolean) => {
        this.showAddTask = value;
      });
  }

  toggleAddTask(): void {
    this.uiService.toggleAddTask();
  }

  hasRoute(route: string): boolean {
    return this.router.url === route;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
