import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;
const postgresql = connectionString
  ? new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } })
  : new pg.Pool({ user: "postgres", password: "postgres" });

const schema = "kulturminner_178e81c5b4f1432e84e3e50b55042a3e";

const app = new Hono();

/*
// CORS FIX
app.use("*", async (c, next) => {
  c.header("Access-Control-Allow-Origin", "http://localhost:5173");
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (c.req.method === "OPTIONS") {
    return c.body(null, 200);
  }

  return await next();
});*/

app.get("/api/culturalheritage", async (c) => {
  const result = await postgresql.query(`
      SELECT navn, opphav, informasjon, 
             ST_AsGeoJSON(ST_Transform(lokalitet.omrade, 4326)) AS geometry
      FROM ${schema}.lokalitet
      WHERE synlig = true
      LIMIT 9
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

serve(app);
