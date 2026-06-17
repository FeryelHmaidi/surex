import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  referenceBL: string;
  dateAdded: string;
  size: string;
  status: 'Validé' | 'En attente' | 'Rejeté';
}

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  isDragOver = false;
  selectedFileName = '';
  selectedFileSize = '';
  
  searchTerm = '';
  filterType = 'Tous';

  newDoc = {
    type: 'Connaissement (BL)',
    referenceBL: ''
  };

  // Mock initial documents
  documents: DocumentItem[] = [
    {
      id: 'doc-1',
      name: 'BL_MSCU9876543_SUREX.pdf',
      type: 'Connaissement (BL)',
      referenceBL: 'BL-2025-001',
      dateAdded: '15/06/2026',
      size: '1.2 Mo',
      status: 'Validé'
    },
    {
      id: 'doc-2',
      name: 'Facture_Surestaries_MSC_09922.pdf',
      type: 'Facture Surestaries',
      referenceBL: 'BL-2025-001',
      dateAdded: '16/06/2026',
      size: '345 Ko',
      status: 'Validé'
    },
    {
      id: 'doc-3',
      name: 'BAD_MSC_RELEASE_SIGNED.pdf',
      type: 'Bon à Délivrer (BAD)',
      referenceBL: 'BL-2025-002',
      dateAdded: '16/06/2026',
      size: '890 Ko',
      status: 'En attente'
    },
    {
      id: 'doc-4',
      name: 'Swift_Transfer_BIAT_55432.pdf',
      type: 'Reçu Swift (Paiement)',
      referenceBL: 'BL-2025-003',
      dateAdded: '17/06/2026',
      size: '210 Ko',
      status: 'En attente'
    },
    {
      id: 'doc-5',
      name: 'Lettre_Garantie_Banque_Tunisie.pdf',
      type: 'Lettre de Garantie',
      referenceBL: 'BL-2025-004',
      dateAdded: '14/06/2026',
      size: '2.1 Mo',
      status: 'Rejeté'
    }
  ];

  filteredDocs: DocumentItem[] = [];

  ngOnInit(): void {
    this.filteredDocs = [...this.documents];
  }

  // Search and Filter logic
  filterDocuments(): void {
    this.filteredDocs = this.documents.filter(doc => {
      const matchesSearch = 
        doc.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doc.referenceBL.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesType = 
        this.filterType === 'Tous' || doc.type === this.filterType;

      return matchesSearch && matchesType;
    });
  }

  // Drag & Drop events
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.handleFileSelection(file);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFileSelection(file);
    }
  }

  handleFileSelection(file: File): void {
    this.selectedFileName = file.name;
    // Format size
    const sizeInKb = file.size / 1024;
    if (sizeInKb > 1024) {
      this.selectedFileSize = (sizeInKb / 1024).toFixed(1) + ' Mo';
    } else {
      this.selectedFileSize = sizeInKb.toFixed(0) + ' Ko';
    }
  }

  clearSelectedFile(): void {
    this.selectedFileName = '';
    this.selectedFileSize = '';
  }

  // Add Document
  addDocument(): void {
    if (!this.selectedFileName || !this.newDoc.referenceBL) return;

    const today = new Date();
    const formattedDate = 
      String(today.getDate()).padStart(2, '0') + '/' +
      String(today.getMonth() + 1).padStart(2, '0') + '/' +
      today.getFullYear();

    const newItem: DocumentItem = {
      id: 'doc-' + (this.documents.length + 1),
      name: this.selectedFileName,
      type: this.newDoc.type,
      referenceBL: this.newDoc.referenceBL.toUpperCase(),
      dateAdded: formattedDate,
      size: this.selectedFileSize || '1.0 Mo',
      status: 'En attente'
    };

    // Add to list
    this.documents.unshift(newItem);
    this.filterDocuments();

    // Reset Form
    this.clearSelectedFile();
    this.newDoc.referenceBL = '';
    
    alert('Document "' + newItem.name + '" ajouté avec succès !');
  }

  // Actions
  downloadDoc(doc: DocumentItem): void {
    alert('Téléchargement simulé pour : ' + doc.name);
  }

  previewDoc(doc: DocumentItem): void {
    alert('Aperçu simulé pour : ' + doc.name + '\nStatut: ' + doc.status);
  }

  deleteDoc(doc: DocumentItem): void {
    if (confirm('Voulez-vous vraiment supprimer le document "' + doc.name + '" ?')) {
      this.documents = this.documents.filter(d => d.id !== doc.id);
      this.filterDocuments();
    }
  }
}
