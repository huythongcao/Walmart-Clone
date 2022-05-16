import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    MatButtonModule,
    MatTableModule
  ],
  // providers: [AuthService]
})
export class AdminModule {}
