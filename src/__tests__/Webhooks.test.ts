import * as nock from 'nock';
import Cocolis from '..';

let nockBack = nock.back;

nockBack.setMode('record');
nockBack.fixtures = __dirname + '/fixtures/webhooks';

test('create webhook cocolis api', (resolve) => {
  const CocolisClient = new Cocolis({ live: false });

  nockBack('create.json', async (nockDone:any) => {
    const createWebhooksParams = {
      event: "offer_accepted",
      url: "https://www.cocolis.fr/ride_webhook",
      active: false
    };

    await CocolisClient.sign_in({ app_id: 'e0611906', password: 'sebfie' });
    var r = await CocolisClient.createWebhook(createWebhooksParams);
    nockDone();
    expect(r.data.id).toBe(157);
    resolve()
  });
});

it('get webhook cocolis', (resolve) => {
  const CocolisClient = new Cocolis({ live: false });

  nock.back('get.json', async (nockDone:any) => {
    await CocolisClient.sign_in({ app_id: 'e0611906', password: 'sebfie' });
    var r = await CocolisClient.getWebhook(156);
    nockDone();
    expect(r.data.url).toBe("https://www.cocolis.fr/ride_webhook");
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
  console.log('end delete webhook cocolis api');
});

