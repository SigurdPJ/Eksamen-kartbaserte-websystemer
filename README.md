# Reiseplanlegger – Kartbasert Websystem

**Utviklet av Amalie Sanchez Ulriksen og Sigurd Jongers**.

Dette prosjektet ble utviklet som en del av eksamen i emnet **KWS2100 Kartbaserte Websystemer (Høst 2024)** ved **Høyskolen Kristiania**. Applikasjonen er ikke lenger deployet, men var opprinnelig tilgjengelig via Heroku.

## Om prosjektet

Reiseplanleggeren er en interaktiv webapplikasjon som visualiserer transportdata og geografisk informasjon i Norge. Den er utviklet med fokus på utforskning og teknisk kompleksitet. Brukere kan planlegge reiser, utforske transportknutepunkter og tegne egne geometrier direkte på kartet.

Prosjektet ble utviklet over tre intensive dager, med hovedfokus på funksjonalitet og teknisk gjennomføring. Estetisk design ble nedprioritert, ettersom dette ikke ble vurdert på denne spesefike eksamenen.

## Funksjonalitet

- Visualisering av flyplasser, togstasjoner og toglinjer
- Interaktive vektorlag med GeoJSON og vektortiles
- Klikkbare lag med informasjons-overlays
- Clustering av flyplasser og togstasjoner
- Feature-basert styling (Internasjonale flyvninger)
- Tegneverktøy: linje, sirkel og polygon med måling av avstand, areal og radius
- Dynamisk fargeendring (partymode) for sirkler
- Ikoner som kan plasseres og lagres via localStorage
- Navigasjonsfunksjoner: zoom til hele Norge og til brukerens posisjon
- Minimap og favicon for forbedret brukeropplevelse
- Konsekvent styling med reisetema og universell utforming

## Teknisk oppbygning

- Backend implementert med Hono og hostet på Heroku
- Et datasett tilgjengelig via backend-endepunkt
- Tre datasett i frontend
- Kartbasert visualisering av GeoJSON data
- Alle lag er stylet og interaktive
- Bruker localStorage for lagring av brukerdata

## Arbeidsprosess

- Prosjektet ble i tett samarbeid
- Bruk av GitHub med hyppige commits med tydelige kommentarer
- Grundig planlegging av datastruktur og funksjonalitet før oppstart
- Håndtering av tekniske utfordringer, inkludert begrensninger i Heroku: Opprinnelig datasett med kulturminner ble byttet ut på grunn av størrelse
