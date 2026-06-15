import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VirementFormComponent } from './components/virement-form/virement-form.component';
import { CautionFormComponent } from './components/caution-form/caution-form.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'virement/new',
    component: VirementFormComponent,
  },
  {
    path: 'virement/:id',
    component: VirementFormComponent,
  },
  {
    path: 'caution/new',
    component: CautionFormComponent,
  },
  {
    path: 'caution/:id',
    component: CautionFormComponent,
  },
];
