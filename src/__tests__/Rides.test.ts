import * as nock from 'nock';
import Cocolis from '..';

nock.back.setMode('record');
nock.back.fixtures = __dirname + '/fixtures/rides';

it('can match on sandbox cocolis api', (resolve) => {
  resolve();
});
