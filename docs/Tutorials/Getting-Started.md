# Implémentation standard

Retrouvez notre librairie JavaScript sur le lien suivant : https://github.com/Cocolis-1/cocolis-js

L'implémentation de Cocolis se fait en général en respectant ces étapes :

## 1. Principe général

Voici un schéma des échanges entre votre site et l'API Cocolis :

![Schéma principe cocolis](https://res.cloudinary.com/cocolis-prod/image/upload/v1587135214/Sch%C3%A9mas_API_Cocolis_fuu9hc.svg)

Le prélèvement du montant de la livraison est effectué sur le compte MangoPay associé à votre compte Cocolis. Il est déclenché lors de la confirmation de la livraison par le transporteur, c’est à dire lorsque la “Ride” passe en statut “completed”.

## 2. Demander un compte développeur

Vous pouvez demander la création d'un compte développeur en remplissant [ce formulaire](https://docs.google.com/forms/d/e/1FAIpQLSe9DZntip2_5jSR5BVRBD8S84vtBdeI834K9-Mj7euLCNit4A/viewform?usp=pp_url). Une clé API vous sera alors fournie pour **Sandbox** et **Production**.

## 3. Authentification

Toutes les requêtes API doivent être authentifiées grâce à notre librairie JS pour pouvoir accéder aux ressources.

> Pour comprendre le fonctionnement de l'authentification, reportez vous à la [rubrique dédiée](../../Installation-et-utilisation/03-Authentification.md). En particulier, concernant la vérification de la validité de vos tokens.

1. Créez un Client HTTP avec notre API en vous authentifiant :

```typescript
const CocolisClient = new Cocolis({ live: false });
var r = await CocolisClient.sign_in({ app_id: 'mon_app_id', password: 'mon_password' });
```

> La librairie JS se chargera d'utiliser vos tokens d'authentification pour vous authentifier lors de vos prochains appels

## 4. Gérer l'expiration d'un token

Si vous obtenez une réponse avec un code `401`, cela signifie que votre token a expiré.

Si le token n'est plus valide, il suffit de refaire un `await CocolisClient.sign_in({ app_id: 'mon_app_id', password: 'mon_password' })`

## 5. Eligibilité d'une livraison

<!-- theme: warning -->

> ### Tous nos prix sont en centimes

<!--
type: tab
title: Doc
-->

Pour savoir si la livraison Cocolis est éligible d'un code postal A à un code postal B, il faut appeler l'URL :

```typescript
const canMatchParams = {
  from: {
    postal_code: '13001',
  },
  to: {
    postal_code: '31000',
  },
  volume: 500, // Volume en m3
  content_value: 120000, // Prix en centimes
};

let response = await CocolisClient.can_match(canMatchParams);
```

La réponse est sous la forme d'un **object** Javascript.

---

```json json_schema
{
  "title": "Response",
  "type": "object",
  "properties": {
    "from": {
      "type": "object",
      "properties": {
        "postal_code": {
          "type": "string",
          "description": "Code postal du point de départ"
        }
      },
      "required": ["postal_code"]
    },
    "to": {
      "type": "object",
      "properties": {
        "postal_code": {
          "type": "string",
          "description": "Code postal du point d'arrivée"
        }
      },
      "required": ["postal_code"]
    },
    "volume": {
      "type": "number",
      "description": "Somme des volumes en m3 des produits à livrer"
    },
    "content_value": {
      "type": "number",
      "description": "Valeur de la livraison en Centimes (Valeur de la commande)"
    }
  },
  "required": ["from", "to", "volume"]
}
```

<!--
type: tab
title: Réponse
-->

La réponse sera un object du format :

```json json_schema
{
    "title": "Response",
    "type": "object",
    "properties": {
        "result": {
            "type": "boolean"
            "description": "Cocolis peut réaliser la livraison"
        },
        "estimated_prices": {
            "type": "object",
            "properties": {
              "with_insurance": {
                "type": "number",
                "description": "Prix avec assurance"
              },
              "regular": {
                "type": "number",
                "description": "Prix sans assurance"
              }
            }
        },
        "insurance_detail": {
          "type": "object",
          "description": "Informations de l'assurance si éligible",
          "properties": {
            "amount": {
              "type": "number",
              "description": "Montant assuré en  !! CENTIMES !!"
            },
            "conditions_url": {
              "type": "string",
              "description": "Liens vers les conditions générales de l'assurance"
            }
          }
        },
        "rider_count": {
            "type": "number",
            "description": "Le nombre de porteur déjà disponibles pour effectuer la livraison"
        }
    }
}
```

<!-- type: tab-end -->

## 6. Création d'une annonce :

<!-- theme: warning -->

> ### Tous nos prix sont en centimes

Quand une vente a été réalisée sur votre site avec notre mode de livraison, il faut ensuite la créer sur Cocolis. Nous vous recommandons de la créer 30 minutes après le paiement pour gérer des cas d'annulation rapide sur votre site.

<!--
type: tab
title: Doc
-->

```typescript
const createRideParams = {
  description: 'Carcassonne vers toulu',
  from_lat: 43.212498,
  to_lat: 43.59912,
  from_address: 'Carcassonne',
  to_address: 'Toulouse',
  from_lng: 2.350351,
  to_lng: 1.444391,
  from_is_flexible: true,
  from_pickup_date: '2020-06-13T14:21:21+00:00',
  to_is_flexible: true,
  to_pickup_date: '2020-06-13T14:21:21+00:00',
  is_passenger: false,
  is_packaged: false,
  price: 57000,
  volume: 15,
  environment: 'objects',
  from_need_help: false,
  from_need_help_floor: false,
  from_need_help_elevator: false,
  from_need_help_furniture_lift: false,
  to_need_help: false,
  to_need_help_floor: false,
  to_need_help_elevator: false,
  to_need_help_furniture_lift: false,
  rider_extra_information: 'Extra informations',
  photo_urls: [
    'https://www.odt.co.nz/sites/default/files/story/2020/07/gettyimages-138310605.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/41y16B5C6rL._SX311_BO1,204,203,200_.jpg',
  ],
  ride_objects_attributes: [
    {
      title: 'Canapé',
      qty: 1,
      format: 'xxl',
    },
  ],
  ride_delivery_information_attributes: {
    from_address: '14 rue des fleurs',
    from_postal_code: 69000,
    from_city: 'Lyon',
    from_country: 'FR',
    from_contact_name: 'John Smith',
    from_contact_email: 'john.smith@gmail.com',
    from_contact_phone: '0601020202',
    from_extra_information: 'test',
    to_address: '19 rue des champignons',
    to_postal_code: 75000,
    to_city: 'Paris',
    to_country: 'FR',
    to_contact_name: 'John Doe',
    to_contact_email: 'john.doe@gmail.com',
    to_contact_phone: '06 07 08 06 09',
  },
};

let response = await CocolisClient.create(createRideParams);
```

---

```json json_schema
{
  "type": "object",
  "description": "Body de la requête",
  "properties": {
    "ride": {
      "$ref": "../models/ride/ride-create.v1.json"
    }
  }
}
```

<!--
type: tab
title: Réponse
-->

La réponse sera un object Javascript

<!-- type: tab-end -->

## 7. Suivi de la livraison par votre site

A chaque changement de statut de l'annonce sur Cocolis, notre système vous enverra des webhooks [Voir documentation détaillée](../05-Webhooks.md) aux URLs que vous avez spécifiées. De cette manière, vous pourrez suivre les différentes étapes de la livraison.

Dans la documentation détaillée, nous vous donnons un exemple des actions à mettre en place de votre coté selon l'évènement.

## 8. Suivi de la livraison par l'acheteur

L'acheteur dispose d'une interface dédiée pour le suivi de la livraison. Lors de la création de l'annonce, nous vous avons retourné un `buyer_tracking` qui est un code de suivi pour votre acheteur. Il permet de constuire l'URL de suivi qui prend la forme suivante :

```
https://:domain/rides/buyer/:buyer_tracking
```

<!--
type: tab
title: Paramètres
-->

| Paramètre       |       Valeur        |                                                                                       Commentaire |
| --------------- | :-----------------: | ------------------------------------------------------------------------------------------------: |
| :domain         |  `www.cocolis.fr`   |                                                  En sandbox, le domaine sera `sandbox.cocolis.fr` |
| :buyer_tracking | ride.buyer_tracking | Lors de la création de la ride, nous vous avons renvoyé ce paramètre dans la clé `buyer_tracking` |

> Nous vous conseillons de remonter cette information sur la page de suivi de commande de votre client.

<!--
type: tab
title: Exemples
-->

### Production

```
https://www.cocolis.fr/rides/buyer/CFE9E3620F1626F9
```

### Sandbox

```
https://sandbox.cocolis.fr/rides/buyer/CFE9E3620F1626F9
```

<!-- type: tab-end -->

## 9. Suivi de la livraison par le vendeur

Le veudeur dispose d'une interface dédiée pour suivre la livraison. Lors de la création de l'annonce, nous retournons un `seller_tracking` qui est un code de suivi pour votre vendeur. Il permet de constuire l'URL de suivi qui prend la forme suivante :

```
https://:domain/rides/seller/:seller_tracking
```

<!--
type: tab
title: Paramètres
-->

| Paramètre        |        Valeur        |                                                                                        Commentaire |
| ---------------- | :------------------: | -------------------------------------------------------------------------------------------------: |
| :domain          |   `www.cocolis.fr`   |                                                   En sandbox, le domaine sera `sandbox.cocolis.fr` |
| :seller_tracking | ride.seller_tracking | Lors de la création de la ride, nous vous avons renvoyé ce paramètre dans la clé `seller_tracking` |

> Nous vous conseillons de remonter cette information sur la page de suivi de commande de votre client.

<!--
type: tab
title: Exemples
-->

### Production

```
https://www.cocolis.fr/rides/seller/7E20B021BF8721A2
```

### Sandbox

```
https://sandbox.cocolis.fr/rides/seller/7E20B021BF8721A2
```

<!-- type: tab-end -->
