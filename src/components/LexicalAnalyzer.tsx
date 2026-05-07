import { useState } from "react";

import { Automato } from "../logic/automato";

import TransitionTable from "./TransitionTable";
import "./LexicalAnalyzer.css";

type Props = {
  automato: Automato;
};

export default function LexicalAnalyzer({
  automato,
}: Props) {
  const [token, setToken] = useState("");

  const [currentState, setCurrentState] =
    useState("q0");

  const [message, setMessage] =
    useState("");

  const [currentChar, setCurrentChar] =
    useState("");

  const [error, setError] =
    useState(false);

  // ESTADO ANTES DO ERRO
  const [highlightState, setHighlightState] =
    useState("q0");

  // recalcula estado
  const calculateState = (word: string) => {
    let state = "q0";

    for (const char of word) {
      const next =
        automato.transitions[state]?.[
          char
        ];

      if (!next) {
        return "qErro";
      }

      state = next;
    }

    return state;
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const key = e.key;

    // espaço
    if (key === " ") {
      e.preventDefault();

      if (
        automato.finalStates.has(
          currentState
        )
      ) {
        setMessage(
          `TOKEN RECONHECIDO: ${token}`
        );
      } else {
        setMessage(
          `TOKEN REJEITADO: ${token}`
        );
      }

      // reset
      setToken("");
      setCurrentState("q0");
      setCurrentChar("");
      setError(false);
      setHighlightState("q0");

      return;
    }

    // backspace
    if (key === "Backspace") {
      const updated = token.slice(
        0,
        -1
      );

      setToken(updated);

      const newState =
        calculateState(updated);

      setCurrentState(newState);

      setError(
        newState === "qErro"
      );

      setHighlightState(newState);

      return;
    }

    // ignora especiais
    if (key.length > 1) return;

    // somente a-z
    if (!/^[a-z]$/.test(key)) {
      return;
    }

    // salva estado atual ANTES da transição
    setHighlightState(currentState);

    setCurrentChar(key);

    const updated = token + key;

    setToken(updated);

    const nextState =
      automato.transitions[currentState]?.[
        key
      ];

    // erro
    if (!nextState) {
      setCurrentState("qErro");
      setError(true);
      return;
    }

    setCurrentState(nextState);

    setError(false);
  };

  return (
    <div className="lexical-analyzer">
      <h2>Analisador Léxico</h2>

      <input
        className="lexical-analyzer-input"
        type="text"
        value={token}
        onKeyDown={handleKeyDown}
        onChange={() => {}}
      />

      <div className="lexical-analyzer-status">
        <p>
          <strong className="lexical-analyzer-label">Estado Atual:</strong>{" "}
          {currentState}
        </p>

        <p>
          <strong className="lexical-analyzer-label">Token:</strong>{" "}
          {token}
        </p>
      </div>

      <p className={error ? "lexical-analyzer-message lexical-analyzer-message-error" : "lexical-analyzer-message"}>
        {message}
      </p>

      <TransitionTable
        automato={automato}
        currentState={highlightState}
        currentChar={currentChar}
        error={error}
      />
    </div>
  );
}