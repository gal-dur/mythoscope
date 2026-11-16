import { useEffect, useReducer } from "react";
import { myths } from "../data/myths";
import { mythFragment, routeOf } from "../domain/link";
import { select } from "../domain/select";
import { type AgeId, ageIds, type Myth, type Section } from "../domain/types";
import { copyText } from "../platform/clipboard";
import { remember, remembered } from "../platform/storage";
import { fragmentOf } from "../state/fragment";
import { initialState, type Notice, nextStateOver, type State } from "../state/state";
import { Home } from "./branches/Home";
import { MythList } from "./branches/MythList";
import { Reader } from "./branches/Reader";
import { Toolbar } from "./branches/Toolbar";
import { useAfter } from "./leaves/useAfter";

const nextState = nextStateOver(myths);

const sizeOf = (section: Section): number =>
  myths.filter((myth) => myth.section === section).length;
const sectionSizes = { cause: sizeOf("cause"), treat: sizeOf("treat") };

const rememberedAge = (): AgeId | null => {
  const age = remembered("age");
  return ageIds.find((id) => id === age) ?? null;
};

const arrive = (): State =>
  initialState(myths, {
    route: routeOf(window.location.hash),
    age: rememberedAge(),
    seen: remembered("seen") !== null,
  });

/** How long a note about a copy stays; a link shown to be copied by hand stays until dismissed. */
const noticeMs = (notice: Notice | null): number => (notice?.kind === "linkCopied" ? 2500 : 2200);
const markMs = 1500;

/** The trunk: owns the state and binds it to the address, the browser's storage and the views. */
export const App = () => {
  const [state, dispatch] = useReducer(nextState, undefined, arrive);
  const listed = select(myths, state);

  const fragment = fragmentOf(state);
  useEffect(() => {
    if (window.location.hash.replace(/^#/, "") !== fragment) window.location.hash = fragment;
  }, [fragment]);
  useEffect(() => {
    const onHash = () => dispatch({ kind: "follow", route: routeOf(window.location.hash) });
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => remember("age", state.age), [state.age]);
  useEffect(() => {
    if (state.view === "list") remember("seen", "1");
    window.scrollTo(0, 0);
  }, [state.view]);
  // A search typed while scrolled down the list starts from the top of what it found.
  // biome-ignore lint/correctness/useExhaustiveDependencies: the query is the trigger, not an input
  useEffect(() => {
    if (window.scrollY > 0) window.scrollTo(0, 0);
  }, [state.query]);

  useAfter(state.notice?.kind === "linkShown" ? null : state.notice, noticeMs(state.notice), () =>
    dispatch({ kind: "dismissNotice" }),
  );
  useAfter(state.cameFrom, markMs, () => dispatch({ kind: "forgetCameFrom" }));

  const notify = (notice: Notice) => dispatch({ kind: "notify", notice });
  const copyLink = async ({ id }: Myth) => {
    const { origin, pathname } = window.location;
    const url = `${origin}${pathname}#${mythFragment(id, state)}`;
    notify((await copyText(url)) ? { kind: "linkCopied", id } : { kind: "linkShown", id, url });
  };
  const copyMessage = async ({ id, message }: Myth) =>
    notify({ kind: (await copyText(message)) ? "messageCopied" : "messageSelected", id });

  return (
    <>
      {state.view === "home" ? (
        <Home onBrowse={() => dispatch({ kind: "browse" })} />
      ) : (
        <>
          <Toolbar
            selection={state}
            filtersOpen={state.filtersOpen}
            sectionSizes={sectionSizes}
            onEvent={dispatch}
          />
          <main className="wrap">
            <MythList
              listed={listed}
              total={myths.length}
              selection={state}
              cameFrom={state.cameFrom}
              onEvent={dispatch}
            />
          </main>
        </>
      )}
      {state.reading !== null && (
        <Reader
          listed={listed}
          reading={state.reading}
          age={state.age}
          notice={state.notice}
          onEvent={dispatch}
          onCopyLink={copyLink}
          onCopyMessage={copyMessage}
        />
      )}
      <footer>
        <div className="wrap">
          Источники проверены 15 ноября 2026. Оценки уровня риска авторские, они опираются на
          приведённые источники и не заменяют консультацию врача.
        </div>
      </footer>
    </>
  );
};
