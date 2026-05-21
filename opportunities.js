// ============================================================
//  GATE #1 — Jungle Park · Les 15 opportunités (deck v6.3)
//  Extrait des fiches annexes + slides synthèse 11-12
// ============================================================

window.OPPORTUNITIES = [
  // ===================== CONVERGENCES (1.x) =====================
  {
    id: "1_5",
    ref: "1.5",
    family: "convergence",
    title: "Variabilité prix par capacité, créneau, canal",
    subtitle: "Fusion 1.5 (hausse Aventuriers) + 1.1 (peak WE) + 1.13 (online vs SP)",
    convergence_label: "CONVERGENCE 5/5",
    gain_range: "55 – 90 k€/an",
    gain_low: 55,
    gain_high: 90,
    outil: "INT",
    owner_unibox: "Vincent + gérant",
    tempo: "Fin mai (post-WTP)",

    description: "Le prix Aventurier (14,50€) a été fixé au lancement sans étude WTP. La concentration extrême du business (57% CA Sam+Dim, 55% volume 13h-15h, 12 jours saturés à >250 tx) n'est pas monétisée. Le Test Carnaval 2026 a appliqué +2,50€ en S2 mais la météo confondue empêche d'isoler l'élasticité prix. Logique 3D : variation par JOUR (peak) + CRÉNEAU (pic horaire) + CANAL (early-booking online vs SP). Effet psychologique : majorer peak rend off-peak plus attractif par contraste.",

    // Synthèse (slide 11-12) — vue rapide
    ce_quon_observe: "Prix 14,50€ fixé sans WTP. Test Carnaval S2 +2,50€ — météo confondante. Patrice : « peut-être surestimé le risque ». Aucune variation 7j/7.",
    ce_quon_deduit: "Marché absorbe 15-16€ sans friction. Logique Explorateurs (10-12€). Conv. 6/6 stakeholders. Effet psycho peak / off-peak.",
    comment_on_valide: "Van Westendorp + Gabor-Granger Phase 2 · ~180 répondants · prix testés 14/15,50/17/19€.",

    // Annex (observé / hypothèse / à tester)
    observe_data: "Pas de variabilité tarifaire 7j/7. 57% CA Sam+Dim. 55% volume 13h-15h. 12 jours saturés >250 tx (dataset Apex 11 mois). Test Carnaval 2026 S2 : +2,50€ appliqué, volume S2 < S1 (météo dégradée co-occurrente).",
    hypothese: "Le marché absorbe 15-16€ sur Aventuriers, 11-12€ sur Explorateurs sans friction (conv. 5/5 stakeholders). Effet psycho : majorer peak valorise off-peak. Différentiel online -1€ améliore prédictibilité capacity-based.",
    a_tester: "Van Westendorp + Gabor-Granger Phase 2 (180 répondants). Test pré/post 4 samedis été 2026 vs comparables 2025. Élasticité mid-saison à isoler.",

    quantification_text: "Peak WE/vacances : 48 sam × 300 vis × +2€ = 28 800€ + dimanches (~40) + vacances (~30 j) → 40-70 k€/an. Pic horaire + canal : calibrage Phase 2 → 15-20 k€/an.",
    quantification_vars: [
      { key: "nb_samedis", label: "Samedis saturés/an", value: 48, min: 0, max: 80, step: 1 },
      { key: "nb_dimanches", label: "Dimanches saturés/an", value: 40, min: 0, max: 80, step: 1 },
      { key: "nb_vacances", label: "Jours vacances/an", value: 30, min: 0, max: 90, step: 1 },
      { key: "visiteurs", label: "Visiteurs/jour peak", value: 300, min: 100, max: 500, step: 10 },
      { key: "hausse", label: "Hausse prix (€)", value: 2, min: 0, max: 5, step: 0.5 }
    ],
    quantification_formula: (v) => (v.nb_samedis + v.nb_dimanches + v.nb_vacances) * v.visiteurs * v.hausse,
    hypotheses_limites: "Test Carnaval 2026 = signal seulement (météo confondue). Élasticité mid-saison non testée. WTP par segment à mesurer Phase 2.",
    validation_data: "✓ Jours saturés confirmés (Apex 11 mois) · ✓ Distribution horaire confirmée sur 23 994 tx · ? Test Carnaval signal météo · ⏳ Élasticité mid-saison Wave 5",
    reco_verdeen: "GO immédiat sur dimension JOUR (peak +1-2€ samedi PM, dim, vacances) dès 27 mai · WTP Phase 2 sur CRÉNEAU + CANAL · PARK extension Aventuriers off-peak.",
    lien_phase2: "Van Westendorp + Gabor-Granger Phase 2 · ~180 répondants · prix testés 14/15,50/17/19€",
    score_verdeen: { impact: 5, facilite: 5, risque: 4, total: 14 }
  },
  {
    id: "1_3",
    ref: "1.3",
    family: "convergence",
    title: "Calendrier événementiel 8-10 / an",
    subtitle: "Halloween 2025 a prouvé l'APPÉTENCE — WTP à tester",
    convergence_label: "CONVERGENCE 4/5",
    gain_range: "30 – 50 k€/an",
    gain_low: 30,
    gain_high: 50,
    outil: "INT",
    owner_unibox: "Vincent + gérant",
    tempo: "Fin mai · brainstorm calendrier 2026-2027",

    description: "Halloween 2025 a été un succès opérationnel (décoration parc, 2 créneaux avec spectacle, créneaux complets) MAIS le PRIX d'entrée n'a pas été majoré. Ce qui est prouvé : l'appétence du marché pour les événements thématiques. Ce qui RESTE à prouver : la WTP événementielle. Calendrier proposé : 8-10 événements/an (Halloween, St-Nicolas, Noël, fête des mères, rentrée, thèmes culturels). Critères : facile à déployer en franchise + coût marginal modéré + upside fort.",

    ce_quon_observe: "Halloween 2025 : prix INCHANGÉ — appétence prouvée, pas la WTP événementielle.",
    ce_quon_deduit: "Événements thématiques génèrent WTP perçue comme légitime. Réplicable franchise.",
    comment_on_valide: "Croisement CA × calendrier scolaire × événements. Test estival 1 weekend majoré.",

    observe_data: "Halloween 2025 : 2 créneaux complets, prix INCHANGÉ, décoration + spectacle. Vincent a positionné le calendrier comme levier #1 en entretien. Plopsa et Center Parcs pratiquent la majoration événementielle.",
    hypothese: "Événements thématiques génèrent une WTP perçue comme légitime (réplicable franchise, coût marginal modéré). 8-10 événements/an × +3€ × ~200 visiteurs jour événementiel = surplus d'entrée + effet F&B + merch.",
    a_tester: "Croiser CA quotidien × calendrier scolaire × événements (Halloween, St-Nicolas, fête des mères). Test estival été 2026 sur 1 weekend à prix majoré +3€ pour valider la WTP événementielle.",

    quantification_text: "Surplus d'entrée : 8-10 évén. × 3-5 j × +3€ × ~200 vis/j événementiel = ~24 000 €/an + effet F&B et merch → 30-50 k€/an.",
    quantification_vars: [
      { key: "nb_events", label: "Événements/an", value: 9, min: 4, max: 15, step: 1 },
      { key: "jours_par_event", label: "Jours par événement", value: 4, min: 1, max: 7, step: 1 },
      { key: "visiteurs_jour", label: "Visiteurs/jour événement", value: 200, min: 100, max: 400, step: 10 },
      { key: "hausse_prix", label: "Majoration prix (€)", value: 3, min: 1, max: 6, step: 0.5 },
      { key: "effet_fb_merch", label: "Effet F&B + merch (k€)", value: 10, min: 0, max: 30, step: 1 }
    ],
    quantification_formula: (v) => v.nb_events * v.jours_par_event * v.visiteurs_jour * v.hausse_prix + v.effet_fb_merch * 1000,
    hypotheses_limites: "WTP événementielle non encore mesurée. Coût marginal événements à chiffrer (décoration, spectacles).",
    validation_data: "✓ Halloween 2025 sold-out à prix inchangé · ✓ Plopsa/Center Parcs majorent les events · ⏳ Test estival 2026 (1 weekend) à prix majoré +3€",
    reco_verdeen: "GO sur calendrier 2026-2027 (8-10 événements identifiés via analyse CA × calendrier) + test estival à +3€ pour valider la WTP événementielle.",
    lien_phase2: "Discrete choice Halloween-type · 180 répondants in-park · ranking attractivité 8-10 thèmes",
    score_verdeen: { impact: 4, facilite: 4, risque: 4, total: 12 }
  },
  {
    id: "1_2",
    ref: "1.2",
    family: "convergence",
    title: "Bundle parent+enfant structuré (22-25€ all-in)",
    subtitle: "Pack Trampo prouve déjà l'appétence (19,2% CA = 1 SKU)",
    convergence_label: "CONVERGENCE 5/5",
    gain_range: "25 – 50 k€/an",
    gain_low: 25,
    gain_high: 50,
    outil: "INT",
    owner_unibox: "Vincent",
    tempo: "Post-WTP (12 juin)",

    description: "Principe économique du bundle : un combo = Σ features × probabilité de consommation. Le client paie l'option, pas l'usage. Tous les clients ne consommeront pas toutes les features — c'est ce delta qui finance le discount perçu. Notre métier : calibrer pour pack perçu généreux ET marge protégée. Le Pack Trampo+entrée (19,2% du CA = 1 seul SKU, 8 006 unités, 134k€) prouve l'appétence. Bundle proposé : entrée Aventurier + boisson + snack à 22-25€ all-in. 3 voix citent McDonald's.",

    ce_quon_observe: "Pack Trampo+entrée = 19,2% du CA déjà. Mères achètent à la carte (boisson+snack séparément).",
    ce_quon_deduit: "Bundle = Σ features × prob. consommation. Client paie l'option, pas l'usage.",
    comment_on_valide: "MaxDiff Phase 2 · 4-5 compositions · strate M4 famille mixte · cannibalisation.",

    observe_data: "Pack Trampo+entrée = 19,2% du CA (8 006 unités, 134k€). Les mères achètent déjà séparément (boisson + snack). Convergence 5/5 sur 'all-in'. Référence McDonald's citée 3 fois indépendamment.",
    hypothese: "Bundle 22-25€ entrée + boisson + snack capture un panier moyen supérieur à l'achat à la carte (3-5€ delta). 30% taux conversion estimé. Risque cannibalisation Baloo Bar à mesurer (mix marges).",
    a_tester: "MaxDiff Phase 2 sur 4-5 compositions (entrée seule / +boisson / all-in / +snack). Strate M4 famille mixte (25 répondants). Mesure cannibalisation 4 semaines post-déploiement. Validation marge unitaire avec Finance.",

    quantification_text: "Bundle 22-25€ all-in × 30% conversion × +4€ delta panier × 23 994 transactions = ~28 000 €/an. Fourchette réaliste 25-50 k€.",
    quantification_vars: [
      { key: "nb_transactions", label: "Transactions/an", value: 23994, min: 15000, max: 35000, step: 500 },
      { key: "taux_conv_pct", label: "Taux conversion bundle (%)", value: 30, min: 5, max: 60, step: 5 },
      { key: "delta_panier", label: "Δ panier vs à la carte (€)", value: 4, min: 1, max: 10, step: 0.5 }
    ],
    quantification_formula: (v) => v.nb_transactions * (v.taux_conv_pct / 100) * v.delta_panier,
    hypotheses_limites: "Risque cannibalisation Baloo Bar (mix marges). Marge unitaire à valider Finance.",
    validation_data: "✓ Pack Trampo = 19,2% CA · ✓ Convergence 5/5 sur 'all-in' · ✓ McDonald's cité 3 fois · ⏳ MaxDiff Phase 2 sur 4-5 compositions · ⏳ Mesure cannibalisation 4 semaines post-déploiement",
    reco_verdeen: "WTP Phase 2 : nécessite design de l'offre + test cannibalisation avant lancement · Pas de quick win sans mesure préalable.",
    lien_phase2: "MaxDiff Phase 2 · 4-5 compositions (entrée seule / +boisson / all-in / +snack) · strate M4 famille mixte · 120 in-park + 200 email",
    score_verdeen: { impact: 4, facilite: 3, risque: 3, total: 10 }
  },
  {
    id: "1_10",
    ref: "1.10",
    family: "convergence",
    title: "Architecture decoy anniv. + tier Gold+ « Temple Perdu »",
    subtitle: "Projet Unibox déjà en cours — valider chiffré, pas proposer",
    convergence_label: "CONVERGENCE 4/6",
    gain_range: "12 – 15 k€/an",
    gain_low: 12,
    gain_high: 15,
    outil: "INT",
    owner_unibox: "Patrice + Vincent",
    tempo: "Calage avec projet en cours",

    description: "Unibox a déjà engagé un projet de 2-3 salles privatives thématisées « Temple Perdu » (~400€ pour 10 enfants = ~40€/enfant). C'est précisément le tier Gold+ identifié dans notre analyse. Notre rôle = VALIDER chiffré : prix optimal, mix attendu, capacité de capture. Un decoy = tier intentionnellement positionné pour rendre un tier supérieur plus attractif par comparaison (asymmetric dominance). Architecture : Bronze 19,50€ inchangé · Silver re-pricé à 24€ avec inclusions limitées (decoy) · Gold 27€ enrichi (deviendrait l'« évident ») · Gold+ Temple Perdu privatif ~40€/enfant.",

    ce_quon_observe: "Mix Bronze 45,5% sur-choisi. Patrice : « salles privatives Temple Perdu » en projet (2-3 salles, ~400€/10 enf).",
    ce_quon_deduit: "Notre rôle = valider chiffré le projet en cours. Re-pricing Silver decoy + Gold+ ~40€ aligné Temple Perdu.",
    comment_on_valide: "MaxDiff inclusions + discrete choice Bronze/Silver/Gold/Gold+ · M1 anniv (20 rép.).",

    observe_data: "Mix actuel Bronze 45,5% / Silver 32,5% / Gold 22% sur 969 fêtes. 87% sam-dim. 8,4 enfants/fête. Anniv = 25,4% CA total. Patrice : projet Temple Perdu en exécution (2-3 salles, ~400€/10 enfants).",
    hypothese: "Re-pricing Silver + Gold+ Temple Perdu = shift de mix. Gold+ à 40€ × ~30% adopt. sur ~250 fêtes/an = ~7,5 k€. Hausse +1€/enfant tous packs (969 × 8,4 × 1€ ≈ 8 k€). Total fourchette inchangée.",
    a_tester: "MaxDiff inclusions (8 attributs) + discrete choice Bronze/Silver/Gold/Gold+ à différents prix · M1 anniversaires (~30 rép. Wave 4 spécifique). Calibrer prix exact Gold+ Temple Perdu (30/35/40/45€).",

    quantification_text: "969 fêtes/an. Hausse +1€/enfant tous packs ≈ 8 000 €/an. Gold+ Temple Perdu ~40€ (30% adopt × ~250 fêtes) ≈ 7 500 €/an. Decoy Silver 24€ : neutre €.",
    quantification_vars: [
      { key: "nb_fetes", label: "Fêtes/an", value: 969, min: 500, max: 1500, step: 10 },
      { key: "enfants_par_fete", label: "Enfants/fête", value: 8.4, min: 5, max: 12, step: 0.1 },
      { key: "hausse_par_enfant", label: "Hausse €/enfant (tous packs)", value: 1, min: 0, max: 3, step: 0.5 },
      { key: "fetes_temple", label: "Fêtes Gold+ Temple Perdu/an", value: 75, min: 0, max: 300, step: 5 },
      { key: "marge_temple", label: "Marge nette/fête Temple (€)", value: 100, min: 50, max: 200, step: 10 }
    ],
    quantification_formula: (v) => (v.nb_fetes * v.enfants_par_fete * v.hausse_par_enfant) + (v.fetes_temple * v.marge_temple),
    hypotheses_limites: "CAPEX salles Temple Perdu hors scope. Sensibilité prix par segment organisateur à mesurer.",
    validation_data: "✓ Mix actuel Bronze 45,5% / Silver 32,5% / Gold 22% sur 969 fêtes · ✓ 87% sam-dim · ✓ Anniv = 25,4% CA · ✓ Projet Temple Perdu en exécution Unibox · ⏳ MaxDiff inclusions + discrete choice Bronze/Silver/Gold/Gold+",
    reco_verdeen: "GO immédiat hausse +1€/enfant tous packs · GO post-WTP repricing Silver decoy + prix Gold+ Temple Perdu · Calage avec calendrier projet Unibox.",
    lien_phase2: "Wave 4 anniv (30 rép.) · discrete choice 4 tiers · prix testés Gold+ 30/35/40/45€",
    score_verdeen: { impact: 4, facilite: 3, risque: 3, total: 10 }
  },
  {
    id: "1_6",
    ref: "1.6",
    family: "convergence",
    title: "Upsell dynamique « dernières places »",
    subtitle: "Logique yield airline · 12 jours saturés non valorisés",
    convergence_label: "CONVERGENCE 3/5",
    gain_range: "~17 k€/an",
    gain_low: 12,
    gain_high: 22,
    outil: "EXT (Apex)",
    owner_unibox: "IT Unibox + Apex",
    tempo: "12 juin (Gate #2)",

    description: "Logique yield management (airline, hôtellerie) : quand le parc dépasse 80% de capacité, les 20 dernières places valent plus que le tarif standard. Architecture : seules les 20 dernières places disponibles en formule all-in premium (~50€ vs 14,50€ standard). L'architecture de choix se réduit avec le remplissage. Idée structurante jamais testée. DEUX INCONNUES à lever : faisabilité technique Apex + WTP terrain.",

    ce_quon_observe: ">80% capacité, seule l'offre standard disponible. Rareté non valorisée.",
    ce_quon_deduit: "20 dernières places = valeur supérieure (logique yield airline). Pack all-in ~50€.",
    comment_on_valide: "Validation technique Apex (tarif conditionnel) + WTP terrain Phase 2.",

    observe_data: "12 jours saturés à >250 tx/an (max 334 tx vendredi 02/01). Refus clients samedi PM observés. À >80% capacité, seule l'offre standard est disponible — rareté non valorisée.",
    hypothese: "Les 20 dernières places ont valeur supérieure (logique yield airline). Pack premium all-in ~50€ capture 50% des acheteurs aux 20 dernières places.",
    a_tester: "Validation technique Apex (faisabilité tarif conditionnel temps réel) + question WTP terrain Phase 2 spécifique. Quantifier nombre exact de jours >90% capacité.",

    quantification_text: "20 places premium × 50€ vs prix standard 14,50€ = delta 35,50€/place. Max théorique : 12 j × 20 × 35,50€ = 8 500€. Extension jours quasi-saturés → ~17 k€/an.",
    quantification_vars: [
      { key: "nb_jours_quasi_satures", label: "Jours quasi-saturés/an", value: 30, min: 12, max: 60, step: 1 },
      { key: "places_premium", label: "Places premium/jour", value: 20, min: 5, max: 50, step: 5 },
      { key: "prix_premium", label: "Prix pack premium (€)", value: 50, min: 25, max: 80, step: 5 },
      { key: "prix_standard", label: "Prix standard (€)", value: 14.5, min: 10, max: 20, step: 0.5 },
      { key: "taux_adoption_pct", label: "Taux adoption (%)", value: 50, min: 10, max: 100, step: 10 }
    ],
    quantification_formula: (v) => v.nb_jours_quasi_satures * v.places_premium * (v.taux_adoption_pct / 100) * (v.prix_premium - v.prix_standard),
    hypotheses_limites: "Faisabilité technique Apex (tarif conditionnel temps réel) NON validée. WTP non testée.",
    validation_data: "✓ 12 jours saturés >250 tx (max 334 tx vendredi 02/01) · ✓ Refus clients samedi PM observés · ⏳ Validation technique Apex · ⏳ WTP terrain Phase 2 (30 rép. peak)",
    reco_verdeen: "WTP Phase 2 + validation technique Apex en parallèle · Pas de quick win sans levée des 2 inconnues.",
    lien_phase2: "Discrete choice : pack standard 14,50€ vs pack premium 35-50€ all-in · 30 répondants peak",
    score_verdeen: { impact: 3, facilite: 2, risque: 3, total: 8 }
  },
  {
    id: "1_4",
    ref: "1.4",
    family: "convergence",
    title: "Monétisation du temps (règle 3 heures)",
    subtitle: "3 options · Option C = outil de yield avec parking (1.8)",
    convergence_label: "CONVERGENCE 3/5",
    gain_range: "~21 k€/an (option B)",
    gain_low: 15,
    gain_high: 25,
    outil: "INT",
    owner_unibox: "Vincent (A) / gérant (B)",
    tempo: "22 mai (A) · 12 juin (B)",

    description: "L'Ops confirme que la majorité reste 3h-3h30, mais les dépassements ne sont ni contrôlés ni facturés. Bracelets/tourniquets jamais opérationnalisés. Concurrents (Plopsa, Center Parcs, Kinderstadt) vendent à la journée — la limite 3h crée un désavantage perceptif. Trois angles : OPTION A · Bascule communication « 3h » → « journée illimitée » (perception, pas de revenu direct). OPTION B · Tarif d'extension peak 4€/h après 3h (~21 k€/an). OPTION C · Yield 3h peak / illimité off-peak (cohérent avec parking 1.8).",

    ce_quon_observe: "3h vendues, dépassements ~30 min/groupe non facturés. Concurrents : journée.",
    ce_quon_deduit: "Opt A : « journée illimitée » (perception). Opt B : tarif extension (peak). Opt C : yield 3h peak / illimité off-peak.",
    comment_on_valide: "Décision marketing immédiate (A). WTP Phase 2 (B). Lien parking (C).",

    observe_data: "3h vendues, dépassements ~30 min/groupe non facturés (déclaration Ops). Durée intraçable dans Apex (pas d'horodatage entrée/sortie). Concurrents (Plopsa, CP, Kinderstadt) = journée.",
    hypothese: "Option A : <5% des visiteurs restent >3h30. Option B : 10% capacité récupérée en peak (très spéculatif). Option C : effet de levier yield combiné avec parking → message cohérent « peak = expérience contrainte, off-peak = expérience généreuse ».",
    a_tester: "Question WTP Phase 2 : acceptabilité tarif d'extension. Évaluation options techniques (bracelet) avec IT Unibox. Test Option C en pilote 1 mois (peak vs off-peak).",

    quantification_text: "Option B (extension peak) : 30 min × 150 groupes/j peak × 48 sam × 10% récup → ~21 k€/an. Option A pas de revenu direct. Option C : multiplicateur synergie avec 1.8 parking.",
    quantification_vars: null,
    hypotheses_limites: "Faisabilité bracelet de contrôle non validée. Durée intraçable dans Apex (pas d'horodatage). Hypothèse 10% récup capacité très spéculative.",
    validation_data: "✓ Dépassements ~30 min/groupe non facturés (déclaration Ops) · ✓ Concurrents = journée · ⏳ Distribution durées réelles (horodatage E/S) · ⏳ WTP terrain tarif extension",
    reco_verdeen: "GO immédiat Option A (bascule comm « journée illimitée ») · Tester Option C en pilote combiné avec parking (1.8) · Option B en WTP Phase 2.",
    lien_phase2: "Question WTP terrain : acceptabilité tarif d'extension · Évaluation faisabilité bracelet avec IT Unibox",
    score_verdeen: { impact: 3, facilite: 3, risque: 3, total: 9 }
  },
  {
    id: "1_8",
    ref: "1.8",
    family: "convergence",
    title: "Parking payant (3 paliers + yield)",
    subtitle: "Modèle référence cinéma · Sujet sensible Victor",
    convergence_label: "CONVERGENCE 5/5",
    gain_range: "72 – 84 k€/an",
    gain_low: 60,
    gain_high: 95,
    outil: "MIXTE",
    owner_unibox: "Gaëtan + appel d'offre",
    tempo: "Été 2026 (barrière côté Unibox)",

    description: "Parking aujourd'hui gratuit, non contrôlé, squatté par non-clients (proximité S'Pace). Référence Kinderstadt = 2€. Approche Verdeen DÉRISQUER en proposant un modèle 3 paliers + outil yield. PALIER 1 · Chaland externe = tarif urbain plein. PALIER 2 · Client JP = tarif réduit modèle cinéma (no-brainer, ticket validé en sortie). PALIER 3 · Anniversaire = OFFERT (upsell premium). Variante yield : gratuité jusqu'à 18h mer/ven pour stimuler off-peak.",

    ce_quon_observe: "Parking gratuit, squatté. Barrière prévue côté Unibox. Réf. Kinderstadt 2€.",
    ce_quon_deduit: "3 paliers : (1) chaland tarif urbain · (2) client JP réduit cinéma · (3) anniv offert. Yield off-peak : gratuit jusqu'à Xh.",
    comment_on_valide: "Comptage voitures 1 sem. + appel d'offre Skidata + WTP terrain Phase 2.",

    observe_data: "Parking gratuit actuellement. Squatté par non-clients (proximité S'Pace). Aucun comptage volume. Référence Kinderstadt = 2€. Victor sensible (challengé par sa famille).",
    hypothese: "Volume hypothétique : ~150 voitures/j peak, ~80 j off-peak, ~300 j/an d'ouverture. Tarif palier 2 = ~2€ moyen. Modèle 3 paliers + référence cinéma dérisque l'acceptabilité client.",
    a_tester: "Comptage voitures 1 semaine type (mer/ven/sam/dim). Appel d'offre 2-3 opérateurs (Skidata). WTP terrain Phase 2 sur acceptabilité des 3 paliers.",

    quantification_text: "Volume hypothétique ~150 voitures/j peak, ~80 j off-peak, ~300 j/an. Tarif palier 2 ≈ 2€ moyen. Brut ~120 000€/an. Net après commission opérateur (30-40% Skidata) → 72-84 k€/an.",
    quantification_vars: [
      { key: "voit_peak", label: "Voitures/jour peak", value: 150, min: 50, max: 300, step: 10 },
      { key: "jours_peak", label: "Jours peak/an", value: 100, min: 50, max: 200, step: 10 },
      { key: "voit_offpeak", label: "Voitures/jour off-peak", value: 80, min: 20, max: 200, step: 10 },
      { key: "jours_offpeak", label: "Jours off-peak/an", value: 200, min: 100, max: 300, step: 10 },
      { key: "tarif_moyen", label: "Tarif moyen (€)", value: 2, min: 1, max: 5, step: 0.5 },
      { key: "commission_pct", label: "Commission opérateur (%)", value: 35, min: 0, max: 50, step: 5 }
    ],
    quantification_formula: (v) => (v.voit_peak * v.jours_peak + v.voit_offpeak * v.jours_offpeak) * v.tarif_moyen * (1 - v.commission_pct / 100),
    hypotheses_limites: "Aucun comptage actuel. Sujet sensible CEO (challengé par sa famille). Modèle 3 paliers à formaliser.",
    validation_data: "✓ Parking gratuit, squatté · ✓ Référence Kinderstadt 2€ · ⏳ Comptage 1 semaine type (mer/ven/sam/dim) · ⏳ Appel d'offre Skidata · ⏳ WTP acceptabilité 3 paliers",
    reco_verdeen: "GO décision modèle opérationnel 22 mai (3 paliers cinéma + outil yield off-peak) · Comptage S3 · Appel d'offre Skidata · Décision finale Gate #2.",
    lien_phase2: "Pas de WTP terrain Phase 2 (hors scope classique). Intégré Playbook D6 comme revenu annexe",
    score_verdeen: { impact: 4, facilite: 2, risque: 4, total: 10 }
  },
  {
    id: "1_14",
    ref: "1.14",
    family: "convergence",
    title: "Merchandising / souvenirs post-visite",
    subtitle: "Quick-win cross-sell sortie · Référence Disney/Plopsa",
    convergence_label: "CONVERGENCE 3/5",
    gain_range: "10 – 25 k€/an",
    gain_low: 10,
    gain_high: 25,
    outil: "INT",
    owner_unibox: "Vincent + fournisseurs Unibox",
    tempo: "Été 2026",

    description: "Jungle Park n'a aucune offre merchandising aujourd'hui (pas de boutique, pas de photo souvenir, pas de peluches ou goodies thématisés). Le levier merch sortie de parc est le panier moyen le plus sous-exploité. Référence Disney : 30-40% du CA total vient du merch (sortie obligatoire boutique, photo souvenir opt-out). Pour JP : présentoir caisse avec 3-5 SKUs (magnet, peluche mascotte, photo souvenir anniversaires). Investissement initial faible (5-10k€ stock + présentoir).",

    ce_quon_observe: "Aucune offre merch (peluches, photo). Unibox a déjà fournisseurs internes.",
    ce_quon_deduit: "Cross-sell sortie + photo souvenir anniv. Présentoir caisse simple.",
    comment_on_valide: "Question terrain visiteurs sortants + benchmark merch.",

    observe_data: "Aucune offre merchandising actuelle. Anniversaires = 25% du CA — moment d'attache émotionnelle évident non capturé. Référence Disney : merch = 30-40% du CA total. Plopsa et Center Parcs ont une offre structurée.",
    hypothese: "Cross-sell facile sortie de parc + photo souvenir anniv. Investissement initial faible (présentoir caisse, pas besoin de boutique). Fourchette indicative secteur : panier merch 2-4€ × 20% conversion × 23 994 tx = 10-20 k€/an.",
    a_tester: "Question terrain Phase 2 : « Auriez-vous acheté un souvenir ? Lequel ? À quel prix ? » aux visiteurs sortants (sample 50). Test in-park été 2026 : présentoir avec 3-5 SKUs sur 4 semaines, mesure conversion réelle.",

    quantification_text: "Panier merch 2-4€/visiteur × 20% conversion × 23 994 tx = 10-20 k€/an. Photo souvenir anniv : 969 fêtes × 5€ × 50% adoption ≈ 2 400 €/an additionnels.",
    quantification_vars: [
      { key: "panier_merch", label: "Panier merch moyen (€)", value: 3, min: 1, max: 8, step: 0.5 },
      { key: "taux_conv_pct", label: "Taux conversion (%)", value: 20, min: 5, max: 50, step: 5 },
      { key: "nb_transactions", label: "Transactions/an", value: 23994, min: 15000, max: 35000, step: 500 },
      { key: "photo_souvenir_par_fete", label: "Photo souvenir/fête (€)", value: 5, min: 0, max: 15, step: 1 },
      { key: "taux_adoption_photo", label: "Adoption photo anniv (%)", value: 50, min: 0, max: 100, step: 10 }
    ],
    quantification_formula: (v) => (v.panier_merch * (v.taux_conv_pct / 100) * v.nb_transactions) + (969 * v.photo_souvenir_par_fete * (v.taux_adoption_photo / 100)),
    hypotheses_limites: "Marge merch à 50% hypothèse standard secteur. Investissement présentoir + stock initial 5-10k€. Risque overstock SKU si pas de test.",
    validation_data: "✓ Aucune offre actuelle · ✓ Anniv = 25% CA (moment émotionnel non capturé) · ✓ Référence Disney 30-40% CA · ⏳ Question terrain visiteurs sortants · ⏳ Test in-park 4 semaines avec 3-5 SKUs",
    reco_verdeen: "GO test rapide été 2026 — présentoir 3-5 SKUs (magnet, peluche, photo) à la caisse · Mesure conversion 4 semaines avant décision boutique.",
    lien_phase2: "Test in-park · benchmark merch 3-4 parcs indoor · WTP visiteurs sortants",
    score_verdeen: { impact: 3, facilite: 3, risque: 2, total: 8 }
  },
  {
    id: "1_7",
    ref: "1.7",
    family: "convergence",
    title: "F&B Baloo Bar : hausse boissons + repositionnement",
    subtitle: "Données Baloo 30j · Cuisine = goulet en peak",
    convergence_label: "CONVERGENCE 4/6",
    gain_range: "~10,6 k€/an + repos.",
    gain_low: 8,
    gain_high: 20,
    outil: "INT",
    owner_unibox: "Vincent + Marketing",
    tempo: "Dès 22 mai (boissons) · Phase 2 (snacks)",

    description: "Données Baloo Bar 30 jours désormais disponibles : F&B pèse ~77% du CA des entrées (vs estimé 34-40% sans donnée). Boissons (soft + alcool + chaudes) = 40% du CA F&B = ~134k€/an projeté. Marge brute ~61%. Contrainte opérationnelle révélée par Patrice : la cuisine est un GOULET d'étranglement en peak. Implication : la hausse boissons (captives, pas de cuisine) reste safe. Mais la montée en gamme snacks chauds est plafonnée par la capacité cuisine.",

    ce_quon_observe: "Baloo 30j : boissons 40% du CA F&B (~134k€/an). Captives, marge ~61%.",
    ce_quon_deduit: "Élasticité prix boissons captives quasi-nulle. +8% sur 134k€ = ~10 600€/an sans risque volume.",
    comment_on_valide: "Test menu A/B in-situ été 2026 + observation panier 4 semaines.",

    observe_data: "F&B = ~77% du CA des entrées (Baloo 30 j : 36,7k€ vs JP 47,4k€). Boissons 40% du CA F&B = ~134k€/an projeté. Panier F&B 22,64€/visite. 1,86 ticket Baloo/visite. Cuisine = goulet en peak (Patrice).",
    hypothese: "Élasticité boissons captives quasi-nulle (pas d'alternative sur place). Hausse +8% sur 134k€ = ~10 600€/an sans risque volume. Repositionnement snacks froids (gourmandises) = potentiel additionnel, non plafonné par cuisine.",
    a_tester: "Test menu A/B in-situ été 2026 sur repositionnement qualité snacks froids. Étendre dataset Baloo Bar à 6-12 mois (couvrir saisons). Mesurer effet ticket moyen post-déploiement.",

    quantification_text: "Boissons = 40% CA F&B Baloo = ~134k€/an projetés × 8% hausse captive → ~10 600 €/an. Repositionnement snacks froids (hors goulet cuisine) → à chiffrer Phase 2.",
    quantification_vars: [
      { key: "ca_boissons", label: "CA boissons annuel (€)", value: 134000, min: 80000, max: 200000, step: 5000 },
      { key: "hausse_pct", label: "Hausse boissons (%)", value: 8, min: 0, max: 15, step: 1 },
      { key: "uplift_snacks_froids", label: "Uplift snacks froids (k€)", value: 5, min: 0, max: 30, step: 1 }
    ],
    quantification_formula: (v) => v.ca_boissons * (v.hausse_pct / 100) + v.uplift_snacks_froids * 1000,
    hypotheses_limites: "Élasticité boissons captives quasi-nulle (pas d'alternative sur place). Dataset Baloo limité 30 jours · à étendre 6-12 mois.",
    validation_data: "✓ F&B = ~77% du CA des entrées (Baloo 30j : 36,7k€ vs JP 47,4k€) · ✓ Boissons 40% du F&B · ✓ Panier F&B 22,64€/visite · ✓ 1,86 ticket Baloo/visite · ⏳ Étendre dataset 6-12 mois",
    reco_verdeen: "GO sur hausse boissons +8% (quasi-sans risque) dès le 22 mai · Repositionnement qualité Phase 2 (test menu A/B) · Refonte carte = Playbook D6.",
    lien_phase2: "Test menu A/B été 2026 sur snacks froids · Pas d'enquête WTP (élasticité quasi-nulle)",
    score_verdeen: { impact: 3, facilite: 5, risque: 3, total: 11 }
  },
  {
    id: "1_9",
    ref: "1.9",
    family: "convergence",
    title: "Refonte funnel Apex — quick wins faciles",
    subtitle: "Friction 5/5 · Quick wins IN scope · refonte complète OUT",
    convergence_label: "CONVERGENCE 5/5",
    gain_range: "~17 k€/an",
    gain_low: 12,
    gain_high: 25,
    outil: "EXT (Apex)",
    owner_unibox: "Vincent + IT Apex",
    tempo: "Dès 22 mai (quick wins)",

    description: "Parcours d'achat en ligne unanimement décrit comme défaillant : bugs créneaux invisibles, obligation de recommencer par type de visiteur, combos non valorisés, wording négatif (« Ajouter un supplément »). Apex est la contrainte systémique. IN SCOPE quick wins : suppression wording négatif → « Inclure dans votre journée », présentation visuelle des combos en haut du funnel, liens directs site → page résa, réordonnancement étapes. OUT SCOPE : refonte complète Apex, liaison Apex↔RestoMax, booking-window champ exportable.",

    ce_quon_observe: "Parcours défaillant : bugs créneaux, recommencer pour chaque visiteur, combos cachés, wording négatif.",
    ce_quon_deduit: "Quick wins faciles à séparer de la refonte complète. 5% des tentatives échouent × 23 994 × 14,50€ ≈ 17 k€/an.",
    comment_on_valide: "Diagnostic technique Apex / IT + analytics funnel + walkthrough kiosque (immersion terrain).",

    observe_data: "Bug live observé pendant entretien Ops. Friction 5/5 mentionnée par 5/5 stakeholders. Pas d'analytics Apex ni Google Analytics aujourd'hui. Booking-window (champ lead time) non exportable.",
    hypothese: "Si 5% des tentatives de résa échouent à cause de bugs × 23 994 tx × 14,50€ = ~17 k€/an manque à gagner. Quick wins faciles → impact immédiat. Refonte complète = projet IT chiffré séparément Phase 3.",
    a_tester: "Diagnostic technique Apex/IT avec support Apex et IT Unibox (S2-S3). Walkthrough kiosque pendant immersion Wave 1. Analytics funnel à mettre en place avant Gate #2.",

    quantification_text: "Si 5% des tentatives échouent à cause de bugs × 23 994 tx × 14,50€ = ~17 k€/an manque à gagner.",
    quantification_vars: [
      { key: "nb_transactions", label: "Transactions/an", value: 23994, min: 15000, max: 35000, step: 500 },
      { key: "taux_echec_pct", label: "Taux d'échec funnel (%)", value: 5, min: 1, max: 15, step: 1 },
      { key: "prix_moyen", label: "Prix moyen entrée (€)", value: 14.5, min: 10, max: 20, step: 0.5 }
    ],
    quantification_formula: (v) => v.nb_transactions * (v.taux_echec_pct / 100) * v.prix_moyen,
    hypotheses_limites: "Pas d'analytics Apex ni Google Analytics. Taux d'échec 5% = estimation. Booking-window non exportable.",
    validation_data: "✓ Bug live observé pendant entretien Ops · ✓ Friction 5/5 mentionnée par 5/5 stakeholders · ⏳ Diagnostic technique Apex/IT S2-S3 · ⏳ Walkthrough kiosque pendant immersion Wave 1",
    reco_verdeen: "GO quick wins faciles (wording, présentation combos, liens site) dès le 22 mai · Refonte Apex complète à cadrer Phase 3 (chantier IT séparé).",
    lien_phase2: "Analytics funnel · taux conversion par étape · taux abandon · diagnostic Apex S2",
    score_verdeen: { impact: 3, facilite: 4, risque: 4, total: 9 }
  },
  {
    id: "1_15",
    ref: "1.15",
    family: "convergence",
    title: "Pricing par booking window (J-7 / J-3 / J-1)",
    subtitle: "Nouveau levier Verdeen · Compatible Apex (timeslot existant)",
    convergence_label: "QUICK WIN ADDITIONNEL",
    gain_range: "À quantifier Phase 2",
    gain_low: 5,
    gain_high: 20,
    outil: "EXT (Apex)",
    owner_unibox: "Vincent + IT Apex",
    tempo: "Décision Gate #2",

    description: "Aucun différentiel actuel entre réservation anticipée et walk-in. Pricing dégressif J-7 → J-1 : sécurise revenu, prédit la capacité, permet capacity-based pricing dynamique. Compatible avec l'architecture Apex (timeslot déjà en place). Faible friction client si bien communiqué (« réservez tôt, payez moins »).",

    ce_quon_observe: "Aucun différentiel actuel entre réservation anticipée et walk-in. Plopsa pratique -30% online.",
    ce_quon_deduit: "Pricing dégressif J-7 → J-1 sécurise revenu, prédit la capacité, permet capacity-based.",
    comment_on_valide: "Re-export Apex avec champ booking-window + benchmark Plopsa détaillé.",

    observe_data: "Lead time actuel non tracé (booking-window pas exporté Apex). Plopsa pratique -30% online. Center Parcs pratique peak/off-peak + tarif 17h. Aucun différentiel anticipation chez JP.",
    hypothese: "Pricing dégressif J-7 / J-3 / J-1 sécurise revenu (cash upfront), prédit la capacité (staffing optimisé), améliore prédictibilité opérationnelle. Faible friction si communication 'early bird'.",
    a_tester: "Re-export Apex avec champ booking-window (validation #1 slide 18). Analyse distribution actuelle des lead times. Question Phase 2 : « auriez-vous payé moins en réservant plus tôt ? » Validation faisabilité technique Apex.",

    quantification_text: "Impact qualitatif élevé : prédictibilité capacity, staffing optimisé, cash upfront sécurisé. Quantification financière indirecte — à valider Phase 2 (analyse lead time).",
    quantification_vars: null,
    hypotheses_limites: "Lead time actuel non tracé (booking-window non exporté Apex). Faisabilité technique conditionnelle.",
    validation_data: "✓ Plopsa pratique -30% online · ✓ Center Parcs peak/off-peak + tarif 17h · ⏳ Re-export Apex avec champ booking-window (validation #1) · ⏳ Distribution actuelle des lead times",
    reco_verdeen: "WTP Phase 2 + validation technique Apex en parallèle (synchronisé avec 1.9) · Décision finale après Gate #2 — quick win si faisabilité confirmée.",
    lien_phase2: "Question Phase 2 : « auriez-vous payé moins en réservant plus tôt ? » · validation faisabilité Apex",
    score_verdeen: { impact: 3, facilite: 3, risque: 3, total: 9 }
  },

  // ===================== DÉSACCORDS (2.x) =====================
  {
    id: "2_1",
    ref: "2.1",
    family: "desaccord",
    title: "Couplage Jungle Park ↔ S'Pace",
    subtitle: "DÉSACCORD CFO vs COO · Non réplicable franchise",
    convergence_label: "DÉSACCORD",
    gain_range: "À arbitrer (seuil 15%)",
    gain_low: 0,
    gain_high: 30,
    outil: "INT (local JP-Onsen)",
    owner_unibox: "Patrice + Marin",
    tempo: "Mesure 4 semaines",

    description: "POSITION CFO · Levier de CA additionnel via flux croisé fin de journée (ouverture étendue + restaurant qualitatif au S'Pace). Synergie locale à valoriser. POSITION COO · Non-réplicable — les futurs JP n'auront pas un S'Pace à côté. Deux clientèles différentes. Le focus doit être la rentabilité autonome de JP en franchise. Hypothèse de flux JP → S'Pace fin de journée. Données croisées absentes. Le couplage suppose une ouverture étendue JP au-delà de 18h.",

    ce_quon_observe: "Hypothèse de flux JP → S'Pace fin de journée. Données croisées absentes. Local JP-Onsen — non réplicable franchise.",
    ce_quon_deduit: "Significatif seulement si >15% des visiteurs JP consomment au S'Pace. Sinon : sortir du périmètre franchise.",
    comment_on_valide: "Mesure flux JP → S'Pace sur 4 semaines (badge / questionnaire sortie).",

    observe_data: "Hypothèse de flux JP → S'Pace fin de journée. Données croisées absentes (pas de tracking). Levier local JP-Onsen — non réplicable franchise. Le couplage suppose une ouverture étendue JP au-delà de 18h (modifie structure coûts opérationnels).",
    hypothese: "Significatif seulement si >15% des visiteurs JP consomment au S'Pace en fin de journée. Sinon : levier non significatif. Pas d'estimation chiffrée disponible — dépend des données de croisement.",
    a_tester: "Mesure flux JP → S'Pace sur 4 semaines (badge ou questionnaire sortie). Seuil de significativité 15% à valider (convention métier).",

    quantification_text: "Significatif seulement si >15% des visiteurs JP consomment au S'Pace en fin de journée. Sinon : levier non significatif. Pas d'estimation chiffrée disponible Phase 1.",
    quantification_vars: null,
    hypotheses_limites: "Données de flux JP→S'Pace absentes. Modifie structure coûts ops (ouverture étendue). Non réplicable franchise (sauf JP-Onsen).",
    validation_data: "⏳ Mesure flux JP → S'Pace sur 4 semaines (badge ou questionnaire sortie) · Seuil 15% à valider (convention métier)",
    reco_verdeen: "PARK pour le modèle réplicable (cohérent priorité franchise) · Levier optionnel JP-Onsen mentionné en annexe Playbook.",
    lien_phase2: "Local — pas de Phase 2 spécifique. Levier optionnel JP-Onsen uniquement",
    score_verdeen: { impact: 2, facilite: 2, risque: 3, total: 7 }
  },
  {
    id: "2_2",
    ref: "2.2",
    family: "desaccord",
    title: "Pass parent premium & sort du 3€ Ranger",
    subtitle: "Test 3€→3,50€ déjà fait · ~15k€ déjà capturés",
    convergence_label: "DÉSACCORD · 3 voix",
    gain_range: "À quantifier Phase 2",
    gain_low: 5,
    gain_high: 40,
    outil: "INT",
    owner_unibox: "Vincent + Patrice",
    tempo: "Discrete choice Phase 2",

    description: "Le passage du Ranger 3,00€ → 3,50€ a déjà été appliqué côté JP sans aucune plainte. Patrice : « sur 30 000 parents par an, ça fait 30 000 balles fin d'année » — ~+15 k€/an déjà capturés. Le débat porte sur la suite. 4 OPTIONS · A · Statu quo 3,50€ + gratuité récup (sécurise +15k€). B · Saut à 4€ + segmentation (+5-7k€ additionnels, risque friction). C · Gratuit mer/ven yield (effet volume incrémental). D · Pass parent annuel ~19€/an ⭐ RECO (cash upfront + CRM + fidélisation).",

    ce_quon_observe: "Test 3€→3,50€ déjà réussi côté JP (sans plainte) = ~15k€ déjà capturés. 3 voix divergent sur la suite.",
    ce_quon_deduit: "4 options : (A) statu quo 3,50€ · (B) modulation par usage · (C) gratuit mer/ven (yield) · (D) PASS PARENT ANNUEL ~19€/an (reco Verdeen).",
    comment_on_valide: "Discrete choice Phase 2 sur 4 architectures + WTP terrain · Analyse fréquence visite mère pour calibrer pass.",

    observe_data: "Test 3€→3,50€ déjà appliqué (Patrice : ~+15 k€/an). 3 voix divergent sur la suite (Marketing ouvert, COO rejette pack parent, Ops pragmatique).",
    hypothese: "Option D (pass annuel ~19€) = 6 visites à 3€ + 1€. Cash upfront sécurisé, base CRM email qualifiée, surconsommation 'j'ai payé'. Calibration nécessite fréquence visite mère.",
    a_tester: "Discrete choice Phase 2 sur 4 architectures (A/B/C/D) + WTP terrain à 14€/19€/25€/35€. Analyse fréquence de visite par client identifié (4 095 clients nommés).",

    quantification_text: "Option D (reco) : pass à ~19€/an = 6×3€+1€. Effets : cash upfront sécurisé, base CRM email qualifiée, surconsommation 'j'ai payé'. À quantifier Phase 2.",
    quantification_vars: null,
    hypotheses_limites: "Fréquence visite par client à analyser (4 095 clients nommés). Risque cannibalisation Ranger 3,50€. Effet incrémental (non cannibale) à mesurer.",
    validation_data: "✓ Test 3€→3,50€ réussi (Patrice) · ⏳ Discrete choice Phase 2 sur 4 architectures A/B/C/D · ⏳ WTP terrain à 14€/19€/25€/35€",
    reco_verdeen: "Reco Verdeen = Option D (Pass annuel ~19€/an, calibrage final Phase 2) · Test discrete choice sur les 4 architectures pour départager.",
    lien_phase2: "Discrete choice 4 options A/B/C/D · 120 in-park + 400 email · prix testés 14/19/25/35€",
    score_verdeen: { impact: 3, facilite: 3, risque: 3, total: 9 }
  },
  {
    id: "2_3",
    ref: "2.3",
    family: "desaccord",
    title: "Mini-golf : échec de concept ou de visibilité ?",
    subtitle: "0,3% du CA · 693 ventes en 11 mois",
    convergence_label: "DÉSACCORD",
    gain_range: "À quantifier (bundling)",
    gain_low: 0,
    gain_high: 15,
    outil: "INT",
    owner_unibox: "Ops + Marketing + Owner",
    tempo: "Bundling test 4 semaines",

    description: "POSITION Ops + Marketing · Mini-golf ne fonctionne pas. 693 ventes en 11 mois = anomalie économique flagrante. Échec produit, à exclure des futurs centres. POSITION Owner · Pas un échec de concept mais de visibilité. « 2e étage, code d'accès, personne ne sait qu'il est là. » À fixer avant de juger. RECO VERDEEN — TEST DÉCISIF VIA BUNDLING · (a) Intégrer mini-golf dans bundle all-in à prix attractif. Mesure conversion 4 semaines. (b) Standalone avec bracelet couleur spéciale à 9,90€. Critère décisif : si conversion <10% même bundlé/visible → exclusion futurs centres.",

    ce_quon_observe: "693 ventes en 11 mois = 0,3% du CA. 2e étage, code d'accès, invisible. Ops pointe échec produit, Owner pointe échec signalétique.",
    ce_quon_deduit: "Test décisif via bundling : si conv. <10% une fois bundlé/visible → échec concept · si >10% → fix signalétique.",
    comment_on_valide: "Intégrer mini-golf dans bundle all-in attractif + bracelet couleur 9,90€ standalone. Mesure conversion 4 sem.",

    observe_data: "693 ventes en 11 mois = 0,3% du CA. Prix moyen 2,90€. Configuration : 2e étage, code d'accès, invisible aux visiteurs. Aucune signalétique forte. Ops pointe échec produit, Owner pointe échec signalétique.",
    hypothese: "Test bundling = méthode décisive pour départager. Si bundlé + visible et conv <10% → c'est bien un échec produit. Coût d'un module mini-golf par centre non chiffré dans la mission — décision réplication dépend du CAPEX.",
    a_tester: "Bundling test Phase 2 : intégrer mini-golf dans combo all-in attractif (4 semaines, mesure conversion). En parallèle : test bracelet couleur 9,90€ avec signalétique améliorée.",

    quantification_text: "État actuel : 693 ventes × 2,90€ = ~2 010€ / 11 mois = 0,3% du CA. Si bundlé et conv >10% → activable. Si conv <10% bundlé → exclure futurs centres.",
    quantification_vars: null,
    hypotheses_limites: "Coût module mini-golf par centre non chiffré. CAPEX réplication conditionne décision franchise.",
    validation_data: "✓ 693 ventes / 0,3% du CA · ✓ 2e étage code d'accès · ⏳ Bundling test Phase 2 (4 semaines) · ⏳ Test bracelet couleur 9,90€",
    reco_verdeen: "Test Phase 2 — bundle all-in + bracelet 9,90€ standalone · Décision réplication après mesure conversion · Seuil 10% = critère go/no-go futurs centres.",
    lien_phase2: "Bundling test 4 semaines · combo all-in attractif · mesure conversion",
    score_verdeen: { impact: 2, facilite: 2, risque: 2, total: 6 }
  },
  {
    id: "2_4",
    ref: "2.4",
    family: "desaccord",
    title: "Adaptation locale du pricing en franchise",
    subtitle: "DÉSACCORD stratégique COO vs CEO",
    convergence_label: "DÉSACCORD STRATÉGIQUE",
    gain_range: "Arbitrage stratégique",
    gain_low: 0,
    gain_high: 0,
    outil: "INT",
    owner_unibox: "Victor + Marin (CEO/COO)",
    tempo: "Gate #2 (Playbook D6)",

    description: "POSITION COO (Marin) · « Devenir un peu comme le McDo : en fonction de la région, pouvoir adapter des combos, des prix. » Vision flexibilité locale modérée. POSITION CEO (Victor) · « Quelle est la partie émotionnelle qui fera venir le client si demain on a que des bières de la région ? » Cohérence marque nationale. COMPROMIS VERDEEN — MODÈLE À DEUX COUCHES · COUCHE A · Grille nationale fixe (entrées + add-ons + anniversaires). COUCHE B · Marge locale limitée (F&B + événements locaux, bornes définies dans Playbook D6).",

    ce_quon_observe: "Désaccord stratégique COO (adaptation McDo régionale) vs CEO (cohérence marque nationale). Pas de données — arbitrage stratégique.",
    ce_quon_deduit: "Modèle à 2 couches Verdeen : (a) grille nationale fixe entrées/anniv (b) marge locale limitée F&B/événements.",
    comment_on_valide: "À trancher en Gate #2 avec résultats WTP par segment (variations régionales mesurées).",

    observe_data: "Vision COO et CEO divergent en entretien. Pas de données de caisse pertinentes — arbitrage stratégique pur. Best practice McDo : grille nationale + adaptations régionales encadrées.",
    hypothese: "Modèle à deux couches (grille nationale fixe + flexibilité locale limitée F&B/événements) concilie cohérence marque et adaptation marché. Le Playbook D6 formalise les bornes de flexibilité.",
    a_tester: "Pas de test terrain Phase 2 spécifique. À trancher en Gate #2 avec résultats WTP par segment (variations régionales mesurées). Décision CEO + COO.",

    quantification_text: "Pas de quantification : arbitrage stratégique pur. Impact qualitatif : structurant pour modèle franchise. Conditionne design Playbook D6 (bornes de flexibilité).",
    quantification_vars: null,
    hypotheses_limites: "Pas de données de caisse pertinentes. Résultats WTP Gate #2 par segment peuvent éclairer (variations régionales).",
    validation_data: "✓ Best practice McDo : grille nationale + adaptations régionales encadrées · ⏳ Résultats WTP par segment Gate #2 · ⏳ Décision CEO + COO",
    reco_verdeen: "Modèle à 2 couches : (a) grille nationale fixe entrées/add-ons/anniv + (b) marge locale limitée F&B/événements · Playbook D6 formalise les bornes.",
    lien_phase2: "Pas de test terrain spécifique. À trancher Gate #2 avec résultats WTP par segment",
    score_verdeen: { impact: 3, facilite: 2, risque: 3, total: 8 }
  }
];

// Helpers
window.getOpp = (id) => window.OPPORTUNITIES.find(o => o.id === id);
window.FAMILY_LABEL = {
  convergence: "Convergence",
  desaccord: "Désaccord"
};
window.FAMILY_COLOR = {
  convergence: "#10B981",
  desaccord: "#F59E0B"
};
