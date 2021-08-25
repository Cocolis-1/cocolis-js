import * as nock from 'nock';
import Cocolis from '..';

// mount a cassette
nock.back.setMode('record');
nock.back.fixtures = __dirname + '/fixtures/auth';

it('make auth on sandbox cocolis api', async () => {
  nock.back('signin.json', async (nockDone) => {
    const CocolisClient = new Cocolis({ live: false });
    var r = await CocolisClient.sign_in({ app_id: 'e0611906', password: 'sebfie' });
    nockDone();

    var data = {
      data: {
        user_id: 2,
        id: 1,
        app_id: 'e0611906',
        name: 'Selency',
        description: null,
        created_at: '2020-04-20T18:15:12.542+02:00',
        updated_at: '2021-07-22T14:50:12.854+02:00',
        reserve_amount: 0,
      },
    };

    expect(r.data).toStrictEqual(data);
  });
});
