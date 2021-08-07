import * as qs from 'querystringify';
import { Base } from '../base';
import { CanMatchParams } from './types';

const resourceName = 'rides';

export class Rides extends Base {
  can_match(params: CanMatchParams) {
    const query = `${resourceName}/can_match`;
    return this.requestAuthenticated<CanMatchParams>(query, {
      data: {
        from: params.from,
        to: params.to,
        volume: params.volume,
        content_value: params.content_value,
      },
      method: 'POST',
    });
  }
}
