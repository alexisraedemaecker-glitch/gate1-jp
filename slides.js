// ============================================================
//  GATE #1 — Jungle Park · Slides de présentation
//  Renders the non-workshop content (diagnostic, conviction,
//  benchmark, F&B, phase 2, validations, closing) as a dynamic
//  deck navigable in the app.
//
//  Each slide returns a DOM element (built via window.h helper
//  defined in app.js — re-used here).
// ============================================================

(function () {
  "use strict";

  // Local helper (shadowing app.js `el` but identical impl).
  function h(tag, attrs, ...children) {
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

  // ============================================================
  //  SLIDES
  // ============================================================

  const slides = [];

  // ---------- 1 · COUVERTURE / CONVICTION D'OUVERTURE ----------
  slides.push({
    eyebrow: "Phase 1 · Diagnostic Flash",
    title: "Jungle Park",
    section: "Cover",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "Verdeen × RGC · Gate #1 — Quick Wins"),
      h("h1", { class: "slide-title", html: "Jungle Park n'a pas de problème <br>d'attractivité. <em>Il a un problème<br>de capture de valeur.</em>" }),
      h("p", { class: "slide-lede" },
        "La prochaine étape : un système de pricing piloté, structuré et reproductible, capable de monétiser la demande existante."),
      h("div", { class: "slide-cols-3", style: "margin-top:40px" },
        kpiBig("700,3 k€", "CA OPÉRATIONNEL", "TTC sur 11 mois · 23 994 transactions"),
        kpiBig("57 %", "DU CA · SAM + DIM", "Concentration sur 37 % des jours d'ouverture"),
        kpiBig("4 095", "CLIENTS NOMMÉS", "Base CRM activable · 30 000 parents/an")
      ),
      h("p", { style: "margin-top:36px; font-size:13px; color:var(--ink-soft); font-style:italic" },
        "Confidentiel — Unibox Group · Vendredi 22 mai 2026 · On-site Chaineux")
    )
  });

  // ---------- 2 · DÉROULÉ ----------
  slides.push({
    eyebrow: "00 · Cadrage",
    title: "Déroulé · 1h30 · 6 blocs",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "00 · Cadrage"),
      h("h2", { class: "slide-title" }, "Le déroulé de la matinée"),
      h("p", { class: "slide-lede" }, "Format pensé pour produire des décisions, pas un point d'avancement. Deux ateliers interactifs en milieu de séance."),
      h("div", { class: "card" },
        timeline("08h30", "5 min",  "Cadrage", "Objectifs, méthode, déroulé"),
        timeline("08h35", "20 min", "Diagnostic", "Entretiens · Chiffres · As-is · F&B · Benchmark · Conviction"),
        timeline("08h55", "15 min", "Opportunités", "Carte des 15 leviers · Exemple deep-dive 1.5 · Matrice first-cut Verdeen"),
        timeline("09h10", "22 min", "Atelier 1 — Priorisation", "Vote individuel anonyme + matrice consolidée + discussion"),
        timeline("09h32", "18 min", "Atelier 2 — Arbitrage", "GO immédiat · GO post WTP · WTP pure · PARK"),
        timeline("09h50", "10 min", "Phase 2 + Closing", "Plan d'enquête · 5 validations · Calendrier · Next steps")
      )
    )
  });

  // ---------- 3 · OBJECTIFS ----------
  slides.push({
    eyebrow: "00 · Cadrage",
    title: "Trois décisions à sortir de la salle",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "Objectifs"),
      h("h2", { class: "slide-title", html: "Trois décisions à sortir<br>de la salle ce matin" }),
      h("p", { class: "slide-lede" }, "À 10h00, nous devons avoir collectivement acté ces trois jalons."),
      h("div", { class: "slide-cols-3" },
        objCard("01", "Priorité", "5 leviers prioritaires", "Sélection collective des leviers à activer en priorité — Atelier 1 (22 min). Vote silencieux puis matrice consolidée. Discussion sur les leviers à plus forte dispersion."),
        objCard("02", "Arbitrage", "GO / WTP / PARK", "Pour chaque levier prioritaire, arbitrage en 4 options — Atelier 2 (18 min). GO = déploiement 3 semaines · GO post-WTP · WTP = Phase 2 · PARK = post-CODIR juin."),
        objCard("03", "Engagement", "Validations Phase 2", "5 validations spécifiques d'Unibox pour démarrer Wave 1 (Mer 27 mai). Owners nominatifs + deadlines fermes. Compte-rendu écrit lundi 25 mai.")
      )
    )
  });

  // ---------- 4 · ENTRETIENS ----------
  slides.push({
    eyebrow: "01 · Diagnostic",
    title: "Ce que nous avons entendu",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "01 · Entretiens"),
      h("h2", { class: "slide-title" }, "Ce que nous avons entendu"),
      h("p", { class: "slide-lede" }, "6 entretiens stakeholders · 4 convergences fortes + 1 red thread transversal."),
      h("div", { class: "slide-cols-2" },
        convQuote("6 voix sur 6", "Peak pricing assumé",
          "Quand on est complet, je n'ai pas du tout de stress à augmenter.",
          "Convergence totale Ops + Marketing + Finance + COO + CEO + GM cross-parcs. Patrice reconnait que 14,50€ a été calibré sur un risque historique probablement surestimé."),
        convQuote("6 voix sur 6", "Architecture all-in / combo McDo",
          "Avoir des combos efficaces, c'est quelque chose qui pourrait être pertinent.",
          "Convergence rare où Ops, CFO, COO, Marketing et GM cross-parcs formulent l'idée indépendamment. Référence fast-food citée 4 fois."),
        convQuote("4 voix sur 6", "Pricing événementiel",
          "Aux moments événementiels, l'élasticité prix dévie complètement.",
          "Halloween 2025 a prouvé l'appétence événementielle — prix INCHANGÉ. La WTP événementielle reste à mesurer. Vincent positionne le calendrier comme levier #1."),
        convQuote("2 voix sur 6", "Prudence stratégique",
          "On a une recette qui fonctionne. Je suis plutôt enclin à le garder.",
          "Marin et Patrice expriment une retenue explicite. Lecture : pousser sans casser. Bornes prix Phase 2 plafonnées à +15% sur entrées · +25% sur packs.")
      ),
      h("div", { class: "card", style: "margin-top:20px; background:linear-gradient(180deg, var(--cream-deep) 0%, var(--white) 100%);" },
        h("div", { class: "title-sm", style: "color:var(--purple)" }, "RED THREAD TRANSVERSAL"),
        h("p", null, "Les 6 stakeholders sont alignés sur un impératif : tout ce qu'on recommande doit être ", h("b", null, "facilement réplicable"), " sur les futurs Jungle Park (8 ouvertures visées fin 2027)."))
    )
  });

  // ---------- 5 · CHIFFRES CLÉS ----------
  slides.push({
    eyebrow: "01 · Diagnostic",
    title: "Qui vient, qu'achètent-ils, quand",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "01 · Diagnostic chiffré"),
      h("h2", { class: "slide-title" }, "Le business aujourd'hui"),
      h("p", { class: "slide-lede" }, "23 994 transactions analysées · 4 095 clients segmentés · 11 mois d'exploitation."),

      h("div", { class: "kpi-strip", style: "grid-template-columns: repeat(3, 1fr); margin:0 0 18px" },
        kpiCell("74 %", "FEMMES", "85% chez 25-29 ans · 81% chez 30-34 ans"),
        kpiCell("30–39 ans", "PIC DÉMOGRAPHIQUE", "55,5% des clients · 'parent jeunes enfants' confirmé"),
        kpiCell("52 %", "ZONE EST-BELGE", "Communes proches · mais multiculturel · 1,9% choisissent DE")
      ),

      h("div", { class: "slide-eyebrow", style: "margin-top:14px" }, "Qu'achètent-ils"),
      h("div", { class: "kpi-strip", style: "grid-template-columns: repeat(3, 1fr); margin:0 0 18px" },
        kpiCell("19,2 %", "PACK TRAMPO AVENTURIERS", "1 seul SKU · 8 006 unités · 134k€"),
        kpiCell("25,4 %", "ANNIVERSAIRES", "969 fêtes · 8,4 enf/fête · panier 183€"),
        kpiCell("0,3 %", "MINI-GOLF", "693 ventes · anomalie économique flagrante")
      ),

      h("div", { class: "slide-eyebrow", style: "margin-top:14px" }, "Quand l'achètent-ils"),
      h("div", { class: "kpi-strip", style: "grid-template-columns: repeat(3, 1fr); margin:0" },
        kpiCell("57 %", "CA SAM + DIM", "= 37% des jours d'ouverture"),
        kpiCell("55 %", "VOLUME 13H-15H", "13 196 tx sur 23 994 · pic horaire non monétisé"),
        kpiCell("12 jours", "SATURÉS >250 TX/J", "4,9% · max 334 tx vendredi 02/01/2026")
      )
    )
  });

  // ---------- 6 · F&B ----------
  slides.push({
    eyebrow: "01 · Diagnostic F&B",
    title: "Le F&B aujourd'hui",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "01 · Diagnostic F&B"),
      h("h2", { class: "slide-title", html: "Le F&amp;B Baloo Bar<br>pèse autant que les entrées" }),
      h("p", { class: "slide-lede" }, "Données ticketing 30 jours observés (19 avril → 18 mai 2026) · 3 009 tickets · à étendre Phase 2."),
      h("div", { class: "slide-cols-3" },
        kpiBig("335 k€", "PROJECTION CA F&B", "Sur base 30j × ~247j ouverture/an · 1 360€/jour"),
        kpiBig("77 %", "RATIO BALOO / ENTRÉES", "F&B = poids quasi équivalent aux entrées"),
        kpiBig("40 %", "BOISSONS DANS LE MIX", "Soft 30% · Alcool 7% · Chaudes 3% · captives marge 61%")
      ),
      h("div", { class: "slide-cols-2", style: "margin-top:20px" },
        h("div", { class: "card" },
          h("div", { class: "card-title" }, "Panier complet par visite"),
          h("div", null,
            kpiInline("12,20 €", "Panier moyen ticket Baloo · médiane 8,50€"),
            kpiInline("1,86 ticket", "Baloo par visite — consommation fractionnée"),
            kpiInline("22,64 €", "Panier F&B par visite — combiné aux entrées 29€ = ~52€")
          )
        ),
        h("div", { class: "card" },
          h("div", { class: "card-title" }, "Concentration horaire"),
          h("div", null,
            kpiInline("46 %", "CA F&B Sam + Dim — lisse partiellement la semaine"),
            kpiInline("81 %", "CA F&B entre 12h et 16h — pic identique aux entrées"),
            kpiInline("Cuisine = goulet", "En peak (Patrice) — limite la monétisation snacks chauds")
          )
        )
      ),
      h("div", { class: "card", style: "margin-top:16px; background:linear-gradient(180deg, var(--cream-deep) 0%, var(--white) 100%)" },
        h("div", { class: "title-sm" }, "LECTURE PRICING F&B"),
        h("p", null, "Le F&B pèse autant que les entrées dans l'économie de la visite. ",
          h("b", { style: "color:var(--navy)" }, "Hausse boissons +8% sur captives = ~10 600€/an"),
          " (vs estimation initiale 4 200€). Cuisine = goulet en peak — limite la monétisation snacks chauds."))
    )
  });

  // ---------- 7 · AS-IS ----------
  slides.push({
    eyebrow: "01 · As-is interne",
    title: "Le pricing existe. Le système qui le pilote, pas.",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "01 · As-is interne"),
      h("h2", { class: "slide-title", html: "Ce que nous avons vu en interne" }),
      h("p", { class: "slide-lede" }, "Acquis solides côté produit. Mais aucun système de pilotage ni capture des leviers de valeur disponibles."),
      h("div", { class: "title-sm", style: "color:var(--emerald); margin-top:12px" }, "ACQUIS — FONDATIONS SOLIDES"),
      h("div", { class: "pain-grid" },
        painItem("Segmentation par taille", "<1m / 1m–1m55 / >1m55 — lecture lisible, alignée sur la réalité des activités, comprise par les clients dès l'arrivée.", true),
        painItem("Anniversaires : produit installé", "Bronze 19,50€ → Gold 26,50€. 969 fêtes / 11 mois. Panier moyen 183€. Pas de friction prix sur ce segment.", true),
        painItem("Kiosque Baloo Bar : upsell opérationnel", "Système en place. ~80 SKUs structurés. Potentiel d'optimisation (script, ordre, anchor) inexploité.", true),
        painItem("Demande > offre sur créneaux tendus", "12 jours saturés à >250 tx (max 334). Refus clients samedi PM — indicateur le plus clair d'une marge de manœuvre tarifaire.", true)
      ),
      h("div", { class: "title-sm", style: "color:var(--rose); margin-top:20px" }, "PAIN POINTS — LEVIERS NON CAPTURÉS"),
      h("div", { class: "pain-grid" },
        painItem("Rangers à 3€ : produit non défini", "23 106 unités vendues pour 9,7% du CA. Le 3€ reflète l'absence d'activité dédiée, pas la WTP du marché."),
        painItem("Funnel Apex défaillant", "Bugs créneaux invisibles, combos non valorisés, F&B sur système séparé (Restomax). Friction unanimement identifiée."),
        painItem("Eat & Play : bundle qui ne décolle pas", "Lancé Mer. midi + Ven. soir avec parent gratuit. Volume résiduel — n'apparaît pas dans le top 20 SKUs."),
        painItem("Mini-Golf : anomalie économique flagrante", "693 ventes en 11 mois = 0,3% du CA. Pas une question de prix mais d'invisibilité (2e étage, code d'accès)."),
        painItem("Règle des 3h non appliquée", "Dépassements ~30 min/groupe non facturés ni contrôlés. Bracelet de contrôle jamais opérationnalisé."),
        painItem("Aucun différentiel online vs sur place", "Panier online 27,4€ vs SP 27,8€ (quasi identique). Différentiel existe seulement sur add-ons (mini-golf, trampoline).")
      )
    )
  });

  // ---------- 8 · BENCHMARK ----------
  slides.push({
    eyebrow: "01 · Benchmark",
    title: "Positionnement marché",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "01 · Benchmark"),
      h("h2", { class: "slide-title", html: "Bien positionné en facial.<br><em>Sous-monétise les leviers annexes.</em>" }),
      h("p", { class: "slide-lede" }, "Zone élargie BE + Nord FR + Aix-la-Chapelle (~45 min) + Center Parcs Vielsalm · Prix publics mai 2026."),
      h("div", { class: "card", style: "padding:14px; overflow-x:auto" },
        benchTable())
    )
  });

  // ---------- 9 · CONVICTION ----------
  slides.push({
    eyebrow: "01 · Conviction",
    title: "Notre conviction centrale",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "01 · Conviction"),
      h("h2", { class: "slide-title", html: "Ce que les entretiens, les chiffres<br>et le benchmark nous disent ensemble" }),

      h("div", { class: "conviction-block" },
        h("div", { class: "label" }, "Notre conviction"),
        h("div", { class: "text", html: "Jungle Park n'a pas de problème d'attractivité.<br><em>Il a un problème de capture de valeur.</em>" })
      ),
      h("div", { class: "slide-cols-3" },
        convAxis("Demande", "La demande est forte",
          "57% du CA sur Sam + Dim (37% des jours) · 12 jours saturés >250 tx · refus clients · Anniversaires 25% CA · 969 fêtes · WTP 4-5★"),
        convAxis("Prix", "Mais le pricing ne suit pas",
          "Aucune variation par jour, créneau, météo · Pas de différentiel online / sur place sur entrées · Test Carnaval ponctuel · aucune grille structurée"),
        convAxis("Système", "Le système n'existe pas",
          "Pas de gouvernance pricing centralisée · Incentive gérant sur CA, pas marge nette · Apex + RestoMax non liés → panier complet invisible")
      ),
      h("p", { style: "margin-top:30px; font-size:18px; color:var(--purple); font-style:italic; text-align:center; font-family:'Fraunces', serif" },
        "→ Mission Phase 2 · Construire le système de pricing piloté, structuré et réplicable — pas changer le produit.")
    )
  });

  // ---------- 10 · CARTE 15 OPPORTUNITÉS ----------
  slides.push({
    eyebrow: "02 · Opportunités",
    title: "Carte des 15 leviers",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "02 · Opportunités"),
      h("h2", { class: "slide-title", html: "15 leviers chiffrables<br>structurés en 3 familles" }),
      h("p", { class: "slide-lede" }, "Présélection Verdeen · 5 leviers prioritaires = potentiel 156-243 k€/an chiffrable + 7 leviers à quantifier Phase 2."),
      buildOppRecap()
    )
  });

  // ---------- 10b · BEST PRACTICES PAR LEVIER ----------
  slides.push({
    eyebrow: "02 · Benchmark · Best practices",
    title: "Pour chaque levier, un acteur qui l'a fait",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "02 · Benchmark · Best practices"),
      h("h2", { class: "slide-title" }, "Pour chaque levier, un acteur qui l'a fait"),
      h("p", { class: "slide-lede" }, "Meilleures pratiques sectorielles — un exemple par levier. Chaque levier identifié fonctionne déjà à grande échelle."),
      h("div", { class: "card", style: "padding:14px; overflow-x:auto" }, buildBestPracticesTable()),
      h("p", { class: "cite-source", style: "margin-top:14px" }, "Sources : sites publics mai 2026 · Verdeen Strategy & Analytics")
    )
  });

  // ---------- 10c · WALIBI & DISNEY DEEP-DIVE ----------
  slides.push({
    eyebrow: "02 · Benchmark · Deep dive",
    title: "Ce que Walibi et Disney font sur nos leviers",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "02 · Benchmark · Deep dive"),
      h("h2", { class: "slide-title" }, "Ce que Walibi et Disney font<br>sur nos leviers"),
      h("p", { class: "slide-lede" }, "Analyse croisée par levier — et ce que JP peut en tirer."),
      h("div", { class: "card", style: "padding:14px; overflow-x:auto" }, buildWalibiDisneyTable()),
      h("div", { class: "card", style: "margin-top:18px; background:linear-gradient(180deg, var(--periwinkle) 0%, var(--white) 100%); border-color:var(--purple-light)" },
        h("div", { class: "title-sm", style: "color:var(--purple)" }, "LECTURE VERDEEN"),
        h("p", null,
          "JP n'a pas vocation à devenir Walibi ou Disney. Mais ces acteurs prouvent que ",
          h("b", { style: "color:var(--navy)" }, "chaque levier identifié fonctionne à grande échelle"),
          ". Notre mission : adapter au format « sortie cinéma » de JP (budget 35€ famille, impulse, pas planifié).")
      )
    )
  });

  // ---------- 11 · DEEP-DIVE 1.5 ----------
  slides.push({
    eyebrow: "02 · Deep-dive",
    title: "Levier 1.5 — Variabilité prix par capacité, créneau, canal",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "02 · Deep-dive · Convergence 5/5"),
      h("h2", { class: "slide-title" }, "Levier 1.5 · Variabilité prix"),
      h("p", { class: "slide-lede" }, "Fusion des leviers 1.5 (hausse Aventuriers) + 1.1 (peak weekends) + 1.13 (online vs sur place) en un seul levier structurant."),
      h("div", { class: "card" },
        h("div", { class: "title-sm" }, "CE QU'ON OBSERVE"),
        h("ul", null,
          h("li", null, "Aujourd'hui : prix uniforme 14,50€ Aventurier 7j/7 — aucune variabilité par jour, créneau, canal."),
          h("li", null, "57% du CA sur Sam+Dim (37% des jours d'ouverture) — concentration extrême non monétisée."),
          h("li", null, "55% du volume sur 13h-15h (13 196 tx sur 23 994 totaux) — pic horaire non monétisé."),
          h("li", null, "12 jours saturés à >250 tx/an avec refus aux portes — sous-pricing structurel des créneaux peak."),
          h("li", null, "Test Carnaval 2026 (S2 +2,50€) : volume S2 < S1 mais météo confondue — élasticité NON tranchée.")
        )
      ),
      h("div", { class: "title-sm", style: "margin-top:20px" }, "ARCHITECTURE — 3 DIMENSIONS DE VARIATION"),
      h("div", { class: "slide-cols-3" },
        axisCard("JOUR", "Peak WE / Vacances", "+1 à +2€ Sam PM, Dim, vacances scolaires (peak structurel)"),
        axisCard("CRÉNEAU", "Pic 13h–15h", "Tarif majoré sur le pic horaire — 55% du volume sur 3h"),
        axisCard("CANAL", "Online vs SP", "Différentiel -1€ online — early booking weekend, capacity-based")
      ),
      h("div", { class: "slide-cols-2", style: "margin-top:20px" },
        h("div", { class: "card", style: "background:linear-gradient(180deg, rgba(16,185,129,0.08) 0%, var(--white) 100%); border-color:rgba(16,185,129,0.3)" },
          h("div", { class: "title-sm", style: "color:var(--emerald)" }, "QUANTIFICATION"),
          h("p", null, h("b", null, "Peak WE/vacances :"), " 48 sam × 300 vis × +2€ = 28 800€ + dim saturés (~40) + vacances (~30 j) → ", h("b", { style: "color:var(--navy)" }, "40-70 k€/an")),
          h("p", null, h("b", null, "Pic horaire + canal :"), " calibrage Phase 2 → ", h("b", { style: "color:var(--navy)" }, "15-20 k€/an"))
        ),
        h("div", { class: "card", style: "background:var(--navy); color:var(--white)" },
          h("div", { class: "title-sm", style: "color:var(--purple-light)" }, "SCORE COMPOSITE VERDEEN"),
          h("div", { style: "font-family:'Fraunces',serif; font-size:48px; font-weight:500; letter-spacing:-0.02em; line-height:1; margin:8px 0" }, "14 / 15"),
          h("p", { style: "color:rgba(255,255,255,0.8); font-size:13px" }, "Impact 5 · Facilité 5 · Risque (inversé) 4 — GO sur dimension JOUR dès 27 mai · WTP Phase 2 sur CRÉNEAU + CANAL.")
        )
      )
    )
  });

  // ---------- 12 · ATELIER 1 INTRO ----------
  slides.push({
    eyebrow: "03 · Atelier 1",
    title: "Priorisation collective · Impact × Facilité",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "Atelier 1 · 22 minutes"),
      h("h2", { class: "slide-title", html: "Vote individuel anonyme<br>puis discussion structurée" }),
      h("p", { class: "slide-lede" }, "Chaque participant ouvre l'app sur son téléphone, vote silencieusement chaque levier sur 2 axes : Impact (1-5) et Facilité (1-5)."),
      h("div", { class: "card", style: "padding:0; overflow:hidden" },
        timelineDark("2 min", "Explication", "Ouverture de l'app sur smartphone. Chaque participant voit les 15 leviers présélectionnés. Tap sur un levier pour voir sa fiche."),
        timelineDark("5 min", "Vote silencieux", "Personne ne parle. Chaque participant score chaque levier sur 2 axes : impact (1-5), facilité (1-5). Vote anonyme. Timer projeté."),
        timelineDark("2 min", "Projection consolidée", "La matrice 2×2 consolidée apparaît à l'écran : moyenne pondérée des votes + halo de dispersion entre participants."),
        timelineDark("13 min", "Discussion structurée", "On part des leviers à plus forte dispersion entre vous — c'est là que la valeur de la discussion se crée. Verdeen anime et capture les arguments clés.")
      ),
      h("p", { style: "margin-top:24px; text-align:center; color:var(--purple); font-family:'Fraunces',serif; font-style:italic; font-size:17px" },
        "→ Ouvrez l'app sur votre téléphone — onglet 🎯 Opportunités")
    )
  });

  // ---------- 13 · ATELIER 2 INTRO ----------
  slides.push({
    eyebrow: "04 · Atelier 2",
    title: "Arbitrage · GO / WTP / PARK",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "Atelier 2 · 18 minutes"),
      h("h2", { class: "slide-title", html: "4 catégories pour éviter<br>le faux GO direct" }),
      h("p", { class: "slide-lede" }, "Pour chaque levier priorisé, arbitrage en 4 options. Évite le faux GO direct sur des leviers qui exigent calibrage WTP."),
      h("div", { class: "slide-cols-2" },
        arbCat("🟢", "GO IMMÉDIAT", "D'ici 2 semaines", "Action décidée en séance — déployable sans WTP préalable. Owner Unibox + owner Verdeen + deadline en CR du 25 mai. Ex : fix wording funnel · bascule comm « journée illimitée »."),
        arbCat("🟡", "GO POST-WTP", "Décidé maintenant, exécuté post-WTP", "Direction validée en séance, le calibrage exact (prix, composition) sort de l'enquête WTP. Ex : hausse Aventuriers · bundle parent+enfant · re-pricing Silver decoy."),
        arbCat("🔵", "WTP PURE", "Mesure Phase 2 d'abord", "Levier dont la pertinence elle-même reste à confirmer par les données terrain. Ex : élasticité mid-saison · pass parent annuel · segment groupes B2B."),
        arbCat("⚫", "PARK", "Revue post-CODIR (26 juin)", "Hors périmètre court terme. Reste cartographié dans le Playbook. Ex : pricing local vs national · couplage S'Pace · refonte Apex complète.")
      )
    )
  });

  // ---------- 13b · CE QUE LA PHASE 2 VA NOUS APPRENDRE ----------
  slides.push({
    eyebrow: "05 · Phase 2",
    title: "Ce que la Phase 2 doit nous apprendre",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "05 · Phase 2 · Apprentissages"),
      h("h2", { class: "slide-title" }, "Ce que la Phase 2<br>doit nous apprendre"),
      h("p", { class: "slide-lede" }, "Focus sur les 5 leviers prioritaires · Question business → Segment → Méthode → Décision Gate #2."),
      h("div", { class: "card", style: "padding:14px; overflow-x:auto" }, buildPhase2Table()),
      h("div", { class: "card", style: "margin-top:18px; background:linear-gradient(180deg, var(--periwinkle) 0%, var(--white) 100%); border-color:var(--purple-light)" },
        h("div", { class: "title-sm", style: "color:var(--purple)" }, "GATE #2 — 12 JUIN 2026"),
        h("p", null,
          "Sortie : ",
          h("b", { style: "color:var(--navy)" }, "prix cible par levier ± 0,50€"),
          " + architecture pricing dynamique + composition bundle + re-pricing anniversaires. Leviers non priorisés (Phase 2 long-tail) intègrent Wave 4-5 + analyse data."))
    )
  });

  // ---------- 14 · PHASE 2 ENQUÊTE ----------
  slides.push({
    eyebrow: "05 · Phase 2",
    title: "Plan d'enquête WTP",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "05 · Phase 2"),
      h("h2", { class: "slide-title", html: "Plan d'enquête WTP<br>· 5 vagues fieldwork" }),
      h("p", { class: "slide-lede" }, "Wave 1 démarre mercredi 27 mai · ~275 répondants visés (capacité max 355) · plancher minimal 120 répondants."),

      h("div", { class: "title-sm" }, "POPULATIONS À APPROCHER"),
      h("div", { class: "slide-cols-3" },
        popCard("PEAK", "Mères avec Aventuriers · samedi PM", "74% des clients sont des mères · décisionnaires principales · WTP la plus testable"),
        popCard("OFF-PEAK", "Grands-parents · mercredi", "Hypothèse mercredi : qui amène les enfants ? À valider."),
        popCard("OFF-PEAK", "Parents seuls · vendredi soir", "Hypothèse vendredi sous-rempli : parents séparés ?"),
        popCard("SEGMENT", "Visiteurs germanophones (quota ≥20)", "52% des clients viennent de communes DE · questionnaire traduit"),
        popCard("ANNIV", "Parents organisateurs", "Sample 30 répondants · discrete choice Bronze/Silver/Gold/Gold+"),
        popCard("GROUPES", "Référents groupes (CE, scolaires)", "Approche dédiée hors in-park · email + entretien tel.")
      ),

      h("div", { class: "title-sm", style: "margin-top:20px" }, "MÉTHODE"),
      h("div", { class: "slide-cols-3" },
        methodCard("Van Westendorp + Gabor-Granger", "Mesure du seuil de prix par segment. Conjointly v1. Tablette in-park. 4-6 min/répondant."),
        methodCard("Discrete choice / MaxDiff", "Composition optimale des bundles. Tester 4-5 configurations vs achat à la carte."),
        methodCard("Pricing événementiel", "Analyse historique Halloween + test événement été 2026 (1 weekend).")
      )
    )
  });

  // ---------- 15 · 5 VALIDATIONS ----------
  slides.push({
    eyebrow: "05 · Engagements",
    title: "5 validations spécifiques d'Unibox",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "05 · Engagements Unibox"),
      h("h2", { class: "slide-title", html: "5 validations pour démarrer<br>Wave 1 le 27 mai" }),
      h("p", { class: "slide-lede" }, "Owners nominatifs · Deadlines fermes · Compte-rendu écrit envoyé lundi 25 mai."),
      h("div", { class: "card" },
        validation("PRIX", "Calibration des prix testés", "Confirmer les 4 ancres prix pour chaque levier WTP : Aventuriers 14/15,50/17/19€ · Explorateurs 7/9/10,50/12€ · Anniversaires 19,50/24/27/30€ · Pass parent 14/19/25/35€.", "Owner : Vincent + Patrice · Lundi 25 mai"),
        validation("PACKS", "Composition des bundles à tester", "Valider les 4-5 compositions du MaxDiff : entrée seule / +boisson / +snack / all-in / +mini-golf. Et les inclusions Bronze/Silver/Gold/Gold+ à départager.", "Owner : Vincent · Lundi 25 mai"),
        validation("CIBLES", "Volume de répondants in-park", "Engagement sur 120 questionnaires longs en plancher (cible 200 sur 5 vagues). Tablettes + emplacement à confirmer.", "Owner : Patrice + Gaëtan · Vendredi 24 mai"),
        validation("EMAIL", "Volume email post-fieldwork", "Envoi questionnaire court à la base CRM Unibox (4 095 clients nommés) après fin du fieldwork. Cible : 200-400 réponses additionnelles.", "Owner : Vincent · Vendredi 13 juin"),
        validation("DATA", "Re-export Apex avec champs manquants", "Booking-window · client_id consolidé Apex↔Restomax · ventilation entrées par catégorie. Conditionne l'analyse panier complet et le levier 1.13.", "Owner : Vincent + IT Apex · Vendredi 30 mai")
      )
    )
  });

  // ---------- 16 · CLOSING ----------
  slides.push({
    eyebrow: "06 · Closing",
    title: "Merci · Prochaines étapes",
    build: () => h("div", null,
      h("div", { class: "slide-eyebrow" }, "06 · Closing"),
      h("h2", { class: "slide-title", html: "Trois étapes jusqu'au<br>Gate #2 du 12 juin" }),
      h("div", { class: "slide-cols-3", style: "margin-top:30px" },
        nextStep("Lun 25 mai", "Compte-rendu Gate #1", "Verdeen envoie le CR formel des décisions et engagements pris ce matin. 1 ligne = 1 owner + 1 deadline."),
        nextStep("Mer 27 mai → Mer 10 juin", "Phase 2 — Fieldwork", "5 vagues d'enquête WTP in-park · ~275 répondants visés · Conjointly v1 · Tablette in-park · 4-6 min/répondant."),
        nextStep("12 juin", "Gate #2 — Décisions", "Prix cible par levier ± 0,50€ + architecture pricing dynamique + composition bundle + re-pricing anniversaires.")
      ),
      h("div", { class: "conviction-block", style: "margin-top:36px" },
        h("div", { class: "label" }, "Ce qui se joue"),
        h("div", { class: "text", html: "Un système de pricing piloté, structuré et réplicable —<br><em>la fondation des 8 ouvertures Jungle Park visées d'ici fin 2027.</em>" })
      )
    )
  });

  // ============================================================
  //  HELPERS — composants visuels
  // ============================================================

  function kpiBig(num, lbl, desc) {
    return h("div", { class: "big-stat" },
      h("div", { class: "num" }, num),
      h("div", { class: "lbl" }, lbl),
      desc && h("div", { class: "desc" }, desc));
  }

  function kpiCell(num, lbl, desc) {
    return h("div", { class: "kpi" },
      h("div", { class: "kpi-label" }, lbl),
      h("div", { class: "kpi-value" }, num),
      desc && h("div", { class: "kpi-sub" }, desc));
  }

  function kpiInline(num, txt) {
    return h("div", { style: "display:flex; gap:14px; padding:8px 0; border-bottom:1px solid var(--periwinkle); align-items:baseline" },
      h("div", { style: "font-family:'Fraunces',serif; font-weight:500; font-size:22px; color:var(--navy); letter-spacing:-0.02em; min-width:120px" }, num),
      h("div", { style: "font-size:13px; color:var(--ink-soft); line-height:1.45" }, txt));
  }

  function timeline(time, dur, ti, desc) {
    return h("div", { class: "timeline-row" },
      h("div", { class: "time" }, time),
      h("div", { class: "dur" }, dur),
      h("div", { class: "what" },
        h("div", { class: "ti" }, ti),
        h("div", { class: "desc" }, desc)));
  }

  function timelineDark(dur, ti, desc) {
    return h("div", { style: "display:grid; grid-template-columns:80px 1fr; gap:18px; padding:18px 22px; border-bottom:1px solid var(--periwinkle); align-items:start" },
      h("div", { style: "font-family:'JetBrains Mono',monospace; font-size:13px; color:var(--purple); font-weight:600" }, dur),
      h("div", null,
        h("div", { style: "font-family:'Fraunces',serif; font-weight:600; font-size:17px; color:var(--navy); margin-bottom:4px; letter-spacing:-0.01em" }, ti),
        h("div", { style: "font-size:13px; color:var(--ink-soft); line-height:1.55" }, desc)));
  }

  function objCard(num, eyebrow, ti, desc) {
    return h("div", { class: "card", style: "height:100%" },
      h("div", { style: "font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--grey); margin-bottom:6px" }, num),
      h("div", { style: "font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--purple); margin-bottom:10px" }, eyebrow),
      h("div", { style: "font-family:'Fraunces',serif; font-weight:600; font-size:19px; color:var(--navy); margin-bottom:10px; letter-spacing:-0.01em" }, ti),
      h("div", { style: "font-size:13px; color:var(--ink-soft); line-height:1.55" }, desc));
  }

  function convQuote(voices, verb, quote, hypo) {
    return h("div", { class: "quote-card" },
      h("div", { class: "voices" }, voices),
      h("div", { class: "verb" }, verb),
      h("blockquote", null, "« " + quote + " »"),
      h("div", { class: "hypo" }, h("b", null, "→ Hypothèse testable · "), hypo));
  }

  function convAxis(label, ti, body) {
    return h("div", { class: "conv-card" },
      h("div", { class: "head" }, label),
      h("h4", null, ti),
      h("div", { class: "body" }, body));
  }

  function painItem(ti, desc, win) {
    return h("div", { class: "pain-item" + (win ? " win" : "") },
      h("div", { class: "ti" }, ti),
      h("div", { class: "desc" }, desc));
  }

  function arbCat(emoji, lbl, sub, body) {
    return h("div", { class: "card", style: "height:100%; padding:22px" },
      h("div", { style: "display:flex; align-items:center; gap:10px; margin-bottom:10px" },
        h("div", { style: "font-size:28px; line-height:1" }, emoji),
        h("div", null,
          h("div", { style: "font-family:'JetBrains Mono',monospace; font-weight:700; color:var(--navy); font-size:13px; letter-spacing:0.04em" }, lbl),
          h("div", { style: "font-size:11.5px; color:var(--ink-soft); font-style:italic" }, sub))),
      h("div", { style: "font-size:13.5px; color:var(--ink-soft); line-height:1.55" }, body));
  }

  function axisCard(label, ti, body) {
    return h("div", { class: "card" },
      h("div", { style: "font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--purple); font-weight:700; letter-spacing:0.08em; margin-bottom:8px" }, label),
      h("div", { style: "font-family:'Fraunces',serif; font-weight:600; color:var(--navy); margin-bottom:8px; font-size:16px; letter-spacing:-0.01em" }, ti),
      h("div", { style: "font-size:13px; color:var(--ink-soft); line-height:1.5" }, body));
  }

  function popCard(label, ti, body) {
    return h("div", { class: "card", style: "padding:18px" },
      h("div", { style: "display:inline-block; background:var(--periwinkle); color:var(--navy); padding:3px 9px; border-radius:99px; font-size:10px; font-weight:700; letter-spacing:0.06em; margin-bottom:10px" }, label),
      h("div", { style: "font-family:'Fraunces',serif; font-weight:600; font-size:15px; color:var(--navy); margin-bottom:6px; line-height:1.3; letter-spacing:-0.01em" }, ti),
      h("div", { style: "font-size:12.5px; color:var(--ink-soft); line-height:1.5" }, body));
  }

  function methodCard(ti, body) {
    return h("div", { class: "card" },
      h("div", { style: "font-family:'Fraunces',serif; font-weight:600; font-size:16px; color:var(--navy); margin-bottom:8px; letter-spacing:-0.01em" }, ti),
      h("div", { style: "font-size:13px; color:var(--ink-soft); line-height:1.55" }, body));
  }

  function validation(label, ti, desc, meta) {
    return h("div", { class: "val-row" },
      h("div", { class: "vt" }, label),
      h("div", { class: "vc" },
        h("div", { class: "ti" }, ti),
        h("div", { class: "desc" }, desc),
        h("div", { class: "meta" }, "⏱ " + meta)));
  }

  function nextStep(when, ti, desc) {
    return h("div", { class: "card", style: "height:100%" },
      h("div", { style: "font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--purple); font-weight:600; letter-spacing:0.06em; margin-bottom:8px" }, when),
      h("div", { style: "font-family:'Fraunces',serif; font-weight:600; font-size:18px; color:var(--navy); margin-bottom:10px; letter-spacing:-0.01em" }, ti),
      h("div", { style: "font-size:13px; color:var(--ink-soft); line-height:1.55" }, desc));
  }

  function benchTable() {
    const rows = [
      { name: "JUNGLE PARK", type: "Indoor aventure", enf: "14,50€", par: "3€", dur: "3h", fam: "35€", anniv: "19,50–26,50€", park: "Gratuit", dyn: "✗", on: "✗", abo: "✗", note: "Bien positionné en facial. Sous-monétise les leviers annexes." },
      { name: "Center Parcs Vielsalm", type: "Resort", enf: "20–26€", par: "25–32€", dur: "Journée", fam: "90–116€", anniv: "Sur dde", park: "Payant", dyn: "✓", on: "✓", abo: "✗", note: "Best-in-class yield. Peak/off-peak après 17h. JP 3× moins cher famille." },
      { name: "Plopsa Indoor Hasselt", type: "Indoor IP", enf: "22–32€", par: "22–32€", dur: "Journée", fam: "88–128€", anniv: "Sur dde", park: "Gratuit", dyn: "✓", on: "✓ −30%", abo: "✓ Multi", note: "Référence best-in-class. 3 leviers JP n'a pas." },
      { name: "Kinderstadt Heerlen", type: "Indoor", enf: "14€", par: "14€", dur: "Journée", fam: "56€", anniv: "N/A", park: "2€", dyn: "✗", on: "Deals −32%", abo: "✗", note: "12 000m² (×4,8 vs JP). Flat all-ages. BYO food." }
    ];
    const tbl = h("table", { class: "bench-table" });
    const headRow = h("tr", null);
    ["Concurrent", "Type", "Enf.", "Parent", "Durée", "Fam. 2A+2E", "Anniv.", "Park.", "Dyn.", "Online", "Abo"].forEach(t =>
      headRow.appendChild(h("th", null, t)));
    tbl.appendChild(headRow);
    rows.forEach(r => {
      const tr = h("tr", { class: r.name === "JUNGLE PARK" ? "hl" : "" });
      [r.name, r.type, r.enf, r.par, r.dur, r.fam, r.anniv, r.park, r.dyn, r.on, r.abo].forEach(v => {
        let cls = "";
        if (v === "✓") cls = "yes";
        else if (v === "✗") cls = "no";
        tr.appendChild(h("td", { class: cls }, v));
      });
      tbl.appendChild(tr);
    });
    return tbl;
  }

  function buildBestPracticesTable() {
    const rows = [
      ["1.5", "Variabilité prix", "Plopsa", "Ticket daté dès 24€ vs non daté 32€ (Indoor Hasselt). Plopsaland De Panne dès 38€ daté vs 51€ guichet."],
      ["1.1", "Peak pricing", "Center Parcs", "Tarif after-17h réduit pour lisser la demande hors peak. Variable par saison, jour et créneau."],
      ["1.3", "Calendrier événementiel", "Europa-Park", "Billet adulte de 67€ (basse saison) à 76€ (haute saison) en 2026, +10€ au guichet vs en ligne. Halloween (Traumatica) = billet séparé dès 33€."],
      ["1.6", "Upsell dynamique", "easyJet", "Dernières places = seul le tarif Flexi disponible. Architecture de choix réduite avec le remplissage."],
      ["1.2", "Bundle all-in", "McDonald's", "Le menu (bundle entrée + boisson + accomp.) représente ~70% des commandes vs à la carte."],
      ["1.10", "Architecture decoy", "Apple", "iPhone 3 tiers (bon / meilleur / premium) avec le tier milieu calibré comme decoy vers le haut."],
      ["1.13", "Différentiel online", "Plopsa / Europa", "Plopsa : écart 8-13€ entre ticket daté online et guichet. Europa-Park : +10€ systématique sur place."],
      ["1.4", "Monétisation temps", "Plopsa / Center Parcs", "Vendent à la journée. Perception « illimitée » = valeur perçue supérieure. JP vend 3h."],
      ["1.8", "Parking", "Walibi / Kinepolis", "Walibi : 13€/voiture/jour. Kinepolis : parking validé en caisse (tarif réduit client, plein tarif non-client)."],
      ["1.14", "Merchandising", "Disney", "Sortie obligatoire par la boutique + photo souvenir opt-out. Merch = 30-40% du CA total."],
      ["3.3", "Abonnement", "Plopsa", "Pass multi-parcs 3 paliers (Park / Swim / Premium) dès 11,50€/mois. 50% de réduction dans 70+ parcs partenaires."],
      ["2.2", "Pass parent", "Kinderstadt Heerlen", "Parent paye le même tarif que l'enfant (14€) avec accès complet. Modèle flat all-ages."]
    ];
    const tbl = h("table", { class: "bench-table" });
    const head = h("tr", null,
      h("th", null, "Levier"),
      h("th", null, "Sujet"),
      h("th", null, "Référence"),
      h("th", null, "Meilleure pratique observée"));
    tbl.appendChild(head);
    rows.forEach(r => {
      const tr = h("tr", null);
      r.forEach((v, i) => {
        if (i === 0) tr.appendChild(h("td", { style: "font-family:'JetBrains Mono',monospace; color:var(--purple); font-weight:600; white-space:nowrap" }, v));
        else if (i === 2) tr.appendChild(h("td", { style: "font-family:'Fraunces',serif; color:var(--navy); font-weight:600" }, v));
        else tr.appendChild(h("td", null, v));
      });
      tbl.appendChild(tr);
    });
    return tbl;
  }

  function buildWalibiDisneyTable() {
    const rows = [
      ["Variabilité prix",
        "4 périodes tarifaires en 2026. Ticket daté dès 29€ (early bird basse saison) vs 56€ non daté guichet. Écart ~27€ entre tarif plancher et plein tarif.",
        "Revenue management quotidien — prix change chaque jour selon demande prédictive. Écart jusqu'à 2× entre off-peak et peak."],
      ["Événementiel",
        "Ibilaw (Halloween) = 2e pic annuel. Nocturnes +4€/billet (10h-22h). Sold out systématique. Walibi Winter en décembre = 3e saison événementielle.",
        "Seasonal overlays (Halloween, Christmas) avec majoration 20-30% des pass journaliers. Merch thématique dédié par événement."],
      ["Bundles",
        "Formules groupe dès 44€ (≥10 pers.). Offres F&B dans les restaurants du parc. Pass combine Walibi + Aqualibi.",
        "Disney Dining Plan = bundle repas prépayé. Capture 40%+ du budget F&B avant la visite. Magic Tickets combine hébergement + entrée + F&B."],
      ["Parking",
        "Parking payant 13€/voiture/jour (standard). Aucune gratuité. Inclus dans certains pass premium.",
        "Parking payant 25-30$ (standard) / 50$+ (preferred). Inclus dans certains pass annuels uniquement."],
      ["Merchandising",
        "Boutiques dans le parc + photo on-ride. ~15-20% du CA hors entrées.",
        "Sortie obligatoire par boutique. Photo souvenir opt-out. Merch = 30-40% du CA total."],
      ["Abonnement",
        "5 tiers de pass annuels : Walibi Pass 155€ → Diamond 730€. Add-ons parking, boisson, FastLane. Fidélisation + cash upfront.",
        "Annual Pass à 3-4 tiers. Blockout dates sur tiers inférieurs = outil yield. Tier le plus cher = zéro restriction."]
    ];
    const tbl = h("table", { class: "bench-table" });
    const head = h("tr", null,
      h("th", { style: "width:130px" }, "Levier"),
      h("th", null, "Walibi Belgium"),
      h("th", null, "Walt Disney Parks"));
    tbl.appendChild(head);
    rows.forEach(r => {
      const tr = h("tr", null);
      tr.appendChild(h("td", { style: "font-family:'Fraunces',serif; color:var(--navy); font-weight:600; vertical-align:top" }, r[0]));
      tr.appendChild(h("td", { style: "vertical-align:top" }, r[1]));
      tr.appendChild(h("td", { style: "vertical-align:top" }, r[2]));
      tbl.appendChild(tr);
    });
    return tbl;
  }

  function buildPhase2Table() {
    const rows = [
      ["1.5", "Variabilité prix capacité / créneau / canal",
        "Quel seuil de prix tient sans perte de volume mesurable, par jour, créneau, canal ?",
        "Aventuriers (>1m55) + Explorateurs (<1m). Prix testés : 14/15,50/17/19€ Aventurier · 7/9/10,50/12/14€ Explorateur",
        "Van Westendorp + Gabor-Granger · ~180 répondants · 5 vagues fieldwork",
        "Prix cible par segment ± 0,50€"],
      ["1.3", "Calendrier événementiel",
        "Quelle majoration tient pour Halloween, Saint-Nicolas, fête des mères ? Quel coût marginal max acceptable ?",
        "Tous segments. Test sur événement été 2026 (1 weekend) à prix majoré.",
        "Croisement CA quotidien × calendrier scolaire × événements + test estival comparatif.",
        "Calendrier 2026-2027 + majoration cible/événement"],
      ["1.6", "Upsell dynamique « dernières places »",
        "À partir de quel taux de remplissage les visiteurs acceptent-ils un pack premium ? Quel prix tient sur les 20 dernières places ?",
        "Visiteurs ayant réservé en quasi-saturation. Quota : 30 répondants en peak.",
        "Discrete choice : pack standard 14,50€ vs pack premium 35-50€ all-in. Test technique faisabilité Apex en parallèle.",
        "Architecture pricing dynamique + seuil déclenchement"],
      ["1.2", "Bundle parent+enfant structuré",
        "Quelle composition de bundle maximise conversion et panier moyen ? Quel risque de cannibalisation Baloo Bar ?",
        "Familles avec ≥1 enfant Aventurier. Décisionnaire = mère (74% des clients).",
        "MaxDiff : 4-5 compositions testées. Mesure cannibalisation post-déploiement.",
        "Composition bundle + prix + canaux de mise en avant"],
      ["1.10", "Architecture decoy anniv. + tier Gold+",
        "Quel re-pricing du Silver rend le Gold attractif ? Quelle inclusion Gold+ à 30€ capture le top du marché ?",
        "Parents organisateurs d'anniversaires. Sample : 30 répondants Wave 4.",
        "Discrete choice Bronze/Silver/Gold/Gold+ à différents prix. Mesure du shift de mix.",
        "Re-pricing Silver + composition tier Gold+ + inclusions"]
    ];
    const tbl = h("table", { class: "bench-table" });
    const head = h("tr", null,
      h("th", { style: "width:50px" }, "#"),
      h("th", { style: "width:180px" }, "Levier"),
      h("th", null, "Question business"),
      h("th", null, "Segment cible"),
      h("th", null, "Méthode"),
      h("th", null, "Décision Gate #2"));
    tbl.appendChild(head);
    rows.forEach(r => {
      const tr = h("tr", null);
      tr.appendChild(h("td", { style: "font-family:'JetBrains Mono',monospace; color:var(--purple); font-weight:600" }, r[0]));
      tr.appendChild(h("td", { style: "font-family:'Fraunces',serif; color:var(--navy); font-weight:600; vertical-align:top" }, r[1]));
      tr.appendChild(h("td", { style: "vertical-align:top" }, r[2]));
      tr.appendChild(h("td", { style: "vertical-align:top" }, r[3]));
      tr.appendChild(h("td", { style: "vertical-align:top" }, r[4]));
      tr.appendChild(h("td", { style: "vertical-align:top; font-weight:600; color:var(--navy)" }, r[5]));
      tbl.appendChild(tr);
    });
    return tbl;
  }

  function buildOppRecap() {
    const wrap = h("div", null);
    const families = [
      { key: "convergence", label: "Convergences chiffrables (1.x)", color: "var(--emerald)" },
      { key: "desaccord", label: "Désaccords à arbitrer (2.x)", color: "var(--amber)" }
    ];
    families.forEach(f => {
      wrap.appendChild(h("div", { class: "title-sm", style: `margin-top:18px; color:${f.color}` }, f.label));
      (window.OPPORTUNITIES || []).filter(o => o.family === f.key).forEach(o => {
        wrap.appendChild(h("div", { class: "recap-row" },
          h("div", { class: "num" }, o.ref),
          h("div", null,
            h("div", { class: "ti" }, o.title),
            h("div", { style: "font-size:12px; color:var(--ink-soft); margin-top:2px" }, o.subtitle)),
          h("div", { class: "gain" }, o.gain_range),
          h("div", { class: "sc" }, o.score_verdeen.total + "/15")
        ));
      });
    });
    return wrap;
  }

  // ============================================================
  //  EXPOSE
  // ============================================================
  window.PRESENTATION_SLIDES = slides;
})();
