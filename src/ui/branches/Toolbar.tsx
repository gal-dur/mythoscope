import { ageLabels, orderLabels, riskLabels, sectionLabels } from "../../domain/labels";
import { isFiltered, type Selection } from "../../domain/select";
import { ageIds, type Section } from "../../domain/types";
import type { Event } from "../../state/state";
import { Choice, type Option } from "../leaves/Choice";
import { FilterLines } from "../leaves/icons";

interface Props {
  readonly selection: Selection;
  readonly filtersOpen: boolean;
  /** How many myths each section holds, shown beside its name. */
  readonly sectionSizes: Readonly<Record<Section, number>>;
  readonly onEvent: (event: Event) => void;
}

const options = <Value extends string>(labels: Readonly<Record<Value, string>>): Option<Value>[] =>
  (Object.keys(labels) as Value[]).map((value) => ({ value, label: labels[value] }));

const ageOptions: readonly Option<(typeof ageIds)[number]>[] = ageIds.map((age) => ({
  value: age,
  label: <b>{ageLabels[age]}</b>,
}));

/** The bar that stays on screen above the list: search, filters and order, and the age. */
export const Toolbar = ({ selection, filtersOpen, sectionSizes, onEvent }: Props) => (
  <div className="agebar">
    <div className="wrap">
      <div className="qrow">
        <input
          type="search"
          className="q"
          aria-label="Поиск по мифам"
          placeholder="Поиск: чеснок, температура"
          autoComplete="off"
          value={selection.query}
          onChange={(change) => onEvent({ kind: "search", query: change.target.value })}
        />
        <button
          type="button"
          className="fbtn"
          aria-label="Фильтры и порядок"
          aria-expanded={filtersOpen}
          onClick={() => onEvent({ kind: "toggleFilters" })}
        >
          <FilterLines />
          {isFiltered(selection) && <i className="dot" />}
        </button>
      </div>
      {filtersOpen && (
        <div className="fpanel">
          <div className="lbl">Раздел</div>
          <Choice
            className="opts"
            label="Раздел"
            value={selection.section}
            onPick={(section) => onEvent({ kind: "pickSection", section })}
            options={[
              { value: "all", label: sectionLabels.all },
              { value: "cause", label: `${sectionLabels.cause} · ${sectionSizes.cause}` },
              { value: "treat", label: `${sectionLabels.treat} · ${sectionSizes.treat}` },
            ]}
          />
          <div className="lbl">Риск для выбранного возраста</div>
          <Choice
            className="opts"
            label="Риск"
            value={selection.risk}
            onPick={(risk) => onEvent({ kind: "pickRisk", risk })}
            options={options(riskLabels)}
          />
          <div className="lbl">Порядок</div>
          <Choice
            className="opts"
            label="Порядок"
            value={selection.order}
            onPick={(order) => onEvent({ kind: "pickOrder", order })}
            options={options(orderLabels)}
          />
          <div className="fact">
            <button
              type="button"
              className="about"
              onClick={() => onEvent({ kind: "resetFilters" })}
            >
              Сбросить
            </button>
            <button
              type="button"
              className="fdone"
              onClick={() => onEvent({ kind: "closeFilters" })}
            >
              Готово
            </button>
          </div>
        </div>
      )}
      <div className="lbl">Для кого оцениваем риск</div>
      <Choice
        className="matrix top"
        label="Для кого оцениваем риск"
        value={selection.age}
        onPick={(age) => onEvent({ kind: "pickAge", age })}
        options={ageOptions}
      />
    </div>
  </div>
);
