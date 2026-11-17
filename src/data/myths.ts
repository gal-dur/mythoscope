import type { Myth } from "../domain/types";
import { causes } from "./causes";
import { clinicLore } from "./clinic-lore";
import { firstAid } from "./first-aid";
import { folkRemedies } from "./folk-remedies";
import { infantCare } from "./infant-care";
import { integrative } from "./integrative";
import { pharmacyHabits } from "./pharmacy-habits";
import type { MythRecord } from "./record";
import { sources } from "./sources";
import { hasStudy } from "./studies";
import { treatments } from "./treatments";

const records: readonly MythRecord[] = [
  ...folkRemedies,
  ...infantCare,
  ...clinicLore,
  ...integrative,
  ...pharmacyHabits,
  ...firstAid,
  ...causes,
  ...treatments,
];

/** Every myth in the reference, in no particular order, each with the sources it cites. */
export const myths: readonly Myth[] = records.map((record) => ({
  ...record,
  sources: record.sources.map((id) => ({ ...sources[id], id, study: hasStudy(id) })),
}));
