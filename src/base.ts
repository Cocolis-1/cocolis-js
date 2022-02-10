import axios, { AxiosPromise } from 'axios';

type Config = {
  live: boolean;
  api_key?: string;
};

const API_SANDBOX = 'https://sandbox-api.cocolis.fr/api/v1/';
const API_PROD = 'https://api.cocolis.fr/api/v1/';

const FRONTEND_PROD = 'https://cocolis.fr/';
const FRONTEND_SANDBOX = 'https://sandbox.cocolis.fr/';

export abstract class Base {
  private live: boolean = false;
  private api_key?: string;
  private basePath: string;
  protected authParams: any;

  constructor(config: Config) {
    this.live = config.live || false;
    this.api_key = config.api_key;
    this.basePath = this.live ? API_PROD : API_SANDBOX;
  }

  protected request<T>(endpoint: string, options?: any, headers?: any): AxiosPromise<T> {
    const url = this.basePath + endpoint;
    const config = {
      ...options,
      ...{ headers },
    };

    return axios({
      url,
      ...config,
    });
  }

  protected requestAuthenticated<T>(endpoint: string, options?: any): AxiosPromise<T> {
    let headers = {} as any;
    let newOptions = {} as any;

    if (!this.api_key) {
      headers = {
        'access-token': this.authParams.access_token,
        client: this.authParams.client,
        expiry: this.authParams.expiry,
        uid: this.authParams.uid,
      };

      newOptions = {
        ...options,
        ...{ headers },
      };
    } else {
      headers = {
        'X-API-KEY': this.api_key,
      };

      newOptions = {
        ...options,
        ...{ headers },
      };
    }

    return this.request(endpoint, newOptions, headers);
  }
}
