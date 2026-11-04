import { DRAFT } from "../gorlo/_common.js";
const ans = ["Нет проблемы", "Очень лёгкая проблема", "Лёгкая или небольшая проблема", "Умеренная проблема", "Тяжёлая проблема", "Проблема настолько тяжёлая, насколько это возможно"]
  .map((label, value) => ({ label, value }));
const toma = "Toma S, Hopkins C. Rhinology 2016;54(2):129-33, PMID 27017484; EPOS 2020, с. 176";
export default {
  ...DRAFT,
  id: "snot22", section: "nos", kind: "questionnaire",
  name: "SNOT-22", purpose: "Симптомы и качество жизни при хроническом риносинусите, 0-110",
  body: [
    { type: "p", text: "Оцените, насколько плохо обстоит дело с каждой проблемой за последние две недели, учитывая, насколько она сильна, когда возникает, и как часто бывает." },
    { type: "p", text: "Стратификация Toma, Hopkins 2016 получена на 65 пациентах с ХРС: порог одного исследования, EPOS 2020 её приводит." },
    { type: "p", text: "Ориентиры: минимально значимое для пациента изменение 8,9 балла (Hopkins 2009), при медикаментозном лечении предложено 12 (EPOS 2020). SNOT-22 от 40 баллов: один из критериев EPOS 2020 для биологической терапии полипозного риносинусита (нужны 3 из 5)." }
  ],
  items: [
    { id: "s1", text: "Приходится сморкаться", options: ans },
    { id: "s2", text: "Заложенность носа", options: ans },
    { id: "s3", text: "Чихание", options: ans },
    { id: "s4", text: "Насморк (течёт из носа)", options: ans },
    { id: "s5", text: "Кашель", options: ans },
    { id: "s6", text: "Слизь стекает из носа по задней стенке горла", options: ans },
    { id: "s7", text: "Густые выделения из носа", options: ans },
    { id: "s8", text: "Ощущение заложенности в ушах", options: ans },
    { id: "s9", text: "Головокружение", options: ans },
    { id: "s10", text: "Боль в ушах", options: ans },
    { id: "s11", text: "Боль или давление в области лица", options: ans },
    { id: "s12", text: "Ослабление обоняния или вкуса", options: ans },
    { id: "s13", text: "Трудно заснуть", options: ans },
    { id: "s14", text: "Просыпаюсь ночью", options: ans },
    { id: "s15", text: "Не удаётся как следует выспаться", options: ans },
    { id: "s16", text: "Просыпаюсь с чувством усталости", options: ans },
    { id: "s17", text: "Усталость", options: ans },
    { id: "s18", text: "Снижение работоспособности", options: ans },
    { id: "s19", text: "Снижение концентрации внимания", options: ans },
    { id: "s20", text: "Досада, беспокойство (не нахожу себе места), раздражительность", options: ans },
    { id: "s21", text: "Грусть", options: ans },
    { id: "s22", text: "Неловкость, смущение", options: ans }
  ],
  scoring: { method: "sum" },
  bands: [
    { min: 0, max: 7, label: "Ниже лёгкой степени (стратификация начинается с 8)", source: toma },
    { min: 8, max: 20, label: "Лёгкая степень", source: toma },
    { min: 21, max: 50, label: "Средняя степень", source: toma },
    { min: 51, max: 110, label: "Тяжёлая степень", source: toma }
  ],
  source: { citation: "Hopkins C et al. Psychometric validity of the 22-item Sinonasal Outcome Test. Clin Otolaryngol 2009;34(5):447-54; Toma S, Hopkins C 2016; EPOS 2020 (Fokkens WJ et al. Rhinology 2020;58 Suppl 29)", id: "PMID 19793277", url: "https://sinonasaltest.wustl.edu/licensing-snot/" },
  ruVersion: null, patientMode: false,
  license: "SNOT-22 © Washington University in St. Louis. Русский текст: наш перевод, сделан с помощью ИИ и сверен обратным переводом; не сертифицированный перевод WU, на пациентах не валидирован."
};
