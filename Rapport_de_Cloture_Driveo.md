# Rapport de clôture : Driveo

**Projet :** Driveo, location de voitures de luxe
**Formation :** Holberton School, Portfolio Project, Stage 5
**Réalisé par :** Janice Kouakou (projet solo)
**Site en ligne :** https://metricflow-tan.vercel.app
**Code source :** https://github.com/Janice91/metricflow

---

## 1. Résultats

### Fonctionnalités livrées (MVP)

- Catalogue de 12 voitures, avec filtres par catégorie et fiche détaillée.
- 6 agences, dont des points aéroport.
- Prix recalculé en direct selon les dates, les options et les remises (5 % dès 3 jours, 10 % dès 7 jours, 15 % dès 14 jours).
- Compte obligatoire avant réservation (inscription et connexion avec Supabase Auth).
- Paiement en ligne sur la page Stripe Checkout (mode test).
- Page « Mes réservations » avec annulation.
- Back-office `/admin` réservé aux administrateurs : gestion des voitures, des agences et des clients.

### Objectifs initiaux et écart

| Objectif | Résultat |
|---|---|
| Site de réservation complet, du catalogue au paiement | Atteint |
| Prix fiable, calculé côté serveur | Atteint |
| Accès aux données protégé dans la base (RLS) | Atteint |
| Back-office pour gérer le catalogue sans redéploiement | Atteint |
| Plan de test complet | Partiel : 10 cas sur 21 réussis à ce jour |
| Disponibilité des voitures | Non atteint (prévu après le MVP) |
| Webhook Stripe | Non atteint (prévu après le MVP) |

### Indicateurs

- **Plan qualité :** 21 cas de test. 10 réussis, dont tous les cas de sécurité testés sur le site en ligne le 03/11/2026. Les 11 autres cas fonctionnels sont à exécuter avant la démo.
- **Sécurité testée :** accès `/admin` refusé à un client ; appel `/api/checkout` sans compte refusé (401) ; prix falsifié ignoré ; écriture dans `cars` refusée à un client (RLS).
- **Déploiement :** chaque `push` sur `main` déclenche un déploiement automatique sur Vercel. Version rendue étiquetée `v1.0.0`.

---

## 2. Ce qui a bien marché

- **Le prix est calculé par le serveur.** Le navigateur n'a jamais le dernier mot : même modifié, le prix envoyé n'est pas pris en compte.
- **La sécurité est dans la base.** Les règles RLS protègent les données, même si le code du site était contourné.
- **Les tests de sécurité ont été faits sur le site réel**, pas seulement en local, et consignés dans le dossier.
- **Le processus de livraison est simple** : Git, une branche et une Pull Request pour les modifications, puis déploiement automatique.

---

## 3. Difficultés rencontrées et solutions

| Difficulté | Solution |
|---|---|
| La sandbox de développement se réinitialise régulièrement, ce qui fait perdre le travail local | Tout le code est sur GitHub. Un script de mise en place permet de reprendre en quelques minutes. |
| Une requête refusée par RLS ne renvoie pas d'erreur, mais un tableau vide (`200` avec `[]`) | Le test a été noté comme « réussi » avec cette explication, et le comportement est documenté. |
| Les clés d'accès risquent d'être exposées pendant les démonstrations | Les clés secrètes restent côté serveur, et je prévois de les renouveler après la soutenance. |
| Le serveur de développement bloquait certaines ressources depuis l'adresse de la sandbox | Autorisation de l'hôte dans la configuration Next.js. |
| Une modification du README a été faite sans branche au départ | Reprise avec une branche et une Pull Request, pour respecter la gestion de versions. |

---

## 4. Leçons apprises

1. **Décider de la sécurité au niveau de la base, pas de l'interface.** Un bouton masqué ne protège rien ; une règle RLS, si.
2. **Tester sur l'environnement réel.** Les tests faits en local ne suffisent pas pour valider la mise en ligne.
3. **Écrire les tests avant de considérer une fonctionnalité finie.** Le plan qualité a été rédigé tard, ce qui a demandé de reprendre les résultats.
4. **Garder les secrets hors des conversations et des captures d'écran.** J'ai partagé une clé de test pendant le projet : il faut la renouveler après la soutenance.
5. **Limiter le périmètre du MVP.** La disponibilité des voitures et le webhook Stripe auraient rendu le projet plus solide, mais demandaient plus de temps que prévu.

---

## 5. Rétrospective

*Projet réalisé seul. La rétrospective est donc faite par écrit, à partir de trois questions :*

- **Ce qui a bien marché :** la structure du projet (catalogue, paiement, administration) et les choix de sécurité.
- **Difficultés et résolutions :** voir la section 3.
- **Améliorations pour la suite :**
  - Commencer les tests fonctionnels plus tôt, pour ne pas les rattraper à la fin.
  - Ajouter un webhook Stripe pour enregistrer les réservations même si le client ferme la page.
  - Gérer la disponibilité des voitures pour éviter les doubles réservations.

---

## 6. Suites du projet

1. Exécuter les 11 cas de test fonctionnels restants.
2. Ajouter le webhook Stripe signé.
3. Contrôler la disponibilité des voitures par dates.
4. Envoyer un e-mail de confirmation après réservation.
5. Ajouter des tests automatisés.
