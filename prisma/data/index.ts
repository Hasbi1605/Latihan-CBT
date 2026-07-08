import type { SeedQuestion } from "./types";
import { tpaQuestions as tpaCore } from "./tpa";
import { tpaFiguralQuestions } from "./tpa-figural";
import { tpaExtraQuestions } from "./tpa-extra";
import { bahasaQuestions as bahasaCore } from "./bahasa";
import { bahasaExtraQuestions } from "./bahasa-extra";
import { keislamanQuestions as keislamanCore } from "./keislaman";
import { keislamanExtraQuestions } from "./keislaman-extra";
import { btqQuestions } from "./btq";

export const tpaQuestions: SeedQuestion[] = [
  ...tpaCore,
  ...tpaFiguralQuestions,
  ...tpaExtraQuestions,
];

export const bahasaQuestions: SeedQuestion[] = [
  ...bahasaCore,
  ...bahasaExtraQuestions,
];

export const keislamanQuestions: SeedQuestion[] = [
  ...keislamanCore,
  ...keislamanExtraQuestions,
];

export { btqQuestions };

export const BANK_STATS = {
  tpa: tpaQuestions.length,
  bahasa: bahasaQuestions.length,
  keislaman: keislamanQuestions.length,
  btq: btqQuestions.length,
  total:
    tpaQuestions.length +
    bahasaQuestions.length +
    keislamanQuestions.length +
    btqQuestions.length,
};
