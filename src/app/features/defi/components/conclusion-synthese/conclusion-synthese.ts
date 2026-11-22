
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EtapeSynthese {
  numero: number;
  titre: string;
  description: string;
  couleur: string;
}

@Component({
  selector: 'app-conclusion-synthese',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conclusion-synthese.html',
  styleUrl: './conclusion-synthese.scss'
})
export class ConclusionSynthese {

  readonly score = input<number>(78);

  readonly revoir = output<void>();
  readonly terminer = output<void>();

  readonly etapes: EtapeSynthese[] = [
    {
      numero: 1,
      titre: 'Observer',
      description: 'le territoire',
      couleur: '#80b5d8'
    },
    {
      numero: 2,
      titre: 'Choisir',
      description: 'le site',
      couleur: '#e4c795'
    },
    {
      numero: 3,
      titre: 'Implanter',
      description: 'six fonctions',
      couleur: '#9fc47c'
    },
    {
      numero: 4,
      titre: 'Connecter',
      description: 'les quartiers',
      couleur: '#edcd59'
    },
    {
      numero: 5,
      titre: 'Adapter',
      description: 'événements',
      couleur: '#d9946d'
    },
    {
      numero: 6,
      titre: 'Évaluer',
      description: 'score final',
      couleur: '#aab4d0'
    }
  ];

  get scoreFinal(): number {
    return Math.max(0, Math.min(100, this.score()));
  }

  get qualification(): string {
    if (this.scoreFinal >= 85) {
      return 'Cohérente';
    }

    if (this.scoreFinal >= 65) {
      return 'Fonctionnelle';
    }

    if (this.scoreFinal >= 40) {
      return 'Vulnérable';
    }

    return 'Désorganisée';
  }

  revoirEtape(): void {
    this.revoir.emit();
  }

  terminerParcours(): void {
    this.terminer.emit();
  }
}
