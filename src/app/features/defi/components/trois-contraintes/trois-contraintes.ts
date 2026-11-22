
import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface InformationContrainte {
  label: string;
  valeur: string;
}

interface Contrainte {
  id: string;
  titre: string;
  couleur: string;
  image: string;
  imageDescription: string;
  objectif: string;
  informations: InformationContrainte[];
}

@Component({
  selector: 'app-trois-contraintes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trois-contraintes.html',
  styleUrl: './trois-contraintes.scss'
})
export class TroisContraintes {

  readonly retour = output<void>();
  readonly suivant = output<void>();

  readonly contraintes: Contrainte[] = [
    {
      id: 'crue',
      titre: 'La crue du Nil',
      couleur: '#80b5d8',
      image: '/images/defi/crue.jpg',
      imageDescription:
        'Crue du Nil et cycle agricole',
      objectif:
        'Protéger les habitants et préserver les terres agricoles.',
      informations: [
        {
          label: 'Déclencheur',
          valeur: 'Montée du fleuve'
        },
        {
          label: 'Mis à l’épreuve',
          valeur: 'Choix du site, protection'
        },
        {
          label: 'Piège',
          valeur: 'Habitat en zone inondable'
        },
        {
          label: 'Piste',
          valeur: 'Habitat surélevé, champs protégés'
        }
      ]
    },
    {
      id: 'secheresse',
      titre: 'La sécheresse',
      couleur: '#e5c996',
      image: '/images/defi/secheresse.jpg',
      imageDescription:
        'Terre craquelée et niveau du Nil très bas',
      objectif:
        'Préserver l’accès à l’eau et anticiper les pénuries.',
      informations: [
        {
          label: 'Déclencheur',
          valeur: 'Baisse du niveau du Nil'
        },
        {
          label: 'Mis à l’épreuve',
          valeur: 'Accès à l’eau, port'
        },
        {
          label: 'Piège',
          valeur: 'Ville trop éloignée du fleuve'
        },
        {
          label: 'Piste',
          valeur: 'Réserves d’eau et canaux'
        }
      ]
    },
    {
      id: 'croissance',
      titre: 'Croissance démographique',
      couleur: '#aab4d1',
      image: '/images/defi/croissance.jpg',
      imageDescription:
        'Quartier dense et animé en brique crue',
      objectif:
        'Étendre la ville sans sacrifier les terres agricoles.',
      informations: [
        {
          label: 'Déclencheur',
          valeur: 'Population en hausse'
        },
        {
          label: 'Mis à l’épreuve',
          valeur: 'Extension des quartiers'
        },
        {
          label: 'Piège',
          valeur: 'Construire sur les terres fertiles'
        },
        {
          label: 'Piste',
          valeur: 'Étendre vers le désert'
        }
      ]
    }
  ];

  retournerCrue(): void {
    this.retour.emit();
  }

  continuer(): void {
    this.suivant.emit();
  }
}
