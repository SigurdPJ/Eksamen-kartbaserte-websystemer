import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;
const postgresql = connectionString
  ? new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } })
  : new pg.Pool({ user: "postgres", password: "postgres" });

const schema = "kulturminner_178e81c5b4f1432e84e3e50b55042a3e";

const app = new Hono();

app.get("/", (c) => c.text("Welcome to the Hono API!"));

app.get("/api/culturalheritage", async (c) => {
  const result = await postgresql.query(`
      SELECT navn, opphav, informasjon,
             ST_AsGeoJSON(ST_Transform(lokalitet.omrade, 4326)) AS geometry
      FROM ${schema}.lokalitet
      WHERE synlig = true
      LIMIT 1000
  `);

  return c.json({
    type: "FeatureCollection",
    crs: {
      type: "name",
    },
    features: result.rows.map(({ geometry, ...props }) => ({
      type: "Feature",
      properties: props,
      geometry: JSON.parse(geometry),
    })),
  });
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
console.log(`Server running on port ${port}`);
serve({ fetch: app.fetch, port });
