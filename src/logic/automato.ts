type TransitionTable = {
  [state: string]: {
    [char: string]: string;
  };
};

type FinalStates = Set<string>;

export class Automato {
  transitions: TransitionTable = {};
  finalStates: FinalStates = new Set();
  words: string[] = [];

  private stateCount = 0;

  constructor() {
    this.transitions["q0"] = {};
  }

  createState() {
    this.stateCount++;
    return `q${this.stateCount}`;
  }

  addWord(word: string) {
    let currentState = "q0";

    for (const char of word) {
      if (!this.transitions[currentState][char]) {
        const newState = this.createState();

        this.transitions[currentState][char] =
          newState;

        this.transitions[newState] = {};
      }

      currentState =
        this.transitions[currentState][char];
    }

    this.finalStates.add(currentState);

    if (!this.words.includes(word)) {
      this.words.push(word);
    }
  }

  validate(word: string) {
    let currentState = "q0";

    for (const char of word) {
      const next =
        this.transitions[currentState]?.[char];

      if (!next) {
        return false;
      }

      currentState = next;
    }

    return this.finalStates.has(currentState);
  }
}