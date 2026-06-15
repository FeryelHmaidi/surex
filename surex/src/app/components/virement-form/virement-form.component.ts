import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-virement-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './virement-form.component.html',
  styleUrls: ['./virement-form.component.css'],
})
export class VirementFormComponent implements OnInit {
  transaction: Transaction | null = null;
  isLoading = true;
  isSaving = false;
  formData: any = {
    motif: '',
    reference: '',
    referenceBL: '',
    compte: '',
    banque: '',
    beneficiaire: '',
    nomComplet: '',
    rib: '',
    banqueBeneficiaire: '',
  };

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
    const allTransactions = [
      { id: 'VDT-201', ref: 'VIR/DT/0525', montant: 32400, type: 'virementDT' },
      { id: 'VDE-301', ref: 'VIR/EUR/232', montant: 12500, type: 'virementDevises' },
    ];
    
    const found = allTransactions.find((t: any) => t.id === id);
    if (found) {
      this.formData.reference = found.ref;
      this.formData.montant = found.montant;
    }
    this.isLoading = false;
  }

  onSave(): void {
    this.isSaving = true;
    // Simuler l'envoi
    setTimeout(() => {
      console.log('Virement sauvegardé:', this.formData);
      this.isSaving = false;
      this.goBack();
    }, 1000);
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
