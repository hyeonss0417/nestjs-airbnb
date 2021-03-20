export const shouldHaveProperties = (object, properties: string[]) =>
  properties.forEach(property => expect(object).toHaveProperty(property));

export const isUser = data => {
  shouldHaveProperties(data, [
    'id',
    'firstName',
    'lastName',
    'email',
    'createdAt',
    'updatedAt',
  ]);
};

export const isJWT = data => {
  const JWTRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
  expect(data).toHaveProperty('accessToken');
  expect(data.accessToken).toMatch(JWTRegex); // JWT regex
};

export const isArrayOf = (data, callback: (t: any) => any) => {
  expect(data).toEqual(expect.any(Array));
  const comments = data as Comment[];
  comments.forEach(callback);
};
