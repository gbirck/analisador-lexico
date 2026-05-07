import { useState } from "react";
import { Automato } from "../logic/automato";
import "./AddToken.css";

type Props = {
  automato: Automato;
  onUpdate: () => void;
};

export default function AddToken({
  automato,
  onUpdate,
}: Props) {
  const [word, setWord] = useState("");

  const handleAddWord = () => {
    const cleaned = word.trim();

    // somente letras minúsculas
    if (!/^[a-z]+$/.test(cleaned)) {
      alert("Use apenas letras minúsculas.");
      return;
    }

    automato.addWord(cleaned);

    setWord("");

    onUpdate();
  };

  return (
    <div className="add-token">
      <h2>Adicionar Palavra</h2>

      <div className="add-token-form">
        <input
          className="add-token-input"
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Digite uma palavra"
        />

        <button
          className="add-token-button"
          onClick={handleAddWord}
        >
          Adicionar
        </button>
      </div>

      <div className="add-token-list">
        <h3>Palavras adicionadas</h3>
        {automato.words.length > 0 ? (
          <ul>
            {automato.words.map((addedWord) => (
              <li key={addedWord} className="add-token-list-item">
                {addedWord}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma palavra adicionada ainda.</p>
        )}
      </div>
    </div>
  );
}