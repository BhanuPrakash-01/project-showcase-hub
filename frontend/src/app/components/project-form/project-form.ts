import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. Import the necessary tools for reactive forms
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project';

@Component({
  selector: 'app-project-form',
  standalone: true,
  // 2. Import ReactiveFormsModule here
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.html',
  styleUrls: ['../../forms.css', '../../buttons.css'],
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;

  // 3. Inject FormBuilder, ProjectService, and Router
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {
    // 4. Initialize the form structure
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      documentation: ['', Validators.required],
      githubLink: ['', Validators.required],
      liveLink: [''],
      techStack: this.fb.array([this.fb.control('')]),
      teamMembers: this.fb.array([this.fb.control('')]),
    });
  }

  ngOnInit(): void {}

  // 5. Helper getters for accessing form arrays in the template
  get techStack() {
    return this.projectForm.get('techStack') as FormArray;
  }

  get teamMembers() {
    return this.projectForm.get('teamMembers') as FormArray;
  }

  // 6. Methods to dynamically add/remove controls
  addTech() {
    this.techStack.push(this.fb.control(''));
  }

  removeTech(index: number) {
    this.techStack.removeAt(index);
  }

  addTeamMember() {
    this.teamMembers.push(this.fb.control(''));
  }

  removeTeamMember(index: number) {
    this.teamMembers.removeAt(index);
  }

  // 7. The submit handler
  onSubmit(): void {
    if (this.projectForm.invalid) {
      return; // If form is not valid, do nothing
    }

    console.log(this.projectForm.value);
    // We will create this service method next

    this.projectService.submitProject(this.projectForm.value).subscribe({
      next: (res) => {
        console.log('Project submitted successfully!', res);
        this.router.navigate(['/']); // Navigate to homepage on success
      },
      error: (err) => console.error('Error submitting project', err),
    });
  }
}
