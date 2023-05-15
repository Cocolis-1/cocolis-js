import * as nock from 'nock';
import Cocolis from '..';

nock.back.setMode('record');
nock.back.fixtures = __dirname + '/fixtures/rides';

it('can match on sandbox cocolis api', (resolve) => {
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
      result: true,
      estimated_prices: {
        regular: 1485500,
        with_insurance: 1486500,
      },
      insurance_detail: {
        amount: 120000,
        conditions_url: 'https://www.cocolis.fr/static/docs/conditions_generales_assurance_COCOLIS_AO.pdf',
      },
      rider_count: 0,
    };

    var r = await CocolisClient.can_match(canMatchParams);
    nockDone();
    expect(r.data).toStrictEqual(data);
    resolve();
  });
});

it('get all rides on sandbox cocolis api', (resolve) => {
  let CocolisClient = new Cocolis({ live: false });

  nock.back('mine.json', async (nockDone) => {
    await CocolisClient.sign_in({ app_id: 'e0611906', password: 'sebfie' });

    var r = await CocolisClient.mine();
    nockDone();

    var data = {
      rides: [
        {
          id: 478,
          title: '30 Beanie',
          description: 'Livraison de la commande : Beanie vendue sur le site marketplace.',
          owner_id: 2,
          from_lat: 48.8365843138,
          to_lat: 48.8401554186,
          ga_sent: null,
          price: 55900,
          created_at: '2021-07-26T19:20:53.744+02:00',
          updated_at: '2021-07-26T19:20:53.782+02:00',
          from_lng: 2.23913599058,
          to_lng: 2.29355937244,
          from_is_flexible: false,
          from_pickup_date: '2021-07-26T19:20:53.000+02:00',
          to_is_flexible: false,
          to_pickup_date: '2021-08-16T00:00:00.000+02:00',
          is_packaged: true,
          is_passenger: false,
          volume: 15,
          environment: 'objects',
          deleted_at: null,
          slug: '30-beanie-2dc7c21f-d516-4507-8ee9-f3747ecbd251',
          rider_extra_information: 'Livraison de la commande : Beanie',
          from_need_help: true,
          from_need_help_floor: 0,
          from_need_help_elevator: false,
          from_need_help_furniture_lift: false,
          to_need_help: true,
          to_need_help_floor: 0,
          to_need_help_elevator: false,
          to_need_help_furniture_lift: false,
          state: 'api_pending',
          owner_status: 'sender',
          moderated_by: null,
          moderated_at: null,
          moderated_reason_content: null,
          completed_at: null,
          published_at: null,
          gat_sent: false,
          v2_id: null,
          last_activity_at: '2021-07-26T19:20:53.747+02:00',
          fees: 9500,
          validated_by_id: null,
          environment_kind: null,
          api_application_id: 1,
          seller_tracking: 'E97F91F822F9B9C6',
          buyer_tracking: '654F2ACDFB6514F2',
          external_id: '84',
          content_value: null,
          offers_count: 0,
          last_edited_at: '2021-07-26T19:20:53.793+02:00',
          last_standby_at: null,
          managed_by_id: null,
          is_automatic: true,
          sinister: false,
          removed_at: null,
          price_formula: null,
          has_heavy_objects: false,
          packaging_needed: false,
          rider_price: 46400,
          owner: {
            id: 2,
            last_sign_in_at: '2020-10-30T11:52:01.392+01:00',
            nickname: 'Selency M.',
            gender: 'M',
            business_name: null,
            phone_verified: true,
            role: 'developer',
            sign_up_finished: true,
            v2_id: null,
            deleted_at: null,
            rate: 4.8,
            banned_at: null,
            ride_automatic_allowed: false,
            rating_count: 10,
            email_verified: true,
            response_percent: 0,
            api_application: {
              id: 1,
              app_id: 'e0611906',
              name: 'Selency',
              description: null,
              user_id: 2,
              created_at: '2020-04-20T18:15:12.542+02:00',
              updated_at: '2021-07-27T18:16:57.303+02:00',
              reserve_amount: 0,
              balance: 36000000,
            },
            avatar:
              '/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBadz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2ba0653212de4902fbce250a16b23b1e3930809a/FAVICON%20SELENCY.png?disposition=attachment',
            avatar_key: 'stzcx17yvrcz5hr5r38ausg6jenu',
            kyc_validated: false,
            identity_validated: false,
            role_label: 'Partenaire de Cocolis',
          },
          ride_state_histories: [
            {
              id: 420,
              state: 'api_pending',
              previous_state: 'creating',
              created_at: '2021-07-26T19:20:53.760+02:00',
              updated_at: '2021-07-26T19:20:53.760+02:00',
              ride_id: 478,
              user_id: 2,
              event: 'put_on_api_pending!',
            },
          ],
          api_application: {
            id: 1,
            app_id: 'e0611906',
            name: 'Selency',
            description: null,
            user_id: 2,
            created_at: '2020-04-20T18:15:12.542+02:00',
            updated_at: '2021-07-27T18:16:57.303+02:00',
            reserve_amount: 0,
          },
          seller_availabilities: [],
          buyer_availabilities: [],
          previous_pay_in: false,
          conversations: {
            count: 0,
            unreaded_messages: 0,
          },
          from_address: 'BOULOGNE BILLANCOURT, 92100',
          to_address: 'PARIS 15, 75015',
          offers_made_by_others_count: 0,
          volume_only_for_pro: true,
          photos: [
            {
              id: 353,
              url: '/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1a8fc9d91f82db22263842267a5ab2ceda7d4246/beanie-2.jpg?disposition=attachment',
              url_key: 'hcc2tk4dmfmzogb8btpcl5qxw49w',
            },
          ],
          price_to_pay: 55900,
          ride_objects_attributes: [
            {
              id: 541,
              ride_id: 478,
              qty: 30,
              title: 'Beanie',
              length: 100,
              width: 100,
              height: 50,
              format: null,
              integer: null,
              created_at: '2021-07-26T19:20:53.757+02:00',
              updated_at: '2021-07-26T19:20:53.757+02:00',
              weight: 'between_5_and_30_kg',
              external_url: null,
            },
          ],
          application_name: 'Selency',
          ride_delivery_information: {
            from_address: '60 rue du Chemin Vert',
            from_postal_code: '92100',
            from_city: 'Boulogne-Billancourt',
            from_country: 'FR',
            from_contact_name: 'Cocolis',
            from_contact_phone: '+33 6 71 07 13 91',
            from_extra_information: 'Vendeur Marketplace',
            to_address: '111 rue Olivier de Serres',
            to_postal_code: '75015',
            to_city: 'Paris',
            to_country: 'FR',
            to_contact_name: 'Alexandre BETTAN',
            to_contact_phone: '+33 6 07 34 49 07',
            to_extra_information: null,
            to_delivery_date: null,
            to_address_substitute: null,
            to_postal_code_substitute: null,
            to_city_substitute: null,
            to_country_substitute: null,
            to_contact_name_substitute: null,
            to_contact_phone_substitute: null,
            to_extra_information_substitute: null,
          },
          delivery_confirmation_code: 8816,
        },
      ],
      total_count: 172,
    };

    expect(r.data).toStrictEqual(data);
    resolve();
  });
});

it('create ride on sandbox cocolis api', (resolve) => {
  let CocolisClient = new Cocolis({ live: false });

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

  const response = {
    id: 487,
    title: 'Canapé',
    description: 'Carcassonne vers toulu',
    owner_id: 2,
    from_lat: 43.212498,
    to_lat: 43.59912,
    ga_sent: null,
    price: 57000,
    created_at: '2021-08-05T20:16:22.019+02:00',
    updated_at: '2021-08-05T20:16:22.061+02:00',
    from_lng: 2.350351,
    to_lng: 1.444391,
    from_is_flexible: true,
    from_pickup_date: '2020-06-13T16:21:21.000+02:00',
    to_is_flexible: true,
    to_pickup_date: '2020-06-13T23:59:59.999+02:00',
    is_packaged: false,
    is_passenger: false,
    volume: 1.5,
    environment: 'objects',
    deleted_at: null,
    slug: 'canape-ac8ce6c2-bfdb-439f-99c9-51a9ea728632',
    rider_extra_information: 'Extra informations',
    from_need_help: false,
    from_need_help_floor: 0,
    from_need_help_elevator: false,
    from_need_help_furniture_lift: false,
    to_need_help: false,
    to_need_help_floor: 0,
    to_need_help_elevator: false,
    to_need_help_furniture_lift: false,
    state: 'api_pending',
    owner_status: 'sender',
    moderated_by: null,
    moderated_at: null,
    moderated_reason_content: null,
    completed_at: null,
    published_at: null,
    gat_sent: false,
    v2_id: null,
    last_activity_at: '2021-08-05T20:16:22.022+02:00',
    fees: 9700,
    validated_by_id: null,
    environment_kind: null,
    api_application_id: 1,
    seller_tracking: 'FA0C2E8CFA920809',
    buyer_tracking: '97A1668D84C73F42',
    external_id: null,
    content_value: null,
    offers_count: 0,
    last_edited_at: '2021-08-05T20:16:22.071+02:00',
    last_standby_at: null,
    managed_by_id: null,
    is_automatic: true,
    sinister: false,
    removed_at: null,
    price_formula: null,
    has_heavy_objects: false,
    packaging_needed: false,
    rider_price: 47300,
    owner: {
      id: 2,
      last_sign_in_at: '2020-10-30T11:52:01.392+01:00',
      nickname: 'Selency M.',
      gender: 'M',
      business_name: null,
      phone_verified: true,
      role: 'developer',
      sign_up_finished: true,
      v2_id: null,
      deleted_at: null,
      rate: 4.8,
      banned_at: null,
      ride_automatic_allowed: false,
      rating_count: 10,
      email_verified: true,
      response_percent: 0,
      api_application: {
        id: 1,
        app_id: 'e0611906',
        name: 'Selency',
        description: null,
        user_id: 2,
        created_at: '2020-04-20T18:15:12.542+02:00',
        updated_at: '2021-08-05T20:16:22.078+02:00',
        reserve_amount: 0,
        balance: 66000000,
      },
      avatar:
        '/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBadz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2ba0653212de4902fbce250a16b23b1e3930809a/FAVICON%20SELENCY.png?disposition=attachment',
      avatar_key: 'stzcx17yvrcz5hr5r38ausg6jenu',
      kyc_validated: false,
      identity_validated: false,
      role_label: 'Partenaire de Cocolis',
    },
    ride_state_histories: [
      {
        id: 432,
        state: 'api_pending',
        previous_state: 'creating',
        created_at: '2021-08-05T20:16:22.038+02:00',
        updated_at: '2021-08-05T20:16:22.038+02:00',
        ride_id: 487,
        user_id: 2,
        event: 'put_on_api_pending!',
      },
    ],
    api_application: {
      id: 1,
      app_id: 'e0611906',
      name: 'Selency',
      description: null,
      user_id: 2,
      created_at: '2020-04-20T18:15:12.542+02:00',
      updated_at: '2021-08-05T20:16:16.493+02:00',
      reserve_amount: 0,
    },
    seller_availabilities: [],
    buyer_availabilities: [],
    previous_pay_in: false,
    conversations: {
      count: 0,
      unreaded_messages: 0,
    },
    from_address: 'Carcassonne, 11000',
    to_address: 'Toulouse, 31000',
    offers_made_by_others_count: 0,
    volume_only_for_pro: false,
    photos: [
      {
        id: 369,
        url: '/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbkVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--847e6270d59b6d5ce263932ea5215779d75bf093/gettyimages-138310605.jpg?disposition=attachment',
        url_key: 'y450zhpq8zz8y6ln4lzmojfn70kn',
      },
      {
        id: 370,
        url: '/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbklCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e943056fec0080c041c0d3c87194c95b34131cea/41y16B5C6rL._SX311_BO1,204,203,200_.jpg?disposition=attachment',
        url_key: 'gr8g5tatxm17kq8cso6xxr02c4hz',
      },
    ],
    price_to_pay: 57000,
    ride_objects_attributes: [
      {
        id: 549,
        ride_id: 487,
        qty: 1,
        title: 'Canapé',
        length: null,
        width: null,
        height: null,
        format: 'xxl',
        integer: null,
        created_at: '2021-08-05T20:16:22.035+02:00',
        updated_at: '2021-08-05T20:16:22.035+02:00',
        weight: 'between_5_and_30_kg',
        external_url: null,
        exact_weight: null,
      },
    ],
    application_name: 'Selency',
  };

  nock.back('create.json', async (nockDone) => {
    await CocolisClient.sign_in({ app_id: 'e0611906', password: 'sebfie' });

    var r = await CocolisClient.create(createRideParams);
    nockDone();
    expect(r.data).toStrictEqual(response);
    resolve();
  });
});

it('delete ride on sandbox cocolis api', (resolve) => {
  let CocolisClient = new Cocolis({ live: false });

  const rideId = 42;

  nock.back('delete.json', async (nockDone) => {
    await CocolisClient.sign_in({ app_id: 'e0611906', password: 'sebfie' });

    var r = await CocolisClient.delete(rideId);
    nockDone();
    expect(r.status).toStrictEqual(204);
    resolve();
  });
});
