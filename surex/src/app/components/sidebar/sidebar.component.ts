import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { ActorType } from '../../models/transaction.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface NavItem {
  icon: string;
  label: string;
  view: string;
  dataView: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  currentActor: ActorType = 'importateur';
  currentTab: string = 'caution';
  displayName: string = 'Importateur';
  private destroy$ = new Subject<void>();

  navItems: NavItem[] = [
    {
      icon: '📊',
      label: 'Tableau de bord',
      view: 'dashboard',
      dataView: 'dashboard',
    },
    {
      icon: '🛡️',
      label: 'Cautions bancaires',
      view: 'caution',
      dataView: 'caution',
    },
    {
      icon: '💰',
      label: 'Virement DT',
      view: 'virement-dt',
      dataView: 'virement-dt',
    },
    {
      icon: '🌍',
      label: 'Virement Devises',
      view: 'virement-devises',
      dataView: 'virement-devises',
    },
    {
      icon: '📄',
      label: 'Documents',
      view: 'documents',
      dataView: 'documents',
    },
  ];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getCurrentActor()
      .pipe(takeUntil(this.destroy$))
      .subscribe((actor) => {
        this.currentActor = actor;
        const role = this.transactionService.getActorRole(actor);
        this.displayName = role.displayName;
      });

    this.transactionService.getCurrentTab()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tab) => {
        this.currentTab = tab;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onNavItemClick(item: NavItem): void {
    if (item.dataView === 'dashboard') {
      this.transactionService.setCurrentTab('caution');
    } else if (item.dataView === 'caution') {
      this.transactionService.setCurrentTab('caution');
    } else if (item.dataView === 'virement-dt') {
      this.transactionService.setCurrentTab('virementDT');
    } else if (item.dataView === 'virement-devises') {
      this.transactionService.setCurrentTab('virementDevises');
    }
  }
}
