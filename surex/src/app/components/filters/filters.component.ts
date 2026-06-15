import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { FilterCriteria, StatutType } from '../../models/transaction.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  filters: FilterCriteria = {
    statut: 'tous',
    startDate: '',
    endDate: '',
    search: '',
  };

  private destroy$ = new Subject<void>();

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService
      .getFilters()
      .pipe(takeUntil(this.destroy$))
      .subscribe((filters) => {
        this.filters = filters;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onStatutChange(value: string): void {
    this.filters.statut = value as StatutType | 'tous';
    this.transactionService.setFilters(this.filters);
  }

  onStartDateChange(value: string): void {
    this.filters.startDate = value;
    this.transactionService.setFilters(this.filters);
  }

  onEndDateChange(value: string): void {
    this.filters.endDate = value;
    this.transactionService.setFilters(this.filters);
  }

  onSearchChange(value: string): void {
    this.filters.search = value;
    this.transactionService.setFilters(this.filters);
  }

  resetFilters(): void {
    this.filters = {
      statut: 'tous',
      startDate: '',
      endDate: '',
      search: '',
    };
    this.transactionService.resetFilters();
  }
}
