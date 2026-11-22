
import {
  Component,
  OnDestroy,
  OnInit,
  output,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';

type ChoixCrue = 1 | 2 | 3;

interface OptionCrue {
  id: ChoixCrue;
  titre: string;
  description: string;
  consequence: string;
}

@Component({
  selector: 'app-crue-nil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crue-nil.html',
  styleUrl: './crue-nil.scss'
})
export class CrueNil implements OnInit, OnDestroy {

  readonly retour = output<void>();
  readonly suivant = output<void>();

  readonly choixSelectionne = signal<ChoixCrue>(1);
  readonly niveauEau = signal(0);
  readonly simulationTerminee = signal(false);

  private intervalle: ReturnType<typeof setInterval> | null = null;

  readonly options: OptionCrue[] = [
    {
      id: 1,
      titre: 'Protéger les quartiers d’habitation',
      description: 'en les installant sur le terrain surélevé',
      consequence:
        'Les habitations sont hors d’atteinte de l’eau. Les champs en zone basse sont inondés, mais la crue laisse un sol fertile pour la prochaine saison.'
    },
    {
      id: 2,
      titre: 'Protéger les champs',
      description: 'avec des canaux et des digues',
      consequence:
        'Les digues et les canaux limitent les dégâts sur les cultures. Cependant, les quartiers d’habitation situés en zone basse restent exposés à la montée de l’eau.'
    },
    {
      id: 3,
      titre: 'Attendre la fin de la crue',
      description: 'sans rien modifier',
      consequence:
        'Sans aménagement, la montée de l’eau menace les habitations et les champs. La ville subit davantage de dégâts et les habitants doivent s’adapter.'
    }
  ];

  get optionActive(): ChoixCrue {
    return this.choixSelectionne();
  }

  get consequenceActive(): string {
    return this.options.find(
      option => option.id === this.choixSelectionne()
    )?.consequence ?? '';
  }

  ngOnInit(): void {
    this.demarrerSimulation();
  }

  ngOnDestroy(): void {
    this.arreterSimulation();
  }

  demarrerSimulation(): void {
    this.arreterSimulation();

    this.niveauEau.set(0);
    this.simulationTerminee.set(false);

    const duree = 4000;
    const pas = 50;
    const progression = 100 / (duree / pas);

    this.intervalle = setInterval(() => {
      const prochain = Math.min(
        100,
        this.niveauEau() + progression
      );

      this.niveauEau.set(prochain);

      if (prochain >= 100) {
        this.simulationTerminee.set(true);
        this.arreterSimulation();
      }
    }, pas);
  }

  private arreterSimulation(): void {
    if (this.intervalle !== null) {
      clearInterval(this.intervalle);
      this.intervalle = null;
    }
  }

  choisirOption(id: ChoixCrue): void {
    this.choixSelectionne.set(id);
  }

  retournerAuxQuartiers(): void {
    this.retour.emit();
  }

  evenementSuivant(): void {
    this.suivant.emit();
  }
}
