DROP TABLE IF EXISTS kulturminne;

CREATE TABLE kulturminne AS
SELECT
    navn,
    opphav,
    st_transform(st_simplify(omrade, 100), 4326)::json AS geometry
FROM
    kulturminner_178e81c5b4f1432e84e3e50b55042a3e.lokalitet
WHERE
    synlig = true
    LIMIT 5000;

CREATE INDEX kulturminne_geometry_idx ON kulturminne USING GIST (geometry);