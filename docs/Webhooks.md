# Webhooks

Les webhooks sont là pour informer votre système des événements qui surviennent lors de la livraison. Ils vous permettent de les exploiter, par exemple pour informer votre acheteur et/ou votre vendeur de l'avancée de la livraison.

### Créer un Webhook

Vous pouvez créer un webhook (en respectant les paramètres requis) :

```typescript
const Cocolis = require('cocolis'); // import in nodejs

const CocolisClient = new Cocolis({ live: false });

const createWebhooksParams = {
  event: 'offer_accepted',
  url: 'https://www.cocolis.fr/ride_webhook',
  active: false,
};

await CocolisClient.createWebhook(createWebhooksParams);
```

Les paramètres `createWebhooksParams` sont sous la forme d'un tableau, on utilise la même forme que la documentation de l'API.

### Mettre à jour un Webhook

Vous pouvez mettre à jour un webhook (en respectant les paramètres requis) :

```typescript
const Cocolis = require('cocolis'); // import in nodejs

const CocolisClient = new Cocolis({ live: false });

const updateWebhooksParams = {
  event: 'offer_accepted',
  url: 'https://www.updatecocolis.fr/ride_webhook',
  active: false,
};

await CocolisClient.updateWebhook(157, updateWebhooksParams);
```

Nous reprenons la même forme que lors de la création d'un Webhook, cependant on rajoute un paramètre celui du `id` de notre Webhook.

### Récupérer tous les Webhooks

Vous pouvez récupérer la liste de tous les Webhooks sous la forme d'un tableau :

```typescript
const Cocolis = require('cocolis'); // import in nodejs

const CocolisClient = new Cocolis({ live: false });

await CocolisClient.getAllWebhooks();
```

### Récupérer un Webhook

Il est possible de récupérer un Webhook précis sous la forme d'un objet en fournissant l'`id` du Webhook en paramètre :

```typescript
const Cocolis = require('cocolis'); // import in nodejs

const CocolisClient = new Cocolis({ live: false });

await CocolisClient.getWebhook(157);
```

### Supprimer un Webhook

En reprenant le même principe que pour **récupérer un Webhook**, vous pouvez le supprimer de cette façon :

```typescript
const Cocolis = require('cocolis'); // import in nodejs

const CocolisClient = new Cocolis({ live: false });

await CocolisClient.deleteWebhook(157);
```
