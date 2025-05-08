[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/XamnFLGl)

*Eksamen KWS2100*

---

**Reiseplanleggeren**

Vår applikasjon kan brukes til å finne data angående reising og transport i Norge. 
Kartet er til god hjelp for turister eller andre reisende som ønsker å skaffe oversikt eller planlegge en reise. Man kan markere steder man har vært eller ønsker å dra og måle luftlinje og se areal, for å få et tydeligere bilde av avstander og områdestørelser. 
Vi har fremstilt knutepunker for transport; flyplasser, togstasjoner og toglinjer for dem som ikke kan reise med bil. 

Applikasjonen for den utforskende turisten, de kan bruke knappene vi har lagt til og selv velge hvilken data de vil se og hvordan den skal fremstilles. Hvis de skal reise utenlands er det for eksempel nyttig å se hvilke norske flyplasser som har internasjonale flyvninger. Det er også fint å kunne se hvilke områder som har flere togstasjoner. 

---

**Funksjonalitet**
1. Implementert backend med Heroku

2. Store datasett som vectortiles
   - Vi har brukt fire store datasett, ett av disse er på Heroku, tilgjengelig gjennom Hono. De tre resterende ligger i public i geojson-mappen.
   - Tre av disse datasettene er ikke tidligere benyttet under forelesningene eller øvingene i KWS2100.

3. Alle vektorlagene med selvvalgt data er stylet.
   - To av disse (Airport og TrainsStation) er klikkbare, og har overlays som viser data fra tabellene.
   - Disse vektorlagene kan man velge om skal være synlige via knapper i sidebaren.

4. Vi har implementert clustering på to av lagene; togstasjoner og flyplasser.
   - Flyplassene har i tilleg en sjekk basert på en feature. Når man har valgt clustering på flyplassene, og en flyplass er singel vil den ha ulik styling basert på om den har internasjonale flyvninger eller ikke.
  
5. Vi har lagt inn mulighet for å tegne på kartet med tre forskjellige typer geometrier.
    - Disse måler lengden (Dersom det er linje), og Omkrets/Areal og Radius (for sirkel og polygon).
    - Sirkel har en morsom tillegsfunksjon; partymode! Den endrer farge på sirklene.
    - Vi har også en angreknapp, og en slettknapp.

6. Man kan velge mellom tre ikoner å plassere på kartet.
   - Angreknappen og slettknappen fungerer for ikonene også.
  
7. Vi har minimap.

8. Vi har en knapp som zoomer ut, og viser hele Norge.

9. Vi har en kanpp som zoomer til nåværende posisjon. 
  
10. Vi har favikon for å gjøre nettsiden mer personlig og stilig.

11. Vi har stylet nettstedet med konsekvent styling med temaet vårt reising tatt i betraktning.

---

**Prosessen vår:**
- Vi gjorde grundig forarbeid før oppgaven ble tildelt, og gjorde oss tanker om hvilken data og funksjonalitet vi ville inkludere.
  
- Vi har arbeidet sammen under gjennomgående i prosjektet.
- Vi har brukt Github, og jevnlig Pushet kode til repositoryet med tydelige kommentarer.
- Under deler av utviklingen jobbet vi mer på en datamaskin av gangen, ettersom det ene gruppemedlemmet ikke fikk docker til å fungere.
- All kode er utviklet under tett samarbeid og sett over av hele gruppa før den har blitt merget.

- Opprinnelig hadde vi et GIGANTISK datasett med kulturminner, som fungerte lokalt, men dessverre ble for stort for Heroku. 





