
import { Component, output, signal } from '@angular/core';

interface Profil {
  id: string;
  nom: string;
  role: string;
  journee: string[];
  informations: {
    titre: string;
    texte: string;
  }[];
}

@Component({
  selector: 'app-habitants',
  standalone: true,
  imports: [],
  templateUrl: './habitations.html',
  styleUrl: './habitations.scss'
})
export class Habitants {

  readonly retour = output<void>();
  readonly suivant = output<void>();

  readonly profilActif = signal(0);
  readonly niveauActif = signal(0);
  readonly questionActive = signal(0);
  readonly reponse = signal<number | null>(null);
  readonly score = signal(0);

  readonly profils: Profil[] = [
    {
      id: 'paysan',
      nom: 'Un paysan (sekhty)',
      role: 'Il cultive les terres du roi, des temples et des domaines.',
      journee: [
        'Il habite dans un village situé près des terres agricoles.',
        'À l’aube, il rejoint les champs pour semer ou moissonner selon la saison.',
        'Un scribe mesure et enregistre les récoltes.',
        'Une partie de la production est prélevée comme impôt en nature.',
        'Il peut participer aux travaux collectifs pendant la crue du Nil.'
      ],
      informations: [
        {
          titre: 'Statut',
          texte: 'Il travaille sur des terres dépendant du roi, d’un temple ou d’un domaine.'
        },
        {
          titre: 'Organisation',
          texte: 'Son activité suit les saisons du Nil : akhet, peret et chemou.'
        }
      ]
    },
    {
      id: 'artisan',
      nom: 'Un artisan (hemouty)',
      role: 'Il fabrique les objets utilisés par les habitants, les temples et le palais.',
      journee: [
        'Il vit dans un quartier d’artisans ou de travailleurs.',
        'Il rejoint son atelier.',
        'Il travaille le bois, la pierre, le métal ou la faïence.',
        'Un scribe peut enregistrer les objets produits.',
        'Il reçoit des rations ou une rémunération en nature.'
      ],
      informations: [
        {
          titre: 'Statut',
          texte: 'Certains artisans travaillent pour des institutions royales ou religieuses.'
        },
        {
          titre: 'Organisation',
          texte: 'Le travail peut être organisé en équipes sous la responsabilité d’un chef.'
        }
      ]
    },
    {
      id: 'scribe',
      nom: 'Un scribe (sesh)',
      role: 'Il écrit, compte et participe à l’administration.',
      journee: [
        'Il quitte sa maison pour rejoindre un bureau administratif.',
        'Il utilise une palette, des calames et des supports d’écriture.',
        'Il enregistre les récoltes et les rations.',
        'Il rédige des lettres et des documents.',
        'Il travaille avec les responsables de l’administration.'
      ],
      informations: [
        {
          titre: 'Formation',
          texte: 'Il apprend l’écriture, le calcul et la rédaction des documents.'
        },
        {
          titre: 'Fonction',
          texte: 'Il est essentiel au fonctionnement des greniers, du Trésor et des bureaux.'
        }
      ]
    },
    {
      id: 'pretre',
      nom: 'Un prêtre (ouâb / hem-netjer)',
      role: 'Il participe au culte et au fonctionnement du temple.',
      journee: [
        'Il accomplit les rites de purification.',
        'Il rejoint le temple pour participer au culte.',
        'Il présente des offrandes et accomplit les cérémonies.',
        'Il peut participer à la gestion des biens du temple.',
        'L’accès au sanctuaire dépend de son rôle et de son rang.'
      ],
      informations: [
        {
          titre: 'Titres',
          texte: 'Hem-netjer signifie « serviteur du dieu » ; ouâb désigne un prêtre « pur ».'
        },
        {
          titre: 'Organisation',
          texte: 'Le service religieux peut être réparti entre plusieurs équipes.'
        }
      ]
    }
  ];

  readonly niveaux = [
    {
      titre: 'Pharaon',
      sousTitre: 'Le roi',
      description: 'Il représente le pouvoir royal et garantit symboliquement la maât, l’ordre et l’équilibre.'
    },
    {
      titre: 'Vizir (tjaty)',
      sousTitre: 'Chef de l’administration',
      description: 'Il supervise l’administration, la justice et les grands services du royaume.'
    },
    {
      titre: 'Directeurs (imy-ra)',
      sousTitre: 'Responsables des services',
      description: 'Ils dirigent les greniers, les travaux, les ateliers et d’autres institutions.'
    },
    {
      titre: 'Gouverneurs (haty-â)',
      sousTitre: 'Responsables locaux',
      description: 'Ils participent à la gestion des villes, des domaines et des provinces.'
    },
    {
      titre: 'Scribes (sesh)',
      sousTitre: 'Administration écrite',
      description: 'Ils tiennent les comptes, rédigent les documents et enregistrent les ressources.'
    },
    {
      titre: 'Prêtres',
      sousTitre: 'Service des dieux',
      description: 'Ils assurent les rituels et participent à la gestion des temples.'
    },
    {
      titre: 'Artisans',
      sousTitre: 'Production',
      description: 'Ils fabriquent les objets, les outils et les éléments de construction.'
    },
    {
      titre: 'Paysans',
      sousTitre: 'Agriculture',
      description: 'Ils cultivent les terres et fournissent une grande partie des ressources alimentaires.'
    }
  ];

  readonly glossaire = [
    { mot: 'Maât', definition: 'Ordre, justice et équilibre du monde' },
    { mot: 'Tjaty', definition: 'Vizir' },
    { mot: 'Sesh', definition: 'Scribe' },
    { mot: 'Hemouty', definition: 'Artisan' },
    { mot: 'Sekhty', definition: 'Paysan' },
    { mot: 'Sepat', definition: 'Province ou nome' },
    { mot: 'Chounet', definition: 'Grenier' },
    { mot: 'Per-ankh', definition: 'Maison de vie' }
  ];

  readonly questions = [
    {
      texte: 'Qui dirige l’administration sous le pharaon ?',
      choix: ['Le paysan', 'Le vizir', 'L’artisan'],
      correcte: 1,
      explication: 'Le vizir, appelé tjaty, est un haut responsable de l’administration.'
    },
    {
      texte: 'Quel est le rôle principal du scribe ?',
      choix: ['Écrire et compter', 'Construire les bateaux', 'Cultiver les champs'],
      correcte: 0,
      explication: 'Le scribe enregistre les ressources et rédige les documents.'
    },
    {
      texte: 'Quelle saison correspond à la crue du Nil ?',
      choix: ['Chemou', 'Peret', 'Akhet'],
      correcte: 2,
      explication: 'Akhet désigne la saison de la crue du Nil.'
    }
  ];

  get profilSelectionne(): Profil {
    return this.profils[this.profilActif()];
  }

  get niveauSelectionne() {
    return this.niveaux[this.niveauActif()];
  }

  choisirProfil(index: number): void {
    this.profilActif.set(index);
  }

  choisirNiveau(index: number): void {
    this.niveauActif.set(index);
  }

  choisirReponse(index: number): void {
    if (this.reponse() !== null) {
      return;
    }

    if (this.questionActive() >= this.questions.length) {
      return;
    }

    this.reponse.set(index);

    if (index === this.questions[this.questionActive()].correcte) {
      this.score.update(valeur => valeur + 1);
    }
  }

  questionSuivante(): void {
    if (
      this.reponse() !== null &&
      this.questionActive() < this.questions.length
    ) {
      this.questionActive.update(index => index + 1);
      this.reponse.set(null);
    }
  }

  recommencerQuiz(): void {
    this.questionActive.set(0);
    this.reponse.set(null);
    this.score.set(0);
  }
}
