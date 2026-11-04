import { DRAFT } from "../gorlo/_common.js";
const SINUS = [["max", "Верхнечелюстная пазуха"], ["ae", "Передние решётчатые клетки"], ["pe", "Задние решётчатые клетки"], ["sph", "Клиновидная пазуха"], ["fr", "Лобная пазуха"]];
const opac = [{ label: "Нет затемнения", value: 0 }, { label: "Частичное затемнение", value: 1 }, { label: "Полное затемнение", value: 2 }];
const omc = [{ label: "Не обструирован", value: 0 }, { label: "Обструирован", value: 2 }];
const side = (key, name) => [
  ...SINUS.map(([id, text]) => ({ id: `${key}-${id}`, text, options: opac, group: name, domain: name })),
  { id: `${key}-omc`, text: "Остиомеатальный комплекс", options: omc, group: name, domain: name }
];
export default {
  ...DRAFT,
  id: "lund-mackay", section: "nos", kind: "classification",
  name: "Шкала Лунда-Маккея (КТ)", purpose: "Распространённость изменений в околоносовых пазухах по КТ",
  body: [
    { type: "p", text: "Каждая пазуха: 0 нет затемнения, 1 частичное, 2 полное. Остиомеатальный комплекс: 0 или 2. На сторону 0-12, всего 0-24." },
    { type: "p", text: "Порога, принятого руководствами, нет. У взрослых, которым КТ делали не по поводу синусита, средний балл 4,26, и Ashraf, Bhattacharyya (2001) считают 0-5 диапазоном случайных находок. EPOS 2020 приводит пороги исследований: 2 и ниже с высокой отрицательной, 5 и выше с высокой положительной прогностической ценностью. Балл 5 по Ashraf ещё случайная находка, по EPOS уже указывает на болезнь." }
  ],
  items: [...side("r", "Справа"), ...side("l", "Слева")],
  scoring: { method: "domain_sum" },
  bands: [
    { min: 0, max: 2, label: "Низкий балл: по порогу исследований высокая отрицательная прогностическая ценность", source: "EPOS 2020 (Fokkens WJ et al. Rhinology 2020;58 Suppl 29), с. 31 и 170" },
    { min: 3, max: 4, label: "Промежуточный балл: в диапазоне случайных находок у взрослых, которым КТ делали не по поводу синусита (средний 4,26)", source: "Ashraf N, Bhattacharyya N. Otolaryngol Head Neck Surg 2001;125(5):483-6, PMID 11700446" },
    { min: 5, max: 5, label: "Пограничный балл: у Ashraf ещё в диапазоне случайных находок (0-5), по EPOS 2020 уже высокая положительная прогностическая ценность", source: "Ashraf N, Bhattacharyya N. Otolaryngol Head Neck Surg 2001;125(5):483-6, PMID 11700446; EPOS 2020 (Fokkens WJ et al. Rhinology 2020;58 Suppl 29), с. 31 и 170" },
    { min: 6, max: 24, label: "Выше диапазона случайных находок (Ashraf 2001); по порогу исследований высокая положительная прогностическая ценность", source: "Ashraf N, Bhattacharyya N. Otolaryngol Head Neck Surg 2001;125(5):483-6, PMID 11700446; EPOS 2020 (Fokkens WJ et al. Rhinology 2020;58 Suppl 29), с. 31 и 170" }
  ],
  source: { citation: "Lund VJ, Mackay IS. Staging in rhinosinusitis. Rhinology 1993;31(4):183-4; EPOS 2020 (Fokkens WJ et al. Rhinology 2020;58 Suppl 29)", id: "PMID 8140385", url: "https://www.rhinologyjournal.com/Documents/Supplements/supplement_29.pdf" },
  ruVersion: null, patientMode: false,
  license: "Система стадирования из опубликованной статьи, перевод наш."
};
