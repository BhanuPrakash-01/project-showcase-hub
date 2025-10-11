import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Project, ProjectService } from '../../services/project';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.html',
  styleUrls: ['./project-detail.css'],
})
export class ProjectDetailComponent implements OnInit {
  project: Project | null = null;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe((data) => {
        this.project = data;
      });
    }
  }
}
