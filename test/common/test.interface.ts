export type RequestType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface IRestRequest {
  method: RequestType;
  url: string;
  body?: Object;
  authToken?: string;
}

export interface IGraphQLRequest {
  query: string;
  authToken?: string;
}
