# MythoScope

See `README.md` for the layout and the commands. `task check` is the definition of green.

- Everything runs in the container; nothing is installed on the host. Dependencies are added with
  `task add`, pinned exactly.
- `src/domain` and `src/state` are pure: no DOM, clock, storage or network. What touches the
  browser lives in `src/platform` or in an effect in `src/ui/App.tsx`.
- State is one value: `nextState(state, event)` in `src/state/state.ts`. Components hold none; they
  render the state and emit events. Match events exhaustively, never with a default arm.
- `src/ui/leaves` may import packages and other leaves only (`leaves.test.ts` enforces it).
  Anything that knows what a myth is belongs in `src/ui/branches`.
- The medical content in `src/data` is the author's. Do not reword, add or remove a claim, a risk
  level or a source without being asked.
- No request leaves the page: fonts are bundled, and no analytics or third-party scripts are added.
