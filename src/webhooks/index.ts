import {Base} from '../base';
import { CreateWebhook } from './types';

const resourceName = 'applications/webhooks';

export class Webhooks extends Base {
  createWebhook(params: CreateWebhook) {
    const query = `${resourceName}`;
    return this.requestAuthenticated<any>(query, {
      data: {
        event: params.event,
        url: params.url,
        active: params.active,
      },
      method: 'POST',
    });
  }

  getAllWebhooks() {
    const query = `${resourceName}`;
    return this.requestAuthenticated<any>(query, {
      method: 'GET',
    });
  }

  getWebhook(id: number) {
    const query = `${resourceName}/${id}`;
    return this.requestAuthenticated<any>(query, {
      method: 'GET',
    });
  }

  updateWebhook(id: number, params: CreateWebhook) {
    const query = `${resourceName}/${id}`;
    return this.requestAuthenticated<any>(query, {
      data: {
        event: params.event,
        url: params.url,
        active: params.active,
      },
      method: 'PUT',
    });
  }

  deleteWebhook(id: number) {
    const query = `${resourceName}/${id}`;
    return this.requestAuthenticated<any>(query, {
      method: 'DELETE',
    });
  }
}