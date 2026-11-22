import { Component, output, signal } from '@angular/core';
import { Quiz } from '../quiz/quiz';

interface LigneComparaison {
  critere: string;
  vivants: string;
  dieux: string;
  morts: string;
}

@Component({
  selector: 'app-corrige',
  standalone: true,
  imports: [Quiz],
  templateUrl: './corrige.html',
  styleUrl: './corrige.scss'
})
export class Corrige {
  readonly retour = output<void>();

  // Le comparateur existant peut déjà écouter cet événement.
  readonly suivant = output<void>();

  readonly quizOuvert = signal(false);

  readonly lignes: readonly LigneComparaison[] = [
    {
      critere: 'Fonction',
      vivants: 'Habiter, travailler, stocker, échanger, administrer',
      dieux: 'Culte, fêtes, économie du temple, mise en scène du pouvoir',
      morts: 'Préparer l’éternité : tombes, culte funéraire'
    },
    {
      critere: 'Localisation à Thèbes',
      vivants: 'Surtout rive est, avec des palais et villages à l’ouest',
      dieux: 'Rive est (Karnak, Louxor) et temples funéraires à l’ouest',
      morts: 'Rive ouest : vallées, nécropoles, bords des champs'
    },
    {
      critere: 'Matériaux',
      vivants: 'Brique crue, un peu de pierre',
      dieux: 'Pierre (grès, calcaire)',
      morts: 'Roche creusée et pierre'
    },
    {
      critere: 'Durée voulue',
      vivants: 'Courte, quotidienne',
      dieux: 'Longue, éternelle',
      morts: 'Éternelle'
    },
    {
      critere: 'Accès',
      vivants: 'Tous les habitants',
      dieux: 'Public dans les cours, sanctuaire réservé au roi et aux prêtres',
      morts: 'Tombes fermées, temples funéraires accessibles au culte'
    },
    {
      critere: 'Ce qu’il en reste',
      vivants: 'Très peu (brique, sous la ville moderne)',
      dieux: 'Beaucoup (pierre)',
      morts: 'Beaucoup (roche, tombes)'
    },
    {
      critere: 'Exemples',
      vivants: 'Maisons, Malqata, Deir el-Médineh',
      dieux: 'Karnak, Louxor',
      morts: 'Vallée des Rois, Deir el-Bahari, Médinet Habou'
    }
  ];

  retournerComparateur(): void {
    this.retour.emit();
  }

  ouvrirQuiz(): void {
    this.quizOuvert.set(true);
    this.remonter();
  }

  revenirAuTableau(): void {
    this.quizOuvert.set(false);
    this.remonter();
  }

  private remonter(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }
}
