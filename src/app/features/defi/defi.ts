
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

import { BesoinsFonctions } from './components/besoins-fonctions/besoins-fonctions';
import { ConnecterQuartiers } from './components/connecter-quartiers/connecter-quartiers';
import { CrueNil } from './components/crue-nil/crue-nil';
import { TroisContraintes } from './components/trois-contraintes/trois-contraintes';
import { VueAerienne } from './components/vue-aerienne/vue-aerienne';
import { BilanDecisions } from './components/bilan-decisions/bilan-decisions';
import { ConclusionSynthese } from './components/conclusion-synthese/conclusion-synthese';

type EcranDefi =
  | 'introduction'
  | 'territoire'
  | 'implantation'
  | 'organisation'
  | 'besoins'
  | 'connexion'
  | 'crue'
  | 'contraintes'
  | 'vue-aerienne'
  | 'bilan'
  | 'conclusion'
  | 'termine';

type ElementTerritoire =
  | 'nil'
  | 'fertiles'
  | 'desert'
  | 'inondables'
  | 'sureleves';

type SiteId = 'A' | 'B' | 'C';

type FonctionId =
  | 'port'
  | 'administration'
  | 'habitat'
  | 'agriculture'
  | 'artisanat'
  | 'temple';

interface Caracteristique {
  label: string;
  valeur: string;
}

interface ElementCarte {
  id: ElementTerritoire;
  titre: string;
  description: string;
  image: string;
  caracteristiques: Caracteristique[];
}

interface SiteImplantation {
  id: SiteId;
  nom: string;
  type: string;
  proximite: string;
  terres: string;
  risque: string;
  ressources: string;
  desert: string;
  decision: string;
}

interface FonctionUrbaine {
  id: FonctionId;
  titre: string;
  sousTitre: string;
  couleur: string;
  x: number;
  y: number;
  placee: boolean;
  message: string;
}

@Component({
  selector: 'app-defi',
  standalone: true,
  imports: [
    CommonModule,
    BesoinsFonctions,
    ConnecterQuartiers,
    CrueNil,
    TroisContraintes,
    VueAerienne,
    BilanDecisions,
    ConclusionSynthese
  ],
  templateUrl: './defi.html',
  styleUrl: './defi.scss'
})
export class Defi {

  // NAVIGATION

  readonly ecran = signal<EcranDefi>('introduction');

  allerVers(ecran: EcranDefi): void {
    this.ecran.set(ecran);

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  commencerDefi(): void {
    this.allerVers('territoire');
  }

  retourIntroduction(): void {
    this.allerVers('introduction');
  }

  ouvrirImplantation(): void {
    this.allerVers('implantation');
  }

  retourTerritoire(): void {
    this.allerVers('territoire');
  }

  retourImplantation(): void {
    this.allerVers('implantation');
  }

  fonderVille(): void {
    this.allerVers('organisation');
  }

  continuerOrganisation(): void {
    this.allerVers('besoins');
  }

  ouvrirBesoins(): void {
    this.allerVers('besoins');
  }

  retourOrganisation(): void {
    this.allerVers('organisation');
  }

  ouvrirConnexion(): void {
    this.allerVers('connexion');
  }

  retourConnexion(): void {
    this.allerVers('connexion');
  }

  ouvrirCrue(): void {
    this.allerVers('crue');
  }

  retourCrue(): void {
    this.allerVers('crue');
  }

  ouvrirContraintes(): void {
    this.allerVers('contraintes');
  }

  ouvrirVueAerienne(): void {
    this.allerVers('vue-aerienne');
  }

  retourVueAerienne(): void {
    this.allerVers('vue-aerienne');
  }

  ouvrirBilan(): void {
    this.allerVers('bilan');
  }

  // L'écran 5.9 ouvre désormais l'écran 5.10

  terminerDefi(): void {
    this.allerVers('conclusion');
  }

  revoirEtape(): void {
    this.allerVers('territoire');
  }

  terminerParcours(): void {
    this.allerVers('termine');
  }

  retourConclusion(): void {
    this.allerVers('conclusion');
  }

  // ÉCRAN 5.1 : TERRITOIRE

  readonly elementSelectionne =
    signal<ElementTerritoire>('inondables');

  readonly elementsVus =
    signal<Set<ElementTerritoire>>(
      new Set<ElementTerritoire>()
    );

  readonly afficherTout = signal(false);

  readonly elements: ElementCarte[] = [
    {
      id: 'nil',
      titre: 'Le Nil',
      description:
        'Le Nil apporte l’eau nécessaire à la vie, à l’agriculture et aux déplacements.',
      image: '/images/territoire/nil.png',
      caracteristiques: [
        { label: 'Nature', valeur: 'Fleuve' },
        { label: 'Risque', valeur: 'Crues saisonnières' },
        { label: 'Atout', valeur: 'Eau et transport' },
        { label: 'À retenir', valeur: 'Ressource essentielle' }
      ]
    },
    {
      id: 'fertiles',
      titre: 'Les terres fertiles',
      description:
        'Les terres proches du Nil permettent le développement de l’agriculture.',
      image: '/images/territoire/fertiles.png',
      caracteristiques: [
        { label: 'Nature', valeur: 'Terres agricoles' },
        { label: 'Risque', valeur: 'Occupation des sols' },
        { label: 'Atout', valeur: 'Production agricole' },
        { label: 'À retenir', valeur: 'Nourrir les habitants' }
      ]
    },
    {
      id: 'desert',
      titre: 'Le désert',
      description:
        'Le désert offre de grands espaces, mais les ressources en eau sont limitées.',
      image: '/images/territoire/desert.png',
      caracteristiques: [
        { label: 'Nature', valeur: 'Milieu aride' },
        { label: 'Risque', valeur: 'Manque d’eau' },
        { label: 'Atout', valeur: 'Espace disponible' },
        { label: 'À retenir', valeur: 'Milieu contraignant' }
      ]
    },
    {
      id: 'inondables',
      titre: 'Les zones inondables',
      description:
        'Espaces exposés aux crues du fleuve. On évite d’y installer l’habitat : l’eau peut monter et détruire les constructions.',
      image: '/images/defi/inondables.png',
      caracteristiques: [
        { label: 'Nature', valeur: 'Exposée aux crues' },
        { label: 'Risque', valeur: 'Inondation' },
        { label: 'Atout', valeur: 'Eau et sols humides' },
        { label: 'À retenir', valeur: 'Zone à risque' }
      ]
    },
    {
      id: 'sureleves',
      titre: 'Les terrains surélevés',
      description:
        'Les terrains surélevés permettent de construire à proximité du Nil tout en limitant les risques.',
      image: '/images/territoire/sureleves.png',
      caracteristiques: [
        { label: 'Nature', valeur: 'Terrain en hauteur' },
        { label: 'Risque', valeur: 'Crues limitées' },
        { label: 'Atout', valeur: 'Construction plus sûre' },
        { label: 'À retenir', valeur: 'Site favorable' }
      ]
    }
  ];

  get elementActif(): ElementCarte {
    return this.elements.find(
      element => element.id === this.elementSelectionne()
    )!;
  }

  get nombreElementsVus(): number {
    return this.elementsVus().size;
  }

  choisirElement(id: ElementTerritoire): void {
    this.elementSelectionne.set(id);
    this.afficherTout.set(false);

    this.elementsVus.update(anciens => {
      const nouveaux = new Set(anciens);
      nouveaux.add(id);
      return nouveaux;
    });
  }

  toutAfficher(): void {
    this.afficherTout.set(true);
  }

  elementVisible(id: ElementTerritoire): boolean {
    return this.afficherTout() ||
      this.elementSelectionne() === id;
  }

  // ÉCRAN 5.2 : CHOIX DU SITE

  readonly siteSelectionne = signal<SiteId>('B');

  readonly sites: Record<SiteId, SiteImplantation> = {
    A: {
      id: 'A',
      nom: 'Site A',
      type: 'bord du Nil',
      proximite: 'Très proche',
      terres: 'Proches',
      risque: 'Élevé',
      ressources: 'Eau, pêche, transport fluvial',
      desert: 'Éloigné',
      decision:
        'Le site profite directement du Nil, mais il est exposé aux crues.'
    },
    B: {
      id: 'B',
      nom: 'Site B',
      type: 'terrain surélevé',
      proximite: 'Proche',
      terres: 'Adjacentes',
      risque: 'Limité',
      ressources: 'Eau, terres, accès au fleuve',
      desert: 'À l’ouest, en bordure',
      decision:
        'Choisir un site qui bénéficie de la proximité du Nil et des terres fertiles, tout en limitant les risques naturels.'
    },
    C: {
      id: 'C',
      nom: 'Site C',
      type: 'désert',
      proximite: 'Éloignée',
      terres: 'Éloignées',
      risque: 'Faible',
      ressources: 'Espace disponible, peu d’eau',
      desert: 'Sur place',
      decision:
        'Le site est moins exposé aux crues, mais l’éloignement de l’eau complique la vie urbaine.'
    }
  };

  get siteActif(): SiteImplantation {
    return this.sites[this.siteSelectionne()];
  }

  choisirSite(id: SiteId): void {
    this.siteSelectionne.set(id);
  }

  comparerAutreSite(): void {
    const actuel = this.siteSelectionne();

    this.siteSelectionne.set(
      actuel === 'A' ? 'B' :
        actuel === 'B' ? 'C' : 'A'
    );
  }

  // ÉCRAN 5.3 : FONCTIONS URBAINES

  private creerFonctionsInitiales(): FonctionUrbaine[] {
    return [
      {
        id: 'port',
        titre: 'Port fluvial',
        sousTitre: 'Transport et échanges',
        couleur: '#80b5d8',
        x: 50,
        y: 80,
        placee: false,
        message:
          'Le port fluvial doit être proche du Nil pour faciliter le transport et les échanges.'
      },
      {
        id: 'administration',
        titre: 'Administration',
        sousTitre: 'Gérer ressources et récoltes',
        couleur: '#edcd59',
        x: 50,
        y: 44,
        placee: false,
        message:
          'L’administration organise les activités et la gestion de la ville.'
      },
      {
        id: 'habitat',
        titre: 'Habitat',
        sousTitre: 'Accueillir la population',
        couleur: '#e4b48f',
        x: 19,
        y: 35,
        placee: false,
        message:
          'Les habitations doivent être installées sur un terrain relativement sûr.'
      },
      {
        id: 'agriculture',
        titre: 'Agriculture',
        sousTitre: 'Production alimentaire',
        couleur: '#9fc47c',
        x: 25,
        y: 17,
        placee: false,
        message:
          'L’agriculture profite des terres fertiles et de l’eau du Nil.'
      },
      {
        id: 'artisanat',
        titre: 'Artisanat',
        sousTitre: 'Objets et matériaux',
        couleur: '#d9946d',
        x: 35,
        y: 56,
        placee: false,
        message:
          'Les ateliers sont utiles à proximité des habitations et des voies de circulation.'
      },
      {
        id: 'temple',
        titre: 'Temple',
        sousTitre: 'Pratiques religieuses',
        couleur: '#aab4d0',
        x: 72,
        y: 40,
        placee: false,
        message:
          'Le temple occupe une place importante dans l’organisation religieuse et sociale.'
      }
    ];
  }

  readonly fonctions =
    signal<FonctionUrbaine[]>(this.creerFonctionsInitiales());

  readonly fonctionActive = signal<FonctionId | null>(null);

  readonly messagePlacement = signal(
    'Choisis une fonction puis clique sur le plan pour la placer.'
  );

  readonly placementValide = signal(false);

  get nombreFonctionsPlacees(): number {
    return this.fonctions().filter(f => f.placee).length;
  }

  get progressionFonctions(): number {
    return (this.nombreFonctionsPlacees / 6) * 100;
  }

  selectionnerFonction(id: FonctionId): void {
    this.fonctionActive.set(id);

    const fonction = this.fonctions().find(f => f.id === id);

    if (fonction) {
      this.messagePlacement.set(
        `Place maintenant « ${fonction.titre} » sur le plan.`
      );
    }
  }

  placerFonction(id: FonctionId, x: number, y: number): void {
    const positionX = Math.max(12, Math.min(88, x));
    const positionY = Math.max(8, Math.min(88, y));

    this.fonctions.update(anciennes =>
      anciennes.map(f =>
        f.id === id
          ? { ...f, x: positionX, y: positionY, placee: true }
          : f
      )
    );

    const fonction = this.fonctions().find(f => f.id === id);

    if (fonction) {
      this.messagePlacement.set(fonction.message);
    }

    this.placementValide.set(true);
    this.fonctionActive.set(null);
  }

  placerSurCarte(event: MouseEvent): void {
    const id = this.fonctionActive();
    if (!id) return;

    const element = event.currentTarget as HTMLElement;
    const rectangle = element.getBoundingClientRect();

    const x =
      ((event.clientX - rectangle.left) / rectangle.width) * 100;
    const y =
      ((event.clientY - rectangle.top) / rectangle.height) * 100;

    this.placerFonction(id, x, y);
  }

  debutGlisser(event: DragEvent, id: FonctionId): void {
    this.fonctionActive.set(id);

    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', id);
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  autoriserDepot(event: DragEvent): void {
    event.preventDefault();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  deposerSurCarte(event: DragEvent): void {
    event.preventDefault();

    const id = (
      event.dataTransfer?.getData('text/plain') ||
      this.fonctionActive()
    ) as FonctionId | null;

    if (!id || !this.fonctions().some(f => f.id === id)) {
      return;
    }

    const element = event.currentTarget as HTMLElement;
    const rectangle = element.getBoundingClientRect();

    const x =
      ((event.clientX - rectangle.left) / rectangle.width) * 100;
    const y =
      ((event.clientY - rectangle.top) / rectangle.height) * 100;

    this.placerFonction(id, x, y);
  }

  fonctionEstPlacee(id: FonctionId): boolean {
    return this.fonctions().some(
      f => f.id === id && f.placee
    );
  }

  // ÉCRAN 5.8 : SCORE

  get scoreTerritoire(): number {
    switch (this.siteSelectionne()) {
      case 'B': return 18;
      case 'A': return 12;
      case 'C': return 8;
    }
  }

  get scoreFonctions(): number {
    return this.nombreFonctionsPlacees * 4;
  }

  // Ces trois valeurs restent provisoires.

  get scoreRelations(): number {
    return 14;
  }

  get scoreEvenements(): number {
    return 14;
  }

  get scoreOrganisation(): number {
    return 8;
  }

  get scoreTotal(): number {
    return (
      this.scoreTerritoire +
      this.scoreFonctions +
      this.scoreRelations +
      this.scoreEvenements +
      this.scoreOrganisation
    );
  }

  // REJOUER : RÉINITIALISER LE DÉFI

  rejouerDefi(): void {
    this.elementSelectionne.set('inondables');
    this.elementsVus.set(new Set<ElementTerritoire>());
    this.afficherTout.set(false);

    this.siteSelectionne.set('B');

    this.fonctions.set(this.creerFonctionsInitiales());
    this.fonctionActive.set(null);

    this.messagePlacement.set(
      'Choisis une fonction puis clique sur le plan pour la placer.'
    );

    this.placementValide.set(false);

    this.allerVers('introduction');
  }
}
