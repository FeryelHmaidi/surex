import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-caution-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './caution-form.component.html',
  styleUrls: ['./caution-form.component.css'],
})
export class CautionFormComponent implements OnInit {
  transaction: Transaction | null = null;
  isLoading = true;
  isSaving = false;
  formData: any = {
    reference: '',
    type: 'douaniere',
    montant: '',
    devise: 'DT',
    sousType: '',
    beneficiaire: '',
    nomBanque: '',
    numeroCompte: '',
    rib: '',
    dateEmission: '',
    dateExpiration: '',
    description: '',
  };

  cautionTypes = [
    { value: 'douaniere', label: 'Caution douanière' },
    { value: 'execution', label: 'Bonne exécution' },
    { value: 'avance', label: 'Caution avance' },
    { value: 'autre', label: 'Autre' },
  ];

  devises = ['DT', 'EUR', 'USD'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.loadTransaction(id);
      } else {
        this.isLoading = false;
      }
    });
  }

  loadTransaction(id: string): void {
    // Simulé - en réalité venir du service
    this.isLoading = false;
  }

  onSave(): void {
    this.isSaving = true;
    // Simuler l'envoi
    setTimeout(() => {
      console.log('Caution sauvegardée:', this.formData);
      this.isSaving = false;
      this.goBack();
    }, 1000);
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
