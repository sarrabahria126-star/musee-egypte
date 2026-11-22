
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

import { LirePouvoir } from './components/lire-pouvoir/lire-pouvoir';
import { Comparateur } from './components/comparateur/comparateur';

type EcranPouvoir =
  | 'introduction'
  | 'carte'
  | 'fiches'
  | 'temple'
  | 'lecture'
  | 'fetes'
  | 'comparateur';

type Couche = 'vivants' | 'dieux' | 'morts';
type TypeFete = 'opet' | 'vallee';

interface Information {
  label: string;
  valeur: string;
}

interface Fiche {
  id: Couche;
  titre: string;
  description: string;
  image: string;
  informations: Information[];
}

interface StationTemple {
  titre: string;
  description: string;
  obscurite: number;
  publicAutorise: boolean;
  pretresAutorises: boolean;
  roiAutorise: boolean;
}

interface Fete {
  id: TypeFete;
  titre: string;
  description: string;
}

@Component({
  selector: 'app-pouvoir',
  standalone: true,
  imports: [
    CommonModule,
    LirePouvoir,
    Comparateur
  ],
  templateUrl: './pouvoir.html',
  styleUrl: './pouvoir.scss'
})
export class Pouvoir {

  // ==========================================
  // NAVIGATION ENTRE LES ÉCRANS
  // ==========================================

  readonly ecran = signal<EcranPouvoir>('introduction');

  allerVers(ecran: EcranPouvoir): void {
    this.ecran.set(ecran);

    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }
  }

  explorerThebes(): void {
    this.allerVers('carte');
  }

  retourIntroduction(): void {
    this.allerVers('introduction');
  }

  retourCarte(): void {
    this.allerVers('carte');
  }

  retourFiches(): void {
    this.allerVers('fiches');
  }

  ouvrirFiches(): void {
    this.allerVers('fiches');
  }

  ouvrirTemple(): void {
    this.stationActuelle.set(3);
    this.allerVers('temple');
  }

  ouvrirLecturePouvoir(): void {
    this.allerVers('lecture');
  }

  fermerLecturePouvoir(): void {
    this.allerVers('temple');
  }

  ouvrirFetes(): void {
    this.allerVers('fetes');
    this.lancerFete('opet');
  }

  // ==========================================
  // COMPARATEUR : NOUVEL ÉCRAN 4.6
  // ==========================================

  ouvrirComparateur(): void {
    this.allerVers('comparateur');
  }

  fermerComparateur(): void {
    this.allerVers('fetes');
  }

  // ==========================================
  // CARTE DES TROIS VILLES DE THÈBES
  // ==========================================

  readonly couches: Couche[] = [
    'vivants',
    'dieux',
    'morts'
  ];

  readonly coucheActive = signal<Couche>('dieux');

  readonly couchesExplorees = signal<Set<Couche>>(
    new Set<Couche>(['dieux'])
  );

  readonly toutesCouches = signal(false);

  get nombreCouchesExplorees(): number {
    return this.couchesExplorees().size;
  }

  get toutesCouchesExplorees(): boolean {
    return this.nombreCouchesExplorees === 3;
  }

  choisirCouche(couche: Couche): void {
    this.coucheActive.set(couche);
    this.toutesCouches.set(false);

    this.couchesExplorees.update(anciennes => {
      const nouvelles = new Set<Couche>(anciennes);
      nouvelles.add(couche);
      return nouvelles;
    });
  }

  toutAfficher(): void {
    this.toutesCouches.set(true);
  }

  coucheVisible(couche: Couche): boolean {
    return (
      this.toutesCouches() ||
      this.coucheActive() === couche
    );
  }

  ouvrirZone(couche: Couche): void {
    this.choisirCouche(couche);
  }

  // ==========================================
  // LES TROIS FICHES
  // ==========================================

  readonly fiches: Record<Couche, Fiche> = {

    vivants: {
      id: 'vivants',
      titre: 'Les vivants',
      image: '/images/territoire/vivant.png',
      description:
        'On y habite, travaille et échange. Elle est bâtie en brique crue : un matériau fait pour le temps d’une vie, pas pour l’éternité.',
      informations: [
        {
          label: 'Matériau',
          valeur: 'Brique crue'
        },
        {
          label: 'Lieu',
          valeur: 'Surtout rive est, palais et villages à l’ouest'
        },
        {
          label: 'Fonction',
          valeur: 'Habiter, travailler, stocker, échanger'
        },
        {
          label: 'Durée',
          valeur: 'Courte, quotidienne'
        },
        {
          label: 'Traces',
          valeur: 'Très peu conservées'
        }
      ]
    },

    dieux: {
      id: 'dieux',
      titre: 'Les dieux',
      image: '/images/territoire/dieux.png',
      description:
        'La demeure d’Amon-Rê. Elle est en pierre, parce qu’elle doit durer. Plus on avance, plus on passe de la lumière à l’obscurité.',
      informations: [
        {
          label: 'Matériau',
          valeur: 'Pierre (grès, calcaire)'
        },
        {
          label: 'Lieu',
          valeur: 'Karnak, Louxor, avenue des sphinx'
        },
        {
          label: 'Fonction',
          valeur: 'Culte, fêtes, économie du temple'
        },
        {
          label: 'Durée',
          valeur: 'Éternelle'
        },
        {
          label: 'Accès',
          valeur: 'Public dans les cours, sanctuaire réservé'
        }
      ]
    },

    morts: {
      id: 'morts',
      titre: 'Les morts',
      image: '/images/territoire/mort.png',
      description:
        'À l’ouest, là où le soleil se couche et renaît. Tombes taillées dans la roche, temples funéraires au bord des champs.',
      informations: [
        {
          label: 'Matériau',
          valeur: 'Roche creusée et pierre'
        },
        {
          label: 'Lieu',
          valeur: 'Rive ouest, vallées et bords des champs'
        },
        {
          label: 'Fonction',
          valeur: 'Préparer l’éternité'
        },
        {
          label: 'Durée',
          valeur: 'Éternelle'
        },
        {
          label: 'Particularité',
          valeur: 'Tombe cachée, temple visible'
        }
      ]
    }
  };

  get listeFiches(): Fiche[] {
    return this.couches.map(
      couche => this.fiches[couche]
    );
  }

  get ficheActive(): Fiche {
    return this.fiches[this.coucheActive()];
  }

  // ==========================================
  // TEMPLE DE KARNAK
  // ==========================================

  readonly stationActuelle = signal(3);

  readonly stations: StationTemple[] = [
    {
      titre: 'Allée et pylône',
      description:
        'Le visiteur arrive par une voie monumentale. Le pylône marque l’entrée du temple et symbolise la puissance du pouvoir royal.',
      obscurite: 0,
      publicAutorise: true,
      pretresAutorises: true,
      roiAutorise: true
    },
    {
      titre: 'Cour à ciel ouvert',
      description:
        'La cour reçoit la lumière du soleil. Elle constitue un espace de rassemblement et de transition vers les parties intérieures.',
      obscurite: 0.15,
      publicAutorise: true,
      pretresAutorises: true,
      roiAutorise: true
    },
    {
      titre: 'Salle hypostyle',
      description:
        'Une forêt de colonnes et de pénombre. La lumière diminue : on approche du sacré. Cette salle est réservée aux prêtres.',
      obscurite: 0.4,
      publicAutorise: false,
      pretresAutorises: true,
      roiAutorise: true
    },
    {
      titre: 'Salle d’offrandes',
      description:
        'Les offrandes et les rituels religieux occupent une place centrale. L’accès devient davantage restreint.',
      obscurite: 0.6,
      publicAutorise: false,
      pretresAutorises: true,
      roiAutorise: true
    },
    {
      titre: 'Sanctuaire',
      description:
        'Au cœur du temple se trouve l’espace le plus sacré. La lumière est faible et l’accès est strictement contrôlé.',
      obscurite: 0.8,
      publicAutorise: false,
      pretresAutorises: true,
      roiAutorise: true
    }
  ];

  get stationActive(): StationTemple {
    return this.stations[this.stationActuelle() - 1];
  }

  get opaciteTemple(): number {
    return this.stationActive.obscurite;
  }

  choisirStation(numero: number): void {
    if (
      numero >= 1 &&
      numero <= this.stations.length
    ) {
      this.stationActuelle.set(numero);
    }
  }

  avancerStation(): void {
    if (
      this.stationActuelle() <
      this.stations.length
    ) {
      this.stationActuelle.update(n => n + 1);
    } else {
      this.ouvrirLecturePouvoir();
    }
  }

  reculerStation(): void {
    if (this.stationActuelle() > 1) {
      this.stationActuelle.update(n => n - 1);
    }
  }

  // ==========================================
  // FÊTES DE THÈBES
  // ==========================================

  readonly fetes: Fete[] = [
    {
      id: 'opet',
      titre: 'Fête d’Opet',
      description:
        'La statue d’Amon, de Mout et de Khonsou va de Karnak à Louxor, le long de l’avenue des sphinx. La fête renouvelle aussi le pouvoir du roi. La population suit la procession.'
    },
    {
      id: 'vallee',
      titre: 'Belle Fête de la Vallée',
      description:
        'La statue d’Amon traverse le Nil et visite les temples funéraires. Les familles se rendent aux tombes de leurs proches.'
    }
  ];

  readonly feteActive = signal<TypeFete>('opet');

  readonly animationFete = signal(false);
  readonly progressionFete = signal(0);
  readonly animationVersion = signal(0);

  get feteSelectionnee(): Fete {
    return this.fetes.find(
      fete => fete.id === this.feteActive()
    )!;
  }

  choisirFete(id: TypeFete): void {
    this.lancerFete(id);
  }

  lancerFete(id: TypeFete): void {
    this.feteActive.set(id);
    this.animationFete.set(true);
    this.progressionFete.set(0);

    this.animationVersion.update(
      version => version + 1
    );
  }

  rejouerFete(): void {
    this.lancerFete(this.feteActive());
  }
}
