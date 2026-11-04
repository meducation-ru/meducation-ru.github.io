import { DRAFT } from "../gorlo/_common.js";
import { one } from "./_common.js";
const src = "Samsoon GL, Young JR. Anaesthesia 1987;42(5):487-90 (модификация Mallampati SR et al. Can Anaesth Soc J 1985;32(4):429-34)";
const c = one([
  [1, "I: видны мягкое нёбо, зев, язычок и нёбные дужки", "Класс I"],
  [2, "II: дужки закрыты корнем языка, видны мягкое нёбо, зев и язычок", "Класс II"],
  [3, "III: видны мягкое нёбо и основание язычка", "Класс III"],
  [4, "IV: мягкое нёбо не видно", "Класс IV"]
], src);
export default {
  ...DRAFT,
  id: "mallampati", section: "son", kind: "classification",
  name: "Маллампати (модифицированная)", purpose: "Обзор ротоглотки при высунутом языке, классы I-IV",
  body: [
    { type: "gallery", items: [
      { src: "art/son/mallampati-1.jpg", label: "I", caption: "видны мягкое нёбо, зев, язычок и нёбные дужки" },
      { src: "art/son/mallampati-2.jpg", label: "II", caption: "дужки закрыты корнем языка, видны мягкое нёбо, зев и язычок" },
      { src: "art/son/mallampati-3.jpg", label: "III", caption: "видны мягкое нёбо и основание язычка" },
      { src: "art/son/mallampati-4.jpg", label: "IV", caption: "мягкое нёбо не видно" }
    ], credit: "3D-иллюстрация (Blender), схема, не масштаб." },
    { type: "p", text: "Пациент сидит, рот открыт максимально, язык максимально высунут, без фонации. Оригинальная шкала Mallampati 1985 имела три класса и создавалась для прогноза трудной интубации; четыре класса предложили Samsoon и Young (1987)." },
    { type: "p", text: "Класс 0 (виден надгортанник) Ezri et al. предложили в более ранней работе; в 2001 году они оценили его частоту на 764 пациентах." },
    { type: "p", text: "Для оценки ротоглотки при храпе и апноэ Фридман использует другую позицию: язык в покое во рту, без высовывания (см. «Позиция языка по Фридману»). Корреляция с тяжестью апноэ в метаанализе Friedman 2013: 0,184 для Маллампати и 0,388 для позиции языка." }
  ],
  items: [{ id: "c", text: "Что видно при осмотре (язык высунут)", options: c.options }],
  scoring: { method: "sum" }, showScore: false, bands: c.bands,
  source: { citation: src + "; Ezri T et al. Anesth Analg 2001;93(4):1073-5; Friedman M et al. Otolaryngol Head Neck Surg 2013;148(4):540-7", id: "PMID 3592174" },
  ruVersion: null, patientMode: false,
  license: "Классификация из опубликованных статей, перевод наш."
};
