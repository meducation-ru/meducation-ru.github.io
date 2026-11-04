// Реестр инструментов. Сюда попадает только то, что прошло карточку, клиническую проверку и приёмку главным оториноларингологом.
import { CANDIDATES } from "./candidates.js";
// id и дата приёмки (раздел целиком)
const ACCEPTED = {
  "mcisaac": "2026-11-02", "paradise": "2026-11-02", "tonzill-vzroslye": "2026-11-02", "lcat": "2026-11-02",
  "vhi10": "2026-11-02", "eat10": "2026-11-02", "lcq": "2026-11-02",
  "snot22": "2026-11-02", "nose": "2026-11-02", "tnss": "2026-11-02", "vas-aria": "2026-11-02", "lund-mackay": "2026-11-02", "nps": "2026-11-02",
  "stopbang": "2026-11-03", "epworth": "2026-11-03", "berlin": "2026-11-03", "psq": "2026-11-03", "osa18": "2026-11-03",
  "mallampati": "2026-11-03", "ftp": "2026-11-03", "friedman": "2026-11-03", "brodsky": "2026-11-03", "preobrazhensky": "2026-11-03",
  "tos": "2026-11-03", "sade": "2026-11-03", "jerger": "2026-11-03", "comq12": "2026-11-03", "etdq7": "2026-11-03", "thi": "2026-11-03", "house-brackmann": "2026-11-03",
  "hints": "2026-11-03", "nistagm": "2026-11-03", "manevry": "2026-11-03", "posle-manevra": "2026-11-03", "gimnastika": "2026-11-03", "dhi": "2026-11-03"
};
export const INSTRUMENTS = CANDIDATES.filter(i => ACCEPTED[i.id]).map(i => ({ ...i, verified: { ...i.verified, accepted: ACCEPTED[i.id] } }));
