
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed
} from '@angular/core';

import { RouterLink } from '@angular/router';

type VillesScreen =
  | 'accueil'
  | 'frise'
  | 'memphis'
  | 'thebes'
  | 'amarna'
  | 'synthese'
  | 'conclusion';

interface Ville {
  id: 'memphis' | 'thebes' | 'amarna';
  nom: string;
  sousTitre: string;
  date: string;
  description: string;
  image: string;
  couleur: string;
}

@Component({
  selector: 'app-villes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './villes.html',
  styleUrl: './villes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Villes {

  readonly screens: VillesScreen[] = [
    'accueil',
    'frise',
    'memphis',
    'thebes',
    'amarna',
    'synthese',
    'conclusion'
  ];

  readonly currentScreen = signal<VillesScreen>('accueil');

  readonly currentIndex = computed(() =>
    this.screens.indexOf(this.currentScreen())
  );

  readonly stepNumber = computed(() =>
    this.currentIndex()
  );

  readonly villes: Ville[] = [
    {
      id: 'memphis',
      nom: 'Memphis',
      sousTitre: 'La ville du pouvoir',
      date: 'Vers 3100 av. J.-C.',
      description: 'Unification Unification de l’Égypte et\n' +
        'naissance d’un centre politique\n' +
        'et administratif stratégique.\n.',
      image: '/images/territoire/Memphis.jpg',
      couleur: 'blue'
    },
    {
      id: 'thebes',
      nom: 'Thèbes',
      sousTitre: 'La ville des dieux',
      date: '1550–1070 av. J.-C.',
      description: 'Apogée politique et religieuse au\n' +
        'Nouvel Empire : Karnak et la rive\n' +
        'ouest.\n',
      image: '/images/territoire/Thebes.jpg',
      couleur: 'green'
    },
    {
      id: 'amarna',
      nom: 'Amarna',
      sousTitre: 'La ville planifiée',
      date: '1346–1332 av. J.-C.',
      description: 'Capitale fondée par Akhenaton,\n' +
        'liée à une transformation\n' +
        'religieuse et politique.',
      image: '/images/territoire/Amarna.jpg',
      couleur: 'orange'
    }
  ];

  readonly navigation = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'frise', label: 'Frise' },
    { id: 'memphis', label: 'Memphis' },
    { id: 'thebes', label: 'Thèbes' },
    { id: 'amarna', label: 'Amarna' },
    { id: 'synthese', label: 'Synthèse' },
    { id: 'conclusion', label: 'Conclusion' }
  ] as const;

  goTo(screen: VillesScreen): void {
    this.currentScreen.set(screen);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  next(): void {
    const index = this.currentIndex();

    if (index < this.screens.length - 1) {
      this.goTo(this.screens[index + 1]);
    }
  }

  previous(): void {
    const index = this.currentIndex();

    if (index > 0) {
      this.goTo(this.screens[index - 1]);
    }
  }

  imageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    console.error(
      'Image introuvable :',
      image.src
    );
  }

}
