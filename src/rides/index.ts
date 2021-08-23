import * as qs from 'querystringify';
import { Base } from '../base';
import { CanMatch, CanMatchParams, CreateParams } from './types';

const resourceName = 'rides';

export class Rides extends Base {
  can_match(params: CanMatchParams) {
    const query = `${resourceName}/can_match`;
    return this.requestAuthenticated<CanMatch>(query, {
      data: {
        from: params.from,
        to: params.to,
        volume: params.volume,
        content_value: params.content_value,
      },
      method: 'POST',
    });
  }
  
  mine() {
    const query = `${resourceName}/mine`;
    return this.requestAuthenticated<any>(query, {
      method: 'GET',
    });
  }

  create(params: CreateParams) {
    const query = `${resourceName}`;
    return this.requestAuthenticated<any>(query, {
      data: {
        ride: params
      },
      method: 'POST',
    });
  }
}
