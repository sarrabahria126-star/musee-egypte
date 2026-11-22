import {
  Component,
  computed,
  forwardRef,
  inject,
  output,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pouvoir } from '../../pouvoir';

interface Question {
  titre: string;
  bonne: string;
  mauvaise: string;
  explication: string;
}

type EcranQuiz = 'questions' | 'resultat' | 'conclusion';

const QUESTIONS: readonly Question[] = [
  {
    titre: 'Sur quelle rive du Nil se trouve le temple de Karnak ?',
    bonne: 'La rive est',
    mauvaise: 'La rive ouest',
    explication:
      'La rive est est liée au soleil levant et à la vie. Les temples de Karnak et de Louxor y sont construits. Les nécropoles se trouvent à l’ouest, là où le soleil se couche.'
  },
  {
    titre: 'Pourquoi connaît-on mieux les temples que les maisons ?',
    bonne: 'Les temples sont en pierre, les maisons en brique crue',
    mauvaise: 'Il y avait moins de maisons que de temples',
    explication:
      'La brique crue se dégrade ou disparaît sous la ville moderne. La pierre se conserve mieux.'
  },
  {
    titre: 'Qu’est-ce qui distingue la tombe d’un roi de son temple funéraire au Nouvel Empire ?',
    bonne: 'La tombe est cachée, le temple est visible',
    mauvaise: 'La tombe est visible, le temple est caché',
    explication:
      'La tombe est cachée dans la vallée. Le temple funéraire est visible au bord des champs.'
  },
  {
    titre: 'Qui entre dans le sanctuaire d’un temple ?',
    bonne: 'Le roi et les grands prêtres',
    mauvaise: 'Tout le monde',
    explication:
      'Le public peut participer aux fêtes et accéder aux cours à certaines occasions. Le sanctuaire est réservé au roi et aux grands prêtres.'
  },
  {
    titre: 'Où va la procession de la fête d’Opet ?',
    bonne: 'De Karnak à Louxor',
    mauvaise: 'De Louxor à Gizeh',
    explication:
      'La procession relie le temple de Karnak au temple de Louxor. L’avenue des sphinx relie ces deux sanctuaires.'
  },
  {
    titre: 'Que montrent les scènes sur les pylônes ?',
    bonne: 'Le roi triomphant des ennemis',
    mauvaise: 'La vie quotidienne',
    explication:
      'Ces scènes transmettent un message de pouvoir. Le roi y apparaît comme celui qui maintient l’ordre face au chaos.'
  }
];

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss'
})
export class Quiz {
  private readonly pouvoir = inject<Pouvoir>(forwardRef(() => Pouvoir));

  readonly retour = output<void>();
  readonly routeDefi = '/defi';

  readonly questions = QUESTIONS.map(question => ({
    ...question,
    choix: Math.random() < 0.5
      ? [question.bonne, question.mauvaise]
      : [question.mauvaise, question.bonne]
  }));

  readonly ecran = signal<EcranQuiz>('questions');
  readonly index = signal(0);
  readonly selection = signal<string | null>(null);
  readonly score = signal(0);

  readonly question = computed(() => this.questions[this.index()]!);

  repondre(texte: string): void {
    if (this.ecran() !== 'questions' || this.selection() !== null) {
      return;
    }

    this.selection.set(texte);

    if (texte === this.question().bonne) {
      this.score.update(score => score + 1);
    }
  }

  avancer(): void {
    if (this.ecran() !== 'questions' || this.selection() === null) {
      return;
    }

    if (this.index() === this.questions.length - 1) {
      this.ecran.set('resultat');
    } else {
      this.index.update(index => index + 1);
      this.selection.set(null);
    }

    this.remonter();
  }

  ouvrirConclusion(): void {
    this.ecran.set('conclusion');
    this.remonter();
  }

  revoirEtape(): void {
    this.pouvoir.explorerThebes();
  }

  private remonter(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }
}
