import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { TransactionType, ActorType } from '../../models/transaction.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface TabItem {
  id: TransactionType;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit, OnDestroy {
  currentTab: TransactionType = 'caution';
  currentActor: ActorType = 'importateur';
  visibleTabs: TransactionType[] = ['caution', 'virementDT', 'virementDevises'];
  private destroy$ = new Subject<void>();

  tabItems: TabItem[] = [
    { id: 'caution', label: '📄 Cautions', icon: '🛡️' },
    { id: 'virementDT', label: '💰 Virements DT', icon: '💰' },
    { id: 'virementDevises', label: '🌍 Virements Devises', icon: '🌍' },
  ];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService
      .getCurrentTab()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tab) => {
        this.currentTab = tab;
      });

    this.transactionService
      .getCurrentActor()
      .pipe(takeUntil(this.destroy$))
      .subscribe((actor) => {
        this.currentActor = actor;
        this.visibleTabs = this.transactionService.getVisibleTabs(actor);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTabClick(tab: TransactionType): void {
    this.transactionService.setCurrentTab(tab);
  }

  isTabVisible(tab: TransactionType): boolean {
    return this.visibleTabs.includes(tab);
  }
}
