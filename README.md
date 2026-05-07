# Analisador Léxico com AFD

Analisador léxico baseado em autômato finito determinístico (AFD) para validar tokens de acordo com palavras adicionadas.

## Como rodar

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```
4. Abra http://localhost:5173 no navegador

## Como funciona

### AddToken
Adicione palavras ao autômato. Cada palavra adicionada expande o AFD com novos estados e transições. Somente letras minúsculas são aceitas.

### LexicalAnalyzer
Digite caracteres (a-z) um de cada vez. O analisador reconhece tokens válidos (aqueles que terminam em estados finais do autômato) ou os rejeita. Pressione espaço para validar o token ou backspace para voltar.

### TransitionTable
Visualiza em tempo real o estado atual da máquina, as transições de estados e mostra quais células estão ativas durante a leitura.

## Estrutura

```
src/
├── App.tsx              # Componente principal
├── components/
│   ├── AddToken.tsx     # Formulário para adicionar palavras
│   ├── LexicalAnalyzer.tsx  # Validador de tokens
│   └── TransitionTable.tsx  # Tabela visual do AFD
├── logic/
│   └── automato.ts      # Implementação do AFD
└── index.css            # Estilos globais
```

## Scripts

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila para produção
- `npm run lint` - Executa linter
- `npm run preview` - Visualiza build de produção
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
