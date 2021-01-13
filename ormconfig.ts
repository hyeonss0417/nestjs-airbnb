module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'phaphaya',
  database: 'nestjs_airbnb_dev',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'prod' ? false : true,
};

// NODE_ENV=DEV
// DATABASE_USER=root
// DATABASE_PASSWORD=phaphaya
// DATABASE_NAME_DEV=nestjs_airbnb_dev
// DATABASE_NAME_TEST=nestjs_airbnb_test
// DATABASE_NAME_PROD = nestjs_airbnb_prod;

// {
//   TEST: {
//     type: 'mysql',
//     host: 'localhost',
//     port: 3306,
//     username: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME_TEST,
//     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//     synchronize: true,
//   },
//   PROD: {
//     type: 'mysql',
//     host: 'localhost',
//     port: 3306,
//     username: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME_PROD,
//     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//     synchronize: false,
//   },
// };
