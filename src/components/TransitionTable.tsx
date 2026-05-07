import { Automato } from "../logic/automato";
import "./TransitionTable.css";

type Props = {
  automato: Automato;
  currentState: string;
  currentChar: string;
  error: boolean;
};

const alphabet = "abcdefghijklmnopqrstuvwxyz".split(
  ""
);

export default function TransitionTable({
  automato,
  currentState,
  currentChar,
  error,
}: Props) {
  const states = Object.keys(
    automato.transitions
  );

  return (
    <div className="transition-table">
      <h2>Tabela de Transições</h2>

      <table className="transition-table-table">
        <thead>
          <tr>
            <th>Estado</th>

            {alphabet.map((letter) => (
              <th key={letter}>{letter}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {states.map((state) => (
            <tr key={state}>
              <td>
                <strong>{state}</strong>
              </td>

              {alphabet.map((letter) => {
                const next = automato.transitions[state]?.[letter];

                const isActive =
                  state === currentState && letter === currentChar;

                const cellClasses = ["transition-table-cell"];

                if (isActive) {
                  cellClasses.push(
                    error
                      ? "transition-table-cell-error"
                      : "transition-table-cell-active"
                  );
                }

                return (
                  <td key={letter} className={cellClasses.join(" ")}>
                    {next || "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}