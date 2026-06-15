import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction, ActorType, KPIData } from '../../models/transaction.model';
import { KpiGridComponent } from '../kpi-grid/kpi-grid.component';
import { FiltersComponent } from '../filters/filters.component';
import { TabsComponent } from '../tabs/tabs.component';
import { TransactionsTableComponent } from '../transactions-table/transactions-table.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    KpiGridComponent,
    FiltersComponent,
    TabsComponent,
    TransactionsTableComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentActor: ActorType = 'importateur';
  mainTitle: string = 'Gestion des Surestaries';
  subTitle: string = 'Importateur - Cautions & Virements';
  kpiData: KPIData | null = null;
  filteredTransactions: Transaction[] = [];

  private destroy$ = new Subject<void>();

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    // Subscribe to actor changes
    this.transactionService
      .getCurrentActor()
      .pipe(takeUntil(this.destroy$))
      .subscribe((actor) => {
        this.currentActor = actor;
        this.updateTitles();
      });

    // Subscribe to filtered transactions
    this.transactionService
      .getFilteredTransactions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((transactions) => {
        this.filteredTransactions = transactions;
        this.kpiData = this.transactionService.getKPIData(transactions);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateTitles(): void {
    const role = this.transactionService.getActorRole(this.currentActor);
    this.mainTitle = role.title;
    this.subTitle = role.subtitle;
  }

  onActorChange(actor: string): void {
    this.transactionService.setCurrentActor(actor as ActorType);
  }
}
