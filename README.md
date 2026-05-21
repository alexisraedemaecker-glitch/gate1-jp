# Gate #1 — Jungle Park · Pricing Workshop

Web app temps-réel pour l'atelier Gate #1 (vendredi 22 mai 2026, 8h30-10h00).

- **Stack** · vanilla JS + Firebase Realtime DB (CDN) + Chart.js (CDN). 0 build, 0 npm.
- **Hébergement** · GitHub Pages, app 100% statique.
- **Modes** · `/` participant (mobile) · `/?mode=presenter` projecteur (desktop).

---

## 1 · Brancher Firebase (5 min)

1. [Console Firebase](https://console.firebase.google.com/) → crée un projet (ex. `gate1-jp`).
2. Active **Realtime Database** (region `europe-west1`) en **mode test**.
3. Règles temporaires (atelier éphémère — à durcir ensuite) :
   ```json
   { "rules": { ".read": true, ".write": true } }
   ```
4. **Paramètres du projet** → **Tes apps** → ajoute une app Web → copie l'objet `firebaseConfig`.
5. Ouvre [`firebase-config.js`](firebase-config.js) et remplace **tout** l'objet `window.firebaseConfig`.
6. (Optionnel) Change `window.SESSION_ID` si tu fais un test à blanc avant le jour J.

> ⚠️ Sans Firebase, l'app tourne quand même en aperçu local (login + sliders OK), mais rien ne se synchronise entre participants.

---

## 2 · Déployer sur GitHub Pages (3 min)

Le repo est déjà initialisé avec un remote sur `https://github.com/alexisraedemaecker-glitch/gate1-jp`.

```bash
cd /Users/alexisraedemaecker/Documents/JunglePark/Inputs/gate1-jp
git add .
git commit -m "Gate #1 app — première version"
git push -u origin main      # ou master selon ta branche par défaut
```

Puis sur GitHub :
- Repo → **Settings** → **Pages**
- Source : `Deploy from a branch` → **branche `main`** → dossier **`/ (root)`** → Save.
- Attends ~1 min. URL : **https://alexisraedemaecker-glitch.github.io/gate1-jp/**

---

## 3 · Utilisation le jour J

**Participants** (téléphone) → ouvrent l'URL de base → saisissent prénom + rôle → évaluent les 15 leviers.

**Toi sur projecteur** → ouvre `?mode=presenter` → tu vois :
- Qui est connecté (5 / 5 attendus)
- Matrice impact × facilité (cachée par défaut → bouton « 🔓 Révéler »)
- Lancement de l'Exercice 2 (arbitrage GO / GO post WTP / WTP pure / PARK sur le top 10)
- Bouton « Réinitialiser » si tu veux purger entre deux séances

> 💡 **Voix Verdeen** · Au premier lancement, l'app injecte automatiquement les scores Verdeen du deck (pondération ×2 voix). Elle n'apparaît pas dans la liste des participants.

---

## 4 · Structure Firebase

```
/sessions/<SESSION_ID>/
  users/<uid>           { name, role, joined_at }
  evaluations/<opp_id>/<uid>   { impact, facilite, risque, score_composite,
                                 hypotheses_modifiees, commentaire, timestamp }
  arbitrages/<opp_id>/<uid>    { choice: "GO"|"GO_WTP"|"WTP"|"PARK", timestamp }
  session/
    exercise_2_active        bool
    current_arbitrage_index  number
    matrix_revealed          bool
    top10_for_arbitrage      array of opp ids
    include_verdeen          bool
  verdeen_seeded             true (sentinel)
```

---

## 5 · Fichiers

- [`index.html`](index.html) — coquille, charge les CDN
- [`styles.css`](styles.css) — design system Verdeen × RGC
- [`firebase-config.js`](firebase-config.js) — config à compléter
- [`opportunities.js`](opportunities.js) — les **15 opportunités** extraites du deck v6 (fiches annexes slides 28-42)
- [`app.js`](app.js) — toute la logique (~1300 lignes)

---

## 6 · Smoke test avant l'atelier

1. Sur un téléphone : ouvre l'URL, login, vote une opportunité → l'évaluation disparaît de la liste.
2. Sur ton laptop : ouvre `?mode=presenter` → tu vois le participant apparaître + 1 vote enregistré.
3. Lance « Démarrer l'exercice 2 » → côté téléphone, tab « Arbitrage » se débloque.
4. « Réinitialiser » pour repartir à zéro vendredi matin.
