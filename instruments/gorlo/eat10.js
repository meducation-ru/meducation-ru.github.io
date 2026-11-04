import { DRAFT } from "./_common.js";
const opts = [{ label: "0 = нет проблемы", value: 0 }, { label: "1", value: 1 }, { label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4 = серьезная проблема", value: 4 }];
const items = [
  "Затруднение глотания привело у меня к снижению массы тела.",
  "Затруднение глотания мешает мне питаться в общественных местах.",
  "Глотание жидкостей проходит с чрезмерным усилием.",
  "Глотание твердой пищи проходит с чрезмерным усилием.",
  "Глотание таблеток проходит с чрезмерным усилием.",
  "Глотание вызывает боль.",
  "Из-за глотания я не могу получать удовольствие от приема пищи.",
  "При глотании пища застревает в горле.",
  "У меня возникает кашель во время еды.",
  "Глотание вызывает напряжение."
];
export default {
  ...DRAFT, id: "eat10", section: "gorlo", kind: "questionnaire",
  name: "EAT-10", purpose: "Скрининг нарушения глотания",
  body: [{ type: "p", text: "В какой степени Вы ощущаете следующие затруднения?" }],
  items: items.map((text, i) => ({ id: `q${i + 1}`, text: `${i + 1}. ${text}`, options: opts })),
  scoring: { method: "sum" },
  bands: [
    { min: 0, max: 2, label: "Ниже порога 3", source: "Belafsky PC et al., Ann Otol Rhinol Laryngol 2008 (порог исследования на нормативной когорте)" },
    { min: 3, max: 40, label: "3 и выше: отклонение от нормы по порогу исследования, обсудить нарушение глотания", source: "Belafsky PC et al., Ann Otol Rhinol Laryngol 2008 (порог исследования на нормативной когорте; метаанализ Zhang 2023, Dysphagia, PMID 35849209, рекомендует отсечку 3)" }
  ],
  source: { citation: "Belafsky PC et al. Validity and reliability of the Eating Assessment Tool (EAT-10). Ann Otol Rhinol Laryngol 2008;117(12):919-924", id: "PMID 19140539", url: "https://pubmed.ncbi.nlm.nih.gov/19140539/" },
  ruVersion: { citation: "Официальная русская форма Nestlé (EAT-10 Russian); публикация валидации перевода не найдена", url: "https://nestlenutrition-institute.org/resources/nutrition-tools/details/swallowing-assessment-tool" },
  patientMode: false,
  license: "EAT-10 © Société des Produits Nestlé S.A., зарегистрированный товарный знак; лицензирует Mapi Research Trust. Условия Nestlé требуют исходной формы без изменения внешнего вида и порядка вопросов; калькулятор сохраняет порядок вопросов. Русский текст официальной формы Nestlé (валидационная публикация не найдена)."
};
