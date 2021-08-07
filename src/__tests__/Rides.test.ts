import * as nock from 'nock';
import Cocolis from '..';


nock.back.setMode('record');
nock.back.fixtures = __dirname + '/fixtures/rides';

it('can match on sandbox cocolis api', async () => {
  const CocolisClient = new Cocolis({ live: false });

  nock.back('canmatch.json', async (nockDone) => {
    await CocolisClient.sign_in({ app_id: 'e0611906', password: 'sebfie' });

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

    var data = {
      "result": true,
            "estimated_prices": {
                "regular": 1485500,
                "with_insurance": 1486500
            },
            "insurance_detail": {
                "amount": 120000,
                "conditions_url": "https://www.cocolis.fr/static/docs/conditions_generales_assurance_COCOLIS_AO.pdf"
            },
            "rider_count": 0
    }

    var r = await CocolisClient.can_match(canMatchParams);
    nockDone();

    expect(r.data).toStrictEqual(data);
  });
});

it('get all rides on sandbox cocolis api', async () => {
  let CocolisClient = new Cocolis({ live: false });

  nock.back('mine.json', async (nockDone) => {
    await CocolisClient.sign_in({ app_id: 'e0611906', password: 'sebfie' });

    var r = await CocolisClient.mine();
    nockDone();

    var data = {
      "rides": [
        {
            "id": 478,
            "title": "30 Beanie",
            "description": "Livraison de la commande : Beanie vendue sur le site marketplace.",
            "owner_id": 2,
            "from_lat": 48.8365843138,
            "to_lat": 48.8401554186,
            "ga_sent": null,
            "price": 55900,
            "created_at": "2021-07-26T19:20:53.744+02:00",
            "updated_at": "2021-07-26T19:20:53.782+02:00",
            "from_lng": 2.23913599058,
            "to_lng": 2.29355937244,
            "from_is_flexible": false,
            "from_pickup_date": "2021-07-26T19:20:53.000+02:00",
            "to_is_flexible": false,
            "to_pickup_date": "2021-08-16T00:00:00.000+02:00",
            "is_packaged": true,
            "is_passenger": false,
            "volume": 15,
            "environment": "objects",
            "deleted_at": null,
            "slug": "30-beanie-2dc7c21f-d516-4507-8ee9-f3747ecbd251",
            "rider_extra_information": "Livraison de la commande : Beanie",
            "from_need_help": true,
            "from_need_help_floor": 0,
            "from_need_help_elevator": false,
            "from_need_help_furniture_lift": false,
            "to_need_help": true,
            "to_need_help_floor": 0,
            "to_need_help_elevator": false,
            "to_need_help_furniture_lift": false,
            "state": "api_pending",
            "owner_status": "sender",
            "moderated_by": null,
            "moderated_at": null,
            "moderated_reason_content": null,
            "completed_at": null,
            "published_at": null,
            "gat_sent": false,
            "v2_id": null,
            "last_activity_at": "2021-07-26T19:20:53.747+02:00",
            "fees": 9500,
            "validated_by_id": null,
            "environment_kind": null,
            "api_application_id": 1,
            "seller_tracking": "E97F91F822F9B9C6",
            "buyer_tracking": "654F2ACDFB6514F2",
            "external_id": "84",
            "content_value": null,
            "offers_count": 0,
            "last_edited_at": "2021-07-26T19:20:53.793+02:00",
            "last_standby_at": null,
            "managed_by_id": null,
            "is_automatic": true,
            "sinister": false,
            "removed_at": null,
            "price_formula": null,
            "has_heavy_objects": false,
            "packaging_needed": false,
            "rider_price": 46400,
            "owner": {
                "id": 2,
                "last_sign_in_at": "2020-10-30T11:52:01.392+01:00",
                "nickname": "Selency M.",
                "gender": "M",
                "business_name": null,
                "phone_verified": true,
                "role": "developer",
                "sign_up_finished": true,
                "v2_id": null,
                "deleted_at": null,
                "rate": 4.8,
                "banned_at": null,
                "ride_automatic_allowed": false,
                "rating_count": 10,
                "email_verified": true,
                "response_percent": 0,
                "api_application": {
                    "id": 1,
                    "app_id": "e0611906",
                    "name": "Selency",
                    "description": null,
                    "user_id": 2,
                    "created_at": "2020-04-20T18:15:12.542+02:00",
                    "updated_at": "2021-07-27T18:16:57.303+02:00",
                    "reserve_amount": 0,
                    "balance": 36000000
                },
                "avatar": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBadz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2ba0653212de4902fbce250a16b23b1e3930809a/FAVICON%20SELENCY.png?disposition=attachment",
                "avatar_key": "stzcx17yvrcz5hr5r38ausg6jenu",
                "kyc_validated": false,
                "identity_validated": false,
                "role_label": "Partenaire de Cocolis"
            },
            "ride_state_histories": [
                {
                    "id": 420,
                    "state": "api_pending",
                    "previous_state": "creating",
                    "created_at": "2021-07-26T19:20:53.760+02:00",
                    "updated_at": "2021-07-26T19:20:53.760+02:00",
                    "ride_id": 478,
                    "user_id": 2,
                    "event": "put_on_api_pending!"
                }
            ],
            "api_application": {
                "id": 1,
                "app_id": "e0611906",
                "name": "Selency",
                "description": null,
                "user_id": 2,
                "created_at": "2020-04-20T18:15:12.542+02:00",
                "updated_at": "2021-07-27T18:16:57.303+02:00",
                "reserve_amount": 0
            },
            "seller_availabilities": [],
            "buyer_availabilities": [],
            "previous_pay_in": false,
            "conversations": {
                "count": 0,
                "unreaded_messages": 0
            },
            "from_address": "BOULOGNE BILLANCOURT, 92100",
            "to_address": "PARIS 15, 75015",
            "offers_made_by_others_count": 0,
            "volume_only_for_pro": true,
            "photos": [
                {
                    "id": 353,
                    "url": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1a8fc9d91f82db22263842267a5ab2ceda7d4246/beanie-2.jpg?disposition=attachment",
                    "url_key": "hcc2tk4dmfmzogb8btpcl5qxw49w"
                }
            ],
            "price_to_pay": 55900,
            "ride_objects_attributes": [
                {
                    "id": 541,
                    "ride_id": 478,
                    "qty": 30,
                    "title": "Beanie",
                    "length": 100,
                    "width": 100,
                    "height": 50,
                    "format": null,
                    "integer": null,
                    "created_at": "2021-07-26T19:20:53.757+02:00",
                    "updated_at": "2021-07-26T19:20:53.757+02:00",
                    "weight": "between_5_and_30_kg",
                    "external_url": null
                }
            ],
            "application_name": "Selency",
            "ride_delivery_information": {
                "from_address": "60 rue du Chemin Vert",
                "from_postal_code": "92100",
                "from_city": "Boulogne-Billancourt",
                "from_country": "FR",
                "from_contact_name": "Cocolis",
                "from_contact_phone": "+33 6 71 07 13 91",
                "from_extra_information": "Vendeur Marketplace",
                "to_address": "111 rue Olivier de Serres",
                "to_postal_code": "75015",
                "to_city": "Paris",
                "to_country": "FR",
                "to_contact_name": "Alexandre BETTAN",
                "to_contact_phone": "+33 6 07 34 49 07",
                "to_extra_information": null,
                "to_delivery_date": null,
                "to_address_substitute": null,
                "to_postal_code_substitute": null,
                "to_city_substitute": null,
                "to_country_substitute": null,
                "to_contact_name_substitute": null,
                "to_contact_phone_substitute": null,
                "to_extra_information_substitute": null
            },
            "delivery_confirmation_code": 8816
        }
    ],
    "total_count": 172
    }

    expect(r.data).toStrictEqual(data);
  });
});
