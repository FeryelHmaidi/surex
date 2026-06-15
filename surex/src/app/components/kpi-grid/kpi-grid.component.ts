import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KPIData } from '../../models/transaction.model';

@Component({
  selector: 'app-kpi-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-grid.component.html',
  styleUrls: ['./kpi-grid.component.css'],
})
export class KpiGridComponent {
  @Input() kpiData: KPIData | null = null;
}
