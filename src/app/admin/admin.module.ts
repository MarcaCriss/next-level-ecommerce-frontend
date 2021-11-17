import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [NavComponent, DashboardComponent, SidebarComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
})
export class AdminModule { }
