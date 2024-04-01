package oslomet.webprog.oblig2kino;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
//Setter dekoratør. Når en klasse merkes med RestController blir den oppdaget av Spring Boot og gjøres til et
//REST-endepunkt. Den håndterer HTTP-forespørsler. Ved forespørsel av en klient vil den sende ut et array av
//JSON-objekter (billettene)
@RestController
public class BestillingController {
    //Array som holder alle billettene
    public final List<Bestilling> billettRegister = new ArrayList<>();

    //Skal velge filmer fra en nedtrekkliste og trenger derfor et array for filmer.
    //Lage register over filmer på serversiden i et array
    //På klientsiden skal vi spørre om å få dette registeret
    //Filmregisteret skal intialiseres når web-applikasjonen starter.
    public final List<Film> filmRegister = new ArrayList<>();


    //Konstruktør for klassen BestillingController. Legger til filmer i arrayet filmRegister.
    //Konstruktøren sørger for at det alltid vil være filmer tilgjengelig når BestillingController-instansen opprettes.
    public BestillingController(){
        Film film1 = new Film("Dune: Part Two");
        filmRegister.add(film1);
        Film film2 = new Film("Oppenheimer");
        filmRegister.add(film2);
        Film film3 = new Film("Barbie");
        filmRegister.add(film3);
        Film film4 = new Film("Parasite");
        filmRegister.add(film4);
        Film film5 = new Film("Lord of the Rings");
        filmRegister.add(film5);
        Film film6 = new Film("Parasite");
        filmRegister.add(film6);
    }

    //Vi trenger en måte å hente filmregisteret fra server. Så vi trenger en ny mapping og den skal returnere
    // en liste med film-objekter.
    //GetMapping - annotasjon som forteller Spring Boot at når en slik Get-forespørsel blir sendt til hentFilmer,
    //Skal denne metoden utføres. Metoden har en returtype, så den returnerer en liste av film-objekter.
    //GET-henter data
    @GetMapping("/hentFilmer")
    public List<Film> hentFilmer(){
        return filmRegister;
    }

    //Begynner med lagre, her skal vi få en billett inn. Billetten legges i billettRegisteret
    //POST = Brukes til å sende data til server, enten for å lagre eller oppdatere. I dette tilfellet lagre.
    //Forteller Spring Boot at når en POST-forespørsel blir sendt til lagre-endepunktet skal denne metoden håndtere
    //forespørselen.
    @PostMapping("/lagre")
    public void lagre(Bestilling billett){
        billettRegister.add(billett);
    }
    //Metoden lagre forventer å få input av billett-objekt av klassen Bestilling.
    //billettobjektet legges til arrayet billettRegister.


    //GET = Hent data
    @GetMapping("/hentAlle")
    //Vi skal få returnert en liste med billettRegister objektene.
    public List<Bestilling> hentAlle(){ return billettRegister; }

    //GET = Hent data. Sletter alle elementer i arrayet. Trenger ikke skrive return her for den skal bare slette
    //elementene i arrayet og ikke returnere data.
    @GetMapping("/slettAlle")
    public void slettAlle(){
        billettRegister.clear();
    }
}


