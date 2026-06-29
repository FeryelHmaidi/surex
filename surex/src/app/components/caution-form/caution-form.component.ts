import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-caution-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './caution-form.component.html',
  styleUrls: ['./caution-form.component.css'],
})
export class CautionFormComponent implements OnInit {
  transaction: Transaction | null = null;
  isLoading = true;
  isSaving = false;
  isSubmitted = false;
  cautionForm!: FormGroup;

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
    private transactionService: TransactionService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

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

  private initForm(): void {
    this.cautionForm = this.fb.group({
      reference: ['', [Validators.required]],
      type: ['douaniere', [Validators.required]],
      montant: ['', [Validators.required, Validators.min(0.01)]],
      devise: ['DT', [Validators.required]],
      beneficiaire: ['', [Validators.required]],
      nomBanque: ['', [Validators.required]],
      numeroCompte: ['', [Validators.required]],
      rib: ['', [Validators.required, Validators.pattern(/^\d{20}$/)]],
      dateEmission: ['', [Validators.required]],
      dateExpiration: ['', [Validators.required]],
      description: [''],
    }, { validators: this.dateLessThan('dateEmission', 'dateExpiration') });
  }

  private dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} | null => {
      const f = group.get(from);
      const t = group.get(to);
      if (f && t) {
        if (f.value && t.value && f.value > t.value) {
          t.setErrors({ dateLessThan: true });
          return { dateLessThan: true };
        } else if (t.hasError('dateLessThan')) {
          const errors = { ...t.errors };
          delete errors['dateLessThan'];
          t.setErrors(Object.keys(errors).length > 0 ? errors : null);
        }
      }
      return null;
    };
  }

  loadTransaction(id: string): void {
    const found = this.transactionService.getTransactionById(id);
    if (found && found.type === 'caution') {
      this.transaction = found;
      this.cautionForm.patchValue({
        reference: found.ref,
        montant: found.montant,
        type: found.sousType === 'Caution douanière' ? 'douaniere' : 'execution',
        devise: found.devise,
        dateEmission: found.date,
        dateExpiration: found.date,
        beneficiaire: found.beneficiaire || '',
        nomBanque: found.emitPar || 'BIAT',
        numeroCompte: '0320010020030040',
        rib: '08000012345678901234',
        description: found.motif || '',
      });
    } else if (found) {
      this.goBack();
    }
    this.isLoading = false;
  }

  get f() {
    return this.cautionForm.controls;
  }

  onSave(): void {
    this.isSubmitted = true;
    if (this.cautionForm.invalid) {
      return;
    }

    this.isSaving = true;
    const formVal = this.cautionForm.value;

    const transactionData = {
      type: 'caution' as const,
      ref: formVal.reference,
      montant: Number(formVal.montant),
      devise: formVal.devise,
      date: formVal.dateEmission,
      acteur: 'importateur' as const,
      sousType: formVal.type === 'douaniere' ? 'Caution douanière' : 'Bonne exécution',
      emitPar: formVal.nomBanque,
      beneficiaire: formVal.beneficiaire,
      motif: formVal.description,
    };

    setTimeout(() => {
      if (this.transaction) {
        this.transactionService.updateTransaction(this.transaction.id, transactionData);
      } else {
        this.transactionService.addTransaction(transactionData);
      }
      this.isSaving = false;
      this.goBack();
    }, 1000);
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
