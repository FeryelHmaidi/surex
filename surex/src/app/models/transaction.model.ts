export type ActorType = 'importateur' | 'banque' | 'agent';
export type TransactionType = 'caution' | 'virementDT' | 'virementDevises';
export type StatutType = 'en_cours' | 'cloture' | 'emis' | 'attente';
export type DeviseType = 'DT' | 'EUR' | 'USD';

export interface Transaction {
  id: string;
  type: TransactionType;
  ref: string;
  montant: number;
  devise: DeviseType;
  statut: StatutType;
  date: string;
  acteur: ActorType;
  sousType?: string;
  emitPar?: ActorType;
  beneficiaire?: string;
  destinataire?: string;
  motif?: string;
  transfertAgentVersArmateur?: boolean;
}

export interface FilterCriteria {
  statut: StatutType | 'tous';
  startDate: string;
  endDate: string;
  search: string;
}

export interface KPIData {
  totalMontant: number;
  totalMontantDevise: string;
  enCoursCount: number;
  clotureMontant: number;
  emisCount: number;
}

export interface ActorRole {
  actor: ActorType;
  title: string;
  subtitle: string;
  displayName: string;
}
