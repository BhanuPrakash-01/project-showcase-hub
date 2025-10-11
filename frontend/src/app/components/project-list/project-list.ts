import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 
import { Project, ProjectService } from '../../services/project';
import { AuthService } from '../../services/auth'; // 1. Import AuthService

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.css'],
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  // 2. Inject AuthService in the constructor
  constructor(
    private projectService: ProjectService,
    public authService: AuthService, // Make it public to access in template
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }

  //Implement the new navigation handler
  navigateToDetail(projectId: string, event: MouseEvent): void {
    const target = event.target as HTMLElement;
    
    // The .closest() method checks the clicked element and its parents.
    // If the click happened on a button or an anchor tag, we do nothing.
    if (target.closest('button') || target.closest('a')) {
      return; 
    }

    // Otherwise, we navigate to the detail page.
    this.router.navigate(['/project', projectId]);
  }

  // 3. Add the delete method
  deleteProject(id: string): void {
    if (confirm('Are you sure you want to delete this project permanently?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          // On success, refresh the project list
          this.loadProjects();
        },
        error: (err) => console.error('Failed to delete project', err),
      });
    }
  }
}
