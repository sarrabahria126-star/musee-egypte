
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ScoreCategorie {
  titre: string;
  points: number;
  maximum: number;
}

@Component({
  selector: 'app-vue-aerienne',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vue-aerienne.html',
  styleUrl: './vue-aerienne.scss'
})
export class VueAerienne {

  readonly retour = output<void>();
  readonly suivant = output<void>();

  readonly scoreTerritoire = input<number>(18);
  readonly scoreFonctions = input<number>(24);
  readonly scoreRelations = input<number>(14);
  readonly scoreEvenements = input<number>(14);
  readonly scoreOrganisation = input<number>(8);

  readonly siteChoisi = input<string>('Site B');

  get categories(): ScoreCategorie[] {
    return [
      {
        titre: 'Choix du territoire',
        points: this.scoreTerritoire(),
        maximum: 20
      },
      {
        titre: 'Implantation des fonctions',
        points: this.scoreFonctions(),
        maximum: 30
      },
      {
        titre: 'Relations entre les quartiers',
        points: this.scoreRelations(),
        maximum: 20
      },
      {
        titre: 'Gestion des événements',
        points: this.scoreEvenements(),
        maximum: 20
      },
      {
        titre: 'Organisation générale',
        points: this.scoreOrganisation(),
        maximum: 10
      }
    ];
  }

  get scoreTotal(): number {
    return this.categories.reduce(
      (total, categorie) => total + categorie.points,
      0
    );
  }

  get qualification(): string {
    const score = this.scoreTotal;

    if (score >= 85) {
      return 'Cohérente';
    }

    if (score >= 65) {
      return 'Fonctionnelle';
    }

    if (score >= 40) {
      return 'Vulnérable';
    }

    return 'Désorganisée';
  }

  get pourcentageTotal(): number {
    return Math.max(0, Math.min(100, this.scoreTotal));
  }

  progression(categorie: ScoreCategorie): number {
    if (categorie.maximum === 0) {
      return 0;
    }

    return Math.max(
      0,
      Math.min(100, categorie.points / categorie.maximum * 100)
    );
  }

  estQualificationActive(nom: string): boolean {
    return this.qualification === nom;
  }

  retournerContraintes(): void {
    this.retour.emit();
  }

  voirBilan(): void {
    this.suivant.emit();
  }
}
