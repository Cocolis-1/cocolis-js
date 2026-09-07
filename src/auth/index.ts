import * as qs from 'querystringify';
import { Base } from '../base';
import { AuthParams, UserAuth } from './types';

const resourceName = 'app_auth/sign_in';

export class Auth extends Base {
  /**
   * @deprecated Use an API key instead: `new Cocolis({ live, apiKey })`.
   * The API key is sent as the `X-API-KEY` header and needs no sign-in call.
   * Generate one from your developer account, see
   * https://doc.cocolis.fr/docs/installation-et-utilisation/authentification
   */
  async sign_in(params: AuthParams) {
    const query = `${resourceName}`;
    const request = await this.request<UserAuth>(query, {
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
