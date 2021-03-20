import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { IGraphQLRequest, IRestRequest, RequestType } from './test.interface';

export abstract class ApiTest {
  app: INestApplication;
  authHeader = 'Authorization';
  authPrefix = 'Bearer';

  constructor(app: INestApplication, authHeader?: string, authPrefix?: string) {
    this.app = app;
    this.authHeader = this.authHeader || authHeader;
    this.authPrefix = this.authPrefix || authPrefix;
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

  setHeader(test: request.Test, field: string, val: string) {
    return test.set(field, val);
  }

  setAuthToken(test: request.Test, authToken: string) {
    return this.setHeader(
      test,
      this.authHeader,
      `${this.authPrefix} ${authToken}`,
    );
  }

  abstract request(req: any): request.Test;
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

  getCurrying(url: string) {
    return (authToken?: string) =>
      this.request({ method: 'GET', url, authToken });
  }

  bodyCurrying<BodyType>(method: RequestType) {
    return (url: string) => (authToken?: string) => (body?: BodyType) =>
      this.request({ url, method, authToken, body });
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

export function wrapper<T extends (...args: any[]) => any>(func: () => T): T {
  return <T>((...args: any[]) => {
    return func()(...args);
  });
}
