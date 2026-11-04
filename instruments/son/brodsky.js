import { DRAFT } from "../gorlo/_common.js";
const g = [[0, "0: в пределах миндаликовых ниш или удалены", "0"], [1, "1: меньше 25% ширины ротоглотки", "1"], [2, "2: 25-50%", "2"], [3, "3: 51-75%", "3"], [4, "4: больше 75%", "4"]]
  .map(([value, label, short]) => ({ value, label, short }));
export default {
  ...DRAFT,
  id: "brodsky", section: "son", kind: "classification",
  name: "Миндалины по Бродскому", purpose: "Размер нёбных миндалин по доле ширины ротоглотки, 0-4",
  body: [
    { type: "gallery", items: [
      { src: "art/son/brodsky-0.jpg", label: "0", caption: "в пределах миндаликовых ниш или удалены" },
      { src: "art/son/brodsky-1.jpg", label: "1", caption: "меньше 25% ширины ротоглотки" },
      { src: "art/son/brodsky-2.jpg", label: "2", caption: "25-50%" },
      { src: "art/son/brodsky-3.jpg", label: "3", caption: "51-75%" },
      { src: "art/son/brodsky-4.jpg", label: "4", caption: "больше 75%" }
    ], credit: "3D-иллюстрация (Blender), схема, не масштаб. Обе стороны одной степени." },
    { type: "p", text: "Оценивается доля ширины ротоглотки, которую занимают миндалины (в источниках «tonsils occupy», без разбивки по сторонам). Межэкспертная согласованность приемлемая: ICC 0,763 (Ng et al. 2010). Оригинал Brodsky 1989 закрыт; границу степени 3 вторичные источники дают как 51-75% и как 50-75%." },
    { type: "p", text: "В российских клинических рекомендациях 2024 для миндалин используется классификация Преображенского (см. отдельный инструмент)." }
  ],
  items: [{ id: "g", text: "Какую долю ширины ротоглотки между передними дужками занимают миндалины?", options: g }],
  scoring: { method: "sum" }, showScore: false,
  bands: g.map(o => ({ min: o.value, max: o.value, label: `Степень ${o.short} по Бродскому`, source: "Brodsky L. 1989 (определения по PMC13043436)" })),
  source: { citation: "Brodsky L. Pediatr Clin North Am 1989;36(6):1551-69 (определения по PMC13043436); Ng SK et al. Arch Otolaryngol Head Neck Surg 2010;136:159-62", id: "PMID 2685730" },
  ruVersion: null, patientMode: false,
  license: "Классификация из опубликованной статьи, перевод наш."
};
