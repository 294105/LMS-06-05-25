import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LandingComponent } from './landing/landing.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './shared/auth.guard';
import { TutorGuard } from './shared/tutor/tutor.guard';
import { StudentGuard } from './shared/student/student.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'live-coding',
    loadComponent: () =>
      import('./live-coding/live-coding.component').then(m => m.LiveCodingComponent)
  },
  
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Student routes
      {
        path: 'courses',
        canActivate: [AuthGuard, StudentGuard],
        loadComponent: () =>
          import('./courses/course-list/course-list.component')
            .then(m => m.CourseListComponent)
      },
      {
        path: 'courses/:id',
        canActivate: [AuthGuard, StudentGuard],
        loadComponent: () =>
          import('./courses/course-details/course-detail.component')
            .then(m => m.CourseDetailComponent)
      },
      {
        path: 'my-courses',
        canActivate: [AuthGuard, StudentGuard],
        loadComponent: () =>
          import('./courses/my-course/my-courses.component')
            .then(m => m.MyCoursesComponent)
      },
      {
        path: 'student-dashboard',
        canActivate: [AuthGuard, StudentGuard],
        loadComponent: () => import('./dashboard/student/student-dashboard.component')
          .then(m => m.StudentDashboardComponent)
      },
      {
        path: 'student-progress',
        canActivate: [AuthGuard, StudentGuard],
        loadComponent: () => import('./dashboard/student/student-progress/student-progress.component')
          .then(m => m.StudentProgressComponent)
      },
      
      // Tutor routes
      {
        path: 'tutor-dashboard',
        canActivate: [AuthGuard, TutorGuard],
        loadComponent: () =>
          import('./dashboard/tutor/tutor-dashboard.component')
            .then(m => m.TutorDashboardComponent)
      },
      {
        path: 'create-course',
        canActivate: [AuthGuard, TutorGuard],
        loadComponent: () =>
          import('./courses/create-course/create-course.component')
            .then(m => m.CreateCourseComponent)
      },
      {
        path: 'tutor-dashboard/course/:id',
        canActivate: [AuthGuard, TutorGuard],
        loadComponent: () =>
          import('./courses/manage-course/manage-course.component')
            .then(m => m.ManageCourseComponent)
      },
      {
        path: 'edit-course/:id',
        canActivate: [AuthGuard, TutorGuard],
        loadComponent: () =>
          import('./courses/edit-course/edit-course.component')
            .then(m => m.EditCourseComponent)
      },
      {
        path: 'tutor-progress',
        canActivate: [AuthGuard, TutorGuard],
        loadComponent: () =>
          import('./dashboard/tutor/tutor-progress/tutor-progress.component')
            .then(m => m.TutorProgressComponent)
      },
      
      // Chatroom route
      {
        path: 'community/chatroom',
        canActivate: [AuthGuard], // Only logged-in users
        loadComponent: () =>
          import('./chatroom/chatroom.component').then(m => m.ChatroomComponent)
      },
    ]
  },

  { path: '**', redirectTo: 'welcome' }
];
