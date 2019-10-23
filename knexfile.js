module.exports = {
  development: {
    client: "pg",
    connection: "postgres://postgres:postgres@localhost:5432/bw_salties",
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/dev"
    },
    useNullAsDefault: true
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true
  }
};
