import { DRAFT, yn } from "./_common.js";
import { CUSTOM } from "../../engine.js";
// 0: частота ниже порогов (KAS 1, наблюдение); 1: частота достаточна, но эпизоды не задокументированы; 2: критерии выполнены (опция).
CUSTOM.paradise = a => ({ total: !(a.y1 || a.y2 || a.y3) ? 0 : a.doc ? 2 : 1 });
export default {
  ...DRAFT, id: "paradise", section: "gorlo", kind: "criteria",
  name: "Критерии Paradise (дети)", purpose: "Когда тонзиллэктомия при рецидивирующем тонзиллите у ребёнка оправдана",
  body: [
    { type: "p", text: "Руководство AAO-HNS 2019 касается детей. IDSA 2012: не рекомендуется тонзиллэктомия только ради снижения частоты стрептококкового фарингита." },
    { type: "p", text: "Даже если критерии не выполнены, AAO-HNS 2019 (KAS 3) советует оценить факторы, которые могут склонить к тонзиллэктомии, в том числе (но не только): множественная аллергия или непереносимость антибиотиков, PFAPA, больше одного паратонзиллярного абсцесса в анамнезе." }
  ],
  items: [
    { id: "y1", text: "7 и более эпизодов боли в горле за последний год", options: yn },
    { id: "y2", text: "5 и более эпизодов в год в каждый из последних 2 лет", options: yn },
    { id: "y3", text: "3 и более эпизодов в год в каждый из последних 3 лет", options: yn },
    { id: "doc", text: "Каждый эпизод записан в карте и сопровождался хотя бы одним признаком: температура выше 38,3 °C, шейная аденопатия, экссудат на миндалинах, положительный тест на БГСА", options: yn }
  ],
  scoring: { method: "custom", custom: "paradise" }, showScore: false,   // исход, а не балл
  bands: [
    { min: 0, max: 0, label: "Частота ниже порогов: рекомендуется наблюдение (сильная рекомендация)", source: "AAO-HNS Clinical Practice Guideline: Tonsillectomy in Children, 2019, KAS 1" },
    { min: 1, max: 1, label: "Частота достаточна, но эпизоды не задокументированы с признаками: руководство требует записи о каждом эпизоде, до этого критерии не выполнены", source: "AAO-HNS Clinical Practice Guideline: Tonsillectomy in Children, 2019" },
    { min: 2, max: 2, label: "Критерии выполнены: тонзиллэктомию можно рассмотреть (опция)", source: "AAO-HNS Clinical Practice Guideline: Tonsillectomy in Children, 2019" }
  ],
  source: { citation: "Paradise JL et al. Pediatrics 2002;110(1 Pt 1):7-15; Mitchell RB et al. Clinical Practice Guideline: Tonsillectomy in Children (Update). Otolaryngol Head Neck Surg 2019;160(1 Suppl):S1-S42", id: "PMID 12093941, 30798778", url: "https://pubmed.ncbi.nlm.nih.gov/30798778/" },
  ruVersion: null, patientMode: false,
  license: "Критерии из опубликованных статей, перевод наш."
};
