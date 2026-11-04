import { DRAFT, yn } from "./_common.js";
import { CUSTOM } from "../../engine.js";
// 0: частота ниже порогов; 1: частота есть, эпизоды не отвечают требованиям; 2: можно рассмотреть направление.
CUSTOM.tonzillVzroslye = a => ({ total: !(a.y1 || a.y2 || a.y3) ? 0 : a.sig ? 2 : 1 });
export default {
  ...DRAFT,
  id: "tonzill-vzroslye", section: "gorlo", kind: "criteria",
  name: "Тонзиллэктомия у взрослых", purpose: "Рецидивирующий тонзиллит у взрослого: когда рассматривать направление на операцию",
  body: [
    { type: "p", text: "Критерии ENT UK и Королевской коллегии хирургов (2016) повторяют пороги шотландского руководства SIGN 117 (2010). Само SIGN 117 на сайте SIGN помечено как устаревшее (более 10 лет, не использовать)." },
    { type: "p", text: "Доказательства пользы тонзиллэктомии у взрослых ограничены и низкого качества (Cochrane, Burton et al. 2014). SIGN 117 рекомендовал тонзиллэктомию при рецидивирующей тяжёлой боли в горле у взрослых (рекомендация A: Cochrane с ограниченными данными и небольшое РКИ у взрослых с доказанным рецидивирующим БГСА-фарингитом). Критерии отбора, то есть эпизоды из-за острого тонзиллита, нарушающие обычную жизнь, по порогам 7-5-3, имеют уровень D." }
  ],
  items: [
    { id: "y1", text: "7 и более эпизодов боли в горле за последние 12 месяцев", options: yn },
    { id: "y2", text: "5 и более эпизодов в каждый из последних 2 лет", options: yn },
    { id: "y3", text: "3 и более эпизодов в каждый из последних 3 лет", options: yn },
    { id: "sig", text: "Эпизоды вызваны острым тонзиллитом, значимые (влияют на пациента и семью), задокументированы и адекватно лечились. Если антибиотик не назначали, это не значит, что лечение было неадекватным", options: yn }
  ],
  scoring: { method: "custom", custom: "tonzillVzroslye" }, showScore: false,
  bands: [
    { min: 0, max: 0, label: "Пороги частоты не достигнуты. При тяжёлых или неконтролируемых симптомах или осложнениях (например, паратонзиллярный абсцесс) фиксированное число эпизодов может не подходить", source: "ENT UK, Royal College of Surgeons. Commissioning guide: Tonsillectomy, 2016" },
    { min: 1, max: 1, label: "Частота достаточна, но эпизоды не отвечают требованиям (острый тонзиллит, значимые, задокументированные, адекватно леченные)", source: "ENT UK, Royal College of Surgeons. Commissioning guide: Tonsillectomy, 2016; SIGN 117, 2010" },
    { min: 2, max: 2, label: "Можно рассмотреть направление на тонзиллэктомию", source: "ENT UK, Royal College of Surgeons. Commissioning guide: Tonsillectomy, 2016 (критерии SIGN)" }
  ],
  source: { citation: "ENT UK, Royal College of Surgeons of England. Commissioning guide: Tonsillectomy, revised 2016; SIGN 117. Management of sore throat and indications for tonsillectomy, 2010; Burton MJ et al. Cochrane Database Syst Rev 2014;(11):CD001802", id: "PMID 25407135 (Cochrane)", url: "https://www.rcseng.ac.uk/-/media/files/rcs/standards-and-research/commissioning/ent-uk-tonsillectomy-revised-commissioning-guide-2016-published.pdf" },
  ruVersion: null, patientMode: false,
  license: "Критерии из опубликованных руководств, перевод наш."
};
