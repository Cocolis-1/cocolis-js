import * as fetchImport from 'isomorphic-unfetch';
import axios, { AxiosPromise } from 'axios';
const fetch = (fetchImport.default || fetchImport) as typeof fetchImport.default;

type Config = {
  live: boolean;
};

const API_SANDBOX = 'https://sandbox-api.cocolis.fr/api/v1/';
const API_PROD = 'https://api.cocolis.fr/api/v1/';

const FRONTEND_PROD = 'https://cocolis.fr/';
const FRONTEND_SANDBOX = 'https://sandbox.cocolis.fr/';

export abstract class Base {
  private live: boolean = false;
  private basePath: string;
  protected authParams: any;

  constructor(config: Config) {
    this.live = config.live || false;
    this.basePath = this.live ? API_PROD : API_SANDBOX;
  }

  protected request<T>(endpoint: string, options?: any): AxiosPromise<T> {
    const url = this.basePath + endpoint;

    const config = {
      ...options,
    };
    return axios({
      url,
      ...config,
    });
  }

  protected requestAuthenticated<T>(endpoint: string, options?: any): AxiosPromise<T> {
    const headers = {
      'access-token': this.authParams.access_token,
      client: this.authParams.client,
      expiry: this.authParams.expiry,
      uid: this.authParams.uid,
    };

    const newOptions = {
      ...options,
      ...{ headers },
    };
    return this.request(endpoint, newOptions);
  }
}
