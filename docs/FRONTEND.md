# Frontend Overview

Tech stack:

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn-ui components

Principais diretórios:

- `src/components/` — componentes reutilizáveis e UI primitives (`ui/` contém variantes do shadcn)
- `src/pages/` — páginas da aplicação: `Home`, `Patients`, `Reminders`, `Routines`, etc.
- `src/lib/utils.ts` — utilitários

Como rodar localmente:

```bash
npm install
npm run dev
```

Observações de desenvolvimento:

- API requests no backend apontam para `http://localhost` (ajuste se necessário)
- A app usa `react-router-dom` para rotas; ver `src/main.tsx` e `src/App.tsx` para configuração

Principais componentes a documentar (sugestão):

- `components/reminders/ReminderForm.tsx` — lógica de criação/edição de lembretes
- `components/routines/RoutineForm.tsx` — formulário de rotinas
- `components/patients/*` — listagem e modal de edição/exclusão
