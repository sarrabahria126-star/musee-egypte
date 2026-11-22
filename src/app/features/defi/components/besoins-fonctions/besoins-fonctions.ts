
import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';

interface Besoin {
  label: string;
  valeur: string;
}

interface FonctionVille {
  id: string;
  titre: string;
  image: string;
  description: string;
  couleur: string;
  besoins: Besoin[];
}

@Component({
  selector: 'app-besoins-fonctions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './besoins-fonctions.html',
  styleUrl: './besoins-fonctions.scss'
})
export class BesoinsFonctions {

  readonly retour = output<void>();
  readonly suivant = output<void>();

  readonly fonctions: FonctionVille[] = [
    {
      id: 'habitat',
      titre: 'Habitat',
      image: '/images/defi/habitat.png',
      couleur: '#e4b48f',
      description:
        'Accueillir la population et organiser les quartiers résidentiels.',
      besoins: [
        {
          label: 'Besoin',
          valeur: 'Hors des zones inondables'
        },
        {
          label: 'Proche de',
          valeur: 'Agriculture, administration, temple'
        }
      ]
    },
    {
      id: 'agriculture',
      titre: 'Agriculture',
      image: '/images/defi/agriculture.png',
      couleur: '#9fc47c',
      description:
        'Assurer la production alimentaire grâce aux terres fertiles.',
      besoins: [
        {
          label: 'Besoin',
          valeur: 'Terres fertiles, eau du Nil'
        },
        {
          label: 'Proche de',
          valeur: 'Habitat'
        }
      ]
    },
    {
      id: 'artisanat',
      titre: 'Artisanat',
      image: '/images/defi/artisanat.png',
      couleur: '#d9946d',
      description:
        'Produire les objets et les matériaux de la vie quotidienne.',
      besoins: [
        {
          label: 'Besoin',
          valeur: 'Matériaux et produits à échanger'
        },
        {
          label: 'Proche de',
          valeur: 'Port fluvial'
        }
      ]
    },
    {
      id: 'administration',
      titre: 'Administration',
      image: '/images/defi/administration.png',
      couleur: '#edcd59',
      description:
        'Gérer les ressources, les récoltes et les activités de la ville.',
      besoins: [
        {
          label: 'Besoin',
          valeur: 'Position centrale, bien reliée'
        },
        {
          label: 'Proche de',
          valeur: 'Port fluvial, quartiers'
        }
      ]
    },
    {
      id: 'temple',
      titre: 'Temple',
      image: '/images/defi/temple.png',
      couleur: '#aab4d0',
      description:
        'Accueillir les pratiques religieuses et les cérémonies.',
      besoins: [
        {
          label: 'Besoin',
          valeur: 'Accessible depuis l’habitat'
        },
        {
          label: 'Proche de',
          valeur: 'Habitat'
        }
      ]
    },
    {
      id: 'port',
      titre: 'Port fluvial',
      image: '/images/defi/port-fluvial.png',
      couleur: '#80b5d8',
      description:
        'Assurer le transport des marchandises et les échanges par le Nil.',
      besoins: [
        {
          label: 'Besoin',
          valeur: 'Rive du Nil'
        },
        {
          label: 'Proche de',
          valeur: 'Artisanat, administration'
        }
      ]
    }
  ];

  retournerAuPlan(): void {
    this.retour.emit();
  }

  passerAuxContraintes(): void {
    this.suivant.emit();
  }
}
