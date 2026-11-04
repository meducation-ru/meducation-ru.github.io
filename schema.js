// Проверка инструмента до попадания в набор: без источника, прав и порогов с источником инструмент не показывается.

const SECTIONS = ["nos", "gorlo", "son", "ushi", "golova"];
const KINDS = ["questionnaire", "criteria", "classification", "scheme", "memo"];

export function validate(inst) {
  const e = [];
  if (!SECTIONS.includes(inst.section)) e.push(`неизвестный раздел «${inst.section}»`);
  if (!KINDS.includes(inst.kind)) e.push(`неизвестный вид «${inst.kind}»`);
  if (!inst.source?.citation) e.push("нет источника (source.citation)");
  if (!inst.license) e.push("не указаны права и правообладатель (license)");
  (inst.bands ?? []).forEach((b, i) => { if (!b.source) e.push(`порог ${i + 1} без источника`); });
  if (inst.patientMode && !inst.ruVersion) e.push("отдавать пациенту можно только с валидированной русской версией");
  return e;
}
