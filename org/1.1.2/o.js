(() => {
'use strict';
// 组织案卷。只读当前回复的存档，界面偏好独立保存在浏览器。
const cases = ["十一人阁旧案","龙魔旧案","断魂水驿案","建康留灯案","停战换俘案"];
const assets = {"style":":host {\n  display: block;\n  margin: 12px 0 4px;\n  min-width: 0;\n  --sans: var(--kimi-font-sans, \"PingFang SC\", \"Microsoft YaHei\", system-ui, sans-serif);\n  --serif: \"Noto Serif SC\", \"Songti SC\", \"STSong\", \"SimSun\", serif;\n  --motion: var(--t-normal, 270ms);\n  --easing: var(--ease-standard, cubic-bezier(.28,.73,.28,1));\n  --cap-deep: #10232c;\n  --cap-light: #213f45;\n  --cap-trim: #a68e64;\n  --cap-shine: #dbc29a;\n  --roller-deep: #10272e;\n  --roller-light: #3a5557;\n  --paper: #ede4d4;\n  --paper-edge: #b8aa8f;\n  --thread: #bcb09a;\n  --ink: #2b2d28;\n  --muted: #5b5a4e;\n  --section: #354d4b;\n  --rule: #c5b9a5;\n}\n:host([data-skin=\"seal\"]) {\n  --cap-deep: #182321;\n  --cap-light: #323c32;\n  --cap-trim: #ac8052;\n  --cap-shine: #e3bc7d;\n  --roller-deep: #34211e;\n  --roller-light: #704b38;\n  --paper: #efe0c7;\n  --paper-edge: #b79567;\n  --thread: #b59b73;\n  --ink: #30281f;\n  --muted: #5c4a37;\n  --section: #5c3a2b;\n  --rule: #c6b293;\n}\n:host([hidden]), [hidden] { display: none !important; }\n*, *::before, *::after { box-sizing: border-box; }\n.archive {\n  container-type: inline-size;\n  position: relative;\n  text-align: start;\n  white-space: normal;\n  text-shadow: none;\n  color: var(--ink);\n  font: 400 16px/1.5 var(--sans);\n}\n.archive button, .archive summary { font: inherit; }\n.archive button { cursor: pointer; margin: 0; }\n.archive svg { display: block; }\n.only-seal { display: none !important; }\n:host([data-skin=\"seal\"]) .only-seal { display: block !important; }\n:host([data-skin=\"seal\"]) .only-water { display: none !important; }\n.cover {\n  --brand-inset: 91px;\n  --switch-space: 72px;\n  position: relative;\n  z-index: 1;\n  isolation: isolate;\n  min-height: 60px;\n  border: 1px solid var(--cap-trim);\n  border-radius: 10px;\n  background:\n    linear-gradient(102deg, transparent, #101b1f46 62%, transparent),\n    linear-gradient(165deg, var(--cap-light), var(--cap-deep) 63%);\n  color: #f4e7c9;\n  box-shadow: 0 2px 5px #1a161a58, inset 0 0 0 2px #111913;\n}\n:host([data-skin=\"seal\"]) .cover {\n  border-radius: 7px;\n  box-shadow: 0 2px 5px #21181466, inset 0 0 0 2px #3a2020, inset 0 0 0 3px #9a64484d;\n}\n.ornaments {\n  position: absolute;\n  inset: 0;\n  border-radius: inherit;\n  overflow: hidden;\n  pointer-events: none;\n}\n.ornaments::after {\n  content: \"\";\n  position: absolute;\n  inset: 3px;\n  border: 1px solid color-mix(in srgb, var(--cap-shine) 44%, transparent);\n  border-radius: 7px;\n  pointer-events: none;\n}\n.crest { position: absolute; inset: 0 auto 0 6px; width: 83px; height: 100%; }\n.head-water, .lacquer-pattern { position: absolute; inset: 0; width: 100%; height: 100%; }\n.head-water { opacity: .9; }\n.lacquer-pattern { opacity: .42; }\n.corner {\n  position: absolute;\n  display: block;\n  z-index: 1;\n  inline-size: 17px;\n  block-size: 17px;\n  border-radius: 7px 0 0;\n  border: solid var(--cap-shine);\n  border-width: 1.5px 0 0 1.5px;\n  opacity: .84;\n}\n:host([data-skin=\"seal\"]) .corner {\n  background: linear-gradient(138deg, #ebc88f 2%, #7a4e2c 44%, #b88b58 62%, #6d482c 84%);\n  clip-path: polygon(0 0,100% 0,100% 25%,47% 25%,47% 50%,25% 50%,25% 100%,0 100%);\n  border: 0;\n  border-radius: 5px 0 0;\n  opacity: .98;\n}\n.corner-tl { inset: 1px auto auto 1px; }\n.corner-tr { inset: 1px 1px auto auto; transform: rotate(90deg); }\n.corner-bl { inset: auto auto 1px 1px; transform: rotate(-90deg); }\n.corner-br { inset: auto 1px 1px auto; transform: rotate(180deg); }\n.roll-toggle, .theme-switch {\n  position: relative;\n  border: 0;\n  border-radius: 8px;\n  background: transparent;\n  color: inherit;\n}\n.roll-toggle {\n  min-width: 0;\n  min-height: 58px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  width: 100%;\n  padding: 8px calc(var(--switch-space) + 36px) 8px var(--brand-inset);\n  text-align: start;\n}\n.roll-toggle:hover { background: #e2c69b10; }\n.roll-toggle:focus-visible, .theme-switch:focus-visible {\n  outline: 2px solid #f2d69e;\n  outline-offset: -4px;\n}\n.brand {\n  flex: 0 0 auto;\n  color: #fbebcc;\n  font: 500 22px/1.25 var(--serif);\n  letter-spacing: .10em;\n  white-space: nowrap;\n  text-shadow: 0 1px 2px #0e1719;\n}\n.unread {\n  flex: 0 0 auto;\n  border: 1px solid #bb7761;\n  border-radius: 7px;\n  padding: 1px 7px 2px;\n  color: #ffeddb;\n  background: linear-gradient(155deg, #934436, #652a25);\n  box-shadow: inset 0 0 0 1px #d58a5e30, 0 1px 2px #181518;\n  font-size: 12px;\n  font-variant-numeric: tabular-nums;\n  white-space: nowrap;\n}\n.chevron {\n  inline-size: 8px;\n  block-size: 8px;\n  display: inline-block;\n  flex: 0 0 auto;\n  border-right: 1.6px solid currentColor;\n  border-bottom: 1.6px solid currentColor;\n  transform: translateY(-2px) rotate(45deg);\n  transition: transform var(--motion) var(--easing);\n}\n.roll-toggle > .chevron {\n  position: absolute;\n  right: 16px;\n  top: calc(50% - 5px);\n}\n.roll-toggle[aria-expanded=\"true\"] > .chevron { transform: translateY(2px) rotate(225deg); }\n.theme-switch {\n  position: absolute;\n  top: 50%;\n  right: 35px;\n  transform: translateY(-50%);\n  display: inline-flex;\n  gap: 4px;\n  min-height: 36px;\n  align-items: center;\n  justify-content: center;\n  max-width: var(--switch-space);\n  padding: 4px 7px;\n  background: #121e21a8;\n  color: #f1dbb6;\n  border: 1px solid color-mix(in srgb, var(--cap-shine) 54%, transparent);\n  font-size: 12px !important;\n  white-space: nowrap;\n}\n.theme-switch:hover { background: #66523cba; }\n.theme-icon svg { width: 16px; height: 16px; }\n.roll { min-width: 0; }\n.paper-fold {\n  display: grid;\n  grid-template-rows: 0fr;\n  transition: grid-template-rows var(--motion) var(--easing);\n}\n.roll[aria-hidden=\"false\"] .paper-fold { grid-template-rows: 1fr; }\n.paper-clip { min-height: 0; overflow: hidden; }\n.paper {\n  position: relative;\n  margin: 0 5px;\n  isolation: isolate;\n  background:\n    repeating-linear-gradient(115deg, #66594706 0 1px, transparent 1px 5px),\n    repeating-linear-gradient(8deg, #67594608 0 1px, transparent 1px 7px),\n    linear-gradient(90deg, #b38f572b, transparent 9%, transparent 91%, #ab875326),\n    var(--paper);\n  border: solid var(--paper-edge);\n  border-width: 0 1px;\n}\n.paper::before, .paper::after {\n  position: absolute;\n  inset: 0 auto 0 4px;\n  z-index: -1;\n  width: 8px;\n  content: \"\";\n  opacity: .8;\n  border-inline: 1px solid var(--thread);\n  background: repeating-linear-gradient(145deg, var(--thread) 0 1px, transparent 1px 5px);\n}\n.paper::after { inset: 0 4px 0 auto; }\n:host([data-skin=\"water\"]) .paper::before {\n  background:\n    repeating-radial-gradient(ellipse 13px 9px at 50% 100%, transparent 0 3px, #c6b38788 3px 4px),\n    #3e6568;\n  opacity: .9;\n  inset-inline-start: 0;\n  width: 12px;\n}\n:host([data-skin=\"water\"]) .paper::after {\n  width: 2px;\n  border: 0;\n  background: var(--thread);\n}\n.lap {\n  position: absolute;\n  top: 0;\n  inset-inline: 10px;\n  height: 15px;\n  border-radius: 0 0 40% 40% / 0 0 60% 60%;\n  background:\n    repeating-linear-gradient(35deg, #9b5b4b46 0 1px, transparent 1px 3px),\n    linear-gradient(#422629, #593037 72%, #3b2026);\n  border-bottom: 1px solid #895f54;\n}\n.lap i {\n  position: absolute;\n  left: 50%;\n  top: 0;\n  width: 21px;\n  height: 20px;\n  transform: translateX(-50%);\n  border: 1px solid #ae6448;\n  border-radius: 0 0 3px 3px;\n  background: linear-gradient(90deg, #74362e, #a95543 65%, #71362d);\n}\n.folio { position: relative; z-index: 1; padding: 24px 28px 0; }\n.section + .section { margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--rule); }\n.section-title {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  margin: 0 0 8px;\n  font: 500 16px/1.35 var(--sans);\n  color: var(--section);\n}\n.section-title::after { content: \"\"; flex: 1 1 auto; height: 1px; background: var(--rule); }\n.section-title svg { width: 17px; height: 17px; }\n.record-heading {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px 12px;\n  align-items: center;\n  justify-content: space-between;\n  min-width: 0;\n}\n.record-name { flex: 1 1 120px; color: var(--ink); font-weight: 500; overflow-wrap: anywhere; }\n.current .record-name { font-size: 19px; }\n.badges { display: inline-flex; align-items: center; gap: 4px; flex: 0 0 auto; }\n.pill {\n  border: 1px solid #a29b87;\n  color: #474438;\n  border-radius: 6px;\n  background: #f3ebdd8c;\n  padding: 1px 6px;\n  font-size: 12px;\n  line-height: 1.35;\n  white-space: nowrap;\n}\n.pill.active, .pill.ready { border-color: #718779; color: #304d44; background: #79938119; }\n.pill.wait { border-color: #9e7f58; color: #684923; background: #ab825419; }\n.pill.terminal { color: #634439; }\n.pill.paid { border-color: #858b73; color: #414b36; }\n.muted, .row-note { color: var(--muted); font-size: 13px; margin: 4px 0 0; overflow-wrap: anywhere; }\n.goal { color: var(--ink); margin: 8px 0 4px; font-weight: 500; white-space: pre-line; overflow-wrap: anywhere; }\n.fields { display: grid; gap: 2px 8px; grid-template-columns: auto minmax(0,1fr); margin: 8px 0 0; font-size: 14px; }\n.fields dt { color: var(--muted); }\n.fields dd { margin: 0; white-space: pre-line; overflow-wrap: anywhere; }\n.case-row + .case-row, .reply-row + .reply-row { border-top: 1px solid var(--rule); }\n.case-row, .reply-row { padding: 8px 0; }\n.case-row:first-of-type { padding-top: 2px; }\n.case-row summary, .reply-row summary {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-height: 28px;\n  cursor: pointer;\n  list-style: none;\n  border-radius: 4px;\n}\n.case-row summary::-webkit-details-marker, .reply-row summary::-webkit-details-marker { display: none; }\n.case-row summary > .record-heading, .reply-row summary > .record-heading { flex: 1 1 auto; }\n.case-row[open] > summary > .chevron, .reply-row[open] > summary > .chevron { transform: translateY(2px) rotate(225deg); }\n.case-row summary:hover, .reply-row summary:hover { background: #795e3820; }\n.case-row summary:focus-visible, .reply-row summary:focus-visible, .mark-read:focus-visible {\n  outline: 2px solid var(--section);\n  outline-offset: 2px;\n}\n.replies { margin-top: 8px; padding: 8px 0 0; border-top: 1px dashed var(--rule); }\n.replies h4 { font: 500 14px/1.4 var(--sans); margin: 0 0 4px; color: var(--section); }\n.reply-row[data-unread=\"true\"] summary > .record-heading::before {\n  content: \"\"; flex: 0 0 6px; width: 6px; height: 6px; border-radius: 50%; background: #873d32;\n}\n.reply-content {\n  margin: 4px 0 0;\n  padding: 8px 12px;\n  border-inline-start: 2px solid var(--paper-edge);\n  background: #fffaf225;\n}\n.reply-content p { margin: 4px 0 0; white-space: pre-line; overflow-wrap: anywhere; }\n.reply-message { position: relative; }\n.read-probe { position: absolute; inset: 0 auto auto 0; width: 1px; height: 16px; pointer-events: none; }\n.mark-read:disabled { cursor: default; background: transparent; }\n.mark-read {\n  margin-top: 8px !important;\n  background: #f2ecdb;\n  color: var(--section);\n  border: 1px solid var(--paper-edge);\n  padding: 3px 8px;\n  border-radius: 6px;\n  font-size: 12px !important;\n}\n.foot-ornament { position: relative; height: 66px; pointer-events: none; }\n.foot-water { position: absolute; inset: 0; width: 100%; height: 100%; }\n.seal-imprint {\n  position: absolute;\n  inset: auto 26px 12px auto;\n  width: 26px; height: 26px;\n  border: 2px solid #a04536;\n  border-radius: 2px;\n  padding: 0 3px;\n  color: #9a4036;\n  opacity: .76;\n  font: 500 17px/22px var(--serif);\n  transform: rotate(-5deg);\n}\n.roller {\n  height: 0;\n  opacity: 0;\n  border-radius: 7px;\n  background:\n    linear-gradient(90deg, #6a4e37 0 2px, #c7a875 2px 4px, #977752 4px 7px, transparent 7px calc(100% - 7px), #977752 calc(100% - 7px) calc(100% - 4px), #c7a875 calc(100% - 4px) calc(100% - 2px), #6a4e37 calc(100% - 2px)),\n    linear-gradient(var(--roller-deep), var(--roller-light) 29%, var(--roller-deep) 93%);\n  transition: height var(--motion) var(--easing), opacity var(--motion) var(--easing);\n}\n.roll[aria-hidden=\"false\"] .roller { height: 11px; opacity: 1; }\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip-path: inset(50%);\n  white-space: nowrap;\n}\n@container (max-width: 530px) {\n  .cover { --brand-inset: 68px; }\n  .crest { width: 65px; inset-inline-start: 2px; }\n  .brand { font-size: 20px; letter-spacing: .055em; }\n  .folio { padding-inline: 22px; }\n}\n@container (max-width: 365px) {\n  .cover { --brand-inset: 52px; --switch-space: 56px; }\n  .crest { width: 53px; inset-inline-start: 0; }\n  .brand { font-size: 18px; letter-spacing: .045em; }\n  .roll-toggle { gap: 8px; }\n  .theme-switch { right: 32px; min-width: 33px; padding: 4px; }\n  .unread { padding-inline: 5px; }\n  .folio { padding-inline: 18px; }\n}\n@container (max-width: 285px) {\n  .cover { --brand-inset: 38px; --switch-space: 36px; }\n  .theme-word { display: none; }\n  .crest { width: 39px; }\n  .brand { font-size: 16px; letter-spacing: 0; }\n  .roll-toggle { gap: 5px; }\n  .unread { font-size: 11px; }\n}\n@media (prefers-reduced-motion: reduce) {\n  .paper-fold, .roller, .chevron { transition: none; }\n}\n.variable-note {\n  display: grid;\n  justify-items: end;\n  gap: 5px;\n  padding: 24px 28px 0;\n  color: var(--muted);\n  font: 400 12px/1.45 var(--sans);\n}\n.variable-badge {\n  --status-ink: #4d5146;\n  --status-fill: #f6efdf;\n  --status-rule: #aa9e87;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  min-height: 25px;\n  max-inline-size: 100%;\n  padding: 2px 9px;\n  border: 1px solid var(--status-rule);\n  border-radius: 6px;\n  background: var(--status-fill);\n  color: var(--status-ink);\n  white-space: nowrap;\n}\n:host([data-skin=\"seal\"]) .variable-badge { border-radius: 3px; box-shadow: inset 0 0 0 1px #fff8e6; }\n.variable-badge:is([data-variable-status=\"written\"], [data-variable-status=\"unchanged\"]) {\n  --status-ink: #294f41;\n  --status-fill: #e2ebdf;\n  --status-rule: #7c9181;\n}\n.variable-badge:is([data-variable-status=\"generating\"], [data-variable-status=\"parsing\"], [data-variable-status=\"saving\"]) {\n  --status-ink: #65481f;\n  --status-fill: #f8edcf;\n  --status-rule: #b49558;\n}\n.variable-badge:is([data-variable-status=\"uncertain\"], [data-variable-status=\"missing\"], [data-variable-status=\"mismatch\"]) {\n  --status-ink: #713a2f;\n  --status-fill: #f4e4d9;\n  --status-rule: #b58273;\n}\n.variable-caption { color: var(--section); }\n.variable-dot { flex: none; width: 6px; height: 6px; background: currentColor; border-radius: 50%; }\n.variable-text { font-weight: 600; }\n.variable-detail { max-inline-size: min(100%, 27rem); text-align: end; overflow-wrap: anywhere; }\n.folio { padding-block-start: 12px; }\n@container (max-width: 530px) { .variable-note { padding-inline: 22px; } }\n@container (max-width: 365px) { .variable-note { padding-inline: 18px; } }\n","shell":"<section class=\"archive\" aria-label=\"组织案卷\">\n  <header class=\"cover\">\n    <div class=\"ornaments\" aria-hidden=\"true\">\n      <svg class=\"lacquer-pattern only-seal\" viewBox=\"0 0 680 64\" preserveAspectRatio=\"none\">\n        <defs>\n          <pattern id=\"lacquer-waves\" width=\"32\" height=\"16\" patternUnits=\"userSpaceOnUse\">\n            <path d=\"M-16 16a16 16 0 0 1 32 0m0 0a16 16 0 0 1 32 0M-12 16a12 12 0 0 1 24 0m8 0a12 12 0 0 1 24 0M-8 16a8 8 0 0 1 16 0m16 0a8 8 0 0 1 16 0M0 16a16 16 0 0 1 32 0\" fill=\"none\" stroke=\"#9e9e7e\" stroke-width=\".6\"/>\n          </pattern>\n        </defs>\n        <rect width=\"680\" height=\"64\" fill=\"url(#lacquer-waves)\"/>\n      </svg>\n      <svg class=\"crest crest-seal only-seal\" viewBox=\"0 0 92 64\">\n        <defs>\n          <linearGradient id=\"cord\" x1=\"0\" x2=\"1\">\n            <stop stop-color=\"#51201d\"/><stop offset=\".42\" stop-color=\"#b05241\"/><stop offset=\".66\" stop-color=\"#8a382e\"/><stop offset=\"1\" stop-color=\"#4f211c\"/>\n          </linearGradient>\n        </defs>\n        <path d=\"M41-5c-10 17-12 32-10 48l5 25M51-5C40 15 35 29 35 40l6 28\" fill=\"none\" stroke=\"#311313\" stroke-width=\"9\"/>\n        <path d=\"M41-5c-10 17-12 32-10 48l5 25M51-5C40 15 35 29 35 40l6 28\" fill=\"none\" stroke=\"url(#cord)\" stroke-width=\"6\"/>\n        <path d=\"M34 35c-6-13-20-13-19-5 1 6 13 7 20 3 10-4 15-2 21 4M32 35l-10 12m14-11 11 10\" fill=\"none\" stroke=\"#ad4d3c\" stroke-width=\"3.5\" stroke-linecap=\"round\"/>\n        <path d=\"M63 25h15v15H63zM66 37V28h9v9h-5v-5h2\" fill=\"none\" stroke=\"#c8a26c\" stroke-width=\"1\" opacity=\".65\"/>\n      </svg>\n      <svg class=\"crest crest-water only-water\" viewBox=\"0 0 96 64\">\n        <defs>\n          <radialGradient id=\"lamp-halo\">\n            <stop stop-color=\"#eab059\" stop-opacity=\".40\"/><stop offset=\"1\" stop-color=\"#e5ab5d\" stop-opacity=\"0\"/>\n          </radialGradient>\n          <linearGradient id=\"lamp-paper\" x1=\"0\" x2=\".8\" y2=\"1\">\n            <stop stop-color=\"#ffe7a5\"/><stop offset=\".52\" stop-color=\"#eaa754\"/><stop offset=\"1\" stop-color=\"#ba6230\"/>\n          </linearGradient>\n        </defs>\n        <ellipse cx=\"48\" cy=\"31\" rx=\"34\" ry=\"30\" fill=\"url(#lamp-halo)\"/>\n        <path d=\"M19 56V13m-6 2c14-1 36-3 50-10M20 20 31 12m17 0v8\" fill=\"none\" stroke=\"#aa8053\" stroke-width=\"1.3\"/>\n        <path d=\"M38 24 43 20h10l6 4v16l-5 4H43l-5-4z\" fill=\"url(#lamp-paper)\" stroke=\"#6c4529\" stroke-width=\"1.5\"/>\n        <path d=\"M42 24h12m-12 16h12m-10-16v16m8-16v16m-4 4v5\" fill=\"none\" stroke=\"#a86637\" stroke-width=\"1\"/>\n        <path d=\"M19 56c11-5 24-5 35-2 13 4 28 4 41-2M31 61c15-3 26-2 36-1\" fill=\"none\" stroke=\"#d2aa73\" stroke-width=\".85\" opacity=\".75\"/>\n        <path d=\"M9 63c0-13-2-22-5-29m7 28C12 51 17 44 23 40M70 64c4-18 8-26 15-32m-10 32c4-8 12-11 17-11M11 60c-1-7-4-10-8-11\" fill=\"none\" stroke=\"#b69b68\" stroke-width=\"1\" opacity=\".8\"/>\n      </svg>\n      <svg class=\"head-water only-water\" viewBox=\"0 0 600 62\" preserveAspectRatio=\"none\">\n        <path d=\"M0 53c86 7 110-2 169-2 78 0 84 6 149 6 107 0 123-13 190-7 42 4 58 5 92-3M8 58c67 6 103-2 169-2 50 0 68 5 117 5m82-1c41-1 71-8 115-7 37 0 53 5 96 0\" fill=\"none\" stroke=\"#aaa57b\" stroke-width=\".85\" opacity=\".51\"/>\n        <path d=\"M562 62c4-10 8-20 19-30m-10 30c6-13 13-21 23-25m-29 25c-4-8-9-12-14-13m24 13c8-10 16-12 24-11\" fill=\"none\" stroke=\"#bd9a62\" stroke-width=\"1.1\" opacity=\".77\"/>\n      </svg>\n      <i class=\"corner corner-tl\"></i><i class=\"corner corner-tr\"></i>\n      <i class=\"corner corner-bl\"></i><i class=\"corner corner-br\"></i>\n    </div>\n    <button class=\"roll-toggle\" type=\"button\" aria-expanded=\"false\" aria-controls=\"organization-roll\" aria-label=\"展开组织案卷\">\n      <span class=\"brand\">组织案卷</span>\n      <span class=\"unread\" hidden></span>\n      <span class=\"chevron\" aria-hidden=\"true\"></span>\n    </button>\n    <button class=\"theme-switch\" type=\"button\">\n      <span class=\"theme-icon\" aria-hidden=\"true\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.16851 9.84439C3.02921 9.50808 3.10621 9.12098 3.36361 8.86358L7.86361 4.36358C8.21508 4.01211 8.78493 4.01211 9.1364 4.36358C9.48787 4.71505 9.48787 5.2849 9.1364 5.63637L6.17279 8.59998H20C20.4971 8.59998 20.9 9.00292 20.9 9.49998C20.9 9.99703 20.4971 10.4 20 10.4H4C3.63599 10.4 3.30781 10.1807 3.16851 9.84439Z\" fill=\"currentColor\"/>\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M20.8315 14.1556C20.9708 14.4919 20.8938 14.879 20.6364 15.1364L16.1364 19.6364C15.7849 19.9878 15.2151 19.9878 14.8636 19.6364C14.5121 19.2849 14.5121 18.7151 14.8636 18.3636L17.8272 15.4H4C3.50294 15.4 3.1 14.997 3.1 14.5C3.1 14.0029 3.50294 13.6 4 13.6H20C20.364 13.6 20.6922 13.8193 20.8315 14.1556Z\" fill=\"currentColor\"/>\n</svg></span><span class=\"theme-word\">换装</span>\n    </button>\n  </header>\n  <div id=\"organization-roll\" class=\"roll\" role=\"region\" aria-label=\"案卷正文\" aria-hidden=\"true\" inert>\n    <div class=\"paper-fold\">\n      <div class=\"paper-clip\">\n        <div class=\"paper\">\n          <div class=\"lap only-seal\" aria-hidden=\"true\"><i></i></div>\n          <div class=\"variable-note\" role=\"status\" aria-live=\"polite\" aria-atomic=\"true\">\n            <span class=\"variable-badge\" data-variable-status=\"preparing\">\n              <span class=\"variable-caption\">本轮变量</span><i class=\"variable-dot\" aria-hidden=\"true\"></i><strong class=\"variable-text\">待回复</strong>\n            </span>\n            <span class=\"variable-detail\">等新的回复生成后核对本轮变量。</span>\n          </div>\n          <div class=\"folio\"></div>\n          <div class=\"foot-ornament\" aria-hidden=\"true\">\n            <div class=\"seal-imprint only-seal\">卷</div>\n            <svg class=\"foot-water only-water\" viewBox=\"0 0 660 96\" preserveAspectRatio=\"xMidYMax slice\">\n              <defs>\n                <linearGradient id=\"river-wash\" x2=\"0\" y2=\"1\"><stop stop-color=\"#63787b\" stop-opacity=\"0\"/><stop offset=\"1\" stop-color=\"#607b7e\" stop-opacity=\".35\"/></linearGradient>\n                <path id=\"wet-reed\" d=\"M0 0C-2-15-4-32-10-49m10 49c3-23 10-41 26-49M0 0c-9-15-12-18-22-24m22 24c7-13 17-18 28-18m-40-28c-3-7-2-14 0-17m39 14c1-4 8-8 14-8\"/>\n              </defs>\n              <path d=\"M0 69 35 58l27 3 29-13 23 8 31-9 24 7 37-4 43 14 40-7 34 6 52-5 33 6 30-9 39 6 46-15 29 6 24-8 29 11 54 1v39H0z\" fill=\"#697e80\" opacity=\".35\"/>\n              <path d=\"M0 71c118-3 190 4 267 4 103 0 166-10 232-8l161 2v27H0z\" fill=\"url(#river-wash)\"/>\n              <g fill=\"none\" stroke=\"#526d70\" stroke-width=\".9\" opacity=\".56\">\n                <path d=\"M38 74c71-4 92 0 144 0m22 1c45-1 66 4 111 3m12-1c51-4 125-3 171-5m12 0c60 1 72 3 124-1M70 81c59-3 89 4 143 3m158 1c71-2 125-2 182-7M84 90c29-2 66-1 113 1m23 1c37 0 69-1 102-4m88 4c62 0 106-1 167-5\"/>\n              </g>\n              <g transform=\"translate(457 57)\">\n                <path d=\"M-36 14c22 0 54 1 73-2l-9 9c-14 4-42 4-56-1z\" fill=\"#324347\"/>\n                <path d=\"M-23 14V3l6-4h33l7 5v10\" fill=\"#4f4d3f\" stroke=\"#344548\" stroke-width=\"1.25\"/>\n                <path d=\"M-27 4c5-3 9-7 12-7h27c5 2 7 4 15 6l-1 2h-52z\" fill=\"#283d40\"/>\n                <path d=\"M-14 6h5v6h-5zm8 0h5v6h-5zm8 0h5v6H2z\" fill=\"#d8a56a\"/>\n                <path d=\"M-13 27h26m-21 3h14m-9 3h5\" stroke=\"#ca9a5f\" opacity=\".8\" stroke-width=\"1.2\" stroke-linecap=\"round\"/>\n                <path d=\"M29 12V-1m-4 4h10l-1 5h-5m5 5 10 1\" fill=\"none\" stroke=\"#46585a\" stroke-width=\"1.15\"/>\n              </g>\n              <g fill=\"none\" stroke=\"#496469\" stroke-linecap=\"round\">\n                <use href=\"#wet-reed\" transform=\"translate(22 97) scale(.83 1)\" stroke-width=\"1.7\"/>\n                <use href=\"#wet-reed\" transform=\"translate(43 97) scale(.64 .68)\" stroke-width=\"2\"/>\n                <use href=\"#wet-reed\" transform=\"translate(8 98) scale(-.52 .75)\" stroke-width=\"1.4\"/>\n                <use href=\"#wet-reed\" transform=\"translate(643 97) scale(-.85 1.17)\" stroke-width=\"1.7\"/>\n                <use href=\"#wet-reed\" transform=\"translate(621 97) scale(-.56 .74)\" stroke-width=\"1.9\"/>\n              </g>\n            </svg>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"roller\" aria-hidden=\"true\"></div>\n  </div>\n  <span class=\"sr-only announcement\" role=\"status\" aria-live=\"polite\"></span>\n</section>","icons":{"document":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M15.4795 15.4971C15.9765 15.4971 16.3799 15.9004 16.3799 16.3975C16.3799 16.8945 15.9765 17.2978 15.4795 17.2979H8.52051C8.02345 17.2979 7.62012 16.8945 7.62012 16.3975C7.62012 15.9004 8.02345 15.4971 8.52051 15.4971H15.4795Z\" fill=\"currentColor\"/>\n<path d=\"M12.3359 11.0996C12.8329 11.0997 13.2354 11.503 13.2354 12C13.2354 12.497 12.8329 12.9003 12.3359 12.9004H8.52051C8.02345 12.9004 7.62012 12.4971 7.62012 12C7.62012 11.5029 8.02345 11.0996 8.52051 11.0996H12.3359Z\" fill=\"currentColor\"/>\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.1719 2.09961C13.9408 2.09969 14.6789 2.40555 15.2227 2.94922L19.0508 6.77734C19.5946 7.32113 19.9003 8.05911 19.9004 8.82812V18C19.9004 20.1539 18.1539 21.9004 16 21.9004H8C5.84626 21.9002 4.09961 20.1538 4.09961 18V6C4.09961 3.84621 5.84626 2.09981 8 2.09961H13.1719ZM8 3.90039C6.84037 3.90059 5.90039 4.84032 5.90039 6V18C5.90039 19.1597 6.84037 20.0994 8 20.0996H16C17.1598 20.0996 18.0996 19.1598 18.0996 18V9.90039H15C13.3985 9.90019 12.0996 8.6015 12.0996 7V3.90039H8ZM13.9004 7C13.9004 7.60739 14.3927 8.09941 15 8.09961H17.8213C17.8068 8.08333 17.7928 8.06626 17.7773 8.05078L13.9492 4.22266C13.9335 4.20696 13.9169 4.19237 13.9004 4.17773V7Z\" fill=\"currentColor\"/>\n</svg>","history":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M11.8999 6.79965C12.397 6.79965 12.7997 7.20235 12.7997 7.69941V11.7266L14.7359 13.6629C15.0873 14.0143 15.0879 14.584 14.7366 14.9355C14.3852 15.287 13.8148 15.287 13.4633 14.9355L11.2632 12.7355C11.0947 12.5668 11.0002 12.338 11.0001 12.0995V7.69941C11.0001 7.20238 11.4029 6.7997 11.8999 6.79965Z\" fill=\"currentColor\"/>\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 1.89893C17.4677 1.89893 21.9001 6.33147 21.9002 11.7991C21.9002 17.2669 17.4678 21.6993 12 21.6993C6.53228 21.6993 2.09985 17.2669 2.09985 11.7991C2.09998 6.33147 6.53236 1.89893 12 1.89893ZM20.1 11.7998C20.1 7.32616 16.4737 3.69984 12 3.69984C7.5264 3.69984 3.90008 7.32616 3.90008 11.7998C3.90032 16.2732 7.52655 19.8998 12 19.8998C16.4735 19.8998 20.0998 16.2732 20.1 11.7998Z\" fill=\"currentColor\"/>\n</svg>","folder":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.2373 3.7002C10.4169 3.7002 11.5297 4.24779 12.249 5.18262L12.4424 5.43359H18C20.0987 5.43359 21.7998 7.13472 21.7998 9.2334V16.5C21.7998 18.5987 20.0987 20.2998 18 20.2998H6C3.90132 20.2998 2.2002 18.5987 2.2002 16.5V7.5C2.2002 5.40132 3.90132 3.7002 6 3.7002H9.2373ZM6 5.5C4.89543 5.5 4 6.39543 4 7.5V16.5C4 17.6046 4.89543 18.5 6 18.5H18C19.0357 18.5 19.887 17.7128 19.9893 16.7041L20 16.5V9.2334C20 8.19775 19.2128 7.34641 18.2041 7.24414L18 7.2334H12.0479L11.9326 7.22656C11.666 7.19561 11.4205 7.05812 11.2549 6.84277L10.8223 6.28027C10.4437 5.78834 9.85808 5.5 9.2373 5.5H6ZM16 9.59961C16.4971 9.59961 16.9004 10.0029 16.9004 10.5C16.9004 10.9971 16.4971 11.4004 16 11.4004H8C7.50294 11.4004 7.09961 10.9971 7.09961 10.5C7.09961 10.0029 7.50294 9.59961 8 9.59961H16Z\" fill=\"currentColor\"/>\n</svg>"}};
const themes = { water: '泽路夜航', seal: '印房密卷' };
const phases = ['起', '承', '转', '合'];
const terminalMain = ['已结案', '已终止'];
const terminalLocal = ['已验收', '已撤销', '已终止'];
const settlements = ['待结算', '已结算'];

function object(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function field(value, key) {
  return object(value) && Object.hasOwn(value, key) ? value[key] : undefined;
}
function pairs(value) {
  return object(value) ? Object.entries(value) : [];
}
function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}
function amount(value) {
  return Number.isFinite(value) && value >= 0 ? String(value) : text(value);
}
function money(grade, count) {
  return [text(grade), amount(count)].filter(Boolean).join(' × ');
}
function localState(row) {
  if (row.状态 == null) return text(row.续案条件) ? '暂缓' : '进行中';
  return row.状态;
}
function receiptTarget(type, a, b) {
  return JSON.stringify(type === '主案' ? [type, a] : [type, a, b]);
}

function project(variables) {
  const state = field(variables, 'stat_data');
  const event = field(state, '事件');
  const main = field(event, '组织事件');
  const places = field(event, '组织外勤');
  const focus = field(event, '组织当前办理案');
  const local = field(event, '组织当前本地差事');
  const active = [];
  const paused = [];
  const history = [];
  const targets = new Map();
  function add(row, info) {
    const reward = field(row, '报酬');
    const handler = text(info.type === '主案' ? row.经手人 : row.委托人) ||
      (info.type === '本地短差' ? text(row.交付对象) : '');
    const details = {
      ...info,
      handler,
      recipient: info.type === '本地短差' ? text(row.交付对象) : '',
      range: text(info.type === '主案' ? row.办案范围 : row.范围),
      goal: text(row.当前目标),
      wait: text(row.续案条件),
      reply: text(row.续案回音),
      result: text(info.type === '主案' ? row.结论 : row.结果),
      reward: money(field(reward, '品级'), field(reward, '数量')),
      rewardWhen: text(field(reward, '给付条件')),
      paid: pairs(row.实付灵石).filter(([, count]) => amount(count))
        .map(([grade, count]) => money(grade, count)).filter(Boolean).join('、'),
      settlement: settlements.includes(row.结算) ? row.结算 : '',
    };
    targets.set(details.id, details);
    if (details.status === '进行中') active.push(details);
    else if (details.status === '暂缓') paused.push(details);
    else if (details.archived) history.push(details);
  }

  for (const name of cases) {
    const row = field(main, name);
    if (!object(row)) continue;
    const stage = row.阶段 ?? '起';
    const validStage = phases.includes(stage);
    const status = row.状态 === '进行中' && !validStage ? '' : row.状态;
    add(row, {
      id: receiptTarget('主案', name), type: '主案', title: name, place: '',
      status, stage: validStage ? stage : '', archived: terminalMain.includes(status),
    });
  }
  for (const [place, site] of pairs(places)) {
    if (!text(place)) continue;
    for (const [list, archived] of [['在办差事', false], ['已办差事', true]]) {
      for (const [key, row] of pairs(field(site, list))) {
        const id = receiptTarget('本地短差', place, key);
        if (!text(key) || !object(row) || targets.has(id)) continue;
        const result = row.办理结果;
        const status = archived ? (terminalLocal.includes(result) ? result : '结果未记') : localState(row);
        add(row, {
          id, type: '本地短差', title: text(row.差事名) || text(row.固定委托) || '本地短差',
          place, status, stage: '', archived,
        });
      }
    }
  }
  const mainId = receiptTarget('主案', typeof focus === 'string' ? focus : '');
  const localId = receiptTarget('本地短差', text(field(local, '据点')), text(field(local, '差事键')));
  const mainActive = active.filter(row => row.type === '主案');
  const current = active.find(row => row.id === mainId) || active.find(row => row.id === localId) ||
    (focus == null && mainActive.length === 1 ? mainActive[0] : null);

  const replies = [];
  for (const [key, row] of pairs(field(event, '组织回音'))) {
    const type = field(row, '关联类型');
    if (!text(key) || (type !== '主案' && type !== '本地短差')) continue;
    const related = type === '主案' ? receiptTarget(type, text(row.案名)) :
      receiptTarget(type, text(row.据点), text(row.差事键));
    const target = targets.get(related);
    const summary = text(row.摘要);
    const handler = text(row.经手人);
    if (!target || !summary || !handler) continue;
    const when = text(row.送达时辰);
    replies.push({
      key, related, title: target.title, place: target.place, summary, handler, when,
      revision: JSON.stringify([key, related, handler, summary, when]),
    });
  }
  const byReply = new Map(replies.map(reply => [reply.key, reply]));
  return {
    current, otherActive: active.length - Number(Boolean(current)),
    pending: paused.map(row => ({
      ...row, ready: byReply.get(row.reply)?.related === row.id,
    })),
    history: history.reverse(),
    replies: replies.reverse(),
  };
}
function createView(host, hooks) {
  const doc = host.document;
  const mount = doc.createElement('div');
  mount.setAttribute('data-organization-archive', '');
  mount.hidden = true;
  const shadow = mount.attachShadow({ mode: 'open' });
  const style = doc.createElement('style');
  style.textContent = assets.style;
  const shell = doc.createElement('template');
  shell.innerHTML = assets.shell;
  shadow.append(style, shell.content);
  const toggle = shadow.querySelector('.roll-toggle');
  const switcher = shadow.querySelector('.theme-switch');
  const badge = shadow.querySelector('.unread');
  const body = shadow.querySelector('.roll');
  const folio = shadow.querySelector('.folio');
  const announcement = shadow.querySelector('.announcement');
  const variableBadge = shadow.querySelector('.variable-badge');
  const variableText = shadow.querySelector('.variable-text');
  const variableDetail = shadow.querySelector('.variable-detail');
  let opened = false;
  let panels = new Map();
  let replyRows = new Map();
  let seen = new Set();
  const observation = typeof host.IntersectionObserver === 'function' ?
    new host.IntersectionObserver(entries => {
      if (!opened || !mount.isConnected) return;
      for (const entry of entries) {
        const item = replyRows.get(entry.target.dataset.revision);
        if (item?.details.open && entry.intersectionRatio >= .75 && !seen.has(item.reply.revision)) {
          hooks.read(item.reply.revision);
        }
      }
    }, { threshold: .75 }) : null;

  function element(tag, className, value) {
    const node = doc.createElement(tag);
    if (className) node.className = className;
    if (value) node.textContent = value;
    return node;
  }

  function icon(name) {
    const span = element('span', 'glyph');
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = assets.icons[name];
    return span;
  }

  function section(title, glyph) {
    const result = element('section', 'section');
    const heading = element('h3', 'section-title');
    heading.append(icon(glyph), doc.createTextNode(title));
    result.append(heading);
    return result;
  }

  function pill(label, tone) {
    return element('span', 'pill' + (tone ? ' ' + tone : ''), label);
  }

  function recordHeading(title, labels) {
    const line = element('div', 'record-heading');
    line.append(element('span', 'record-name', title));
    const status = element('span', 'badges');
    for (const [label, tone] of labels) {
      if (label) status.append(pill(label, tone));
    }
    if (status.childNodes.length) line.append(status);
    return line;
  }

  function fieldList(rows) {
    const fields = element('dl', 'fields');
    for (const [label, value] of rows) {
      if (value) fields.append(element('dt', '', label), element('dd', '', value));
    }
    return fields.childNodes.length ? fields : null;
  }

  function recordBody(row) {
    const result = element('div', 'record-body');
    if (row.handler) result.append(element('p', 'row-note', '经手 · ' + row.handler));
    const location = [row.place, row.stage && '主案 · ' + row.stage].filter(Boolean).join('　');
    if (location) result.append(element('p', 'row-note', location));
    if (row.goal) result.append(element('p', 'goal', row.goal));
    const fields = fieldList([
      ['办理范围', row.range],
      ['交付对象', row.recipient !== row.handler ? row.recipient : ''],
      ['续办条件', row.wait],
      ['卷内结果', row.result],
      ['约定酬劳', row.reward],
      ['给付条件', row.rewardWhen],
      ['实收灵石', row.paid],
    ]);
    if (fields) result.append(fields);
    return result;
  }

  function caseDetails(row, labels, previous) {
    const box = element('details', 'case-row');
    panels.set(row.id, box);
    box.open = previous.has(row.id);
    const summary = element('summary');
    summary.append(recordHeading(row.title, labels), element('span', 'chevron'));
    box.append(summary);
    const details = recordBody(row);
    if (!details.childNodes.length) details.append(element('p', 'muted', '卷内暂无更多记录。'));
    box.append(details);
    return box;
  }

  function replyDetails(reply, previous) {
    const details = element('details', 'reply-row');
    details.open = previous.has(reply.revision);
    const summary = element('summary');
    summary.append(recordHeading(reply.title, []), element('span', 'chevron'));
    const note = element('div', 'reply-content');
    const message = element('p', 'reply-message', reply.summary);
    const probe = element('span', 'read-probe');
    probe.dataset.revision = reply.revision;
    probe.setAttribute('aria-hidden', 'true');
    message.prepend(probe);
    const meta = element('p', 'row-note', [reply.handler, reply.when, reply.place].filter(Boolean).join(' · '));
    const mark = element('button', 'mark-read', '标为已读');
    mark.type = 'button';
    mark.addEventListener('click', () => hooks.read(reply.revision));
    note.append(meta, message, mark);
    details.append(summary, note);
    details.addEventListener('toggle', observe);
    replyRows.set(reply.revision, { reply, details, probe, mark });
    return details;
  }

  function observe() {
    if (!observation) return;
    observation.disconnect();
    if (!opened || !mount.isConnected) return;
    for (const [revision, item] of replyRows) {
      if (item.details.open && !seen.has(revision)) observation.observe(item.probe);
    }
  }

  function paint(model) {
    const openCases = new Set([...panels].filter(([, box]) => box.open).map(([id]) => id));
    const openReplies = new Set([...replyRows].filter(([, item]) => item.details.open).map(([id]) => id));
    observation?.disconnect();
    panels = new Map();
    replyRows = new Map();

    const current = section('当前差事', 'document');
    if (model.current) {
      const record = element('article', 'current');
      record.append(recordHeading(model.current.title, [
        ['进行中', 'active'], [model.current.settlement, model.current.settlement === '已结算' ? 'paid' : 'wait'],
      ]), recordBody(model.current));
      current.append(record);
    } else {
      current.append(element('p', 'muted', '眼下没有选定的差事。'));
    }
    if (model.otherActive) current.append(element('p', 'muted', '另有 ' + model.otherActive + ' 项在办'));

    const pending = section('待回音／可续办', 'history');
    for (const row of model.pending) {
      pending.append(caseDetails(row, [[row.ready ? '可续办' : '待回音', row.ready ? 'ready' : 'wait']], openCases));
    }
    if (!model.pending.length) pending.append(element('p', 'muted', '暂无暂缓的差事。'));
    if (model.replies.length) {
      const replies = element('div', 'replies');
      replies.append(element('h4', '', '已送达回音'));
      for (const row of model.replies) replies.append(replyDetails(row, openReplies));
      pending.append(replies);
    }

    const history = section('已交卷', 'folder');
    for (const row of model.history) {
      history.append(caseDetails(row, [
        [row.status, 'terminal'],
        [row.settlement, row.settlement === '已结算' ? 'paid' : 'wait'],
      ], openCases));
    }
    if (!model.history.length) history.append(element('p', 'muted', '暂无归档卷宗。'));
    folio.replaceChildren(current, pending, history);
    paintRead(seen);
    observe();
  }

  function paintRead(nextSeen) {
    seen = nextSeen;
    for (const [revision, item] of replyRows) {
      const read = seen.has(revision);
      item.details.dataset.unread = String(!read);
      item.mark.disabled = read;
      item.mark.textContent = read ? '已读' : '标为已读';
    }
  }

  function header(count, update) {
    badge.hidden = count === 0;
    badge.textContent = count ? '回音 ' + (count > 99 ? '99+' : count) : '';
    variableBadge.dataset.variableStatus = update.code;
    if (variableText.textContent !== update.label) variableText.textContent = update.label;
    if (variableDetail.textContent !== update.detail) variableDetail.textContent = update.detail;
    toggle.setAttribute('aria-label', (opened ? '收起' : '展开') + '组织案卷' +
      (count ? '，' + count + ' 条未读回音' : ''));
  }

  function open(value) {
    if (opened === value) return;
    opened = value;
    toggle.setAttribute('aria-expanded', String(value));
    body.setAttribute('aria-hidden', String(!value));
    body.inert = !value;
    observe();
  }

  function skin(value, speak = false) {
    if (mount.dataset.skin === value && !speak) return;
    mount.dataset.skin = value;
    const next = value === 'water' ? 'seal' : 'water';
    const title = '当前为' + themes[value] + '，切换至' + themes[next];
    switcher.title = title;
    switcher.setAttribute('aria-label', title);
    if (speak) announcement.textContent = '已换为' + themes[value];
  }

  function reset() {
    observation?.disconnect();
    panels.clear();
    replyRows.clear();
    folio.replaceChildren();
  }

  function dispose() {
    reset();
    mount.remove();
  }

  toggle.addEventListener('click', hooks.toggle);
  switcher.addEventListener('click', hooks.skin);
  shadow.addEventListener('keydown', event => {
    if (opened && event.key === 'Escape') {
      event.stopPropagation();
      hooks.close();
      if (mount.isConnected) toggle.focus();
    }
  });

  return { mount, toggle, skin, open, header, paint, paintRead, observe, reset, dispose };
}
const variableLabels = {
  preparing:['待回复','等新的回复生成后核对本轮变量。'],
  generating:['等回复','正在生成当前回复，随后核对楼层存档。'],
  parsing:['解析中','原卡 MVU 正在处理当前回复的变量。'],
  saving:['待写入','已收到解析结果，正在核对当前回复的存档。'],
  written:['已写入','当前回复分支的变量存档已有可核对的变化。'],
  unchanged:['无变化','原卡已完成解析，当前回复分支的变量值保持一致。'],
  uncertain:['待确认','当前回复已有变量存档，尚无足够证据确认本轮更新结果。'],
  missing:['待确认','当前回复分支暂未读到变量存档。'],
  mismatch:['待确认','已收到解析结果，尚未核到一致的楼层存档。'],
};
function variableSignature(value) {
  return JSON.stringify(value, (_key,item)=>object(item) ?
    Object.fromEntries(Object.keys(item).sort().map(key=>[key,item[key]])) : item);
}
function variableSnapshot(data) {
  const stat=field(data,'stat_data');
  if(!object(stat))return null;
  const columns=Object.fromEntries(Object.keys(stat).filter(key=>key!=='$internal').sort()
    .map(key=>[key,variableSignature(stat[key])]));
  return {signature:JSON.stringify(columns),columns};
}
function normalizedReply(message) {
  return text(message).replace(/<(UpdateVariable|JSONPatch|Analysis)\b[^>]*>[\s\S]*?<\/\1>/gi,'')
    .replace(/\[mvu_(?:update|plot)\]|<StatusPlaceHolderImpl\s*\/?>/gi,'').trim();
}
function updateStamp(row,rawRow,data,swipe) {
  const story=normalizedReply(row.message ?? rawRow?.mes);
  let hash=2166136261;
  for(const symbol of story){hash^=symbol.codePointAt(0);hash=Math.imul(hash,16777619);}
  return {
    floor:row.message_id,swipe,story,
    id:JSON.stringify([row.message_id,swipe,story.length,hash>>>0]),
    saved:variableSnapshot(data),
  };
}
function changedColumns(before,after) {
  if(!before||!after)return [];
  const keys=new Set([...Object.keys(before.columns),...Object.keys(after.columns)]);
  return [...keys].filter(key=>before.columns[key]!==after.columns[key]);
}
function updateView(code,head,detail='',fields=[]) {
  const [label,summary]=variableLabels[code];
  const known=['世界','主角','事件','人物','道侣','灵宠','机遇','绝色榜','玉简','$器灵台词'];
  const names=fields.filter(key=>known.includes(key)).map(key=>key==='$器灵台词'?'器灵台词':key);
  const columns=fields.length ? '变化 '+fields.length+' 栏'+(names.length?'（'+names.join('、')+'）':'')+'。' : '';
  const page=Number.isInteger(head?.floor) ?
    '第 '+head.floor+' 楼'+(Number.isInteger(head.swipe)?' · 回复 '+(head.swipe+1):'')+'。' : '';
  return {code,label,detail:page+(detail||summary)+columns};
}
function createVariableWatch() {
  let attempt=null;
  function reset(){attempt=null;}
  function begin(head,data,now=Date.now()){
    attempt={id:head?.id??null,baseline:variableSnapshot(data)||head?.saved||null,at:now,expected:null,ended:null};
  }
  function result(head,data,previous,now=Date.now(),trusted=false) {
    const expected=variableSnapshot(data);
    if(!head||!expected)return;
    if(!attempt) {
      if(!trusted)return;
      begin(head,previous,now);
    }
    if(attempt.id!==null&&attempt.id!==head.id)return;
    attempt.id=head.id;
    attempt.baseline=variableSnapshot(previous)||attempt.baseline;
    attempt.expected=expected;
    attempt.ended=now;
  }
  function status(source,{generating=false,parsing=false}={},now=Date.now()){
    const head=source?.head;
    const prior=source?.prior;
    if(generating)return updateView('generating',null);
    if(parsing)return updateView('parsing',attempt?.id===head?.id?head:null);
    if(attempt?.id&&head&&attempt.id!==head.id)reset();
    if(attempt?.expected&&attempt.id===head?.id){
      if(head.saved?.signature===attempt.expected.signature){
        if(attempt.baseline?.signature===head.saved.signature)return updateView('unchanged',head);
        return updateView('written',head,'原卡解析结果已核对到当前回复分支。',changedColumns(attempt.baseline,head.saved));
      }
      return updateView(now-attempt.ended<2500?'saving':'mismatch',head);
    }
    if(attempt&&now-attempt.at<2400)return updateView('parsing',head);
    if(head?.saved&&prior&&head.saved.signature!==prior.signature)return updateView(
      'written',head,'与此前存档相比，当前回复分支已有变量变化。',changedColumns(prior,head.saved)
    );
    return updateView(!head?'preparing':head.saved?'uncertain':'missing',head);
  }
  return {reset,begin,result,status};
}

function runArchive() {
  const host = window.parent || window;
  const doc = host.document;
  const instance = Symbol.for('daoyuan.organization.archive');
  const historyButton = '翻阅组织案卷';
  const prefix = 'daoyuan.organization.archive.v1.';
  const skinKey = prefix + 'skin';
  const blank = project(undefined);
  const variableWatch = createVariableWatch();
  const stops = [];
  const registered = new Set();
  let theme = load(skinKey) === 'seal' ? 'seal' : 'water';
  let chatKey = '';
  let prefs = { open: false, seen: new Set() };
  let manual = false;
  let scene = null;
  let painted = '';
  let attached = false;
  let generating = false;
  let updatingUntil = 0;
  let timer;
  let disposed = false;
  let mvuFromInit;
  let waitedForMvu = false;
  let reportedError = false;

  function load(key) {
    try { return host.localStorage.getItem(key); } catch { return null; }
  }
  function save(key, value) {
    try { host.localStorage.setItem(key, value); } catch { /* 本轮仍用内存中的界面偏好 */ }
  }
  function prefKey(key = chatKey) { return prefix + 'chat:' + key; }
  function readPrefs(key) {
    try {
      const data = JSON.parse(load(prefKey(key)) || '{}');
      const tokens = Array.isArray(data?.seen) ? data.seen.filter(item => typeof item === 'string') : [];
      return { open: data?.open === true, seen: new Set(tokens) };
    } catch {
      return { open: false, seen: new Set() };
    }
  }
  function savePrefs() {
    if (!chatKey) return;
    for (const token of readPrefs(chatKey).seen) prefs.seen.add(token);
    save(prefKey(), JSON.stringify({ open: prefs.open, seen: [...prefs.seen] }));
  }

  function helper(name) {
    for (const owner of [window, window.TavernHelper, host.TavernHelper, host]) {
      if (typeof owner?.[name] === 'function') return owner[name].bind(owner);
    }
    const bound = host.TavernHelper?._bind?.['_' + name];
    return typeof bound === 'function' ? bound.bind(window) : undefined;
  }
  function mvu() {
    return mvuFromInit || window.Mvu || host.Mvu;
  }
  function chatContext() {
    const ctx = (window.SillyTavern || host.SillyTavern)?.getContext?.();
    const character = ctx?.characters?.[ctx?.characterId];
    const id = ctx?.getCurrentChatId?.() ?? ctx?.chatId ?? character?.chat;
    if (id == null || String(id) === '') return { ctx, key: '' };
    const group = ctx?.groupId ?? ctx?.selectedGroup;
    const owner = group != null && group !== '' && group !== false ?
      ['group', String(group)] : ['character', String(character?.avatar ?? ctx?.characterId ?? '')];
    return { ctx, key: JSON.stringify([...owner, String(id)]) };
  }
  function resetScene() {
    scene = null;
    painted = '';
    attached = false;
    view.mount.hidden = true;
    view.mount.remove();
    view.open(false);
    view.reset();
  }
  function syncChat(key) {
    if (key === chatKey) return;
    chatKey = key;
    prefs = key ? readPrefs(key) : { open: false, seen: new Set() };
    manual = false;
    generating = false;
    updatingUntil = 0;
    variableWatch.reset();
    resetScene();
  }

  function readScene(ctx) {
    const messages = helper('getChatMessages');
    if (!messages) return null;
    const options = { role: 'assistant', hide_state: 'unhidden', include_swipes: false };
    const raw = ctx?.chat;
    let head = null;
    let prior = null;
    let saved = null;

    function inspect(row, rawRow) {
      if (!row || row.role !== 'assistant' || row.is_hidden || !Number.isInteger(row.message_id)) return false;
      const swipe = row.swipe_id ?? rawRow?.swipe_id ?? null;
      const scope = { type: 'message', message_id: row.message_id };
      let data = row.data;
      if (data === undefined) {
        if (Array.isArray(row.swipes_data) && Number.isInteger(swipe)) data = row.swipes_data[swipe];
        else data = helper('getVariables')?.(scope) ?? mvu()?.getMvuData?.(scope);
      }
      if (!head) {
        head = updateStamp(row,rawRow,data,swipe);
        if (head.saved) saved = { floor: row.message_id, swipe, model: project(data) };
        return false;
      }
      const snapshot = variableSnapshot(data);
      if (!snapshot) return false;
      prior = snapshot;
      if (!saved) saved = { floor: row.message_id, swipe, model: project(data) };
      return true;
    }

    if (Array.isArray(raw)) {
      for (let id = raw.length - 1; id >= 0; id--) {
        if (raw[id]?.is_user || raw[id]?.is_system) continue;
        const row = messages(id, options)?.[0];
        if (row?.message_id !== id) continue;
        if (inspect(row, raw[id])) break;
      }
    } else {
      const rows = messages('0-{{lastMessageId}}', options);
      if (!Array.isArray(rows)) return null;
      for (let index = rows.length - 1; index >= 0; index--) {
        if (inspect(rows[index])) break;
      }
    }
    return { ...(saved ?? { floor: head?.floor ?? null, swipe: head?.swipe ?? null, model: blank }), update:{head,prior} };
  }

  const view = createView(host, {
    toggle() {
      if (prefs.open) close();
      else {
        manual = true;
        prefs.open = true;
        savePrefs();
        render();
      }
    },
    close,
    skin() {
      theme = theme === 'water' ? 'seal' : 'water';
      save(skinKey, theme);
      view.skin(theme, true);
    },
    read(revision) {
      if (!scene?.model.replies.some(reply => reply.revision === revision) || prefs.seen.has(revision)) return;
      prefs.seen.add(revision);
      // Keep the opened letter available while the player is reading it.
      if (prefs.open) manual = true;
      savePrefs();
      render();
    },
  });

  function close() {
    manual = false;
    prefs.open = false;
    savePrefs();
    render();
  }

  function render() {
    const model = scene?.model ?? blank;
    const count = model.replies.reduce((n, reply) => n + Number(!prefs.seen.has(reply.revision)), 0);
    attached = Boolean(chatKey && (model.current || count || manual));
    if (!attached) {
      view.open(false);
      view.mount.hidden = true;
      view.mount.remove();
      return;
    }
    const floor = scene?.floor;
    const target = (Number.isInteger(floor) ? doc.querySelector('.mes[mesid="' + floor + '"] .mes_text') : null) ||
      doc.getElementById('chat');
    if (!target) return;
    view.skin(theme);
    view.mount.hidden = false;
    const moved = view.mount.parentElement !== target;
    if (moved) target.append(view.mount);
    if (prefs.open) {
      const signature = JSON.stringify(model);
      if (signature !== painted) {
        view.paint(model);
        painted = signature;
      }
      view.paintRead(prefs.seen);
    }
    view.open(prefs.open);
    view.header(count, variableWatch.status(scene?.update, {
      generating,
      parsing: Date.now()<updatingUntil || Boolean(mvu()?.isDuringExtraAnalysis?.()),
    }));
    if (moved) view.observe();
  }

  function openHistory() {
    const { key } = chatContext();
    syncChat(key);
    if (!key) return;
    manual = true;
    prefs.open = true;
    savePrefs();
    refresh();
    view.toggle.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
    view.toggle.focus({ preventScroll: true });
  }

  function busy() {
    if (generating || Date.now() < updatingUntil || mvu()?.isDuringExtraAnalysis?.()) return true;
    if (doc.body?.dataset.generating === 'true') return true;
    const stop = doc.getElementById('mes_stop');
    if (!stop || stop.hidden || !stop.getClientRects().length) return false;
    const style = host.getComputedStyle(stop);
    return style.display !== 'none' && style.visibility !== 'hidden';
  }

  function schedule(delay = 110) {
    if (disposed) return;
    window.clearTimeout(timer);
    timer = window.setTimeout(refresh, delay);
  }

  function on(name, callback) {
    const listen = helper('eventOn');
    if (!listen || !name || registered.has(name)) return;
    const subscription = listen(name, callback);
    registered.add(name);
    if (typeof subscription?.stop === 'function') stops.push(() => subscription.stop());
    else if (typeof subscription === 'function') stops.push(subscription);
    else stops.push(() => helper('eventRemoveListener')?.(name, callback));
  }

  function signalHead() {
    const {ctx,key}=chatContext();
    return key&&key===chatKey ? readScene(ctx)?.update.head : null;
  }
  function startingUpdate(data) {
    updatingUntil=Date.now()+2200;
    const head=signalHead();
    if(head)variableWatch.begin(head,data);
    render();
    schedule(150);
  }
  function endedUpdate(data,previous) {
    updatingUntil=0;
    variableWatch.result(signalHead(),data,previous);
    schedule(150);
  }
  function beforeWrite(context) {
    updatingUntil=0;
    const head=signalHead();
    const suppliedId=context?.message_id??context?.messageId;
    const suppliedSwipe=context?.swipe_id??context?.swipeId;
    const sameFloor=Number.isInteger(suppliedId)&&suppliedId===head?.floor&&
      (suppliedSwipe==null||suppliedSwipe===head?.swipe);
    const story=normalizedReply(context?.message_content);
    const sameStory=Boolean(story&&story===head?.story&&(!Number.isInteger(suppliedId)||sameFloor)&&
      (suppliedSwipe==null||suppliedSwipe===head?.swipe));
    if(head&&(sameFloor||sameStory||(!story&&suppliedId==null&&suppliedSwipe==null))){
      variableWatch.result(head,context?.variables,undefined,Date.now(),sameFloor||sameStory);
    }
    schedule(150);
  }
  function initializedUpdate(data,swipe) {
    const head=signalHead();
    if(head?.floor===0&&Number.isInteger(swipe)&&head.swipe===swipe)variableWatch.result(head,data,undefined,Date.now(),true);
    schedule(150);
  }

  function connect() {
    const events = window.tavern_events || host.tavern_events || {};
    const generationDone = () => { generating = false; schedule(150); };
    const updated = () => { updatingUntil = 0; schedule(150); };
    on(events.CHAT_CHANGED, () => {
      syncChat(chatContext().key);
      generating = false;
      updatingUntil = 0;
      variableWatch.reset();
      resetScene();
      schedule();
    });
    for (const name of ['MESSAGE_SWIPED', 'MESSAGE_SWIPE_DELETED', 'MESSAGE_DELETED', 'MESSAGE_EDITED']) {
      on(events[name], () => { variableWatch.reset(); resetScene(); schedule(); });
    }
    for (const name of [
      'MESSAGE_SENT', 'MESSAGE_RECEIVED', 'MESSAGE_UPDATED', 'CHARACTER_MESSAGE_RENDERED',
      'USER_MESSAGE_RENDERED', 'MORE_MESSAGES_LOADED',
    ]) on(events[name], () => schedule());
    on(events.GENERATION_STARTED, (type, options, dryRun) => {
      if (dryRun || options?.dryRun) return;
      generating = true;
      variableWatch.reset();
      if (type === 'regenerate' || type === 'swipe') resetScene();
      else render();
    });
    on(events.GENERATION_ENDED, generationDone);
    on(events.GENERATION_STOPPED, generationDone);

    const signals = mvu()?.events;
    const started = signals?.VARIABLE_UPDATE_STARTED || 'mag_variable_update_started';
    const ended = signals?.VARIABLE_UPDATE_ENDED || 'mag_variable_update_ended';
    on(started, startingUpdate);
    on(ended, endedUpdate);
    on(ended + '_for_zod', endedUpdate);
    on(signals?.BEFORE_MESSAGE_UPDATE || 'mag_before_message_update', beforeWrite);
    on(signals?.VARIABLE_INITIALIZED || 'mag_variable_initiailized', initializedUpdate);
    on('daoyuan_mvu_manual_updated', updated);

    const buttonEvent = helper('getButtonEvent') ||
      (typeof getButtonEvent === 'function' ? getButtonEvent : null);
    if (buttonEvent && helper('eventOn')) on(buttonEvent(historyButton), openHistory);

    const wait = helper('waitGlobalInitialized');
    if (!waitedForMvu && wait && !mvu()) {
      waitedForMvu = true;
      Promise.resolve(wait('Mvu')).then(value => {
        if (disposed) return;
        if (object(value)) mvuFromInit = value;
        schedule(0);
      }).catch(() => {});
    }
  }

  function refresh() {
    if (disposed) return;
    try {
      connect();
      const { ctx, key } = chatContext();
      syncChat(key);
      if (key && !busy()) {
        const next = readScene(ctx);
        if (next) {
          if (scene?.floor === next.floor && scene?.swipe !== next.swipe) {
            variableWatch.reset();
            resetScene();
          }
          scene = next;
        }
      }
      render();
      reportedError = false;
    } catch (error) {
      if (!reportedError) console.warn('[组织案卷]', error.message || error);
      reportedError = true;
    }
  }

  function preferenceChanged(event) {
    if (event.key === skinKey) {
      theme = load(skinKey) === 'seal' ? 'seal' : 'water';
      view.skin(theme);
    } else if (chatKey && event.key === prefKey()) {
      for (const token of readPrefs(chatKey).seen) prefs.seen.add(token);
      render();
    }
  }
  const observer = new host.MutationObserver(() => {
    if (attached && !view.mount.isConnected) schedule(60);
  });
  observer.observe(doc.documentElement, { subtree: true, childList: true });
  const reconnect = window.setInterval(() => { if (!doc.hidden) refresh(); }, 1500);

  function dispose() {
    if (disposed) return;
    disposed = true;
    window.clearInterval(reconnect);
    window.clearTimeout(timer);
    observer.disconnect();
    host.removeEventListener('storage', preferenceChanged);
    window.removeEventListener('pagehide', dispose);
    for (const stop of stops) {
      try { stop(); } catch { /* 宿主可能已经卸载 */ }
    }
    view.dispose();
    if (host[instance] === dispose) delete host[instance];
  }
  if (typeof host[instance] === 'function') host[instance]();
  host[instance] = dispose;
  host.addEventListener('storage', preferenceChanged);
  window.addEventListener('pagehide', dispose, { once: true });
  refresh();
}
runArchive();
})();