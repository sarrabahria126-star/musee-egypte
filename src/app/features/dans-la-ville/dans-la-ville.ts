
import { Component, signal } from '@angular/core';
import { Habitants } from './components/habitations/habitations';
import { Villes } from './components/villes/villes';

type PageVille =
  | 'accueil'
  | 'vue-aerienne'
  | 'habitants'
  | 'villes'
  | 'conclusion';

type EspaceId =
  | 'habitations'
  | 'rues'
  | 'palais'
  | 'temples'
  | 'administration';

interface Espace {
  id: EspaceId;
  titre: string;
  question: string;
  description: string;
  vocabulaire: string;
  couleur: string;
}

@Component({
  selector: 'app-dans-la-ville',
  standalone: true,
  imports: [Habitants, Villes],
  templateUrl: './dans-la-ville.html',
  styleUrl: './dans-la-ville.scss'
})
export class DansLaVille {

  readonly ecran = signal<PageVille>('accueil');

  readonly espaceActif = signal<EspaceId>('habitations');

  readonly espaces: Espace[] = [
    {
      id: 'habitations',
      titre: 'Les habitations',
      question: 'Comment vivait-on dans la ville ?',
      description:
        'Les habitants vivaient dans des maisons de briques crues. ' +
        'Les quartiers regroupaient des logements de différentes tailles, ' +
        'avec des cours et des espaces consacrés aux activités quotidiennes.',
      vocabulaire: 'Maison, cour, quartier résidentiel',
      couleur: '#70b981'
    },
    {
      id: 'rues',
      titre: 'Les rues',
      question: 'Comment circulait-on ?',
      description:
        'Les rues reliaient les habitations, les palais, les temples ' +
        'et les espaces administratifs. À Akhetaton, la route royale ' +
        'constituait un axe important de circulation.',
      vocabulaire: 'Route royale, ruelle, circulation',
      couleur: '#e8ba47'
    },
    {
      id: 'palais',
      titre: 'Les palais',
      question: 'Où se concentrait le pouvoir ?',
      description:
        'Le Grand Palais et la Maison du roi étaient associés ' +
        'à la présence du pharaon et aux activités du pouvoir royal.',
      vocabulaire: 'Pharaon, palais, Maison du roi',
      couleur: '#e59c69'
    },
    {
      id: 'temples',
      titre: 'Les temples',
      question: 'Quelle place occupait la religion ?',
      description:
        'Les temples étaient des espaces religieux majeurs. ' +
        'À Akhetaton, les temples d’Aton occupaient une place ' +
        'importante dans l’organisation de la ville.',
      vocabulaire: 'Temple, sanctuaire, offrande',
      couleur: '#a48bdd'
    },
    {
      id: 'administration',
      titre: 'Les espaces administratifs',
      question: 'Comment la ville était-elle gérée ?',
      description:
        'Les scribes et les responsables administraient les ressources. ' +
        'Des bureaux, des magasins et des espaces de stockage ' +
        'participaient au fonctionnement de la ville.',
      vocabulaire: 'Scribe, archives, magasins, greniers',
      couleur: '#73acd6'
    }
  ];

  get espaceSelectionne(): Espace {
    return this.espaces.find(
      espace => espace.id === this.espaceActif()
    ) ?? this.espaces[0];
  }

  allerVers(page: PageVille): void {
    this.ecran.set(page);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  ouvrirAccueil(): void {
    this.allerVers('accueil');
  }

  ouvrirVueAerienne(): void {
    this.allerVers('vue-aerienne');
  }

  ouvrirHabitants(): void {
    this.allerVers('habitants');
  }

  ouvrirVilles(): void {
    this.allerVers('villes');
  }

  ouvrirConclusion(): void {
    this.allerVers('conclusion');
  }

  choisirEspace(id: EspaceId): void {
    this.espaceActif.set(id);
  }
}
