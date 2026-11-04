import { DRAFT } from "../gorlo/_common.js";
const src = "McCoul ED, Anand VK, Christos PJ. Laryngoscope 2012;122(5):1137-41 (PMC3612400)";
const sc = [1, 2, 3, 4, 5, 6, 7].map(v => ({ value: v, label: v === 1 ? "1: не проблема" : v === 4 ? "4: умеренная проблема" : v === 7 ? "7: серьёзная проблема" : String(v) }));
const q = ["Давление в ушах", "Боль в ушах", "Ощущение, что уши заложены или вы «под водой»", "Симптомы в ушах при простуде или синусите", "Потрескивание или щелчки в ушах", "Звон в ушах", "Ощущение, что слух приглушён"];
export default {
  ...DRAFT,
  id: "etdq7", section: "ushi", kind: "questionnaire",
  name: "ETDQ-7", purpose: "Симптомы дисфункции слуховой трубы, 7-49",
  body: [
    { type: "p", text: "Насколько каждый из этих симптомов был для вас проблемой за последний месяц? От 1 (не проблема) до 7 (серьёзная проблема)." },
    { type: "p", text: "Порог 14,5 (среднее по пункту 2,1) получен на 50 пациентах с дисфункцией трубы и 25 в контроле: в этой выборке чувствительность и специфичность 100% (McCoul 2012). В других работах точность ниже: у Teixeira et al. (2018) по группе симптомов чувствительность 70% и специфичность 100%, а против объективного теста функции трубы 54% и 78%, AUC 0,68. Предложенное минимальное клинически значимое изменение больше 3,5 балла (Poe 2018, по Holm 2025; первоисточник не открыт)." }
  ],
  items: q.map((text, i) => ({ id: `e${i + 1}`, text, options: sc })),
  scoring: { method: "sum" },
  bands: [
    { min: 7, max: 14, label: "Ниже порога исследования (меньше 14,5)", source: src },
    { min: 15, max: 49, label: "Балл 15 и выше (порог исследования 14,5): в выборке McCoul соответствовал дисфункции слуховой трубы", source: src }
  ],
  source: { citation: "McCoul ED, Anand VK, Christos PJ. Validating the clinical assessment of eustachian tube dysfunction: the Eustachian Tube Dysfunction Questionnaire (ETDQ-7). Laryngoscope 2012;122(5):1137-41; Teixeira MS et al. Otolaryngol Head Neck Surg 2018;158(1):83-9", id: "PMID 22374681", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3612400/" },
  ruVersion: null, patientMode: false,
  license: "ETDQ-7 © 2012 The American Laryngological, Rhinological and Otological Society. Перевод наш, сделан с помощью ИИ и сверен обратным переводом, на пациентах не валидирован."
};
