# Introduction

Cette librairie a été conçue pour aider les développeurs à intégrer les fonctionnalités de **Cocolis** dans leur application sans gérer les appels vers l'API.

Elle inclut toutes les fonctionnalités globales tel que **l'authentification**, la gestion des **Rides**.

Vous pouvez signaler des bugs sur cette [page](https://github.com/Cocolis-1/cocolis-js/issues).

# Installation

Installation en utilisant npm :

```bash
npm i cocolis-js
```

# Principe général

La librairie est essentiellement constituée de classes dont **Auth**. Celle-ci permet d'instancier l'authentification et de récupérer les tokens nécessaires pour chaque appel API.

Il existe deux autres classes, **Ride** et **Cocolis**. Celles-ci permettent d'effectuer tous les appels pour créer une Ride, vérifier la compatibilité d'un trajet, etc ...

Leur utilisatation sera détaillée dans la suite de la documentation.

# Documentation API

Le principe de la librairie étant essentiellement basé sur la **documentation officielle de l'API**, vous pouvez la retrouver sur **[https://doc.cocolis.fr/docs/cocolis-api](https://doc.cocolis.fr/docs/cocolis-api)**.

## Authentification

> Avant toute chose, vous devez avoir un compte développeur, vous trouverez plus d'information ici :
> [Demander un compte développeur](https://doc.cocolis.fr/docs/cocolis-api/docs/Tutoriel-impl%C3%A9mentation/Getting-Started.md#2-demander-un-compte-d%C3%A9veloppeur)

Avec la librairie, vous pouvez vous authentifier facilement de cette façon et **une seule fois** :

```typescript
const CocolisClient = new Cocolis({ live: false });
var r = await CocolisClient.sign_in({ app_id: 'mon_app_id', password: 'mon_password' });
```

**Nos requêtes sont toutes asynchrones.**

Vous n'avez plus qu'à utiliser l'objet `CocolisClient` pour effectuer un appel.

Lors de l'instanciation de Cocolis, la variable `live` permet de définir si vous travaillez dans l'environnement **sandbox** de Cocolis ou de **production**.

`live: false` permet de travailler en mode sandbox pour effectuer vos tests.

`live: true` permet de travailler en mode production pour travailler directement avec Cocolis et ses transporteurs.

Une fois authentifié, vous pouvez effectuer des **requêtes annexes** à l'API de cette façon :

```typescript
return this.requestAuthenticated<any>('rides/mine', {
  data: params, // Des éventuels paramètres à passer
  method: 'GET', // Le type de méthode
});
```

Nous utilisons [Axios](https://www.npmjs.com/package/axios) dans cette librairie pour effectuer des appels HTTP, vous pouvez consulter leur documentation pour savoir quels sont les paramètres additionnels à passer dans certaines situations.

## Environnements

Il existe **deux environnements**, l'environnement de test (**sandbox**) et l'environnement de **production**, vous pouvez en savoir plus [ici](https://doc.cocolis.fr/docs/cocolis-api/docs/Installation-et-utilisation/01-Environnements.md).
