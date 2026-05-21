// ============================================================
//  GATE #1 — Jungle Park · Pricing Workshop App
//  Vanilla JS · Firebase Realtime Database · Chart.js
// ============================================================

(function () {
  "use strict";

  // ------------------- Firebase init -------------------
  let db = null;
  let firebaseReady = false;
  try {
    if (!window.firebaseConfig || window.firebaseConfig.apiKey === "REPLACE_ME") {
      console.warn("[gate1] Firebase config not set — running in offline preview mode.");
    } else {
      firebase.initializeApp(window.firebaseConfig);
      db = firebase.database();
      firebaseReady = true;
    }
  } catch (e) {
    console.error("[gate1] Firebase init failed", e);
  }

  const SESSION = window.SESSION_ID || "gate1-jp-default";
  const ROOT = () => (db ? db.ref(`/sessions/${SESSION}`) : null);

  // ------------------- State -------------------
  const state = {
    user: null,
    activeTab: "opps",          // opps | arb | dash | profile
    oppListDetailed: false,     // toggle expand/collapse synthèse on list
    presenterView: "deck",      // deck | atelier (presenter only)
    slideIdx: 0,
    evaluations: {},
    arbitrages: {},
    users: {},
    session: {
      exercise_2_active: false,
      current_arbitrage_index: 0,
      matrix_revealed: false,
      top10_for_arbitrage: [],
      include_verdeen: true
    },
    currentOpp: null
  };

  function toast(msg, ms = 2200) {
    const t = document.createElement("div");
    t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), ms);
  }

  const urlParams = new URLSearchParams(location.search);
  const MODE = urlParams.get("mode") === "presenter" ? "presenter" : "participant";

  const root = document.getElementById("root");

  // ------------------- DOM helper (exposed for slides.js) -------------------
  function el(tag, attrs, ...children) {
    const e = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === "class") e.className = attrs[k];
        else if (k === "html") e.innerHTML = attrs[k];
        else if (k.startsWith("on") && typeof attrs[k] === "function") {
          e.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
        } else if (attrs[k] !== false && attrs[k] != null) {
          e.setAttribute(k, attrs[k]);
        }
      }
    }
    children.forEach(c => {
      if (c == null || c === false) return;
      if (Array.isArray(c)) c.forEach(cc => cc && e.appendChild(typeof cc === "string" ? document.createTextNode(cc) : cc));
      else if (typeof c === "string" || typeof c === "number") e.appendChild(document.createTextNode(c));
      else e.appendChild(c);
    });
    return e;
  }
  window.h = el;
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }
  function uuid() {
    return "u_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  }

  // ------------------- Verdeen voice seeding -------------------
  function seedVerdeenVoice() {
    if (!db) return Promise.resolve();
    const ref = db.ref(`/sessions/${SESSION}/verdeen_seeded`);
    return ref.once("value").then(snap => {
      if (snap.exists()) return;
      const writes = {};
      window.OPPORTUNITIES.forEach(o => {
        const s = o.score_verdeen;
        const entry = {
          impact: s.impact,
          facilite: s.facilite,
          risque: s.risque,
          score_composite: s.total,
          timestamp: Date.now(),
          source: "verdeen"
        };
        writes[`evaluations/${o.id}/verdeen_1`] = entry;
        writes[`evaluations/${o.id}/verdeen_2`] = entry;
      });
      writes["verdeen_seeded"] = true;
      writes["session/exercise_2_active"] = false;
      writes["session/current_arbitrage_index"] = 0;
      writes["session/matrix_revealed"] = false;
      writes["session/include_verdeen"] = true;
      return ROOT().update(writes);
    });
  }

  function bindListeners() {
    if (!db) return;
    ROOT().child("users").on("value", snap => {
      state.users = snap.val() || {};
      maybeRerenderPresenter();
    });
    ROOT().child("evaluations").on("value", snap => {
      state.evaluations = snap.val() || {};
      maybeRerenderPresenter();
      maybeRerenderParticipantOpps();
    });
    ROOT().child("arbitrages").on("value", snap => {
      state.arbitrages = snap.val() || {};
      maybeRerenderPresenter();
      maybeRerenderParticipantArb();
    });
    ROOT().child("session").on("value", snap => {
      const v = snap.val() || {};
      state.session = {
        exercise_2_active: !!v.exercise_2_active,
        current_arbitrage_index: v.current_arbitrage_index || 0,
        matrix_revealed: !!v.matrix_revealed,
        top10_for_arbitrage: v.top10_for_arbitrage || [],
        include_verdeen: v.include_verdeen !== false
      };
      maybeRerenderPresenter();
      maybeRerenderParticipant();
    });
  }

  function maybeRerenderPresenter() {
    if (MODE === "presenter" && document.querySelector("[data-presenter]")) renderPresenter();
  }
  function maybeRerenderParticipant() {
    if (MODE === "participant" && state.user) renderParticipant();
  }
  function maybeRerenderParticipantOpps() {
    if (MODE === "participant" && state.user && (state.activeTab === "opps" || state.activeTab === "profile") && !state.currentOpp) renderParticipant();
  }
  function maybeRerenderParticipantArb() {
    if (MODE === "participant" && state.user && state.activeTab === "arb") renderParticipant();
  }

  // ============================================================
  //  COMMON · brand bar
  // ============================================================
  function topbar(rightSlot) {
    return el("header", { class: "topbar" },
      el("div", { class: "wrap" },
        el("div", { class: "brand" },
          el("div", { class: "brand-mark" }, "V"),
          el("span", null,
            "Verdeen",
            el("span", { class: "x" }, "×"),
            "RGC"
          )
        ),
        rightSlot || el("div", { class: "confidential" }, "GATE #1 · 22 MAI")
      )
    );
  }

  // ============================================================
  //  LOGIN
  // ============================================================
  function renderLogin() {
    clear(root);
    const nameInput = el("input", { type: "text", placeholder: "Prénom", id: "loginName" });
    const roleSelect = el("select", { id: "loginRole" },
      el("option", { value: "" }, "— Sélectionne ton rôle —"),
      el("option", { value: "CEO" }, "CEO"),
      el("option", { value: "COO/Owner" }, "COO / Owner"),
      el("option", { value: "CFO" }, "CFO"),
      el("option", { value: "Marketing" }, "Marketing"),
      el("option", { value: "Ops" }, "Ops"),
      el("option", { value: "GM" }, "GM"),
      el("option", { value: "Autre" }, "Autre")
    );
    const submit = el("button", {
      class: "btn btn-primary btn-block",
      onClick: () => doLogin(nameInput.value, roleSelect.value)
    }, "Entrer dans la session");

    const card = el("div", { class: "login-card" },
      el("div", { class: "brand-row" },
        el("div", { class: "brand-mark" }, "V"),
        el("span", { style: "font-family:'Fraunces',serif; font-weight:600; color:var(--navy); font-size:17px" },
          "Verdeen ", el("span", { style: "color:var(--grey); font-weight:400" }, "×"), " RGC")
      ),
      el("h1", null, "Jungle Park"),
      el("p", { class: "tagline" }, "Gate #1 — Quick Wins · 22 mai 2026"),
      el("div", { class: "form-field" }, el("label", null, "Ton prénom"), nameInput),
      el("div", { class: "form-field" }, el("label", null, "Ton rôle"), roleSelect),
      submit,
      el("p", { style: "margin-top:16px; font-size:11px; color:var(--grey); text-align:center" },
        "Vote anonyme · vue mobile uniquement")
    );

    root.appendChild(el("div", { class: "login-screen" }, card));
    nameInput.focus();
    nameInput.addEventListener("keydown", e => {
      if (e.key === "Enter") doLogin(nameInput.value, roleSelect.value);
    });
  }

  function doLogin(name, role) {
    name = (name || "").trim();
    if (!name) { toast("Renseigne ton prénom"); return; }
    if (!role) { toast("Choisis ton rôle"); return; }
    const uid = uuid();
    state.user = { uid, name, role };
    localStorage.setItem("gate1_user", JSON.stringify(state.user));
    if (db) {
      ROOT().child(`users/${uid}`).set({
        name, role, joined_at: Date.now()
      });
    }
    renderParticipant();
  }

  function logout() {
    if (state.user && db) {
      ROOT().child(`users/${state.user.uid}`).remove();
    }
    localStorage.removeItem("gate1_user");
    state.user = null;
    state.currentOpp = null;
    state.activeTab = "opps";
    renderLogin();
  }

  // ============================================================
  //  PARTICIPANT
  // ============================================================
  function renderParticipant() {
    if (!state.user) { renderLogin(); return; }
    clear(root);
    const shell = el("div", { class: "app-shell" },
      topbar(el("div", { class: "who" }, el("b", null, state.user.name), " · ", state.user.role)),
      tabsContent(),
      tabbar()
    );
    root.appendChild(shell);
  }

  function tabsContent() {
    if (state.currentOpp) return renderOppDetail(state.currentOpp);
    switch (state.activeTab) {
      case "opps": return renderOppList();
      case "arb": return renderArbitrageTab();
      case "dash": return renderDashboardTab();
      case "profile": return renderProfileTab();
    }
  }

  function tabbar() {
    const tab = (id, ico, label, opts = {}) => el("button", {
      class: "tab-item" + (state.activeTab === id ? " active" : ""),
      disabled: opts.disabled || false,
      onClick: () => {
        if (opts.disabled) {
          toast(opts.disabledMsg || "Indisponible");
          return;
        }
        state.activeTab = id;
        state.currentOpp = null;
        renderParticipant();
      }
    }, el("span", { class: "ico" }, ico), label);

    const exoBlocked = !state.session.exercise_2_active;
    return el("nav", { class: "tabbar" },
      tab("opps", "🎯", "Opportunités"),
      tab("arb", "⚖️", "Arbitrage", {
        disabled: exoBlocked,
        disabledMsg: "Disponible plus tard dans la session"
      }),
      tab("dash", "📊", "Chiffres"),
      tab("profile", "👤", "Profil")
    );
  }

  function hasEvaluated(oppId) {
    return state.evaluations[oppId] && state.evaluations[oppId][state.user.uid];
  }

  function outilTagClass(outil) {
    if (!outil) return "tag-todo";
    const s = outil.toLowerCase();
    if (s.startsWith("ext")) return "tag-ext";
    if (s.startsWith("mixte")) return "tag-mixte";
    return "tag-int";
  }

  function renderOppMetaStrip(opp) {
    const parts = [];
    if (opp.outil) parts.push(el("span", { class: "mi" }, el("span", { class: "tag " + outilTagClass(opp.outil), style: "padding:0 6px; font-size:9.5px" }, opp.outil)));
    if (opp.owner_unibox) parts.push(el("span", { class: "mi" }, "Owner · ", el("b", null, opp.owner_unibox)));
    if (opp.tempo) parts.push(el("span", { class: "mi" }, "⏱ ", el("b", null, opp.tempo)));
    if (parts.length === 0) return el("div");
    return el("div", { class: "opp-meta-strip" }, ...parts);
  }

  function renderOppListDetail(opp) {
    // Embedded triple block inside card (only when "Détaillée" toggle is on)
    const triple = el("div", { class: "triple-block", style: "margin-top:12px; margin-bottom:8px" });
    if (opp.ce_quon_observe) triple.appendChild(el("div", null,
      el("div", { class: "ti" }, "OBSERVE"),
      el("div", { class: "body" }, opp.ce_quon_observe)));
    if (opp.ce_quon_deduit) triple.appendChild(el("div", null,
      el("div", { class: "ti" }, "DÉDUIT"),
      el("div", { class: "body" }, opp.ce_quon_deduit)));
    if (opp.comment_on_valide) triple.appendChild(el("div", null,
      el("div", { class: "ti" }, "VALIDE"),
      el("div", { class: "body" }, opp.comment_on_valide)));
    return triple;
  }

  function makeCollapsible(tag, title, contentNode, opts = {}) {
    const open = opts.open === true;
    const wrap = el("details", { class: "collapsible", open: open ? "" : false });
    wrap.appendChild(el("summary", { class: "collapsible-head" },
      el("div", { class: "lbl" },
        tag && el("span", { class: "lbl-tag" }, tag),
        el("span", null, title)
      ),
      el("span", { class: "chev" }, "▾")
    ));
    wrap.appendChild(el("div", { class: "collapsible-body" }, contentNode));
    return wrap;
  }

  function renderOppList() {
    const wrap = el("div", { class: "screen" });
    wrap.appendChild(el("div", { class: "eyebrow" }, "Atelier 1 · Priorisation"));
    wrap.appendChild(el("h2", { class: "title-xl" }, "Opportunités à évaluer"));
    wrap.appendChild(el("p", { class: "subtitle" },
      "15 leviers sur 3 dimensions (impact, facilité, risque). Vote anonyme, validation définitive."));

    // Toggle compact / détaillée
    wrap.appendChild(el("div", { style: "display:flex; justify-content:flex-end; margin-bottom:10px" },
      el("div", { class: "toggle-group" },
        el("button", {
          class: "toggle" + (!state.oppListDetailed ? " active" : ""),
          onClick: () => { state.oppListDetailed = false; renderParticipant(); }
        }, "Compact"),
        el("button", {
          class: "toggle" + (state.oppListDetailed ? " active" : ""),
          onClick: () => { state.oppListDetailed = true; renderParticipant(); }
        }, "Détaillée")
      )
    ));

    const list = el("div", { class: "opp-list" });
    window.OPPORTUNITIES.forEach(opp => {
      const isDone = hasEvaluated(opp.id);
      const card = el("button", {
        class: "opp-card" + (isDone ? " evaluated" : ""),
        onClick: () => {
          if (isDone) { toast("Tu as déjà évalué cette opportunité"); return; }
          state.currentOpp = opp.id;
          renderParticipant();
          window.scrollTo(0, 0);
        }
      },
        el("div", { class: "opp-head-row" },
          el("div", null,
            el("div", { class: "opp-num" }, "LEVIER " + opp.ref),
            el("div", { class: "opp-title" }, opp.title)
          ),
          el("span", { class: "tag " + (opp.family === "convergence" ? "tag-conv" : "tag-desa") },
            opp.family === "convergence" ? "Convergence" : "Désaccord")
        ),
        el("div", { class: "opp-sub" }, opp.subtitle),
        renderOppMetaStrip(opp),
        state.oppListDetailed ? renderOppListDetail(opp) : null,
        el("div", { class: "opp-foot" },
          el("div", null,
            el("div", { class: "opp-gain-lbl" }, "GAIN ESTIMÉ"),
            el("div", { class: "opp-gain" }, opp.gain_range)
          ),
          isDone
            ? el("span", { class: "tag tag-done" }, "✓ Évalué")
            : el("span", { class: "tag tag-todo" }, "À évaluer →")
        )
      );
      list.appendChild(card);
    });
    wrap.appendChild(list);
    return wrap;
  }

  // ------------------- OPP DETAIL -------------------
  function renderOppDetail(oppId) {
    const opp = window.getOpp(oppId);
    if (!opp) {
      state.currentOpp = null;
      return renderOppList();
    }

    const form = {
      impact: 3, facilite: 3, risque: 3,
      vars: {},
      commentaire: ""
    };
    if (opp.quantification_vars) {
      opp.quantification_vars.forEach(v => { form.vars[v.key] = v.value; });
    }

    const wrap = el("div");
    wrap.appendChild(el("div", { class: "detail-header" },
      el("button", { class: "back-btn", onClick: () => { state.currentOpp = null; renderParticipant(); } }, "←"),
      el("div", { style: "flex:1; min-width:0" },
        el("div", { class: "head-ref" }, "LEVIER " + opp.ref + " · " + (opp.family === "convergence" ? "CONVERGENCE" : "DÉSACCORD")),
        el("div", { class: "head-title" }, opp.title)
      )
    ));

    const body = el("div", { class: "detail-body" });

    // Meta strip (outil / owner / tempo)
    const metaParts = [];
    if (opp.outil) metaParts.push(el("span", { class: "mi" },
      "Outil · ", el("span", { class: "tag " + outilTagClass(opp.outil), style: "padding:1px 7px; font-size:10px" }, opp.outil)));
    if (opp.owner_unibox) metaParts.push(el("span", { class: "mi" }, "Owner · ", el("b", null, opp.owner_unibox)));
    if (opp.tempo) metaParts.push(el("span", { class: "mi" }, "⏱ Tempo · ", el("b", null, opp.tempo)));
    if (opp.convergence_label) metaParts.push(el("span", { class: "mi" }, el("b", null, opp.convergence_label)));
    if (metaParts.length) {
      body.appendChild(el("div", { class: "opp-meta-strip", style: "margin-bottom:14px" }, ...metaParts));
    }

    // Description
    body.appendChild(el("div", { class: "section" },
      el("h3", { class: "section-h" }, "Description"),
      el("p", null, opp.description)
    ));

    // Synthèse — observe / déduit / valide (3 colonnes du deck slides 11-12)
    if (opp.ce_quon_observe || opp.ce_quon_deduit || opp.comment_on_valide) {
      const triple = el("div", { class: "triple-block" });
      if (opp.ce_quon_observe) triple.appendChild(el("div", null,
        el("div", { class: "ti" }, "CE QU'ON OBSERVE"),
        el("div", { class: "body" }, opp.ce_quon_observe)));
      if (opp.ce_quon_deduit) triple.appendChild(el("div", null,
        el("div", { class: "ti" }, "CE QU'ON EN DÉDUIT"),
        el("div", { class: "body" }, opp.ce_quon_deduit)));
      if (opp.comment_on_valide) triple.appendChild(el("div", null,
        el("div", { class: "ti" }, "COMMENT ON VALIDE"),
        el("div", { class: "body" }, opp.comment_on_valide)));
      body.appendChild(el("div", { class: "section" },
        el("h3", { class: "section-h" }, "Synthèse — observe · déduit · valide"),
        triple
      ));
    }

    // Distinction observé / hypothèse / à tester — collapsibles
    if (opp.observe_data || opp.hypothese || opp.a_tester) {
      const wrap = el("div", null);
      if (opp.observe_data) wrap.appendChild(makeCollapsible("✓", "Observé — confirmé par data", el("p", null, opp.observe_data)));
      if (opp.hypothese) wrap.appendChild(makeCollapsible("🔬", "Hypothèse — déduction Verdeen", el("p", null, opp.hypothese)));
      if (opp.a_tester) wrap.appendChild(makeCollapsible("⏳", "À tester — Phase 2 / data à obtenir", el("p", null, opp.a_tester)));
      body.appendChild(el("div", { class: "section" },
        el("h3", { class: "section-h" }, "Distinction · Observé · Hypothèse · À tester"),
        wrap
      ));
    }

    // Quantification
    const quantSection = el("div", { class: "section" });
    quantSection.appendChild(el("h3", { class: "section-h" }, "Quantification chiffrée"));
    quantSection.appendChild(el("p", { class: "small" }, opp.quantification_text));

    if (opp.quantification_vars) {
      const varsBox = el("div", { style: "margin-top:14px" });
      opp.quantification_vars.forEach(v => {
        const valLabel = el("span", { class: "qvar-value" }, formatVarValue(v, v.value));
        const range = el("input", {
          type: "range",
          min: v.min, max: v.max, step: v.step,
          value: v.value
        });
        const numInput = el("input", { type: "number", min: v.min, max: v.max, step: v.step, value: v.value });
        const updateFrom = (val) => {
          val = Number(val);
          if (isNaN(val)) return;
          form.vars[v.key] = val;
          range.value = val;
          numInput.value = val;
          valLabel.textContent = formatVarValue(v, val);
          updateTotal();
        };
        range.addEventListener("input", () => updateFrom(range.value));
        numInput.addEventListener("input", () => updateFrom(numInput.value));

        varsBox.appendChild(el("div", { class: "qvar" },
          el("div", { class: "qvar-label" }, el("span", null, v.label), valLabel),
          el("div", { class: "qvar-range" }, range, numInput)
        ));
      });
      quantSection.appendChild(varsBox);

      const totalBox = el("div", { class: "qtotal-box" },
        el("div", { class: "label" }, "Total estimé"),
        el("div", { class: "value", id: "qtotal" }, "—")
      );
      quantSection.appendChild(totalBox);
      quantSection.appendChild(el("div", { class: "qreference" }, "Fourchette deck : " + opp.gain_range));

      function updateTotal() {
        const total = opp.quantification_formula(form.vars);
        const totalEl = quantSection.querySelector("#qtotal");
        totalEl.textContent = formatEuros(total);
      }
      setTimeout(updateTotal, 0);
    }

    quantSection.appendChild(el("div", { class: "comment-field" },
      el("label", null, "Si tu challenges ces chiffres, explique pourquoi (optionnel)"),
      el("textarea", {
        placeholder: "Ton commentaire…",
        oninput: (e) => { form.commentaire = e.target.value; }
      })
    ));
    body.appendChild(quantSection);

    if (opp.hypotheses_limites) {
      body.appendChild(el("div", { class: "section" },
        el("h3", { class: "section-h" }, "Hypothèses & limites"),
        el("p", { class: "small" }, opp.hypotheses_limites)
      ));
    }

    body.appendChild(el("div", { class: "section" },
      el("h3", { class: "section-h" }, "Validation data · Reco Verdeen"),
      el("p", { class: "small" }, opp.validation_data),
      el("p", { class: "small", style: "margin-top:10px" },
        el("b", { style: "color:var(--navy)" }, "Reco · "), opp.reco_verdeen)
    ));

    // Évaluation
    const evalSection = el("div", { class: "section" });
    evalSection.appendChild(el("h3", { class: "section-h" }, "Ton évaluation"));

    function scoreSlider(key, name, hintLow, hintHigh) {
      const valEl = el("span", { class: "val" }, form[key]);
      const slider = el("input", { type: "range", min: 1, max: 5, step: 1, value: form[key] });
      slider.addEventListener("input", () => {
        form[key] = Number(slider.value);
        valEl.textContent = form[key];
        updateComposite();
      });
      return el("div", { class: "score-row" },
        el("div", { class: "score-label" },
          el("span", { class: "name" }, name),
          valEl
        ),
        slider,
        el("div", { class: "score-poles" },
          el("span", null, hintLow),
          el("span", null, hintHigh)
        )
      );
    }

    evalSection.appendChild(scoreSlider("impact", "Impact", "1 · faible", "5 · fort"));
    evalSection.appendChild(scoreSlider("facilite", "Facilité de mise en œuvre", "1 · difficile", "5 · facile"));
    evalSection.appendChild(scoreSlider("risque", "Risque (inversé)", "1 · risqué", "5 · safe"));

    const composite = el("div", { class: "composite-box" },
      el("div", { class: "label" }, "Score composite"),
      el("div", { class: "value", id: "composite" }, "9 / 15")
    );
    evalSection.appendChild(composite);
    evalSection.appendChild(el("p", { class: "verdeen-ref" },
      `Référence — Score Verdeen ${opp.score_verdeen.total}/15 · I${opp.score_verdeen.impact} · F${opp.score_verdeen.facilite} · R${opp.score_verdeen.risque}`));

    function updateComposite() {
      const total = form.impact + form.facilite + form.risque;
      composite.querySelector("#composite").textContent = total + " / 15";
    }
    setTimeout(updateComposite, 0);

    body.appendChild(evalSection);

    body.appendChild(el("div", { class: "submit-bar" },
      el("button", { class: "btn btn-primary btn-block", onClick: () => askConfirmSubmit(opp, form) },
        "Valider mon évaluation")
    ));

    wrap.appendChild(body);
    return wrap;
  }

  function formatVarValue(v, value) {
    const isInt = (v.step >= 1 && Number.isInteger(v.step));
    if (isInt) return Number(value).toLocaleString("fr-FR");
    return Number(value).toLocaleString("fr-FR", { maximumFractionDigits: 2 });
  }
  function formatEuros(n) {
    if (!isFinite(n)) return "—";
    return Math.round(n).toLocaleString("fr-FR") + " €";
  }

  function askConfirmSubmit(opp, form) {
    showModal("Valider cette évaluation ?", "Tu ne pourras plus la modifier ensuite.", () => {
      submitEvaluation(opp, form);
    });
  }

  function submitEvaluation(opp, form) {
    if (!db || !state.user) {
      toast("Mode hors-ligne : évaluation locale (configure Firebase pour synchroniser).");
      // Stocker localement pour démonstration
      if (!state.evaluations[opp.id]) state.evaluations[opp.id] = {};
      state.evaluations[opp.id][state.user.uid] = {
        impact: form.impact, facilite: form.facilite, risque: form.risque,
        score_composite: form.impact + form.facilite + form.risque,
        timestamp: Date.now()
      };
      state.currentOpp = null;
      renderParticipant();
      return;
    }
    const payload = {
      impact: form.impact,
      facilite: form.facilite,
      risque: form.risque,
      score_composite: form.impact + form.facilite + form.risque,
      hypotheses_modifiees: form.vars || null,
      commentaire: form.commentaire || null,
      role: state.user.role,
      name: state.user.name,
      timestamp: Date.now()
    };
    ROOT().child(`evaluations/${opp.id}/${state.user.uid}`).set(payload).then(() => {
      toast("Évaluation enregistrée ✓");
      state.currentOpp = null;
      renderParticipant();
    }).catch(err => {
      console.error(err);
      toast("Erreur d'enregistrement — réessaie");
    });
  }

  function showModal(title, body, onConfirm, extraNode) {
    const back = el("div", { class: "modal-backdrop" });
    const close = () => back.remove();
    const modal = el("div", { class: "modal" },
      el("h3", null, title),
      el("p", null, body)
    );
    if (extraNode) modal.appendChild(extraNode);
    modal.appendChild(el("div", { class: "row" },
      el("button", { class: "btn btn-secondary", onClick: close }, "Annuler"),
      el("button", { class: "btn btn-primary", onClick: () => { close(); onConfirm(); } }, "Confirmer")
    ));
    back.appendChild(modal);
    back.addEventListener("click", e => { if (e.target === back) close(); });
    document.body.appendChild(back);
  }

  // ============================================================
  //  ARBITRAGE
  // ============================================================
  function renderArbitrageTab() {
    const wrap = el("div", { class: "screen" });
    wrap.appendChild(el("div", { class: "eyebrow" }, "Atelier 2 · Arbitrage"));
    wrap.appendChild(el("h2", { class: "title-xl" }, "GO · WTP · PARK"));
    wrap.appendChild(el("p", { class: "subtitle" },
      "Pour chaque opportunité, choisis une catégorie. 4 options pour éviter le faux GO direct."));

    if (!state.session.exercise_2_active) {
      wrap.appendChild(el("div", { class: "empty-state" },
        el("div", { class: "ico" }, "⏸"),
        el("p", null, "L'exercice 2 sera ouvert par l'animateur.")));
      return wrap;
    }

    const top = state.session.top10_for_arbitrage || [];
    const idx = state.session.current_arbitrage_index || 0;
    const oppId = top[idx];
    if (!oppId) {
      wrap.appendChild(el("div", { class: "empty-state" },
        el("div", { class: "ico" }, "✓"),
        el("p", null, "Aucune opportunité affichée pour l'instant.")));
      return wrap;
    }
    const opp = window.getOpp(oppId);
    if (!opp) return wrap;

    const alreadyVoted = state.arbitrages[oppId] && state.arbitrages[oppId][state.user.uid];
    if (alreadyVoted) {
      wrap.appendChild(el("div", { class: "empty-state" },
        el("div", { class: "ico" }, "✓"),
        el("p", null, "Vote enregistré pour " + opp.ref + "."),
        el("p", { style: "margin-top:6px; color:var(--grey); font-size:12px" }, "En attente des autres participants…")));
      return wrap;
    }

    const card = el("div", { class: "arbitrage-card" },
      el("div", { class: "opp-ref" }, "LEVIER " + opp.ref + " · " + (idx + 1) + "/" + top.length),
      el("div", { class: "opp-title" }, opp.title),
      el("div", { class: "opp-desc" }, opp.subtitle)
    );

    const choices = [
      { key: "GO", emoji: "🟢", title: "GO immédiat", sub: "Action décidée en séance, déployable sans WTP préalable" },
      { key: "GO_WTP", emoji: "🟡", title: "GO post WTP", sub: "Direction validée, calibrage exact sort de l'enquête WTP" },
      { key: "WTP", emoji: "🔵", title: "WTP pure", sub: "Pertinence à confirmer par données terrain" },
      { key: "PARK", emoji: "⚫", title: "PARK", sub: "Hors périmètre court terme" }
    ];

    let selected = null;
    const choicesBox = el("div", { class: "arb-choices" });
    choices.forEach(c => {
      const btn = el("button", {
        class: "arb-choice",
        onClick: () => {
          selected = c.key;
          choicesBox.querySelectorAll(".arb-choice").forEach(b => b.classList.remove("selected"));
          btn.classList.add("selected");
        }
      },
        el("span", { class: "arb-emoji" }, c.emoji),
        el("div", { class: "arb-content" },
          el("div", { class: "arb-title" }, c.title),
          el("div", { class: "arb-sub" }, c.sub)
        )
      );
      choicesBox.appendChild(btn);
    });
    card.appendChild(choicesBox);

    card.appendChild(el("div", { style: "margin-top:20px" },
      el("button", { class: "btn btn-primary btn-block", onClick: () => {
        if (!selected) { toast("Choisis une option"); return; }
        showModal("Valider ton choix ?", "Tu ne pourras plus le modifier.", () => {
          if (!db) {
            toast("Vote local (mode hors-ligne)");
            if (!state.arbitrages[opp.id]) state.arbitrages[opp.id] = {};
            state.arbitrages[opp.id][state.user.uid] = { choice: selected, timestamp: Date.now() };
            renderParticipant();
            return;
          }
          ROOT().child(`arbitrages/${opp.id}/${state.user.uid}`).set({
            choice: selected,
            role: state.user.role,
            name: state.user.name,
            timestamp: Date.now()
          });
        });
      } }, "Valider mon choix")
    ));

    wrap.appendChild(card);
    return wrap;
  }

  // ============================================================
  //  DASHBOARD TAB
  // ============================================================
  function renderDashboardTab() {
    const wrap = el("div", { class: "screen" });
    wrap.appendChild(el("div", { class: "eyebrow" }, "Diagnostic · Chiffres clés"));
    wrap.appendChild(el("h2", { class: "title-xl" }, "Le business aujourd'hui"));
    wrap.appendChild(el("p", { class: "subtitle" },
      "Données Apex 11 mois · 23 994 transactions · 4 095 clients nommés."));

    wrap.appendChild(el("div", { class: "kpi-strip" },
      el("div", { class: "kpi" },
        el("div", { class: "kpi-label" }, "CA opérationnel"),
        el("div", { class: "kpi-value" }, "700 k€"),
        el("div", { class: "kpi-sub" }, "TTC sur 11 mois")),
      el("div", { class: "kpi" },
        el("div", { class: "kpi-label" }, "Transactions"),
        el("div", { class: "kpi-value" }, "23 994"),
        el("div", { class: "kpi-sub" }, "11 mois d'exploitation")),
      el("div", { class: "kpi" },
        el("div", { class: "kpi-label" }, "Panier moyen"),
        el("div", { class: "kpi-value" }, "29 €"),
        el("div", { class: "kpi-sub" }, "complet ~52€ avec F&B")),
      el("div", { class: "kpi" },
        el("div", { class: "kpi-label" }, "Anniversaires"),
        el("div", { class: "kpi-value" }, "969"),
        el("div", { class: "kpi-sub" }, "= 25,4% du CA · 183€/fête")),
      el("div", { class: "kpi" },
        el("div", { class: "kpi-label" }, "Concentration"),
        el("div", { class: "kpi-value" }, "57 %"),
        el("div", { class: "kpi-sub" }, "CA sur Sam + Dim"))
    ));

    // CA par jour
    const card1 = chartCard("CA par jour de semaine",
      "57% du CA sur Sam + Dim (37% des jours). Total 700 k€ TTC sur 11 mois.");
    wrap.appendChild(card1);

    // Mix produit
    const card2 = el("div", { class: "chart-card" },
      el("div", { class: "card-title" }, "Mix produit par CA"),
      el("div", { class: "insight" }, "Pack Trampo 19,2% (1 SKU) · Anniversaires 25,4% · F&B Baloo ~37% (estimé)"),
      buildMixBars()
    );
    wrap.appendChild(card2);

    // Pyramide
    wrap.appendChild(el("div", { class: "chart-card" },
      el("div", { class: "card-title" }, "Démographie clients · sexe × âge"),
      el("div", { class: "insight" }, "4 095 clients nommés · 74% de femmes · pic 30-39 ans = 55,5% des clients"),
      buildPyramid()
    ));

    // Heatmap
    wrap.appendChild(el("div", { class: "chart-card" },
      el("div", { class: "card-title" }, "Densité visites · heure × jour"),
      el("div", { class: "insight" }, "Pic 13h–15h = 55% du volume total · 13 196 tx sur 23 994 · cuisine = goulet en peak"),
      buildHeatmap()
    ));

    // Saturation
    const card5 = chartCard("Saturation des jours d'ouverture",
      "12 jours saturés >250 tx (4,9%) · max 334 tx vendredi 02/01/2026 · médiane ~95 tx/j");
    wrap.appendChild(card5);

    setTimeout(() => {
      renderCaParJour(card1.querySelector("canvas"));
      renderSaturation(card5.querySelector("canvas"));
    }, 0);

    return wrap;
  }

  function chartCard(title, insight) {
    return el("div", { class: "chart-card" },
      el("div", { class: "card-title" }, title),
      el("div", { class: "insight" }, insight),
      el("canvas")
    );
  }

  function renderCaParJour(canvas) {
    if (!canvas || !window.Chart) return;
    new Chart(canvas, {
      type: "bar",
      data: {
        labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
        datasets: [{
          label: "CA TTC (€)",
          data: [5000, 5000, 88000, 5000, 67000, 216000, 204000],
          backgroundColor: ["#DDE0EE", "#DDE0EE", "#B8BDE8", "#DDE0EE", "#B8BDE8", "#2E3058", "#2E3058"],
          borderRadius: 6
        }]
      },
      options: chartBaseOpts({ legend: false, currency: true })
    });
  }

  function renderSaturation(canvas) {
    if (!canvas || !window.Chart) return;
    new Chart(canvas, {
      type: "bar",
      data: {
        labels: ["<50", "50-100", "100-150", "150-200", "200-250", "250-300", ">300"],
        datasets: [{
          label: "Nb jours",
          data: [82, 75, 50, 27, 11, 8, 4],
          backgroundColor: ["#DDE0EE", "#DDE0EE", "#B8BDE8", "#7B80D4", "#E07856", "#E07856", "#2E3058"],
          borderRadius: 6
        }]
      },
      options: chartBaseOpts({ legend: false })
    });
  }

  function chartBaseOpts(o = {}) {
    return {
      responsive: true, maintainAspectRatio: true,
      plugins: { legend: { display: o.legend !== false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: "#4A4D6B", font: { family: "Inter Tight" } } },
        y: {
          grid: { color: "#EEF0F8" },
          ticks: {
            color: "#4A4D6B",
            font: { family: "Inter Tight" },
            callback: function (val) {
              if (o.currency) {
                if (val >= 1000) return (val / 1000) + "k€";
                return val + "€";
              }
              return val;
            }
          }
        }
      }
    };
  }

  function buildMixBars() {
    const items = [
      { label: "F&B Baloo Bar (estim.)", pct: 37 },
      { label: "Anniversaires (Bronze+Silver+Gold)", pct: 25.4 },
      { label: "Pack Trampo Aventuriers", pct: 19.2 },
      { label: "Entrées Rangers", pct: 9.7 },
      { label: "Autres", pct: 8.4 },
      { label: "Mini-Golf", pct: 0.3 }
    ];
    const wrap = el("div", { class: "mix-bars" });
    items.forEach(it => {
      wrap.appendChild(el("div", { class: "mix-row" },
        el("div", { class: "lbl" }, it.label),
        el("div", { class: "barwrap" }, el("div", { class: "bar", style: `width:${(it.pct / 37) * 100}%` })),
        el("div", { class: "val" }, it.pct + "%")
      ));
    });
    return wrap;
  }

  function buildPyramid() {
    const data = [
      { age: "60+",    male: 5,  female: 8 },
      { age: "50-59",  male: 7,  female: 11 },
      { age: "45-49",  male: 5,  female: 9 },
      { age: "40-44",  male: 8,  female: 14 },
      { age: "35-39",  male: 11, female: 20 },
      { age: "30-34",  male: 12, female: 25 },
      { age: "25-29",  male: 4,  female: 18 },
      { age: "18-24",  male: 1,  female: 3 },
      { age: "<18",    male: 1,  female: 2 }
    ];
    const maxVal = 25;
    const wrap = el("div");
    data.forEach(d => {
      const lWidth = (d.male / maxVal * 100) + "%";
      const rWidth = (d.female / maxVal * 100) + "%";
      wrap.appendChild(el("div", { class: "pyramid-row" },
        el("div", { class: "pyramid-bar-l" },
          el("div", { class: "pyramid-bar male", style: `width:${lWidth}` }, d.male + "%")
        ),
        el("div", { class: "pyramid-age" }, d.age),
        el("div", { class: "pyramid-bar-r" },
          el("div", { class: "pyramid-bar female", style: `width:${rWidth}` }, d.female + "%")
        )
      ));
    });
    wrap.appendChild(el("div", { class: "pyramid-legend" },
      el("span", null, el("span", { class: "dot", style: "background:#7B80D4" }), "Hommes 26%"),
      el("span", null, el("span", { class: "dot", style: "background:#E07856" }), "Femmes 74%")
    ));
    return wrap;
  }

  function buildHeatmap() {
    const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    const hours = ["10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h"];
    const grid = {
      Lun: [2, 3, 4, 5, 5, 4, 3, 2, 1],
      Mar: [2, 3, 4, 5, 5, 4, 3, 2, 1],
      Mer: [4, 8, 18, 38, 42, 25, 12, 6, 3],
      Jeu: [2, 3, 4, 5, 5, 4, 3, 2, 1],
      Ven: [3, 6, 12, 28, 30, 18, 10, 22, 18],
      Sam: [12, 28, 55, 88, 92, 70, 55, 35, 18],
      Dim: [12, 30, 58, 90, 95, 72, 52, 32, 15]
    };
    const max = 95;
    const wrap = el("div", { style: "overflow-x:auto" });
    const tbl = el("table", { class: "heatmap-table" });
    const head = el("tr", null, el("th", null, ""));
    hours.forEach(h => head.appendChild(el("th", null, h)));
    tbl.appendChild(head);
    days.forEach(d => {
      const tr = el("tr", null, el("th", null, d));
      grid[d].forEach(v => {
        const pct = v / max;
        const alpha = Math.max(0.05, pct);
        const bg = `rgba(46, 48, 88, ${alpha})`;
        const fg = pct > 0.45 ? "#fff" : "#2E3058";
        tr.appendChild(el("td", { style: `background:${bg}; color:${fg}` }, v));
      });
      tbl.appendChild(tr);
    });
    wrap.appendChild(tbl);
    return wrap;
  }

  // ============================================================
  //  PROFILE
  // ============================================================
  function renderProfileTab() {
    const wrap = el("div", { class: "screen" });
    wrap.appendChild(el("div", { class: "eyebrow" }, "Mon profil"));
    wrap.appendChild(el("h2", { class: "title-xl" }, state.user.name));
    wrap.appendChild(el("p", { class: "subtitle" }, state.user.role));

    const myEvals = [];
    Object.entries(state.evaluations || {}).forEach(([oppId, votes]) => {
      const v = votes && votes[state.user.uid];
      if (v) myEvals.push({ oppId, v });
    });

    wrap.appendChild(el("h3", { class: "title-md", style: "margin-top:18px" },
      `Mes évaluations · ${myEvals.length} / ${window.OPPORTUNITIES.length}`));

    if (myEvals.length === 0) {
      wrap.appendChild(el("p", { class: "muted", style: "font-size:13px" },
        "Tu n'as pas encore évalué d'opportunité."));
    } else {
      const list = el("div", { class: "profile-list" });
      myEvals.forEach(({ oppId, v }) => {
        const opp = window.getOpp(oppId);
        if (!opp) return;
        list.appendChild(el("div", { class: "profile-item" },
          el("div", null,
            el("div", { class: "pi-ref" }, "LEVIER " + opp.ref),
            el("div", { class: "pi-title" }, opp.title),
            el("div", { class: "pi-meta" }, `I${v.impact} · F${v.facilite} · R${v.risque}`)
          ),
          el("div", { class: "pi-sc" }, (v.score_composite || (v.impact + v.facilite + v.risque)) + "/15")
        ));
      });
      wrap.appendChild(list);
    }

    wrap.appendChild(el("div", { style: "margin-top:30px" },
      el("button", { class: "btn btn-secondary", onClick: () => {
        showModal("Se déconnecter ?", "Tes évaluations restent enregistrées.", logout);
      } }, "Se déconnecter")
    ));

    return wrap;
  }

  // ============================================================
  //  PRESENTER MODE
  // ============================================================
  function renderPresenter() {
    clear(root);
    const toolbar = el("div", { class: "presenter-toolbar" },
      el("div", { class: "brand" },
        el("div", { class: "brand-mark" }, "V"),
        el("span", null, "Verdeen ", el("span", { class: "x" }, "×"), " RGC ", el("span", { class: "muted", style: "font-weight:400; font-size:13px" }, "· Présentateur"))
      ),
      el("div", { class: "toggle-group" },
        el("button", {
          class: "toggle" + (state.presenterView === "deck" ? " active" : ""),
          onClick: () => { state.presenterView = "deck"; renderPresenter(); }
        }, "📽 Présentation"),
        el("button", {
          class: "toggle" + (state.presenterView === "atelier" ? " active" : ""),
          onClick: () => { state.presenterView = "atelier"; renderPresenter(); }
        }, "🎯 Atelier")
      ),
      el("div", { class: "confidential" }, "GATE #1 · 22 MAI")
    );

    const shell = el("div", { class: "presenter-shell", "data-presenter": "1" });
    shell.appendChild(toolbar);
    if (state.presenterView === "deck") {
      shell.appendChild(renderDeckView());
    } else {
      shell.appendChild(renderAtelierView());
    }
    root.appendChild(shell);
  }

  function renderDeckView() {
    const slides = window.PRESENTATION_SLIDES || [];
    const idx = Math.max(0, Math.min(state.slideIdx, slides.length - 1));
    const slide = slides[idx];

    const slideShell = el("div", { class: "slide-shell" });

    const ctrl = el("div", { class: "slide-toolbar" },
      el("button", {
        class: "btn btn-secondary",
        onClick: () => { state.slideIdx = Math.max(0, idx - 1); renderPresenter(); }
      }, "← Précédente"),
      el("div", { class: "slide-nav" },
        el("span", { class: "slide-num" }, (idx + 1) + " / " + slides.length),
        el("select", {
          style: "padding:6px 10px; border:1px solid var(--periwinkle-deep); border-radius:8px; font-size:12px",
          onChange: (e) => { state.slideIdx = Number(e.target.value); renderPresenter(); }
        }, ...slides.map((s, i) => el("option", { value: i, selected: i === idx ? "selected" : false }, (i + 1) + " · " + s.title))),
        el("button", {
          class: "btn btn-ghost",
          onClick: () => { document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); }
        }, "⛶ Plein écran")
      ),
      el("button", {
        class: "btn btn-primary",
        onClick: () => { state.slideIdx = Math.min(slides.length - 1, idx + 1); renderPresenter(); }
      }, "Suivante →")
    );
    slideShell.appendChild(ctrl);

    if (slide) {
      const node = el("div", { class: "slide" });
      try {
        node.appendChild(slide.build());
      } catch (e) {
        console.error("[slide build]", e);
        node.appendChild(el("div", null, "Erreur slide : " + e.message));
      }
      slideShell.appendChild(node);
    }

    // Keyboard navigation
    if (!window._keyBound) {
      window._keyBound = true;
      document.addEventListener("keydown", (e) => {
        if (MODE !== "presenter" || state.presenterView !== "deck") return;
        const slides = window.PRESENTATION_SLIDES || [];
        if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
          state.slideIdx = Math.min(slides.length - 1, state.slideIdx + 1); renderPresenter();
        } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
          state.slideIdx = Math.max(0, state.slideIdx - 1); renderPresenter();
        }
      });
    }

    return slideShell;
  }

  function renderAtelierView() {
    const grid = el("div", { class: "presenter-grid" },
      presenterSessionPanel(),
      presenterMatrixPanel(),
      presenterArbitragePanel()
    );
    return grid;
  }

  function presenterSessionPanel() {
    const users = state.users || {};
    const userKeys = Object.keys(users);
    const panel = el("div", { class: "panel presenter-session" });
    panel.appendChild(el("h2", null, "Suivi de session"));
    panel.appendChild(el("span", { class: "users-count" },
      userKeys.length.toString(),
      el("small", null, " / 5 participants connectés")
    ));
    const ulist = el("div", { class: "users-list" });
    userKeys.forEach(k => {
      const u = users[k];
      ulist.appendChild(el("span", { class: "user-chip" }, u.name + " · " + u.role));
    });
    panel.appendChild(ulist);

    const evalCount = countTotalEvaluations();
    panel.appendChild(el("p", { style: "font-size:12px; color:var(--ink-soft); margin-top:6px" },
      `${evalCount} évaluation(s) enregistrée(s) au total`));

    panel.appendChild(el("div", { class: "session-row" },
      el("button", { class: "btn btn-primary", onClick: exportSessionJSON }, "📥 Exporter JSON"),
      el("button", { class: "btn btn-secondary", onClick: openUnlockDialog }, "🔓 Débloquer"),
      el("button", { class: "btn btn-secondary", onClick: () => {
        showModal("Réinitialiser la session ?", "Toutes les évaluations et arbitrages seront supprimés.", () => {
          if (!db) { state.evaluations = {}; state.arbitrages = {}; state.users = {}; renderPresenter(); return; }
          ROOT().remove().then(() => {
            seedVerdeenVoice();
            toast("Session réinitialisée");
          });
        });
      } }, "🔄 Réinitialiser")
    ));
    return panel;
  }

  function exportSessionJSON() {
    const payload = {
      session_id: SESSION,
      exported_at: new Date().toISOString(),
      users: state.users,
      evaluations: state.evaluations,
      arbitrages: state.arbitrages,
      session: state.session,
      opportunities_metadata: window.OPPORTUNITIES.map(o => ({
        id: o.id, ref: o.ref, title: o.title, family: o.family,
        score_verdeen: o.score_verdeen, gain_range: o.gain_range,
        outil: o.outil, owner_unibox: o.owner_unibox, tempo: o.tempo
      })),
      // Agrégats prêts à analyser
      aggregates: computeMatrixStats(true).map(s => ({
        opp_id: s.opp.id, ref: s.opp.ref, title: s.opp.title, family: s.opp.family,
        n_real_votes: s.n,
        n_total_votes: s.n_total || s.n,
        impact_avg: round1(s.impact_avg),
        facilite_avg: round1(s.facilite_avg),
        risque_avg: round1(s.risque_avg),
        composite_avg: round1(s.composite_avg),
        impact_std: round1(s.impact_std),
        facilite_std: round1(s.facilite_std)
      })),
      arbitrage_summary: window.OPPORTUNITIES.map(o => {
        const votes = Object.entries(state.arbitrages[o.id] || {});
        const counts = { GO: 0, GO_WTP: 0, WTP: 0, PARK: 0 };
        votes.forEach(([, v]) => { if (counts[v.choice] != null) counts[v.choice]++; });
        return { opp_id: o.id, ref: o.ref, total_votes: votes.length, ...counts };
      }).filter(x => x.total_votes > 0)
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gate1-jp_${SESSION}_${new Date().toISOString().slice(0,16).replace(/[:T]/g,'-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast("Export téléchargé ✓");
  }

  function round1(n) {
    if (n == null || !isFinite(n)) return null;
    return Math.round(n * 10) / 10;
  }

  function openUnlockDialog() {
    const back = el("div", { class: "modal-backdrop" });
    const close = () => back.remove();
    const userKeys = Object.keys(state.users || {}).filter(k => !k.startsWith("verdeen"));
    const oppOpts = window.OPPORTUNITIES;

    const userSel = el("select", null,
      el("option", { value: "" }, "— Choisir un participant —"),
      ...userKeys.map(k => el("option", { value: k }, (state.users[k].name || k) + " · " + (state.users[k].role || "")))
    );
    const oppSel = el("select", null,
      el("option", { value: "" }, "— Choisir une opportunité —"),
      ...oppOpts.map(o => el("option", { value: o.id }, o.ref + " · " + o.title))
    );

    back.appendChild(el("div", { class: "modal" },
      el("h3", null, "Débloquer une évaluation"),
      el("p", null, "Permet à un participant de réévaluer une opportunité."),
      userSel,
      oppSel,
      el("div", { class: "row" },
        el("button", { class: "btn btn-secondary", onClick: close }, "Annuler"),
        el("button", { class: "btn btn-primary", onClick: () => {
          const u = userSel.value, o = oppSel.value;
          if (!u || !o) { toast("Sélectionne les deux"); return; }
          if (!db) { toast("Mode hors-ligne"); close(); return; }
          ROOT().child(`evaluations/${o}/${u}`).remove();
          toast("Évaluation supprimée — le participant peut réévaluer");
          close();
        } }, "Débloquer")
      )
    ));
    back.addEventListener("click", e => { if (e.target === back) close(); });
    document.body.appendChild(back);
  }

  function countTotalEvaluations() {
    let n = 0;
    Object.values(state.evaluations || {}).forEach(o => {
      Object.keys(o || {}).forEach(k => { if (!k.startsWith("verdeen")) n++; });
    });
    return n;
  }

  // ------------------- MATRIX -------------------
  function presenterMatrixPanel() {
    const panel = el("div", { class: "panel matrix-card presenter-matrix" });
    panel.appendChild(el("h2", null, "Matrice impact × facilité"));

    const includeVerdeen = state.session.include_verdeen !== false;
    const revealed = state.session.matrix_revealed;

    const controls = el("div", { class: "matrix-controls" },
      el("button", {
        class: "btn " + (revealed ? "btn-primary" : "btn-secondary"),
        onClick: () => {
          if (!db) { state.session.matrix_revealed = !revealed; renderPresenter(); return; }
          ROOT().child("session/matrix_revealed").set(!revealed);
        }
      }, revealed ? "🔓 Révélée" : "🔒 Cachée — Révéler"),
      el("label", null,
        el("input", {
          type: "checkbox",
          checked: includeVerdeen ? "checked" : false,
          onChange: (e) => {
            if (!db) { state.session.include_verdeen = e.target.checked; renderPresenter(); return; }
            ROOT().child("session/include_verdeen").set(e.target.checked);
          }
        }),
        "Inclure Verdeen ×2"
      )
    );
    panel.appendChild(controls);

    const stats = computeMatrixStats(includeVerdeen);
    const canvas = el("div", { class: "matrix-canvas-wrap" },
      el("div", { class: "matrix-corner-label", style: "left:60px; top:24px" }, "PRIORITÉ MAX"),
      el("div", { class: "matrix-corner-label", style: "right:24px; top:24px" }, "QUICK WINS"),
      el("div", { class: "matrix-corner-label", style: "left:60px; bottom:60px" }, "À INSTRUIRE"),
      el("div", { class: "matrix-corner-label", style: "right:24px; bottom:60px" }, "PARQUER"),
      el("div", { class: "matrix-axis-x" }, "Facilité →"),
      el("div", { class: "matrix-axis-y" }, "↑ Impact"),
      buildMatrixCanvas(stats, revealed)
    );
    panel.appendChild(canvas);

    panel.appendChild(el("div", { class: "legend" },
      el("span", null, el("span", { class: "legend-dot", style: "background:#10B981" }), "Convergences (1.x)"),
      el("span", null, el("span", { class: "legend-dot", style: "background:#F59E0B" }), "Désaccords (2.x)"),
      el("span", { class: "muted", style: "font-size:11px" }, "Halo = dispersion des votes · pondération Verdeen ×2")
    ));

    if (!revealed) {
      panel.appendChild(el("p", { style: "margin-top:16px; text-align:center; color:var(--ink-soft); font-size:13px; font-style:italic" },
        "Matrice masquée — clique sur « 🔒 Cachée » pour révéler après les votes."));
    }

    return panel;
  }

  function computeMatrixStats(includeVerdeen) {
    const out = [];
    window.OPPORTUNITIES.forEach(opp => {
      const votes = Object.entries(state.evaluations[opp.id] || {});
      const filtered = votes.filter(([k]) => includeVerdeen ? true : !k.startsWith("verdeen"));
      if (filtered.length === 0) {
        out.push({ opp, n: 0 });
        return;
      }
      const impacts = filtered.map(([, v]) => Number(v.impact));
      const facs = filtered.map(([, v]) => Number(v.facilite));
      const risques = filtered.map(([, v]) => Number(v.risque));
      const composites = filtered.map(([, v]) => Number(v.score_composite || v.impact + v.facilite + v.risque));
      const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
      const std = arr => {
        const m = avg(arr);
        return Math.sqrt(arr.reduce((s, x) => s + (x - m) ** 2, 0) / arr.length);
      };
      const verdeenCount = filtered.filter(([k]) => k.startsWith("verdeen")).length;
      out.push({
        opp,
        n: filtered.length - verdeenCount, // real human votes
        n_total: filtered.length,
        impact_avg: avg(impacts),
        facilite_avg: avg(facs),
        risque_avg: avg(risques),
        composite_avg: avg(composites),
        impact_std: std(impacts),
        facilite_std: std(facs)
      });
    });
    return out;
  }

  function buildMatrixCanvas(stats, revealed) {
    const canvas = el("div", { class: "matrix-canvas" });
    for (let i = 1; i < 5; i++) {
      const pct = (i / 5) * 100;
      canvas.appendChild(el("div", { class: "matrix-grid-v", style: `left:${pct}%` }));
      canvas.appendChild(el("div", { class: "matrix-grid-h", style: `bottom:${pct}%` }));
    }
    if (!revealed) return canvas;

    stats.forEach(s => {
      if (s.n_total === 0) return;
      const x = ((s.facilite_avg - 1) / 4) * 100;
      const y = ((s.impact_avg - 1) / 4) * 100;
      const color = s.opp.family === "convergence" ? "#10B981" : "#F59E0B";
      const haloW = Math.max(36, s.facilite_std * 80);
      const haloH = Math.max(36, s.impact_std * 80);

      canvas.appendChild(el("div", {
        class: "matrix-halo",
        style: `left:${x}%; bottom:${y}%; width:${haloW}px; height:${haloH}px;`
      }));
      const point = el("div", {
        class: "matrix-point",
        style: `left:${x}%; bottom:${y}%; background:${color}`,
        onMouseenter: (e) => showTooltip(e, s),
        onMouseleave: hideTooltip,
        onMousemove: moveTooltip
      }, s.opp.ref);
      canvas.appendChild(point);
    });
    return canvas;
  }

  let _ttEl = null;
  function showTooltip(e, s) {
    hideTooltip();
    _ttEl = el("div", { class: "tooltip" },
      el("div", { class: "t-title" }, s.opp.ref + " · " + s.opp.title),
      el("div", { class: "t-row" }, el("span", null, "Impact moy."), el("span", null, s.impact_avg.toFixed(1))),
      el("div", { class: "t-row" }, el("span", null, "Facilité moy."), el("span", null, s.facilite_avg.toFixed(1))),
      el("div", { class: "t-row" }, el("span", null, "Risque moy."), el("span", null, s.risque_avg.toFixed(1))),
      el("div", { class: "t-row" }, el("span", null, "Score composite"), el("span", null, s.composite_avg.toFixed(1) + "/15")),
      el("div", { class: "t-row" }, el("span", null, "Voix réelles"), el("span", null, s.n))
    );
    document.body.appendChild(_ttEl);
    moveTooltip(e);
  }
  function moveTooltip(e) {
    if (!_ttEl) return;
    _ttEl.style.left = Math.min(e.clientX + 12, window.innerWidth - 280) + "px";
    _ttEl.style.top = Math.max(8, e.clientY - 100) + "px";
  }
  function hideTooltip() { if (_ttEl) { _ttEl.remove(); _ttEl = null; } }

  // ------------------- ARBITRAGE (presenter) -------------------
  function presenterArbitragePanel() {
    const panel = el("div", { class: "panel presenter-arbitrage" });
    panel.appendChild(el("h2", null, "Exercice 2 · Arbitrage"));

    const active = state.session.exercise_2_active;
    if (!active) {
      panel.appendChild(el("p", { style: "font-size:13px; color:var(--ink-soft); margin-bottom:12px" },
        "Top 10 calculé à partir des scores composites agrégés."));
      panel.appendChild(el("button", {
        class: "btn btn-primary",
        onClick: () => {
          const top10 = computeTop10();
          if (!db) {
            state.session.top10_for_arbitrage = top10;
            state.session.current_arbitrage_index = 0;
            state.session.exercise_2_active = true;
            renderPresenter();
            return;
          }
          ROOT().update({
            "session/top10_for_arbitrage": top10,
            "session/current_arbitrage_index": 0,
            "session/exercise_2_active": true
          });
          toast("Exercice 2 lancé");
        }
      }, "🚀 Démarrer l'exercice 2"));
      return panel;
    }

    const top = state.session.top10_for_arbitrage || [];
    const idx = state.session.current_arbitrage_index || 0;
    const oppId = top[idx];
    const opp = oppId ? window.getOpp(oppId) : null;

    if (opp) {
      panel.appendChild(el("div", { style: "font-family:'JetBrains Mono',monospace; font-size:12px; color:var(--ink-soft); margin-bottom:8px" },
        `Opportunité ${idx + 1} / ${top.length}`));
      panel.appendChild(el("div", { style: "padding:14px 16px; background:var(--periwinkle); border-radius:10px; margin-bottom:14px" },
        el("div", { style: "font-family:'Fraunces',serif; font-size:18px; font-weight:600; color:var(--navy); letter-spacing:-0.01em" },
          opp.ref + " · " + opp.title)));

      const votes = Object.entries(state.arbitrages[opp.id] || {});
      const counts = { GO: 0, GO_WTP: 0, WTP: 0, PARK: 0 };
      votes.forEach(([, v]) => { if (counts[v.choice] != null) counts[v.choice]++; });
      const nUsers = Object.keys(state.users || {}).filter(k => !k.startsWith("verdeen")).length || 1;

      panel.appendChild(el("p", { style: "font-size:12px; color:var(--ink-soft); margin-bottom:8px" },
        `Votes : ${votes.length} / ${nUsers}`));

      const barWrap = el("div");
      [
        { k: "GO", c: "#10B981", label: "🟢 GO immédiat" },
        { k: "GO_WTP", c: "#F59E0B", label: "🟡 GO post WTP" },
        { k: "WTP", c: "#7B80D4", label: "🔵 WTP pure" },
        { k: "PARK", c: "#9E9FAF", label: "⚫ PARK" }
      ].forEach(b => {
        const pct = nUsers ? (counts[b.k] / nUsers * 100) : 0;
        barWrap.appendChild(el("div", { class: "vote-bar-row" },
          el("div", { class: "lbl" },
            el("span", null, b.label),
            el("b", null, counts[b.k])
          ),
          el("div", { class: "vbar" }, el("div", { style: `width:${pct}%; background:${b.c}` }))
        ));
      });
      panel.appendChild(barWrap);
    } else {
      panel.appendChild(el("p", { style: "font-size:13px; color:var(--ink-soft)" }, "Fin du top 10."));
    }

    panel.appendChild(el("div", { class: "session-row" },
      el("button", {
        class: "btn btn-secondary",
        disabled: idx === 0 ? "disabled" : false,
        onClick: () => {
          if (idx > 0) {
            if (!db) { state.session.current_arbitrage_index = idx - 1; renderPresenter(); return; }
            ROOT().child("session/current_arbitrage_index").set(idx - 1);
          }
        }
      }, "← Préc."),
      el("button", {
        class: "btn btn-primary",
        disabled: idx >= top.length - 1 ? "disabled" : false,
        onClick: () => {
          if (idx < top.length - 1) {
            if (!db) { state.session.current_arbitrage_index = idx + 1; renderPresenter(); return; }
            ROOT().child("session/current_arbitrage_index").set(idx + 1);
          }
        }
      }, "Suiv. →"),
      el("button", {
        class: "btn btn-secondary",
        onClick: () => {
          showModal("Arrêter l'exercice 2 ?", "Les votes restent enregistrés.", () => {
            if (!db) { state.session.exercise_2_active = false; renderPresenter(); return; }
            ROOT().child("session/exercise_2_active").set(false);
          });
        }
      }, "⏹ Stop")
    ));

    return panel;
  }

  function computeTop10() {
    const stats = computeMatrixStats(true);
    return stats
      .sort((a, b) => (b.composite_avg || 0) - (a.composite_avg || 0))
      .slice(0, 10)
      .map(s => s.opp.id);
  }

  // ============================================================
  //  INIT
  // ============================================================
  function init() {
    if (firebaseReady) {
      seedVerdeenVoice().then(() => bindListeners()).catch(err => {
        console.error("[gate1] seed failed", err);
        bindListeners();
      });
    } else {
      // Inject Verdeen voice locally so matrix / arbitrage work in preview
      window.OPPORTUNITIES.forEach(o => {
        if (!state.evaluations[o.id]) state.evaluations[o.id] = {};
        const s = o.score_verdeen;
        const entry = { impact: s.impact, facilite: s.facilite, risque: s.risque, score_composite: s.total, source: "verdeen" };
        state.evaluations[o.id].verdeen_1 = entry;
        state.evaluations[o.id].verdeen_2 = entry;
      });
    }

    if (MODE === "presenter") {
      renderPresenter();
      return;
    }

    const saved = localStorage.getItem("gate1_user");
    if (saved) {
      try {
        state.user = JSON.parse(saved);
        if (db && state.user) {
          ROOT().child(`users/${state.user.uid}`).update({
            name: state.user.name,
            role: state.user.role,
            joined_at: Date.now()
          });
        }
      } catch (e) { state.user = null; }
    }
    if (state.user) renderParticipant();
    else renderLogin();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
