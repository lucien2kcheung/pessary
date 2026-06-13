/* =========================================================
   The Pessary — shared behaviour
   ========================================================= */
(function () {
  "use strict";

  /* ---------- language ---------- */
  var STORE = "pessary-lang";
  function getLang() {
    try { return localStorage.getItem(STORE) || "en"; } catch (e) { return "en"; }
  }
  function setLang(lang) {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-Hant" : "en");
    try { localStorage.setItem(STORE, lang); } catch (e) {}
    document.querySelectorAll(".lang-toggle [data-lang-opt]").forEach(function (el) {
      el.classList.toggle("on", el.getAttribute("data-lang-opt") === lang);
    });
    document.querySelectorAll("option[data-en][data-zh]").forEach(function (opt) {
      var t = opt.getAttribute(lang === "zh" ? "data-zh" : "data-en");
      if (t) opt.textContent = t;
    });
  }
  // apply ASAP
  setLang(getLang());

  document.addEventListener("DOMContentLoaded", function () {
    setLang(getLang());

    document.querySelectorAll(".lang-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(getLang() === "en" ? "zh" : "en");
      });
    });

    /* ---------- mobile menu ---------- */
    var menuBtn = document.querySelector(".menu-btn");
    var nav = document.querySelector(".nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { nav.classList.remove("open"); });
      });
    }

    /* ---------- scroll reveal ---------- */
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && reveals.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      reveals.forEach(function (r) { io.observe(r); });
    } else {
      reveals.forEach(function (r) { r.classList.add("in"); });
    }

    /* ---------- render shapes ---------- */
    document.querySelectorAll("[data-shape]").forEach(function (el) {
      var s = SHAPES[el.getAttribute("data-shape")];
      if (s) el.innerHTML = s;
    });

    initSelector();
    initForm();
  });

  /* ---------- schematic pessary shapes (illustrative only) ---------- */
  var C = 'stroke="currentColor" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
  var Cf = 'stroke="currentColor" fill="currentColor" fill-opacity="0.10" stroke-width="3"';
  var SHAPES = {
    ring: '<svg viewBox="0 0 100 100" color="#236A61"><ellipse cx="50" cy="50" rx="38" ry="30" '+Cf+'/><ellipse cx="50" cy="50" rx="22" ry="15" '+C+'/></svg>',
    "ring-knob": '<svg viewBox="0 0 100 100" color="#236A61"><ellipse cx="50" cy="54" rx="36" ry="28" '+Cf+'/><ellipse cx="50" cy="54" rx="20" ry="13" '+C+'/><circle cx="50" cy="22" r="9" '+Cf+'/></svg>',
    donut: '<svg viewBox="0 0 100 100" color="#236A61"><ellipse cx="50" cy="50" rx="40" ry="32" '+Cf+'/><ellipse cx="50" cy="50" rx="14" ry="10" stroke="currentColor" fill="#FBFAF7" stroke-width="3"/></svg>',
    cube: '<svg viewBox="0 0 100 100" color="#236A61"><path d="M28 40 L50 28 L72 40 L72 66 L50 78 L28 66 Z" '+Cf+'/><path d="M28 40 L50 52 L72 40 M50 52 L50 78" '+C+'/><path d="M50 28 V16 M50 16 q-8 0 -8 -8" '+C+'/></svg>',
    gellhorn: '<svg viewBox="0 0 100 100" color="#236A61"><ellipse cx="50" cy="34" rx="34" ry="13" '+Cf+'/><path d="M50 34 V72" '+C+'/><circle cx="50" cy="78" r="8" '+Cf+'/></svg>',
    "short-stem-gellhorn": '<svg viewBox="0 0 100 100" color="#236A61"><ellipse cx="50" cy="40" rx="34" ry="13" '+Cf+'/><path d="M50 40 V64" '+C+'/><circle cx="50" cy="70" r="8" '+Cf+'/></svg>',
    shaatz: '<svg viewBox="0 0 100 100" color="#236A61"><ellipse cx="50" cy="50" rx="38" ry="26" '+Cf+'/><ellipse cx="50" cy="50" rx="20" ry="13" '+C+'/><ellipse cx="50" cy="50" rx="9" ry="6" '+C+'/></svg>',
    gehrung: '<svg viewBox="0 0 100 100" color="#236A61"><path d="M20 64 Q50 22 80 64" '+Cf+' fill-rule="evenodd"/><path d="M30 60 Q50 36 70 60" '+C+'/></svg>',
    dish: '<svg viewBox="0 0 100 100" color="#236A61"><path d="M16 46 Q50 78 84 46" '+Cf+'/><ellipse cx="50" cy="46" rx="34" ry="11" '+C+'/></svg>',
    cup: '<svg viewBox="0 0 100 100" color="#236A61"><path d="M22 40 Q50 84 78 40" '+Cf+'/><ellipse cx="50" cy="40" rx="28" ry="11" '+C+'/></svg>',
    oval: '<svg viewBox="0 0 100 100" color="#236A61"><ellipse cx="50" cy="50" rx="26" ry="38" '+Cf+'/><ellipse cx="50" cy="50" rx="13" ry="22" '+C+'/></svg>',
    marland: '<svg viewBox="0 0 100 100" color="#236A61"><ellipse cx="50" cy="50" rx="38" ry="28" '+Cf+'/><ellipse cx="50" cy="50" rx="18" ry="12" '+C+'/><circle cx="50" cy="28" r="2.5" fill="currentColor"/><circle cx="68" cy="50" r="2.5" fill="currentColor"/><circle cx="32" cy="50" r="2.5" fill="currentColor"/></svg>',
    hodge: '<svg viewBox="0 0 100 100" color="#236A61"><path d="M30 22 Q70 26 70 50 Q70 78 40 78 Q22 78 22 60 Q22 44 40 44" '+Cf+'/></svg>',
    "incontinence-ring": '<svg viewBox="0 0 100 100" color="#236A61"><ellipse cx="50" cy="54" rx="36" ry="28" '+Cf+'/><ellipse cx="50" cy="54" rx="20" ry="13" '+C+'/><circle cx="50" cy="24" r="7" '+Cf+'/></svg>',
    "flexi-shelf": '<svg viewBox="0 0 100 100" color="#236A61"><path d="M18 40 Q50 70 82 40" '+Cf+'/><ellipse cx="50" cy="40" rx="32" ry="10" '+C+'/><path d="M50 46 L50 82" stroke="currentColor" stroke-width="6" stroke-linecap="round"/></svg>'
  };
  window.PESSARY_SHAPES = SHAPES;

  /* ---------- type selector ---------- */
  // Recommendation logic from the supplier guidance + Clinicon's own product notes.
  function recommend(degree, concern) {
    if (concern === "sex") return "gehrung";
    if (degree === "severe") return "gellhorn";
    if (degree === "mild" && concern === "heaviness") return "ring";
    if (degree === "mild" && concern === "leak") return "ring-knob";
    if (degree === "moderate" && concern === "heaviness") return "donut";
    if (degree === "moderate" && concern === "leak") return "cube";
    return "ring"; // safe common starting point for "not sure"
  }

  var RESULTS = {
    ring: {
      name_en: "Ring", name_zh: "環形托 (Ring)",
      en: "The most widely used type and a common first choice. It gives gentle support and is straightforward to insert and remove yourself.",
      zh: "最常用的類型，也是初次使用者的常見選擇。提供溫和支撐，方便自行放置和取出。"
    },
    "ring-knob": {
      name_en: "Ring with knob", name_zh: "帶凸鈕環形托 (Ring with knob)",
      en: "A ring with an added knob that presses gently under the urethra, which can reduce leaks when you cough, sneeze or exercise.",
      zh: "在環形基礎上加上凸鈕，輕輕承托尿道，有助減少咳嗽、打噴嚏或運動時的漏尿。"
    },
    donut: {
      name_en: "Donut", name_zh: "甜甜圈形托 (Donut)",
      en: "A thicker, space-filling ring that gives firmer support for moderate prolapse. Fitting is usually checked by a clinician.",
      zh: "較厚的實心環形，為中度脫垂提供更穩固的支撐。通常需由醫護人員確認合適度。"
    },
    cube: {
      name_en: "Cube", name_zh: "立方體托 (Cube)",
      en: "Grips the vaginal walls by gentle suction, supporting the bladder and urethra together. Removed daily and well suited to moderate prolapse with leaking.",
      zh: "以輕微吸附力貼合陰道壁，同時承托膀胱與尿道。需每日取出，適合中度脫垂伴隨漏尿的情況。"
    },
    gellhorn: {
      name_en: "Gellhorn", name_zh: "Gellhorn 托",
      en: "A disc with a stem that provides the strongest support for advanced prolapse. It is placed and reviewed by a clinician.",
      zh: "帶柱狀柄的圓盤托，為較嚴重的脫垂提供最強支撐。需由醫護人員放置並定期跟進。"
    },
    gehrung: {
      name_en: "Gehrung", name_zh: "Gehrung 托",
      en: "A saddle-shaped, bendable type that can be moulded to fit. Its arch keeps clear of the back wall, which many women find more comfortable during sex.",
      zh: "可塑形的半弧形托，能依需要彎折調整。其弧度避開陰道後壁，許多女性在性生活時感覺較舒適。"
    }
  };
  var ALTS = {
    en: "Other types your clinician may consider: Dish, Cup, Shaatz, Marland, Oval, Hodge, Incontinence Ring, Flexi Shelf.",
    zh: "醫護人員亦可能考慮的其他類型：碟形托、杯狀托、Shaatz、Marland、橢圓形托、Hodge、失禁環、Flexi Shelf。"
  };

  function initSelector() {
    var root = document.getElementById("selector");
    if (!root) return;

    var state = { degree: null, concern: null };
    var Q1 = root.querySelector('[data-step="1"]');
    var Q2 = root.querySelector('[data-step="2"]');
    var RES = root.querySelector('[data-step="result"]');
    var bar = root.querySelector(".bar i");

    function show(el) {
      [Q1, Q2, RES].forEach(function (s) { s.classList.add("hidden"); });
      el.classList.remove("hidden");
    }
    function setBar(pct) { if (bar) bar.style.width = pct + "%"; }

    Q1.querySelectorAll(".opt").forEach(function (b) {
      b.addEventListener("click", function () {
        state.degree = b.getAttribute("data-val");
        setBar(66); show(Q2);
      });
    });
    Q2.querySelectorAll(".opt").forEach(function (b) {
      b.addEventListener("click", function () {
        state.concern = b.getAttribute("data-val");
        setBar(100); renderResult();
      });
    });
    root.querySelectorAll("[data-back]").forEach(function (b) {
      b.addEventListener("click", function () {
        var to = b.getAttribute("data-back");
        if (to === "1") { setBar(33); show(Q1); }
        if (to === "2") { setBar(66); show(Q2); }
      });
    });
    var restart = root.querySelector("[data-restart]");
    if (restart) restart.addEventListener("click", function () {
      state = { degree: null, concern: null }; setBar(33); show(Q1);
    });

    function renderResult() {
      var key = recommend(state.degree, state.concern);
      var r = RESULTS[key];
      RES.querySelector("[data-rfig]").innerHTML = '<img src="assets/img/' + key + '.png" alt="' + r.name_en + ' pessary" loading="lazy">';
      RES.querySelector("[data-rname-en]").textContent = r.name_en;
      RES.querySelector("[data-rname-zh]").textContent = r.name_zh;
      RES.querySelector("[data-rblurb-en]").textContent = r.en;
      RES.querySelector("[data-rblurb-zh]").textContent = r.zh;
      RES.querySelector("[data-ralts-en]").textContent = ALTS.en;
      RES.querySelector("[data-ralts-zh]").textContent = ALTS.zh;
      show(RES);
    }
    setBar(33);
  }

  /* ---------- contact form (static-host friendly: opens email) ---------- */
  function initForm() {
    var form = document.getElementById("enquiry-form");
    if (!form) return;
    var TO = form.getAttribute("data-to") || "info@clinicon.com.hk";
    var status = form.querySelector(".form-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.querySelector("[name=name]") || {}).value || "";
      var email = (form.querySelector("[name=email]") || {}).value || "";
      var topic = (form.querySelector("[name=topic]") || {}).value || "";
      var msg = (form.querySelector("[name=message]") || {}).value || "";
      if (!name.trim() || !email.trim() || !msg.trim()) {
        showStatus(getLang() === "zh"
          ? "請填寫姓名、電郵和訊息內容。"
          : "Please complete your name, email and message.", false);
        return;
      }
      var lang = getLang();
      var subject = (lang === "zh" ? "子宮托查詢 — " : "Pessary enquiry — ") + topic;
      var body =
        (lang === "zh" ? "姓名：" : "Name: ") + name + "\n" +
        (lang === "zh" ? "電郵：" : "Email: ") + email + "\n" +
        (lang === "zh" ? "主題：" : "Topic: ") + topic + "\n\n" + msg + "\n";
      var href = "mailto:" + TO +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      window.location.href = href;
      showStatus(lang === "zh"
        ? "正在開啟您的電郵程式。如未自動開啟，請直接電郵至 " + TO + "。"
        : "Opening your email app. If nothing happens, email us directly at " + TO + ".", true);
    });

    function showStatus(text, ok) {
      if (!status) return;
      status.textContent = text;
      status.classList.add("show");
      status.classList.toggle("ok", !!ok);
    }
  }
})();
