import * as nock from 'nock';
import Cocolis from '..';

let nockBack = nock.back;

nockBack.setMode('record');
nockBack.fixtures = __dirname + '/fixtures/webhooks';

test('create webhook cocolis api', (resolve) => {
  const CocolisClient = new Cocolis({ live: false });

  nockBack('create.json', async (nockDone: any) => {
    const createWebhooksParams = {
      event: 'offer_accepted',
      url: 'https://www.cocolis.fr/ride_webhook',
      active: false,
    };

    await CocolisClient.sign_in({ app_id: 'e0611906', password: 'sebfie' });
    var r = await CocolisClient.createWebhook(createWebhooksParams);
    nockDone();
    expect(r.data.id).toBe(157);
    resolve();
  });
});

it('get webhook cocolis', (resolve) => {
  const CocolisClient = new Cocolis({ live: false });

  nock.back('get.json', async (nockDone: any) => {
    await CocolisClient.sign_in({ app_id: 'e0611906', password: 'sebfie' });
    var r = await CocolisClient.getWebhook(156);
    nockDone();
    expect(r.data.url).toBe('https://www.cocolis.fr/ride_webhook');
    resolve();
  });
});

it('get all webhooks cocolis', (resolve) => {
  const CocolisClient = new Cocolis({ live: false });

  nock.back('getall.json', async (nockDone: any) => {
    await CocolisClient.sign_in({ app_id: 'e0611906', password: 'sebfie' });
    var r = await CocolisClient.getAllWebhooks();
    nockDone();
    expect(r.status).toBe(200);
    resolve();
  });
});

it('delete webhook cocolis api', (resolve) => {
  const CocolisClient = new Cocolis({ live: false });

  nock.back('delete.json', async (nockDone: any) => {
    var auth = await CocolisClient.sign_in({ app_id: 'e0611906', password: 'sebfie' });
    var r = await CocolisClient.deleteWebhook(156);
    nockDone();
    expect(r.status).toBe(204);
    resolve();
  });
});

it('update webhook cocolis api', (resolve) => {
  const CocolisClient = new Cocolis({ live: false });

  nock.back('update.json', async (nockDone: any) => {
    var auth = await CocolisClient.sign_in({ app_id: 'e0611906', password: 'sebfie' });

    const updateWebhooksParams = {
      event: 'offer_accepted',
      url: 'https://www.updatecocolis.fr/ride_webhook',
      active: false,
    };

    var r = await CocolisClient.updateWebhook(157, updateWebhooksParams);
    nockDone();
    expect(r.status).toBe(200);
    resolve();
  });
});
