import { DRAFT, yn } from "../gorlo/_common.js";
import { CUSTOM } from "../../engine.js";
const src = "Chung F, Abdullah HR, Liao P. Chest 2016;149(3):631-8, Online Supplement, Appendix 1; stopbang.ca";
const band = label => ({ label, source: src });
// 0-2 низкий, 5-8 высокий; 3-4: высокий, если 2+ «да» на STOP и мужской пол, или ИМТ > 35, или шея > 40 см
CUSTOM.stopbang = a => {
  const total = ["s", "t", "o", "p", "b", "a", "n", "g"].reduce((s, k) => s + a[k], 0), stop = a.s + a.t + a.o + a.p;
  if (total <= 2) return { total, band: band("Низкий риск среднетяжёлого и тяжёлого апноэ") };
  if (total >= 5 || (stop >= 2 && (a.g || a.b || a.n))) return { total, band: band("Высокий риск среднетяжёлого и тяжёлого апноэ") };
  return { total, band: band("Промежуточный риск") };
};
export default {
  ...DRAFT,
  id: "stopbang", section: "son", kind: "questionnaire",
  name: "STOP-Bang", purpose: "Скрининг обструктивного апноэ сна у взрослых, 0-8",
  body: [
    { type: "p", text: "Высокий риск: 5-8 «да», или 2 и больше «да» на первые четыре вопроса (STOP) вместе с мужским полом, ИМТ больше 35 или окружностью шеи больше 40 см. Текст вопросов по действующей форме правообладателя (Chest 2016, Online Supplement; stopbang.ca)." },
    { type: "p", text: "Шкала скрининговая и создавалась для предоперационного обследования, диагноз ставят по сомнографии." }
  ],
  items: [
    { id: "s", text: "Храп. Вы громко храпите (настолько, что слышно через закрытую дверь, или партнёр ночью толкает вас локтем из-за храпа)?", options: yn },
    { id: "t", text: "Усталость. Вы часто чувствуете усталость, утомление или сонливость днём (например, засыпаете за рулём)?", options: yn },
    { id: "o", text: "Остановки дыхания. Кто-нибудь замечал, что во сне у вас останавливается дыхание, вы захлёбываетесь или хватаете ртом воздух?", options: yn },
    { id: "p", text: "Давление. У вас повышенное артериальное давление или вы лечитесь от него?", options: yn },
    { id: "b", text: "Индекс массы тела больше 35 кг/м²?", options: yn },
    { id: "a", text: "Возраст больше 50 лет?", options: yn },
    { id: "n", text: "Окружность шеи, измеренная на уровне кадыка, больше 40 см?", options: yn },
    { id: "g", text: "Пол мужской?", options: yn }
  ],
  scoring: { method: "custom", custom: "stopbang" }, bands: [],
  source: { citation: "Chung F et al. Anesthesiology 2008;108(5):812-21; Chung F, Abdullah HR, Liao P. Chest 2016;149(3):631-8", id: "PMID 26378880", url: "https://ictp.uw.edu/sites/default/files/STOP-Bang%20Questionnaire%20Appendix.pdf" },
  ruVersion: null, patientMode: false,
  license: "STOP-Bang © University Health Network, Торонто (stopbang.ca). Перевод наш, сделан с помощью ИИ и сверен обратным переводом, на пациентах не валидирован."
};
