import fs from "node:fs";
import path from "node:path";

const previewDirectory = "outputs/rovnaya-osnova-preview";
const destination = "outputs/rovnaya-osnova-github-pages/index.html";
let html = fs.readFileSync(path.join(previewDirectory, "preview-static.html"), "utf8");

html = html.replace(/(["'])\.\/works\/([^"']+)\1/g, (_, quote, file) => `${quote}./${file}${quote}`);
html = html.replace("3–8 дней", "3 – 8 дней");

const plasterBenefits = `<section class="plaster-benefits section" id="plaster-benefits"><div class="container"><p class="eyebrow">Почему механизированно</p><div class="section-heading"><h2>Штукатурка<br>быстрее и ровнее.</h2><p>Штукатурная станция замешивает и подаёт раствор к месту работы — бригада концентрируется на качестве плоскости и отделке.</p></div><div class="plaster-benefits-grid"><article class="plaster-benefit-featured"><span>70–110 м² / смена</span><h3>Высокая скорость</h3><p>Станция замешивает смесь в точных пропорциях и подаёт её под давлением прямо к рабочей зоне. На хорошо организованном объекте производительность может быть выше.</p></article><article><span>01</span><h3>Стабильное качество</h3><p>Однородный раствор и равномерная подача помогают уменьшить риск раковин, наплывов и перепадов толщины слоя.</p></article><article><span>02</span><h3>Экономнее смесь</h3><p>Точная дозировка компонентов помогает сократить перерасход материалов — ориентировочно до 10–15%.</p></article><article><span>03</span><h3>Меньше ручного труда</h3><p>Оператор ведёт подачу, а мастера формируют плоскость и выполняют финишную затирку.</p></article><article><span>04</span><h3>Надёжное сцепление</h3><p>Раствор подаётся под давлением и лучше заполняет микронеровности основания, снижая риск отслоений.</p></article><article><span>05</span><h3>Чище на объекте</h3><p>Раствор не приходится постоянно переносить и переливать вручную: меньше пыли, брызг и лишней уборки.</p></article></div></div></section>`;
html = html.replace('<section class="terms section" id="advantages">', `${plasterBenefits}<section class="terms section" id="advantages">`);

const staticOverrides = `<style>
@media (max-width:700px){.terms-grid{grid-template-columns:1fr;gap:14px}}
.plaster-benefits{background:#e5e0d6}.plaster-benefits .eyebrow{color:#77776d}.plaster-benefits-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:62px}.plaster-benefits-grid article{min-height:230px;padding:28px;border:1px solid #d2cdc2;border-radius:var(--radius-md);background:var(--paper)}.plaster-benefits-grid article>span{display:inline-flex;align-items:center;min-height:28px;padding:7px 10px;border-radius:999px;background:var(--acid);font-size:10px;font-weight:900;letter-spacing:.07em}.plaster-benefits-grid h3{margin:34px 0 12px;font-size:28px;letter-spacing:-.045em;line-height:1}.plaster-benefits-grid p{margin:0;color:var(--muted);font-size:14px;line-height:1.55}.plaster-benefits-grid .plaster-benefit-featured{grid-column:span 2;background:var(--ink);border-color:var(--ink);color:#fff}.plaster-benefits-grid .plaster-benefit-featured>span{background:var(--acid);color:var(--ink)}.plaster-benefits-grid .plaster-benefit-featured p{color:#d2d5cd;max-width:650px;font-size:16px}@media(hover:hover){.plaster-benefits-grid article{transition:transform .25s ease,box-shadow .25s ease}.plaster-benefits-grid article:hover{transform:translateY(-5px);box-shadow:0 18px 32px #1c211d18}}@media(max-width:700px){.plaster-benefits-grid{grid-template-columns:1fr;gap:12px;margin-top:42px}.plaster-benefits-grid .plaster-benefit-featured{grid-column:auto}.plaster-benefits-grid article{min-height:0;padding:25px}.plaster-benefits-grid h3{font-size:27px;margin-top:28px}}
@media(min-width:701px){.material-carousel{grid-auto-flow:row;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-columns:auto;gap:0;overflow:visible;padding-left:0;padding-right:0}.material-carousel .material-card{width:calc(100% - 28px);min-width:0;margin:0;justify-self:center}}
</style>`;

// GitHub Pages получает автономную копию предпросмотра. Добавляем правила в конец
// стилей, чтобы мобильная сетка карточек всегда перекрывала десктопную раскладку.
html = html.replace(
  "</head>",
  `${staticOverrides}</head>`,
);

fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, html);
