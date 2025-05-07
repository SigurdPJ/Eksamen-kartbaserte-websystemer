import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pg from "pg";
import { serveStatic } from "@hono/node-server/serve-static";

const connectionString = process.env.DATABASE_URL;
const postgresql = connectionString
  ? new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } })
  : new pg.Pool({ user: "postgres", password: "postgres" });

const app = new Hono();
app.get("/api/culturalheritage", async (c) => {
  const result = await postgresql.query(
    "SELECT navn, opphav, st_transform(st_simplify(omrade, 100), 4326)::json as geometry FROM kulturminner_178e81c5b4f1432e84e3e50b55042a3e.lokalitet WHERE synlig = true LIMIT 1000",
  );
  return c.json({
    type: "FeatureCollection",
    crs: { type: "name", properties: { name: "ESPG:4326" } },
    features: result.rows
      .filter((row) => row.geometry !== null) // filter out null geometry
      .map(({ geometry: { coordinates, type }, ...properties }) => ({
        type: "Feature",
        geometry: { type, coordinates },
        properties,
      })),
  });
});
app.use("*", serveStatic({ root: "../dist" }));

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
serve({ fetch: app.fetch, port });
