import { levelLabels } from "../../domain/labels";
import type { Level } from "../../domain/types";
import { ArrowRight } from "../leaves/icons";

const scale: readonly (readonly [Level, string])[] = [
  ["critical", "описаны тяжёлые исходы, метод недопустим."],
  ["high", "реальный вред задокументирован или метод задерживает лечение."],
  ["moderate", "вред возможен, пользы нет."],
  ["useless", "не вредит заметно, но и не помогает."],
  ["safe", "в этом возрасте метод допустим."],
];

const Browse = ({ onBrowse }: { readonly onBrowse: () => void }) => (
  <button type="button" className="cta" onClick={onBrowse}>
    Смотреть мифы
    <ArrowRight />
  </button>
);

/** Why two airways of different width lose so differently to the same millimetre of swelling. */
const Airways = () => (
  <svg
    viewBox="0 0 360 190"
    role="img"
    aria-label="Просвет дыхательных путей младенца и взрослого при отёке в один миллиметр"
  >
    <g fontFamily="PT Sans, Arial, sans-serif" fill="#14233f" textAnchor="middle">
      <text x="90" y="20" fontWeight="700" fontSize="14">
        Младенец, около 4 мм
      </text>
      <circle cx="90" cy="92" r="24" fill="#f7dcd8" stroke="#a3231f" strokeWidth="2" />
      <circle cx="90" cy="92" r="12" fill="#fffdf7" stroke="#14233f" strokeWidth="1.5" />
      <text x="90" y="160" fontSize="13">
        отёк 1 мм: просвет меньше
      </text>
      <text x="90" y="180" fontSize="16" fontWeight="700" fill="#a3231f">
        примерно на 75 %
      </text>
      <text x="268" y="20" fontWeight="700" fontSize="14">
        Взрослый, около 8 мм
      </text>
      <circle cx="268" cy="92" r="48" fill="#f5ebc4" stroke="#8a6d10" strokeWidth="2" />
      <circle cx="268" cy="92" r="36" fill="#fffdf7" stroke="#14233f" strokeWidth="1.5" />
      <text x="268" y="170" fontSize="13">
        отёк 1 мм: просвет меньше
      </text>
      <text x="268" y="188" fontSize="16" fontWeight="700" fill="#8a6d10">
        примерно на 44 %
      </text>
    </g>
  </svg>
);

/** What the reference is, why age matters and how to read the scale. */
export const Home = ({ onBrowse }: { readonly onBrowse: () => void }) => (
  <>
    <header className="top">
      <div className="wrap">
        <svg width="48" height="54" viewBox="0 0 48 54" aria-hidden="true">
          <path
            d="M24 2 44 9v17c0 13-9 21-20 26C13 47 4 39 4 26V9z"
            fill="#16284a"
            stroke="#b08d3c"
            strokeWidth="2.5"
          />
          <path d="M20 15h8v8h8v8h-8v8h-8v-8h-8v-8h8z" fill="#f4ecd8" />
        </svg>
        <div>
          <h1>Доказательный справочник мифов</h1>
          <p>
            Народные и бытовые методы лечения: риск по возрастам, механизм вреда, что сказать родным
          </p>
        </div>
      </div>
    </header>
    <main className="wrap">
      <section>
        <p className="lead">
          Один и тот же «бабушкин метод» для взрослого часто просто бесполезен, а для младенца
          опасен. В списке выберите возраст: у каждого мифа появится оценка для него. Нажмите на
          миф, чтобы открыть разбор; между разборами можно листать в стороны. Сначала идут самые
          распространённые и опасные мифы.
        </p>
        <p className="notice">
          <b>Это справочный материал, а не назначение.</b> Младенец младше 3 месяцев с температурой,
          любой ребёнок с затруднённым дыханием, судорогами, вялостью или отказом от питья должен
          быть срочно показан врачу. Дозы лекарств здесь намеренно не приводятся: их подбирают по
          весу, по инструкции или с педиатром.
        </p>
        <Browse onBrowse={onBrowse} />
      </section>
      <section className="airway" aria-labelledby="airways">
        <h2 id="airways">Почему возраст меняет всё</h2>
        <Airways />
        <p>
          Цветное кольцо показывает отёк или слой слизи толщиной 1 мм, светлый круг показывает
          оставшийся просвет. Диаметры приблизительные, оба круга в одном масштабе, расчёт идёт по
          площади круга. Та же логика работает для кожи, печени и почек: меньше запас, тоньше
          барьеры.
        </p>
      </section>
      <section aria-labelledby="scale">
        <h2 id="scale">Шкала</h2>
        <p>
          {scale.map(([level, meaning]) => (
            <span key={level}>
              <span className={`pill ${level}`}>{levelLabels[level]}</span> {meaning}
              <br />
            </span>
          ))}
        </p>
        <p>
          <b>Опасность</b> в карточке показывает самый высокий уровень риска среди всех возрастов.{" "}
          <b>Распространённость</b> оценена автором для русскоязычных семей: опросных данных по
          большинству мифов нет. Мифы в списке идут от самых распространённых и опасных к редким и
          безобидным.
        </p>
        <Browse onBrowse={onBrowse} />
      </section>
    </main>
  </>
);
