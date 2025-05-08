import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pg from "pg";
import { serveStatic } from "@hono/node-server/serve-static";

const connectionString = process.env.DATABASE_URL;
const postgresql = connectionString
  ? new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } })
  : new pg.Pool({ user: "postgres", password: "postgres" });

const app = new Hono();
app.get("/api/railways", async (c) => {
  const result = await postgresql.query(`
    SELECT ST_AsGeoJSON(ST_Transform(senterlinje, 4326))::json AS geometry
    FROM banenettverk_cc734c5dc3204a9a821d69ffe8453e96.banelenke
    WHERE senterlinje IS NOT NULL;
  `);
  return c.json({
    type: "FeatureCollection",
    crs: { type: "name", properties: { name: "ESPG:4326" } },
    features: result.rows.map(
      ({ geometry: { coordinates, type }, ...properties }) => ({
        type: "Feature",
        geometry: { type, coordinates },
        properties,
      }),
    ),
  });
});
app.use("*", serveStatic({ root: "../dist" }));

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
serve({ fetch: app.fetch, port });
