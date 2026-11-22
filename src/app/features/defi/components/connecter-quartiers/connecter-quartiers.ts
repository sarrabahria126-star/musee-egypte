
import { Component, computed, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

type Outil = 'principale' | 'secondaire' | 'gomme';
type QuartierId =
  | 'agriculture-g'
  | 'agriculture-d'
  | 'habitat-g'
  | 'habitat-d'
  | 'artisanat'
  | 'administration'
  | 'temple'
  | 'port';

interface Quartier {
  id: QuartierId;
  nom: string;
  x: number;
  y: number;
  largeur: number;
  hauteur: number;
  couleur: string;
}

interface Route {
  depart: QuartierId;
  arrivee: QuartierId;
  type: 'principale' | 'secondaire';
}

interface Relation {
  numero: number;
  titre: string;
  description: string;
  depart: QuartierId[];
  arrivee: QuartierId[];
}

@Component({
  selector: 'app-connecter-quartiers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connecter-quartiers.html',
  styleUrl: './connecter-quartiers.scss'
})
export class ConnecterQuartiers {

  readonly retour = output<void>();
  readonly suivant = output<void>();

  readonly outil = signal<Outil>('principale');
  readonly quartierDepart = signal<QuartierId | null>(null);
  readonly routes = signal<Route[]>([]);

  readonly quartiers: Quartier[] = [
    {
      id: 'agriculture-g',
      nom: 'Agriculture',
      x: 25,
      y: 17,
      largeur: 32,
      hauteur: 11,
      couleur: '#a5c883'
    },
    {
      id: 'agriculture-d',
      nom: 'Agriculture',
      x: 75,
      y: 17,
      largeur: 32,
      hauteur: 11,
      couleur: '#a5c883'
    },
    {
      id: 'habitat-g',
      nom: 'Habitat',
      x: 18.5,
      y: 41,
      largeur: 23,
      hauteur: 12,
      couleur: '#e5b68f'
    },
    {
      id: 'habitat-d',
      nom: 'Habitat',
      x: 81.5,
      y: 41,
      largeur: 23,
      hauteur: 12,
      couleur: '#e5b68f'
    },
    {
      id: 'artisanat',
      nom: 'Artisanat',
      x: 18.5,
      y: 65,
      largeur: 23,
      hauteur: 12,
      couleur: '#d99671'
    },
    {
      id: 'administration',
      nom: 'Administration',
      x: 50,
      y: 50.5,
      largeur: 23,
      hauteur: 12,
      couleur: '#edce5d'
    },
    {
      id: 'temple',
      nom: 'Temple',
      x: 81.5,
      y: 65,
      largeur: 23,
      hauteur: 12,
      couleur: '#aab4d1'
    },
    {
      id: 'port',
      nom: 'Port fluvial',
      x: 50,
      y: 81,
      largeur: 20,
      hauteur: 11,
      couleur: '#80b5d8'
    }
  ];

  readonly relations: Relation[] = [
    {
      numero: 1,
      titre: 'Agriculture – Habitat',
      description: 'Approvisionnement alimentaire',
      depart: ['agriculture-g', 'agriculture-d'],
      arrivee: ['habitat-g', 'habitat-d']
    },
    {
      numero: 2,
      titre: 'Port – Artisanat',
      description: 'Circulation des matériaux et des produits',
      depart: ['port'],
      arrivee: ['artisanat']
    },
    {
      numero: 3,
      titre: 'Port – Administration',
      description: 'Gestion des échanges',
      depart: ['port'],
      arrivee: ['administration']
    },
    {
      numero: 4,
      titre: 'Administration – Quartiers',
      description: 'Coordination des activités',
      depart: ['administration'],
      arrivee: [
        'habitat-g',
        'habitat-d',
        'artisanat',
        'temple'
      ]
    },
    {
      numero: 5,
      titre: 'Temple – Habitat',
      description: 'Accessibilité des pratiques religieuses',
      depart: ['temple'],
      arrivee: ['habitat-g', 'habitat-d']
    }
  ];

  readonly relationsEtablies = computed(() =>
    this.relations.filter(relation =>
      this.relationEstEtablie(relation)
    ).length
  );

  readonly progression = computed(() =>
    (this.relationsEtablies() / this.relations.length) * 100
  );

  readonly message = signal(
    'Choisis un outil, clique sur un quartier, puis sur un second.'
  );

  choisirOutil(outil: Outil): void {
    this.outil.set(outil);
    this.quartierDepart.set(null);

    if (outil === 'gomme') {
      this.message.set(
        'Clique sur une route pour la supprimer.'
      );
    } else {
      this.message.set(
        'Clique sur un premier quartier, puis sur le quartier à relier.'
      );
    }
  }

  choisirQuartier(id: QuartierId): void {
    if (this.outil() === 'gomme') {
      this.message.set(
        'Avec la gomme, clique directement sur une route.'
      );
      return;
    }

    const depart = this.quartierDepart();

    if (!depart) {
      this.quartierDepart.set(id);
      this.message.set(
        'Premier quartier sélectionné. Choisis le deuxième.'
      );
      return;
    }

    if (depart === id) {
      this.quartierDepart.set(null);
      this.message.set('Sélection annulée.');
      return;
    }

    this.ajouterRoute(depart, id);
    this.quartierDepart.set(null);
  }

  ajouterRoute(
    depart: QuartierId,
    arrivee: QuartierId
  ): void {
    const existe = this.routes().some(route =>
      (route.depart === depart && route.arrivee === arrivee) ||
      (route.depart === arrivee && route.arrivee === depart)
    );

    if (existe) {
      this.message.set(
        'Ces deux quartiers sont déjà reliés.'
      );
      return;
    }

    this.routes.update(routes => [
      ...routes,
      {
        depart,
        arrivee,
        type: this.outil() === 'secondaire'
          ? 'secondaire'
          : 'principale'
      }
    ]);

    this.message.set('Nouvelle voie créée !');
  }

  supprimerRoute(index: number): void {
    if (this.outil() !== 'gomme') {
      return;
    }

    this.routes.update(routes =>
      routes.filter((_, i) => i !== index)
    );

    this.message.set('Voie supprimée.');
  }

  relationEstEtablie(relation: Relation): boolean {
    return this.routes().some(route =>
      (
        relation.depart.includes(route.depart) &&
        relation.arrivee.includes(route.arrivee)
      ) ||
      (
        relation.depart.includes(route.arrivee) &&
        relation.arrivee.includes(route.depart)
      )
    );
  }

  position(id: QuartierId): Quartier {
    return this.quartiers.find(q => q.id === id)!;
  }

  retourAuxBesoins(): void {
    this.retour.emit();
  }

  continuer(): void {
    this.suivant.emit();
  }
}
