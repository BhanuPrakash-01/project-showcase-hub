import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // 1. Import Router
import { Project, ProjectService } from '../../services/project';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css', '../../buttons.css'],
})
export class AdminDashboardComponent implements OnInit {
  pendingProjects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router // 2. Inject Router
  ) {}

  ngOnInit(): void {
    this.loadPendingProjects();
  }

  loadPendingProjects(): void {
    this.projectService.getPendingProjects().subscribe((data) => {
      this.pendingProjects = data;
    });
  }

  // 3. Implement the navigation handler
  navigateToDetail(projectId: string, event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // If the click was on a button or a link, do nothing.
    if (target.closest('button') || target.closest('a')) {
      return;
    }

    // Otherwise, navigate to the detail page.
    this.router.navigate(['/project', projectId]);
  }

  approve(id: string): void {
    this.projectService.approveProject(id).subscribe(() => {
      this.loadPendingProjects();
    });
  }

  reject(id: string): void {
    this.projectService.rejectProject(id).subscribe(() => {
      this.loadPendingProjects();
    });
  }
}
