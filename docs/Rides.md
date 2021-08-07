# Rides

Une Ride correspond à une annonce chez Cocolis. Vous trouverez plus de détail sur le model [ici](https://doc.cocolis.fr/docs/cocolis-api/docs/models/ride/ride-full.json)

### Récupérer toutes mes Rides

Vous pouvez récupérer toutes vos Rides créées en procédant comme suit :

```typescript
let response = await CocolisClient.mine();
```

### Vérifier la possibilité de réaliser une Ride

Vérifier si Cocolis sera disponible pour effectuer la livraison pour un trajet donné entre 2 points, avec l'option assurance si éligible.

```typescript
const canMatchParams = {
  from: {
    postal_code: '13001',
  },
  to: {
    postal_code: '31000',
  },
  volume: 500,
  content_value: 120000,
};

let response = await CocolisClient.can_match(canMatchParams);
```

<!-- theme: warning -->

> Tous nos prix sont en centimes

Voici un exemple de réponse en `JSON`:

```json
{
  "result": true,
  "estimated_prices": {
    "regular": 95500,
    "with_insurance": 96728
  },
  "insurance_detail": {
    "amount": 150100,
    "conditions_url": "https://www.cocolis.fr/static/docs/conditions_generales_assurance_COCOLIS_AO.pdf"
  },
  "rider_count": 0
}
```

### Créer une Ride

Vous pouvez créer une Ride comme dans l'exemple présenté ci-dessous (pour en savoir plus sur les paramètres cliquez [ici](https://doc.cocolis.fr/docs/cocolis-api/docs/models/ride/ride-create.v1.json)) :

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
