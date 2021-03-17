import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { IGraphQLRequest, IRestRequest, RequestType } from './test.interface';

export class ApiTest {
  app: INestApplication;
  authHeader = 'Authorization';
  authPrefix = 'Bearer';

  constructor(app: INestApplication, authHeader?: string, authPrefix?: string) {
    this.app = app;
    if (authHeader) this.authHeader = authHeader;
    if (authPrefix) this.authPrefix = authPrefix;
  }

  base() {
    return request(this.app.getHttpServer());
  }

  baseWithMethod(method: RequestType, url: string) {
    const base = this.base();
    if (method === 'GET') return base.get(url);
    if (method === 'POST') return base.post(url);
    if (method === 'PUT') return base.put(url);
    if (method === 'PATCH') return base.patch(url);
    if (method === 'DELETE') return base.delete(url);
  }

  setAuthToken(test: request.Test, authToken: string) {
    return test.set(this.authHeader, `${this.authPrefix} ${authToken}`);
  }
}

export class RestApiTest extends ApiTest {
  constructor(app: INestApplication) {
    super(app);
  }

  request({ method, url, body, authToken }: IRestRequest) {
    let base = this.baseWithMethod(method, url);
    if (authToken) base = this.setAuthToken(base, authToken);
    if (body) return base.send(body);
    return base.send();
  }
}

export class GraphQLApiTest extends ApiTest {
  endpoint = '/graphql';
  constructor(app: INestApplication, endpoint?: string) {
    super(app);
    if (endpoint) this.endpoint = endpoint;
  }

  request({ query, authToken }: IGraphQLRequest) {
    let base = this.baseWithMethod('POST', this.endpoint);
    if (authToken) base = this.setAuthToken(base, authToken);
    return base
      .send({ query })
      .expect(res => expect(res.body.errors).toBeUndefined());
  }
}
