import * as qs from 'querystringify';
import { Base } from '../base';
import { AuthParams, AuthUserParams } from './types';

const resourceName = 'app_auth/sign_in';

export class Auth extends Base {
  async sign_in(params: AuthParams) {
    const query = `${resourceName}`;
    const request = await this.request<AuthUserParams>(query, {
      data: {
        app_id: params.app_id,
        password: params.password,
      },
      method: 'POST',
    });

    this.authParams = {
      access_token: request.headers['access-token'],
      client: request.headers.client,
      expiry: request.headers.expiry,
      uid: request.headers.uid,
    };

    return request;
  }
}
