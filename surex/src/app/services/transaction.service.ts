import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable ,combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Transaction,
  FilterCriteria,
  ActorType,
  TransactionType,
  KPIData,
} from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly allTransactions: Transaction[] = [
    {
      id: 'C-1001',
      type: 'caution',
      ref: 'CAU/2025/001',
      montant: 150000,
      devise: 'DT',
      statut: 'en_cours',
      date: '2025-05-10',
      acteur: 'importateur',
      sousType: 'Caution douanière',
      emitPar: 'importateur',
      beneficiaire: 'Douane Tunisienne',
    },
    {
      id: 'C-1002',
      type: 'caution',
      ref: 'CAU/2025/045',
      montant: 89000,
      devise: 'DT',
      statut: 'cloture',
      date: '2025-04-22',
      acteur: 'importateur',
      sousType: 'Bonne exécution',
      emitPar: 'importateur',
      beneficiaire: 'Client final',
    },
    {
      id: 'C-1003',
      type: 'caution',
      ref: 'CAU/2025/102',
      montant: 450000,
      devise: 'DT',
      statut: 'emis',
      date: '2025-05-18',
      acteur: 'banque',
      sousType: 'Caution douanière',
      emitPar: 'banque',
      beneficiaire: 'Douane',
    },
    {
      id: 'VDT-201',
      type: 'virementDT',
      ref: 'VIR/DT/0525',
      montant: 32400,
      devise: 'DT',
      statut: 'emis',
      date: '2025-05-15',
      acteur: 'importateur',
      destinataire: 'Agent Maritime',
      motif: 'Surestaries - Conteneur MSCU123',
    },
    {
      id: 'VDT-202',
      type: 'virementDT',
      ref: 'VIR/DT/0589',
      montant: 21750,
      devise: 'DT',
      statut: 'en_cours',
      date: '2025-05-19',
      acteur: 'importateur',
      destinataire: 'Agent Maritime',
      motif: 'Surestaries - Conteneur CMAU789',
    },
    {
      id: 'VDE-301',
      type: 'virementDevises',
      ref: 'VIR/EUR/232',
      montant: 12500,
      devise: 'EUR',
      statut: 'cloture',
      date: '2025-05-05',
      acteur: 'agent',
      destinataire: 'Armateur MSC',
      motif: 'Surestaries international',
      transfertAgentVersArmateur: true,
    },
    {
      id: 'VDE-302',
      type: 'virementDevises',
      ref: 'VIR/USD/341',
      montant: 8900,
      devise: 'USD',
      statut: 'en_cours',
      date: '2025-05-17',
      acteur: 'agent',
      destinataire: 'Armateur CMA CGM',
      motif: 'Surestaries - surestaries',
      transfertAgentVersArmateur: true,
    },
    {
      id: 'VDE-303',
      type: 'virementDevises',
      ref: 'VIR/EUR/456',
      montant: 43000,
      devise: 'EUR',
      statut: 'emis',
      date: '2025-05-20',
      acteur: 'agent',
      destinataire: 'Armateur Hapag',
      motif: 'Retard conteneurs',
      transfertAgentVersArmateur: true,
    },
  ];

  private currentActor$ = new BehaviorSubject<ActorType>('importateur');
  private currentTab$ = new BehaviorSubject<TransactionType>('caution');
  private filters$ = new BehaviorSubject<FilterCriteria>({
    statut: 'tous',
    startDate: '',
    endDate: '',
    search: '',
  });

  constructor() {}

  getCurrentActor(): Observable<ActorType> {
    return this.currentActor$.asObservable();
  }

  setCurrentActor(actor: ActorType): void {
    this.currentActor$.next(actor);
  }

  getCurrentTab(): Observable<TransactionType> {
    return this.currentTab$.asObservable();
  }

  setCurrentTab(tab: TransactionType): void {
    this.currentTab$.next(tab);
  }

  getFilters(): Observable<FilterCriteria> {
    return this.filters$.asObservable();
  }

  setFilters(filters: FilterCriteria): void {
    this.filters$.next(filters);
  }

  resetFilters(): void {
    this.filters$.next({
      statut: 'tous',
      startDate: '',
      endDate: '',
      search: '',
    });
  }

getFilteredTransactions(): Observable<Transaction[]> {
  return combineLatest([this.filters$, this.currentTab$, this.currentActor$]).pipe(
    map(([filters]) => this.filterData(filters))
  );
}

  private filterData(filters: FilterCriteria): Transaction[] {
    let filtered = this.allTransactions.filter((transaction) => {
      // Filter by actor
      if (
        this.currentActor$.value === 'importateur' &&
        transaction.acteur !== 'importateur'
      ) {
        return false;
      }
      if (
        this.currentActor$.value === 'banque' &&
        transaction.type !== 'caution'
      ) {
        return false;
      }
      if (
        this.currentActor$.value === 'agent' &&
        transaction.type !== 'virementDevises' &&
        transaction.acteur !== 'agent'
      ) {
        return false;
      }

      // Filter by status
      if (
        filters.statut !== 'tous' &&
        transaction.statut !== filters.statut
      ) {
        return false;
      }

      // Filter by date range
      if (filters.startDate && transaction.date < filters.startDate) {
        return false;
      }
      if (filters.endDate && transaction.date > filters.endDate) {
        return false;
      }

      // Filter by search
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchRef = transaction.ref
          .toLowerCase()
          .includes(searchLower);
        const matchMotif =
          transaction.motif &&
          transaction.motif.toLowerCase().includes(searchLower);
        if (!matchRef && !matchMotif) {
          return false;
        }
      }

      return true;
    });

    // Filter by current tab
    if (this.currentTab$.value === 'caution') {
      filtered = filtered.filter((t) => t.type === 'caution');
    } else if (this.currentTab$.value === 'virementDT') {
      filtered = filtered.filter((t) => t.type === 'virementDT');
    } else if (this.currentTab$.value === 'virementDevises') {
      filtered = filtered.filter((t) => t.type === 'virementDevises');
    }

    return filtered;
  }

  getKPIData(transactions: Transaction[]): KPIData {
    const totalMontant = transactions.reduce(
      (sum, t) => sum + t.montant,
      0
    );
    const enCoursCount = transactions.filter(
      (t) => t.statut === 'en_cours'
    ).length;
    const emisCount = transactions.filter(
      (t) => t.statut === 'emis'
    ).length;
    const clotureMontant = transactions.filter(
      (t) => t.statut === 'cloture'
    ).length;

    return {
      totalMontant,
      totalMontantDevise: transactions[0]?.devise || 'DT',
      enCoursCount,
      clotureMontant,
      emisCount,
    };
  }

  getActorRole(actor: ActorType): {
    title: string;
    subtitle: string;
    displayName: string;
  } {
    const roles: Record<
      ActorType,
      { title: string; subtitle: string; displayName: string }
    > = {
      importateur: {
        title: 'Gestion des Surestaries',
        subtitle: 'Importateur - Cautions & Virements',
        displayName: 'Importateur',
      },
      banque: {
        title: 'Validation des Cautions',
        subtitle:
          'Banque - Suivi des garanties douanières et exécution',
        displayName: 'Banque',
      },
      agent: {
        title: 'Hub Agent Maritime',
        subtitle:
          'Transfert d\'ordre de virement devises vers armateur',
        displayName: 'Agent Maritime',
      },
    };

    return roles[actor];
  }

  getVisibleTabs(actor: ActorType): TransactionType[] {
    if (actor === 'banque') {
      return ['caution'];
    }
    if (actor === 'agent') {
      return ['virementDevises'];
    }
    return ['caution', 'virementDT', 'virementDevises'];
  }
}
