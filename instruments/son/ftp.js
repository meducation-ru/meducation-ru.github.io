import { DRAFT } from "../gorlo/_common.js";
import { one } from "./_common.js";
const src = "Friedman M et al. Laryngoscope 1999;109(12):1901-7; определения по Friedman 2013 (PMC3793315) и PMC7585274";
const c = one([
  [1, "I: видны весь язычок и миндалины", "Позиция языка I"],
  [2, "II: виден язычок, миндалины не видны", "Позиция языка II"],
  [3, "III: видно мягкое нёбо, язычок не виден", "Позиция языка III"],
  [4, "IV: видно только твёрдое нёбо", "Позиция языка IV"]
], src);
export default {
  ...DRAFT,
  id: "ftp", section: "son", kind: "classification",
  name: "Позиция языка по Фридману", purpose: "Обзор ротоглотки при языке в покое, I-IV",
  body: [
    { type: "gallery", items: [
      { src: "art/son/ftp-1.jpg", label: "I", caption: "видны весь язычок и миндалины" },
      { src: "art/son/ftp-2.jpg", label: "II", caption: "виден язычок, миндалины не видны" },
      { src: "art/son/ftp-3.jpg", label: "III", caption: "видно мягкое нёбо, язычок не виден" },
      { src: "art/son/ftp-4.jpg", label: "IV", caption: "видно только твёрдое нёбо" }
    ], credit: "3D-иллюстрация (Blender), схема, не масштаб." },
    { type: "p", text: "Рот открыт широко, язык лежит на дне полости рта, не высовывается. В исследовании PMC7585274 осмотр повторяли не менее 5 раз. От модифицированного Маллампати отличается именно положением языка." },
    { type: "p", text: "Позиция языка входит в стадии Фридмана (см. «Стадии Фридмана»)." }
  ],
  items: [{ id: "p", text: "Что видно при осмотре (язык в покое)", options: c.options }],
  scoring: { method: "sum" }, showScore: false, bands: c.bands,
  source: { citation: src, id: "PMID 10591345" },
  ruVersion: null, patientMode: false,
  license: "Классификация из опубликованных статей, перевод наш."
};
