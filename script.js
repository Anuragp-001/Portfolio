/* =============================================================
   Anurag Pandey — Portfolio · interactions
   Vanilla JS, no dependencies. Accessible & motion-aware.
   ============================================================= */
(function () {
  "use strict";

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------- Theme */
  (function theme() {
    var btn = $("#themeToggle");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!btn) return;

    function paint() {
      var light = doc.getAttribute("data-theme") === "light";
      btn.setAttribute("aria-pressed", String(light));
      if (meta) meta.setAttribute("content", light ? "#f4f3ee" : "#0a0a0b");
    }

    btn.addEventListener("click", function () {
      var next = doc.getAttribute("data-theme") === "light" ? "dark" : "light";
      doc.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      paint();
      if (window.__signalRecolor) window.__signalRecolor();
    });

    paint();
  })();

  /* ---------------------------------------------------------- Nav state + scroll progress */
  (function navScroll() {
    var nav = $("#nav");
    var bar = $("#progressBar");
    var ticking = false;

    function update() {
      var y = window.scrollY || window.pageYOffset;
      if (nav) nav.classList.toggle("scrolled", y > 12);

      if (bar) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        var pct = h > 0 ? (y / h) * 100 : 0;
        bar.style.width = pct.toFixed(2) + "%";
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  })();

  /* ---------------------------------------------------------- Scroll-reveal */
  (function reveal() {
    var items = $$("[data-reveal]");
    if (!items.length) return;

    items.forEach(function (el) {
      var d = el.getAttribute("data-reveal-delay");
      if (d) el.style.setProperty("--rd", d);
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    items.forEach(function (el) { io.observe(el); });
  })();

  /* ---------------------------------------------------------- Scrollspy */
  (function scrollspy() {
    var links = $$(".nav__link");
    if (!links.length || !("IntersectionObserver" in window)) return;

    var map = {};
    links.forEach(function (l) {
      var id = l.getAttribute("href").slice(1);
      if (id) map[id] = l;
    });

    var sections = Object.keys(map)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          var active = map[entry.target.id];
          if (active) active.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  })();

  /* ---------------------------------------------------------- Mobile menu */
  (function menu() {
    var btn = $("#menuBtn");
    var panel = $("#mobileMenu");
    if (!btn || !panel) return;

    function setOpen(open) {
      panel.classList.toggle("open", open);
      panel.setAttribute("aria-hidden", String(!open));
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
      if (open) {
        var first = panel.querySelector("a");
        if (first) first.focus();
      }
    }

    btn.addEventListener("click", function () {
      setOpen(!panel.classList.contains("open"));
    });

    $$(".mobile-menu__link", panel).forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("open")) {
        setOpen(false);
        btn.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900 && panel.classList.contains("open")) setOpen(false);
    });
  })();

  /* ---------------------------------------------------------- Copy email + toast */
  (function copyEmail() {
    var btn = $("#copyEmail");
    var toast = $("#toast");
    if (!btn) return;

    var label = btn.querySelector(".copy-label");
    var original = label ? label.textContent : "";
    var t;

    function showToast(msg) {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add("show");
      clearTimeout(t);
      t = setTimeout(function () { toast.classList.remove("show"); }, 2200);
    }

    btn.addEventListener("click", function () {
      var email = btn.getAttribute("data-email") || "";
      var done = function () {
        if (label) label.textContent = "Copied";
        showToast("Email copied to clipboard");
        setTimeout(function () { if (label) label.textContent = original; }, 2000);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done).catch(function () { fallback(email, done); });
      } else {
        fallback(email, done);
      }
    });

    function fallback(text, cb) {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        cb();
      } catch (e) {
        if (toast) showToast(text);
      }
    }
  })();

  /* ---------------------------------------------------------- Count-up stats */
  (function counters() {
    var nums = $$("[data-count]");
    if (!nums.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) return; // keep static markup

    function run(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var dur = 1100;
      var start = null;

      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) window.requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      window.requestAnimationFrame(step);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });

    nums.forEach(function (el) { io.observe(el); });
  })();

  /* ---------------------------------------------------------- Footer year */
  (function year() {
    var el = $("#year");
    if (el) el.textContent = new Date().getFullYear();
  })();

  /* ---------------------------------------------------------- Hero signal canvas */
  (function signal() {
    var canvas = $("#signal");
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, t = 0, raf = null;
    var stroke = "rgba(255,255,255,0.4)";
    var accent = "#c6f24e";

    function readColors() {
      var cs = getComputedStyle(doc);
      accent = (cs.getPropertyValue("--accent-fill") || "#c6f24e").trim();
      stroke = (doc.getAttribute("data-theme") === "light")
        ? "rgba(20,20,14,0.35)"
        : "rgba(255,255,255,0.42)";
    }
    window.__signalRecolor = readColors;

    function resize() {
      var rect = canvas.getBoundingClientRect();
      w = Math.max(rect.width, 1);
      h = Math.max(rect.height, 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    var lines = [
      { amp: 0.10, freq: 0.0075, speed: 0.012, yoff: 0.40, accent: false, alpha: 0.5 },
      { amp: 0.14, freq: 0.0052, speed: 0.018, yoff: 0.52, accent: true,  alpha: 1.0 },
      { amp: 0.08, freq: 0.0102, speed: 0.009, yoff: 0.63, accent: false, alpha: 0.4 }
    ];

    function wave(line) {
      ctx.beginPath();
      var baseY = h * line.yoff;
      var amp = h * line.amp;
      for (var x = 0; x <= w; x += 6) {
        var y = baseY
          + Math.sin(x * line.freq + t * (line.speed * 6)) * amp * 0.62
          + Math.sin(x * line.freq * 1.9 - t * (line.speed * 4)) * amp * 0.38;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.lineWidth = line.accent ? 1.8 : 1.2;
      if (line.accent) {
        ctx.strokeStyle = accent;
        ctx.globalAlpha = 0.85;
      } else {
        ctx.strokeStyle = stroke;
        ctx.globalAlpha = line.alpha;
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < lines.length; i++) wave(lines[i]);
    }

    function loop() {
      t += 0.06;
      draw();
      raf = window.requestAnimationFrame(loop);
    }

    function start() {
      if (raf) return;
      loop();
    }
    function stop() {
      if (raf) { window.cancelAnimationFrame(raf); raf = null; }
    }

    readColors();
    resize();

    if (reduceMotion) {
      draw(); // static signal
    } else {
      start();
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) stop(); else start();
      });
    }

    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () { resize(); if (reduceMotion) draw(); }, 150);
    }, { passive: true });
  })();

})();
