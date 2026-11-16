import { useEffect, useRef } from "react";
import {
  ageLabels,
  dangerLabels,
  levelLabels,
  prevalenceLabels,
  sectionLabels,
} from "../../domain/labels";
import { danger } from "../../domain/risk";
import { type AgeId, ageIds, type Myth } from "../../domain/types";
import type { Notice } from "../../state/state";
import { Choice } from "../leaves/Choice";
import { Dots } from "../leaves/Dots";
import { ChainLink } from "../leaves/icons";
import { Verdict } from "./Verdict";

interface Props {
  readonly myth: Myth;
  readonly age: AgeId;
  /** What to say about a copy asked for on this myth, if anything. */
  readonly notice: Notice | null;
  readonly onPickAge: (age: AgeId) => void;
  readonly onCopyLink: () => void;
  readonly onCopyMessage: () => void;
}

const selectContents = (element: HTMLElement): void => {
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
};

const copyLabel = (notice: Notice | null): string => {
  if (notice?.kind === "messageCopied") return "Скопировано";
  if (notice?.kind === "messageSelected") return "Выделено, скопируйте вручную";
  return "Скопировать текст";
};

/** One myth in full: the verdict by age, what really happens, what to do, what to tell the family. */
export const MythCard = ({ myth, age, notice, onPickAge, onCopyLink, onCopyMessage }: Props) => {
  const message = useRef<HTMLParagraphElement>(null);
  const selected = notice?.kind === "messageSelected";
  useEffect(() => {
    if (selected && message.current) selectContents(message.current);
  }, [selected]);
  const assessment = myth.risk[age];
  const worst = danger(myth);
  return (
    <article className="myth">
      <div className={`head ${assessment.level}`}>
        <div className="ttl">
          <h3>{myth.title}</h3>
          <button
            type="button"
            className="lnk"
            aria-label="Скопировать ссылку на эту статью"
            title="Скопировать ссылку"
            onClick={onCopyLink}
          >
            <ChainLink />
          </button>
        </div>
        {notice?.kind === "linkCopied" && (
          <div className="linkmsg">Ссылка на статью скопирована</div>
        )}
        {notice?.kind === "linkShown" && (
          <div className="linkmsg">
            Скопируйте ссылку вручную:
            <input
              type="text"
              readOnly
              aria-label="Ссылка на эту статью"
              value={notice.url}
              ref={(input) => {
                input?.focus();
                input?.select();
              }}
            />
          </div>
        )}
        <Verdict assessment={assessment} />
      </div>
      <div className="in">
        <div className="alias">{myth.alias}</div>
        <div className="rate">
          <span>
            Распространённость <Dots filled={myth.prevalence} of={3} tone="pv" />{" "}
            <b>{prevalenceLabels[myth.prevalence]}</b>
          </span>
          <span>
            Опасность <Dots filled={worst} of={4} tone={`dg${worst}`} />{" "}
            <b>{dangerLabels[worst]}</b>
          </span>
        </div>
        <Choice
          className="matrix"
          label="Для кого оцениваем риск"
          value={age}
          onPick={onPickAge}
          options={ageIds.map((id) => {
            const { level } = myth.risk[id];
            return {
              value: id,
              tone: level,
              label: (
                <>
                  <b>{ageLabels[id]}</b>
                  {level === "na" ? "—" : levelLabels[level]}
                </>
              ),
            };
          })}
        />
        <h4>Что происходит на самом деле</h4>
        <ul>
          {myth.mechanism.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <h4>Что делать вместо этого</h4>
        <ul>
          {myth.instead.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <h4>Сообщение для семейного чата</h4>
        <div className="chat">
          <p ref={message}>{myth.message}</p>
        </div>
        <button type="button" className="copy" onClick={onCopyMessage}>
          {copyLabel(notice)}
        </button>
        <details>
          <summary>Насколько это надёжно и источники</summary>
          {myth.evidence.map((finding) => (
            <div key={finding.text} className="check">
              <span className={`tag ${finding.strength}`}>
                {finding.strength === "ok" ? "Подтверждено" : "Данных мало"}
              </span>
              {finding.text}
            </div>
          ))}
          {myth.sources.length > 0 ? (
            <ol className="src">
              {myth.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener">
                    {source.title}
                  </a>
                </li>
              ))}
            </ol>
          ) : (
            <p className="check none">Ссылок пока нет, раздел ждёт источника.</p>
          )}
        </details>
        <div className="cat">
          <span>{sectionLabels[myth.section]}</span>
        </div>
      </div>
    </article>
  );
};
