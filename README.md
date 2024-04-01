# oblig2Kino

GitHub brukernavn: csselia
GitHub repo URL : https://github.com/csselia/oblig2Kino

Kort beskrivelse av applikasjon (5-10 setninger): 

Applikasjon for bestilling av kinobilletter. Bruker kan velge 
film og fylle ut feltene for personalia. Dette utgjør 
billettinformasjonen som vil vises i en tabell. Filmer velges 
fra en drop down meny. Det er satt valideringene på alle feltene 
slik at kun riktige inputs blir lagt inn i arrayet og skrevet ut 
i tabellen. Fornavn og etternavn kun bokstaver. Antall og 
telefonnummer med siffer, og e-post med alfanumeriske tegn, 
punktum, bindestrek og bestemt rekkefølge på brukernavn, @ og 
etternavn. Billettene kan slettes og det vil komme en feilmelding 
hvis ikke alle feltene er fylt ut.

Applikasjonen er stylet med Bootstrap. 

GetMapping: Hente data

PostMapping: Sende data til server for å lagre eller oppdatere

PostMapping - lagre
Når en kunde bestiller en billett legger de inn informasjon i inputfeltene. Vi lager et objekt av dette, kalt billettordre(POJO). Så sendes bilettOrdre til server, og vi bruker et POST kall. På server vil dette legges i et array.


GetMapping - vise billettarrayet
For å vise billetten på hjemmesiden har vi en funksjon som returnerer billettarrayet, gjennom GetMapping.

Getmapping - slett
Funksjon for å slette alle billettene på server.
Så vise billettarray-funksjonen for å vise det oppdaterte, tømte arrayet. 


