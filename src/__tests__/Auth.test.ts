import * as nock from 'nock';
import Cocolis from '..';

it('make auth on sandbox cocolis api', function(done) {
  // mount a cassette
  // nock.back.fixtures = 'fixtures/auth.json'
  // nock.back.setMode('record')
  nock.recorder.rec({dont_print: true});

  const CocolisClient = new Cocolis({ live: false }) 
  CocolisClient.sign_in({app_id: 'e0611906', password: 'sebfie'}).then(r => {
    expect(r);

    // Eject the cassette when all your promises have been fulfilled
    done()
  });
})