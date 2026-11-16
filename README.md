# MythoScope

MythoScope (доказательный справочник мифов): an evidence-based reference of folk and household remedies. For
each myth it gives the risk by age, what really happens, what to do instead, and a message to send
to the family chat. A static site with no server and no third-party requests; it carries a web
manifest and icons (`public/`), so a phone or a desktop browser can install it under its name.

## Running it

Everything runs in one container (podman); nothing is installed on the host but
[Task](https://taskfile.dev).

| Command                      | Does                                                       |
| ---------------------------- | ---------------------------------------------------------- |
| `task dev`                   | The site on http://localhost:5174, reloading on every edit |
| `task check`                 | Lint and format check, typecheck, tests, production build  |
| `task fmt`                   | Formats and applies the safe lint fixes                    |
| `task build`                 | The static site in `dist/`                                 |
| `task add -- [-D] <package>` | Adds a dependency at its latest release, pinned exactly    |

## How it is built

TypeScript (strict), React, Vite, Vitest, Biome. State is one value changed by one pure function.

```
src/
  data/      the myths and their sources, as typed literals; the compiler checks every citation
  domain/    pure functions: risk, selecting and ordering, the address codec, the wording
  state/     State, Event and nextState(state, event): the whole behaviour, no DOM
  platform/  the two things the browser may refuse: storage and the clipboard
  ui/
    App.tsx  trunk: owns the state; binds it to the address, storage and the views
    branches/  views of myths: they take domain values and emit events, and hold no state
    leaves/    generic parts that know nothing of myths (a test reads their imports)
```

- **Adding a myth**: add a record to the file for its part in `src/data/`, with a new `id`, and
  any new source to `src/data/sources.ts`. A source key that does not exist fails the typecheck.
- **Changing behaviour**: add or change an `Event` in `src/state/state.ts`. The reducer matches
  exhaustively, so the compiler names every place that must answer it. Test it as a sequence of
  events in `src/state/state.test.ts`.
- **Addresses**: `#myths` is the list and `#myth-12-cause-danger-infant` is a myth with the
  selection it was shared under. The address is a function of the state (`state/fragment.ts`).
