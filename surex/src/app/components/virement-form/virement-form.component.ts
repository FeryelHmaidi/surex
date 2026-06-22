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
  isSubmitted = false;
  errors: any = {};

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
      // Alimenter des valeurs par défaut pour les tests de validation en mode édition
      this.formData.motif = 'Règlement surestaries conteneur MSC';
      this.formData.referenceBL = 'BL-2025-0525';
      this.formData.rib = '08000012345678901234';
      this.formData.banque = 'BIAT';
      this.formData.nomComplet = 'MSC Tunisia Agent';
      this.formData.ribBenef = '12000098765432109876';
      this.formData.banqueBeneficiaire = 'UIB';
    }
    this.isLoading = false;
  }

  validate(): boolean {
    this.errors = {};
    const ribPattern = /^\d{20}$/;

    if (!this.formData.motif || this.formData.motif.trim().length < 3) {
      this.errors.motif = 'Le motif est obligatoire (min. 3 caractères).';
    }

    if (!this.formData.referenceBL || this.formData.referenceBL.trim().length === 0) {
      this.errors.referenceBL = 'La référence BL / LTA est obligatoire.';
    }

    if (!this.formData.montant || this.formData.montant <= 0) {
      this.errors.montant = 'Le montant est obligatoire et doit être supérieur à 0.';
    }

    if (!this.formData.rib || !ribPattern.test(this.formData.rib)) {
      this.errors.rib = 'Le RIB émetteur doit contenir exactement 20 chiffres.';
    }

    if (!this.formData.banque || this.formData.banque.trim().length === 0) {
      this.errors.banque = 'Le nom de la banque émettrice est obligatoire.';
    }

    if (!this.formData.nomComplet || this.formData.nomComplet.trim().length === 0) {
      this.errors.nomComplet = 'Le nom complet du bénéficiaire est obligatoire.';
    }

    if (!this.formData.ribBenef || !ribPattern.test(this.formData.ribBenef)) {
      this.errors.ribBenef = 'Le RIB du bénéficiaire doit contenir exactement 20 chiffres.';
    }

    if (!this.formData.banqueBeneficiaire || this.formData.banqueBeneficiaire.trim().length === 0) {
      this.errors.banqueBeneficiaire = 'La banque du bénéficiaire est obligatoire.';
    }

    return Object.keys(this.errors).length === 0;
  }

  onSave(): void {
    this.isSubmitted = true;
    if (!this.validate()) {
      return;
    }

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
