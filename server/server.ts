import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pg from "pg";
import { serveStatic } from "@hono/node-server/serve-static";

const connectionString = process.env.DATABASE_URL;
const postgresql = connectionString
  ? new pg.Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    })
  : new pg.Pool({
      user: "postgres",
      password: "postgres",
    });

const app = new Hono();

// Updated API endpoint (now queries the simplified 'kulturminne' table)
app.get("/api/culturalheritage", async (c) => {
  try {
    const result = await postgresql.query(`
      SELECT 
        navn, 
        opphav, 
        geometry 
      FROM 
        kulturminne
      WHERE 
        geometry IS NOT NULL
    `);

    return c.json({
      type: "FeatureCollection",
      crs: { type: "name", properties: { name: "EPSG:4326" } },
      features: result.rows.map((row) => ({
        type: "Feature",
        geometry: row.geometry,
        properties: {
          navn: row.navn,
          opphav: row.opphav,
        },
      })),
    });
  } catch (error) {
    console.error("Database error:", error);
    return c.json({ error: "Failed to fetch cultural heritage data" }, 500);
  }
});

// Serve static files (e.g., React/Vite frontend)
app.use("*", serveStatic({ root: "../dist" }));

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
serve({ fetch: app.fetch, port });
