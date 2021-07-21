import * as qs from 'querystringify';
import { Base } from '../base';
import { AuthParams, AuthUserParams } from './types';

const resourceName = 'app_auth/sign_in';

export class Auth extends Base {
  sign_in(params: AuthParams) {
    const query = `${resourceName}`;
    return this.request<AuthUserParams>(query, {
      data: {
        app_id: params.app_id,
        password: params.password,
      },
      method: 'POST',
    }).then((r) => {
      this.authParams = {
        access_token: r.headers['access-token'],
        client: r.headers.client,
        expiry: r.headers.expiry,
        uid: r.headers.uid,
      };
    });
  }
}
