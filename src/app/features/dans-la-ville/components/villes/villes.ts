
import { Component, output, signal } from '@angular/core';

type VilleId = 'kahun' | 'memphis' | 'amarna';
type ZoneId = 'hab' | 'rue' | 'pal' | 'tem' | 'adm';

interface Repere {
  titre: string;
  texte: string;
}

interface Fiche {
  zone: ZoneId;
  nom: string;
  statut: string;
  texte: string;
}

interface Ville {
  id: VilleId;
  nom: string;
  ancien: string;
  description: string;
  image: string;
  legende: string;
  reperes: Repere[];
  fiches: Fiche[];
  lecon: string;
}

interface Region {
  zone: ZoneId;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}

interface Schema {
  zone: ZoneId;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}

@Component({
  selector: 'app-villes',
  standalone: true,
  imports: [],
  templateUrl: './villes.html',
  styleUrl: './villes.scss'
})
export class Villes {
  readonly retour = output<void>();
  readonly suivant = output<void>();

  readonly villeActive = signal<VilleId>('kahun');
  readonly zonesActives = signal<ZoneId[]>(['hab']);

  readonly categories: {
    id: ZoneId;
    nom: string;
    couleur: string;
  }[] = [
    { id: 'hab', nom: 'Les habitations', couleur: '#78a6df' },
    { id: 'rue', nom: 'Les rues', couleur: '#e9c26b' },
    { id: 'pal', nom: 'Les palais', couleur: '#e59b87' },
    { id: 'tem', nom: 'Les temples', couleur: '#b3a0dd' },
    { id: 'adm', nom: 'Les espaces administratifs', couleur: '#83c4b2' }
  ];

  readonly villes: Ville[] = [
    {
      id: 'kahun',
      nom: 'Kahun',
      ancien: 'Hetep-Sénousret · el-Lahoun',
      image: '/images/dans-la-ville/kahun.png',
      description:
        'Une ville planifiée pour loger ceux qui construisent et entretiennent la pyramide d’un roi. Son plan régulier rend visible la hiérarchie sociale. Son nom antique signifie « Sésostris est satisfait ».',
      legende:
        'Plan de Kahun : quartier des ouvriers à l’ouest, demeures des élites et résidence de Sésostris II à l’est.',
      reperes: [
        {
          titre: 'Période',
          texte: 'Moyen Empire, XIIe dynastie, Sésostris II (vers 1880 av. J.-C.)'
        },
        {
          titre: 'Fonction',
          texte: 'Ville de la pyramide, pour les constructeurs et le culte du roi'
        },
        {
          titre: 'Lieu',
          texte: 'Bordure du Fayoum'
        },
        {
          titre: 'Fouilles',
          texte: 'Flinders Petrie, 1889–1890'
        },
        {
          titre: 'Plan',
          texte: 'Ville rectangulaire, rues orthogonales (environ 380 × 330 m)'
        }
      ],
      fiches: [
        {
          zone: 'hab',
          nom: 'Les habitations',
          statut: 'Très bien attesté',
          texte:
            'Des centaines de maisons de brique crue. Les grandes demeures des responsables comptent de nombreuses pièces autour de cours. Les maisons des ouvriers sont étroites, alignées en rangées.'
        },
        {
          zone: 'rue',
          nom: 'Les rues',
          statut: 'Bien attesté',
          texte:
            'Rues droites se coupant à angle droit et une rue principale. Un mur épais sépare les quartiers : on contrôle ainsi les passages entre les groupes sociaux.'
        },
        {
          zone: 'pal',
          nom: 'Les palais',
          statut: 'Non attesté',
          texte:
            'Aucun palais royal n’a été identifié. Le pouvoir est représenté par les administrateurs, logés dans les plus grandes demeures.'
        },
        {
          zone: 'tem',
          nom: 'Les temples',
          statut: 'Lié à la pyramide',
          texte:
            'La ville existe pour le culte funéraire du roi. Le temple et la pyramide sont hors de l’enceinte : le sacré structure la ville de l’extérieur.'
        },
        {
          zone: 'adm',
          nom: 'Les espaces administratifs',
          statut: 'Par les textes',
          texte:
            'Les papyrus de Kahun, retrouvés dans les maisons, contiennent des comptes, des lettres et des textes juridiques, médicaux et mathématiques.'
        }
      ],
      lecon:
        'Un plan peut mettre en forme une société : qui habite où, qui passe où, et combien de pièces possède chaque famille.'
    },
    {
      id: 'memphis',
      nom: 'Memphis',
      ancien: 'Men-nefer · Hout-ka-Ptah',
      image: '/images/dans-la-ville/memphis.png',
      description:
        'La capitale historique, au point de jonction entre la Haute et la Basse-Égypte. Son rôle politique et administratif est bien documenté, mais la ville elle-même reste difficile à restituer.',
      legende:
        'Vestiges de Memphis : temple de Ptah, palais du Nouvel Empire près du Nil et quais.',
      reperes: [
        {
          titre: 'Période',
          texte: 'De l’Ancien Empire à l’époque gréco-romaine'
        },
        {
          titre: 'Tradition',
          texte: 'Fondée par le roi Ménès, unificateur des Deux-Terres'
        },
        {
          titre: 'Lieu',
          texte: 'Rive ouest du Nil, à la jonction de la vallée et du Delta'
        },
        {
          titre: 'Nom antique',
          texte: '« Murs blancs », puis Men-nefer'
        },
        {
          titre: 'Dieu',
          texte: 'Ptah, protecteur des artisans'
        }
      ],
      fiches: [
        {
          zone: 'hab',
          nom: 'Les habitations',
          statut: 'En partie attesté',
          texte:
            'Quelques quartiers d’habitation et d’ateliers ont été fouillés près du temple de Ptah.'
        },
        {
          zone: 'rue',
          nom: 'Les rues',
          statut: 'Peu documenté',
          texte:
            'Le tracé est mal connu : le Nil a déplacé son cours et déposé des limons. Un canal et des quais relient la ville au fleuve.'
        },
        {
          zone: 'pal',
          nom: 'Les palais',
          statut: 'En partie attesté',
          texte:
            'Des palais du Nouvel Empire et de l’époque saïte ont été retrouvés près du temple de Ptah.'
        },
        {
          zone: 'tem',
          nom: 'Les temples',
          statut: 'Attesté',
          texte:
            'Le grand temple de Ptah est le centre religieux. La nécropole de Saqqara s’étend sur le plateau désertique.'
        },
        {
          zone: 'adm',
          nom: 'Les espaces administratifs',
          statut: 'Par les textes',
          texte:
            'Memphis accueille une administration centrale importante, mais ses bâtiments restent difficiles à localiser.'
        }
      ],
      lecon:
        'Une grande capitale peut être très importante et pourtant presque invisible au sol.'
    },
    {
      id: 'amarna',
      nom: 'Amarna',
      ancien: 'Akhetaton · « Horizon d’Aton »',
      image: '/images/dans-la-ville/amarna.png',
      description:
        'Une capitale créée en quelques années pour un roi et son dieu. Sa fondation permet de lire l’organisation des quartiers, des palais, des temples et des habitations.',
      legende:
        'Plan du quartier des bureaux à l’est de la Maison du roi, avec le Bureau des archives.',
      reperes: [
        {
          titre: 'Période',
          texte: 'Nouvel Empire, XVIIIe dynastie, vers 1346–1332 av. J.-C.'
        },
        {
          titre: 'Fondateur',
          texte: 'Akhenaton, pour le culte du disque solaire Aton'
        },
        {
          titre: 'Lieu',
          texte: 'Rive est du Nil, Moyenne-Égypte'
        },
        {
          titre: 'Durée',
          texte: 'Une quinzaine d’années de capitale, puis abandon'
        },
        {
          titre: 'Territoire',
          texte: 'Délimité par des stèles frontières'
        }
      ],
      fiches: [
        {
          zone: 'hab',
          nom: 'Les habitations',
          statut: 'Bien attesté',
          texte:
            'Maisons de brique crue de tailles variées. Les plus grandes possèdent une cour, des salles à colonnes et des dépendances.'
        },
        {
          zone: 'rue',
          nom: 'Les rues',
          statut: 'Bien attesté',
          texte:
            'La route royale traverse la ville du nord au sud. Les quartiers se développent autour de voies plus étroites.'
        },
        {
          zone: 'pal',
          nom: 'Les palais',
          statut: 'En partie attesté',
          texte:
            'Le Grand palais sert aux cérémonies et la Maison du roi à la résidence, reliés par une passerelle.'
        },
        {
          zone: 'tem',
          nom: 'Les temples',
          statut: 'Bien attesté',
          texte:
            'Les temples d’Aton sont des cours à ciel ouvert garnies d’autels, ouvertes au soleil.'
        },
        {
          zone: 'adm',
          nom: 'Les espaces administratifs',
          statut: 'Attesté',
          texte:
            'Le Bureau des archives du Pharaon a livré les lettres d’Amarna, une correspondance diplomatique sur tablettes.'
        }
      ],
      lecon:
        'Quand un roi crée une ville pour une idée religieuse, pouvoir, culte et administration s’installent au centre ; les habitants s’organisent autour.'
    }
  ];

  readonly regions: Record<VilleId, Region[]> = {
    kahun: [
      { zone: 'hab', x: 0.6, y: 17, w: 34.6, h: 61.5, label: 'Quartier des travailleurs' },
      { zone: 'hab', x: 50, y: 17, w: 48, h: 32.5, label: 'Demeures des responsables' },
      { zone: 'hab', x: 49.8, y: 51.3, w: 48, h: 25.6, label: 'Demeures des responsables' },
      { zone: 'rue', x: 35.6, y: 48.7, w: 62, h: 2.6, label: 'Rue principale' },
      { zone: 'pal', x: 35.6, y: 17, w: 14, h: 32.5, label: 'Résidence de Sésostris II' }
    ],
    memphis: [
      { zone: 'hab', x: 39, y: 69, w: 19, h: 13, label: 'Quartier sud (hyp.)' },
      { zone: 'rue', x: 50.7, y: 55.3, w: 3.4, h: 29, label: 'Voie sud' },
      { zone: 'rue', x: 61.6, y: 59.5, w: 5, h: 5.4, label: 'Quais' },
      { zone: 'pal', x: 62.5, y: 30.3, w: 7, h: 15.5, label: 'Palais' },
      { zone: 'tem', x: 50.7, y: 41, w: 9.2, h: 9.5, label: 'Ptah' },
      { zone: 'tem', x: 45.6, y: 84.4, w: 5, h: 4.2, label: 'Hathor' },
      { zone: 'tem', x: 27.4, y: 38.6, w: 4.6, h: 16.6, label: '' }
    ],
    amarna: [
      { zone: 'hab', x: 6, y: 47, w: 55, h: 19, label: 'Maisons' },
      { zone: 'tem', x: 76, y: 4, w: 14, h: 17, label: 'Autels ?' },
      { zone: 'adm', x: 5, y: 70, w: 57, h: 11, label: 'Bureaux et archives' }
    ]
  };

  readonly schemas: Record<VilleId, Schema[]> = {
    kahun: [
      { zone: 'hab', x: 10, y: 30, w: 120, h: 190, label: 'Quartier des travailleurs' },
      { zone: 'hab', x: 140, y: 30, w: 92, h: 190, label: 'Demeures' },
      { zone: 'hab', x: 262, y: 30, w: 100, h: 190, label: 'Maisons moyennes' },
      { zone: 'rue', x: 236, y: 30, w: 22, h: 190, label: 'Rue' },
      { zone: 'adm', x: 146, y: 34, w: 80, h: 30, label: 'Papyrus' },
      { zone: 'tem', x: 366, y: 90, w: 32, h: 90, label: 'Pyramide' }
    ],
    memphis: [
      { zone: 'tem', x: 150, y: 70, w: 110, h: 70, label: 'Temple de Ptah' },
      { zone: 'pal', x: 290, y: 50, w: 90, h: 70, label: 'Palais' },
      { zone: 'hab', x: 40, y: 160, w: 120, h: 70, label: 'Quartiers (hyp.)' },
      { zone: 'rue', x: 200, y: 150, w: 18, h: 90, label: 'Voie' },
      { zone: 'adm', x: 40, y: 50, w: 90, h: 60, label: 'Admin (hyp.)' }
    ],
    amarna: [
      { zone: 'pal', x: 20, y: 15, w: 115, h: 60, label: 'Palais' },
      { zone: 'tem', x: 180, y: 15, w: 110, h: 60, label: 'Temple d’Aton' },
      { zone: 'adm', x: 300, y: 15, w: 90, h: 60, label: 'Archives' },
      { zone: 'hab', x: 20, y: 90, w: 120, h: 90, label: 'Ville' },
      { zone: 'hab', x: 290, y: 170, w: 100, h: 55, label: 'Village ouvrier' },
      { zone: 'rue', x: 150, y: 0, w: 22, h: 240, label: 'Route royale' }
    ]
  };

  get ville(): Ville {
    return this.villes.find(v => v.id === this.villeActive())!;
  }

  get regionsVisibles(): Region[] {
    return this.regions[this.villeActive()].filter(r => this.estActive(r.zone));
  }

  get schemasVille(): Schema[] {
    return this.schemas[this.villeActive()];
  }

  get zonesAbsentes(): string[] {
    return this.zonesActives()
      .filter(z => !this.regions[this.villeActive()].some(r => r.zone === z))
      .map(z => this.categories.find(c => c.id === z)!.nom.toLowerCase());
  }

  couleur(id: ZoneId): string {
    return this.categories.find(c => c.id === id)!.couleur;
  }

  estActive(id: ZoneId): boolean {
    return this.zonesActives().includes(id);
  }

  choisirVille(id: VilleId): void {
    this.villeActive.set(id);
    this.zonesActives.set(['hab']);
  }

  basculer(id: ZoneId): void {
    this.zonesActives.update(actives =>
      actives.includes(id)
        ? actives.filter(zone => zone !== id)
        : [...actives, id]
    );
  }

  toutColorer(): void {
    this.zonesActives.set(
      this.zonesActives().length === this.categories.length
        ? []
        : this.categories.map(c => c.id)
    );
  }
}
