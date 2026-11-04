import { DRAFT } from "../gorlo/_common.js";
const ans = ["Не было проблемой", "Очень небольшая проблема", "Умеренная проблема", "Довольно серьёзная проблема", "Серьёзная проблема"]
  .map((label, value) => ({ label, value }));
const src = "Lipan MJ, Most SP. JAMA Facial Plast Surg 2013;15(5):358-61, PMID 23846399";
export default {
  ...DRAFT,
  id: "nose", section: "nos", kind: "questionnaire",
  name: "NOSE", purpose: "Выраженность затруднения носового дыхания",
  body: [
    { type: "p", text: "Насколько каждое из этих состояний было для вас проблемой за последний месяц?" },
    { type: "p", text: "Сумма ответов (0-20) умножается на 5, итог 0-100. Порог 30 лучше всего разделял пациентов с обструкцией носа и без неё (Lipan, Most 2013): это порог исследования, не клинический стандарт." }
  ],
  items: [
    { id: "n1", text: "Заложенность носа, ощущение «забитого» носа", options: ans },
    { id: "n2", text: "Нос не пропускает воздух (закупорка)", options: ans },
    { id: "n3", text: "Трудно дышать носом", options: ans },
    { id: "n4", text: "Трудности со сном", options: ans },
    { id: "n5", text: "Не хватает воздуха через нос при физической нагрузке", options: ans }
  ],
  scoring: { method: "sum", multiplier: 5 },
  bands: [
    { min: 0, max: 0, label: "Жалоб на носовое дыхание нет", source: "Sunnergren O et al. Laryngoscope Investig Otolaryngol 2023;8(2):357-366, PMC10116965: «A NOSE score of 0 means no problems»" },
    { min: 5, max: 25, label: "Лёгкая обструкция", source: src },
    { min: 30, max: 50, label: "Умеренная обструкция", source: src },
    { min: 55, max: 75, label: "Тяжёлая обструкция", source: src },
    { min: 80, max: 100, label: "Крайне тяжёлая обструкция", source: src }
  ],
  source: { citation: "Stewart MG, Witsell DL, Smith TL et al. Development and validation of the Nasal Obstruction Symptom Evaluation (NOSE) scale. Otolaryngol Head Neck Surg 2004;130(2):157-63", id: "PMID 14990910", url: "https://www.entnet.org/resource/nose-study/" },
  ruVersion: null, patientMode: false,
  license: "AAO-HNS: использование бесплатно со ссылкой на исследование Stewart 2004. Перевод наш, сделан с помощью ИИ и сверен обратным переводом; русская версия не валидирована."
};
