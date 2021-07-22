import * as nock from 'nock';
import Cocolis from '..';

it('can match on sandbox cocolis api', async () => {
  // mount a cassette
  nock.back.setMode('record');
  nock.back.fixtures = __dirname + '/fixtures';

  let CocolisClient = new Cocolis({ live: false });

  nock.back('rides.json', async (nockDone) => {
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

    await CocolisClient.can_match(canMatchParams);
    nockDone();
  });
});
