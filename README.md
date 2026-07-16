# MetricFlow

Dashboard SaaS pour agences marketing : centralise le suivi des performances publicitaires de plusieurs clients et visualise leurs résultats.

## Le problème

Les agences marketing gèrent plusieurs clients en même temps, chacun avec ses propres campagnes publicitaires. Elles perdent du temps à collecter les chiffres client par client et à construire des rapports manuellement.

## La solution (MVP actuel)

Un dashboard centralisé où l'agence peut :
- Créer un compte sécurisé
- Ajouter ses clients
- Ajouter les campagnes de chaque client (dépenses, clics, conversions)
- Visualiser automatiquement les performances sous forme de graphique

## Stack technique

| Couche | Technologie | Pourquoi |
|---|---|---|
| Front-end | Next.js (TypeScript), Tailwind CSS | Framework React complet, styling rapide |
| Back-end / BaaS | Supabase (PostgreSQL + Auth) | Base de données et authentification en un seul service |
| Visualisation | Recharts | Graphiques simples a integrer avec React |

## Architecture

Front-end (Next.js) -> HTTPS/JSON -> Supabase (Auth + PostgreSQL, Row Level Security)

L'utilisateur s'authentifie via Supabase Auth. Chaque requete vers les tables `clients` et `campaigns` passe par des policies RLS qui garantissent qu'un utilisateur ne voit que ses propres donnees.

## Schema de base de donnees

**clients** : id (PK), user_id (FK -> auth.users), name, meta_ads_account_id, created_at

**campaigns** : id (PK), client_id (FK -> clients.id), name, spend, clicks, conversions, created_at

Relation : un client a plusieurs campaigns (1-N).

## Fonctionnalites livrees (Sprint 1)

- Inscription / connexion (Supabase Auth)
- Ajout / suppression de clients
- Ajout de campagnes par client (saisie manuelle)
- Dashboard avec graphique des performances (depenses, clics, conversions)

## Fonctionnalites prevues (iterations suivantes)

- Connexion automatique a l'API Meta Ads (au lieu de la saisie manuelle)
- Generation de rapport automatique par IA (Google Gemini)
- Export PDF des rapports

## Lancer le projet en local

```
npm install
```

Creer un fichier `.env.local` avec `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`, executer le script SQL de creation des tables dans Supabase, puis :

```
npm run dev
```

## Tests effectues

- Inscription et connexion testees manuellement
- Ajout / suppression de clients testes manuellement
- Ajout de campagnes et affichage du graphique testes manuellement avec plusieurs jeux de donnees
