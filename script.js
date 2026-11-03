// Données de démonstration : artistes, horaires, date et prix sont fictifs.
const PROGRAMME = {
  ven: [["17:00", "Ouverture, orchestre de la plage"], ["19:30", "Groupe Marée haute"], ["21:30", "Trio Vent d'Est"]],
  sam: [["16:30", "Atelier danse en plein air"], ["19:00", "Duo Sable fin"], ["21:30", "Grand concert de nuit"]],
  dim: [["15:00", "Concert en famille"], ["18:00", "Collectif Alizé"], ["21:00", "Clôture et feu d'artifice"]],
};
const PRIX_JOUR = 20;
const DEBUT = new Date("2027-01-15T16:00:00");

const liste = document.getElementById("liste");
const onglets = document.querySelectorAll(".onglets button");
function afficher(jour) {
  liste.innerHTML = "";
  PROGRAMME[jour].forEach(([heure, titre]) => {
    const li = document.createElement("li");
    const t = document.createElement("time");
    t.textContent = heure;
    const s = document.createElement("span");
    s.textContent = titre;
    li.append(t, s);
    liste.appendChild(li);
  });
  onglets.forEach((o) => o.setAttribute("aria-selected", String(o.dataset.jour === jour)));
}
onglets.forEach((o) => o.addEventListener("click", () => afficher(o.dataset.jour)));
afficher("ven");

const compte = document.getElementById("compte");
const jours = Math.ceil((DEBUT - new Date()) / 86400000);
compte.textContent = jours > 0 ? `Ouverture dans ${jours} jours (date de démonstration)` : "Édition de démonstration";

// Le pass 3 jours vaut deux fois et demie le prix d'un jour.
const formule = document.getElementById("formule");
const n = document.getElementById("n");
const total = document.getElementById("total");
function calculer() {
  const unite = formule.value === "3" ? PRIX_JOUR * 2.5 : PRIX_JOUR;
  total.textContent = `Total : ${(unite * Number(n.value || 0)).toFixed(2).replace(".", ",")} € (démonstration)`;
}
formule.addEventListener("change", calculer);
n.addEventListener("input", calculer);
calculer();

const formulaire = document.getElementById("formulaire");
const retour = document.getElementById("retour");
formulaire.addEventListener("submit", (e) => {
  e.preventDefault();
  retour.textContent = `Merci ${new FormData(formulaire).get("nom")} : réservation enregistrée (démonstration, aucun paiement).`;
  formulaire.reset();
  calculer();
});
