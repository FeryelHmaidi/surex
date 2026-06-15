import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Transaction, ActorType } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css'],
})
export class TransactionsTableComponent {
  @Input() transactions: Transaction[] = [];
  @Input() currentActor: ActorType = 'importateur';

  getStatutClass(statut: string): string {
    switch (statut) {
      case 'en_cours':
        return 'status-en-cours';
      case 'cloture':
        return 'status-cloture';
      case 'emis':
        return 'status-emis';
      case 'attente':
        return 'status-attente';
      default:
        return 'status-attente';
    }
  }

  getDestinaire(transaction: Transaction): string {
    return (
      transaction.beneficiaire ||
      transaction.destinataire ||
      (transaction.type === 'caution' ? 'Banque bénéficiaire' : 'Agent/Armateur')
    );
  }

  formatStatut(statut: string): string {
    return statut.replace('_', ' ');
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  }

  canApprove(transaction: Transaction): boolean {
    return (
      (this.currentActor === 'banque' &&
        transaction.type === 'caution' &&
        transaction.statut === 'en_cours') ||
      (this.currentActor === 'agent' &&
        transaction.type === 'virementDevises' &&
        transaction.statut === 'en_cours')
    );
  }

  getEditRoute(transaction: Transaction): string[] {
    if (transaction.type === 'caution') {
      return ['/caution', transaction.id];
    }
    return ['/virement', transaction.id];
  }

  onApprove(transaction: Transaction): void {
    console.log('Approve transaction:', transaction.id);
  }

  onEdit(transaction: Transaction): void {
    console.log('Edit transaction:', transaction.id);
  }

  onDelete(transaction: Transaction): void {
    console.log('Delete transaction:', transaction.id);
  }
}
