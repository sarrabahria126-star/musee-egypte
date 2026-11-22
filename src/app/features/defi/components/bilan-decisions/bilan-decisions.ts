
import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Decision {
  id: string;
  titre: string;
  description: string;
  zone: string;
}

interface Amelioration {
  numero: number;
  texte: string;
  zone: string;
}

@Component({
  selector: 'app-bilan-decisions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bilan-decisions.html',
  styleUrl: './bilan-decisions.scss'
})
export class BilanDecisions {

  readonly rejouer = output<void>();
  readonly terminer = output<void>();

  readonly siteChoisi = input<string>('Site B');
  readonly portPlace = input<boolean>(true);
  readonly score = input<number>(78);

  readonly decisionActive = signal<string | null>(null);

  get bonnesDecisions(): Decision[] {
    const siteFavorable = this.siteChoisi() === 'Site B';

    const decisions: Decision[] = [];

    if (siteFavorable) {
      decisions.push({
        id: 'site',
        titre: 'Site sur terrain surélevé',
        description: 'proche du Nil et des terres fertiles',
        zone: 'Site d’implantation'
      });
    }

    if (this.portPlace()) {
      decisions.push({
        id: 'port',
        titre: 'Port fluvial sur la rive du Nil',
        description: 'les échanges sont possibles',
        zone: 'Port fluvial'
      });
    }

    decisions.push({
      id: 'voie',
      titre: 'Voie principale port – centre',
      description: 'la ville est bien connectée',
      zone: 'Administration et port'
    });

    return decisions;
  }

  readonly erreurs: Decision[] = [
    {
      id: 'temple',
      titre: 'Temple trop éloigné de l’habitat',
      description: 'les cérémonies sont difficiles d’accès',
      zone: 'Temple et habitat'
    },
    {
      id: 'artisanat',
      titre: 'Artisanat éloigné du port',
      description: 'le transport des matériaux est plus long',
      zone: 'Artisanat et port fluvial'
    },
    {
      id: 'extension',
      titre: 'Extension sur les terres agricoles',
      description: 'la production alimentaire diminue',
      zone: 'Terres agricoles'
    }
  ];

  readonly ameliorations: Amelioration[] = [
    {
      numero: 1,
      texte: 'Rapprocher le temple du quartier d’habitation.',
      zone: 'Temple'
    },
    {
      numero: 2,
      texte: 'Ajouter une voie secondaire entre l’artisanat et le port.',
      zone: 'Artisanat et port'
    },
    {
      numero: 3,
      texte: 'Étendre la ville vers le désert plutôt que sur les champs.',
      zone: 'Extension urbaine'
    }
  ];

  selectionnerDecision(id: string): void {
    this.decisionActive.set(
      this.decisionActive() === id ? null : id
    );
  }

  estSelectionnee(id: string): boolean {
    return this.decisionActive() === id;
  }

  recommencer(): void {
    this.rejouer.emit();
  }

  terminerDefi(): void {
    this.terminer.emit();
  }
}
