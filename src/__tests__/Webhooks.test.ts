import * as nock from 'nock';
import Cocolis from '..';

let nockBack = nock.back;

nockBack.setMode('record');
nockBack.fixtures = __dirname + '/fixtures/webhooks';

// test('create webhook cocolis api', async () => {
//   const CocolisClient = new Cocolis({ live: false });

//   nockBack('create.json', async (nockDone:any) => {
//     const createWebhooksParams = {
//       event: "offer_accepted", 
//       url: "https://www.cocolis.fr/ride_webhook", 
//       active: false
//     };

//     await CocolisClient.sign_in({ app_id: 'e0611906', password: 'sebfie' });
//     var r = await CocolisClient.createWebhook(createWebhooksParams);
//     nockDone();
//     expect(r.data.id).toBe(154);
//   });
// });

beforeEach(function (done) {
  if (!nock.isActive()) nock.activate()
  nock.cleanAll() // clean all pending mocks
  done()
})
  
it('get webhook cocolis', async () => {
  const CocolisClient = new Cocolis({ live: false });

  nockBack('get.json', async (nockDone:any) => {
    console.log('webhook get');
    await CocolisClient.sign_in({ app_id: 'e0611906', password: 'sebfie' });
    var r = await CocolisClient.getWebhook(156);
    nockDone();
    expect(r.data.url).toBe("https://www.cocolis.fr/ride_webhook");
  });
});


it('delete webhook cocolis api', async () => {
  const CocolisClient = new Cocolis({ live: false });

  nockBack('delete.json', async (nockDone:any) => {
    console.log('webhook delete');
    var auth = await CocolisClient.sign_in({ app_id: 'e0611906', password: 'sebfie' });
    var r = await CocolisClient.deleteWebhook(156);
    nockDone();
    expect(r.status).toBe(204);
  });
});

