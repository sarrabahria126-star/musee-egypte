import { Component, computed, output, signal } from '@angular/core';
import { Corrige } from '../corrige/corrige';

type Ville = 'vivants' | 'dieux' | 'morts';

interface Carte {
  id: string;
  texte: string;
  ville: Ville;
  explication: string;
}

@Component({
  selector: 'app-comparateur',
  standalone: true,
  imports: [Corrige],
  templateUrl: './comparateur.html',
  styleUrl: './comparateur.scss'
})
export class Comparateur {
  readonly suivant = output<void>();

  readonly afficheCorrige = signal(false);
  readonly selection = signal<string | null>(null);
  readonly cartesPlacees = signal<ReadonlySet<string>>(new Set<string>());
  readonly message = signal('');
  readonly erreur = signal(false);

  readonly colonnes: ReadonlyArray<{ id: Ville; titre: string }> = [
    { id: 'vivants', titre: 'Les vivants' },
    { id: 'dieux', titre: 'Les dieux' },
    { id: 'morts', titre: 'Les morts' }
  ];

  readonly cartes: readonly Carte[] = [
    {
      id: 'maisons',
      texte: 'Maisons en brique crue',
      ville: 'vivants',
      explication: 'La brique est pour ce qui sert à vivre.'
    },
    {
      id: 'ateliers',
      texte: 'Ateliers, greniers, marché',
      ville: 'vivants',
      explication: 'On y travaille, on y stocke les récoltes et on y échange.'
    },
    {
      id: 'village',
      texte: 'Village des ouvriers (Deir el-Médineh)',
      ville: 'vivants',
      explication: 'Les ouvriers et leurs familles habitaient ce village de la rive ouest.'
    },
    {
      id: 'pylone',
      texte: 'Grand pylône et cour à colonnes',
      ville: 'dieux',
      explication: 'Le pylône et la cour font partie du temple.'
    },
    {
      id: 'opet',
      texte: 'Procession d’Opet',
      ville: 'dieux',
      explication: 'Cette fête religieuse reliait les temples de Karnak et de Louxor.'
    },
    {
      id: 'sanctuaire',
      texte: 'Sanctuaire réservé aux prêtres',
      ville: 'dieux',
      explication: 'Le sanctuaire est l’espace le plus sacré du temple.'
    },
    {
      id: 'tombe',
      texte: 'Tombe taillée dans la falaise',
      ville: 'morts',
      explication: 'La tombe est creusée dans la roche pour accueillir le défunt.'
    },
    {
      id: 'vallee',
      texte: 'Rive ouest, vallée désertique',
      ville: 'morts',
      explication: 'Les vallées désertiques de la rive ouest abritent les nécropoles.'
    },
    {
      id: 'temple-funeraire',
      texte: 'Temple de millions d’années au bord des champs',
      ville: 'morts',
      explication: 'Dans cet exercice, ce temple est associé au culte funéraire royal.'
    }
  ];

  readonly restantes = computed(() =>
    this.cartes.filter(carte => !this.cartesPlacees().has(carte.id))
  );

  readonly nombrePlacees = computed(() => this.cartesPlacees().size);
  readonly termine = computed(() => this.nombrePlacees() === this.cartes.length);

  selectionner(carte: Carte): void {
    this.selection.set(carte.id);
    this.erreur.set(false);
    this.message.set(`Carte sélectionnée : ${carte.texte}. Choisis une colonne.`);
  }

  commencerGlisser(event: DragEvent, carte: Carte): void {
    this.selectionner(carte);

    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', carte.id);
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  deposer(event: DragEvent, ville: Ville): void {
    event.preventDefault();

    const id = event.dataTransfer?.getData('text/plain');

    if (id) {
      this.placer(ville, id);
    }
  }

  placer(ville: Ville, id = this.selection()): void {
    if (!id || this.cartesPlacees().has(id)) {
      return;
    }

    const carte = this.cartes.find(element => element.id === id);

    if (!carte) {
      return;
    }

    if (carte.ville !== ville) {
      this.erreur.set(true);
      this.message.set('Essaie une autre colonne pour cette carte.');
      return;
    }

    this.cartesPlacees.update(anciennes => new Set([...anciennes, id]));
    this.selection.set(null);
    this.erreur.set(false);

    this.message.set(
      this.termine()
        ? 'Bravo ! Les 9 cartes sont bien placées.'
        : `Correct. ${carte.explication}`
    );
  }

  ouvrirCorrige(): void {
    this.afficheCorrige.set(true);
    this.remonter();
  }

  revenirAuJeu(): void {
    this.afficheCorrige.set(false);
    this.remonter();
  }

  private remonter(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }
}
