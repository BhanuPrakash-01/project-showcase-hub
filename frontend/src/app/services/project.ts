// frontend/src/app/services/project.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// We define an interface for type safety. This describes the shape of a project object.
export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveLink?: string; // The '?' makes it optional
  documentation: string;
  teamMembers: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  // The URL of our backend's public projects endpoint
  private apiUrl = `${environment.apiUrl}/projects`;

  // Inject the HttpClient tool into our service
  constructor(private http: HttpClient) {}

  // A method to get all approved projects from the API
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  submitProject(projectData: any): Observable<any> {
    // The interceptor will automatically add the token to this request
    return this.http.post<any>(this.apiUrl, projectData);
  }

  private adminApiUrl = `${environment.apiUrl}/admin`;
  
  getPendingProjects(): Observable<Project[]> {
    // The auth interceptor will add the token automatically
    return this.http.get<Project[]>(`${this.adminApiUrl}/projects/pending`);
  }

  approveProject(id: string): Observable<any> {
    return this.http.put(`${this.adminApiUrl}/projects/${id}/approve`, {});
  }

  rejectProject(id: string): Observable<any> {
    return this.http.put(`${this.adminApiUrl}/projects/${id}/reject`, {});
  }
  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.adminApiUrl}/projects/${id}`);
  }
  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }
}
