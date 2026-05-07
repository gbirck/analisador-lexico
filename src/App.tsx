import { useState } from "react";

import "./App.css";
import AddToken from "./components/AddToken";
import LexicalAnalyzer from "./components/LexicalAnalyzer";

import { Automato } from "./logic/automato";

const automato = new Automato();

export default function App() {
  const [, forceUpdate] = useState(0);

  return (
    <div className="app">
      <h1 className="app-title">Analisador Léxico</h1>

      <section className="app-section">
        <AddToken
          automato={automato}
          onUpdate={() => forceUpdate((prev) => prev + 1)}
        />
      </section>

      <section className="app-section">
        <LexicalAnalyzer automato={automato} />
      </section>
    </div>
  );
}