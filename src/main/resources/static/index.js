//Ready funksjon blir kjørt når nettsiden lastes inn.
$(function(){
    hentAlleFilmer();
});


//Hente alle filmer fra filmregisteret på serveren. IKKE registreringene i filmregisteret, men
//billettene som vi la INN i konstruktøren i BestillingController.
// Gjør dette gjennom getMapping hentFilmer og vi vil få filmer tilbake

function hentAlleFilmer(){
    //GET kall til endepunktet hentFilmer. Respons tilbake er array med filmRegister.
    //Disse filmene blir så sendt til funksjonen formaterFilmer.
    $.get("/hentFilmer", function (filmer){
        //Filmene vi får herifra sendes til ny funksjon som heter formaterFilmer
        formaterFilmer(filmer);
    });
}
//Denne funksjonen tar imot filmer som parameter.
function formaterFilmer(filmer){
    //Bygge dropdown-menyen som så skal settes inn i div i index.html
    let ut ="<select id='valgtFilm'>"
    let forrigeFilm = "";
    //Variabel for å lagre navnet på forrige film så det ikke legges dobbelt til//
    //sted for å lagre forrige film når vi går gjennom listen av filmer fra server
    ut+="<option>Velg film</option>";
    //Første alternativ i dropdown-menyen

    //Forløkke som itererer gjennom arrayet av filmer. Inni løkken sjekker vi om filmnavnet er det samme som forrige
    //film slik at samme film ikke legges til flere ganger i dropdown-menyen
    for(const film of filmer){
        if(film.navn != forrigeFilm){
            ut+="<option>" + film.navn + "</option>";
        }
        forrigeFilm = film.navn; //variabelen forrigeFilm oppdateres med gjeldende film slik at det kan
        //sammenliknes med neste film i løkken.
    }
    ut+= "</select>"; //fullføre dropdown-menyen
    $("#velgFilm").html(ut); //Setter HTML-innholdet til elementet med i VelgFilm til ut-variabelen med JQuery.
}


//Funksjon tar imot etternavn som parameter.
//Sjekker at etternavnet er innenfor kravene:
//bokstaver fra a til z , inkludert æ,ø,å i både små og store bokstaver.
//Lengden på etternavnet må være mellom 2 og 30 tegn.
function validerEtternavn(etternavn){
    const regexp = /^[a-zæøåA-ZÆØÅ. \-]{2,30}$/;
    const ok = regexp.test(etternavn); //Tester mot etternavn
   //Hvis etternavnet ikke er ok, så vil det vises en feilmelding.
    if(!ok){
        $("#feilEtternavn").html("Etternavn må bestå av 2 til 20 bokstaver");
        return false;
    }
    //betyr  gyldig i henhold til det regulære uttrykket. Feilmeldingen slettes.
    else{
        $("#feilEtternavn").html("");
        return true;
    }
}

function validerFornavn(fornavn){
    const regexp = /^[a-zæøåA-ZÆØÅ. \-]{2,30}$/;
    const ok = regexp.test(fornavn); //Tester mot fornavn.
    //Hvis fornavnet ikke er ok, så vil det vises en feilmelding.
    if(!ok){
        $("#feilFornavn").html("Fornavn må bestå av 2 til 20 bokstaver");
        return false;
    }
    //betyr  gyldig i henhold til det regulære uttrykket. Feilmeldingen slettes.
    else{
        $("#feilFornavn").html("");
        return true;
    }
}

function validerAntall(antall){
    const regexp =  /^[1-9]+$/;
    const ok = regexp.test(antall); //Tester mot antall
    //Hvis antallet ikke er ok, så vil det vises en feilmelding.
    if(!ok){
        $("#feilAntall").html("Tast inn et gyldig antall");
        return false;
    }
    //betyr  gyldig i henhold til det regulære uttrykket. Feilmeldingen slettes.
    else{
        $("#feilAntall").html("");
        return true;
    }
}


function validerTlf(telefonnummer){
    const regexp = /^\d{8}$/;
    const ok = regexp.test(telefonnummer); //Tester mot telefonnummer
    //Hvis telefonnummeret ikke er ok, så vil det vises en feilmelding.
    if(!ok){
        $("#feilTlf").html("Tast inn et gyldig telefonnummer");
        return false;
    }
    //betyr  gyldig i henhold til det regulære uttrykket. Feilmeldingen slettes.
    else{
        $("#feilTlf").html("");
        return true;
    }
}

function validerEpost(epost){
    const regexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const ok = regexp.test(epost); //Tester mot epost
    //Hvis epost ikke er ok, så vil det vises en feilmelding.
    if(!ok){
        $("#feilEpost").html("Tast inn en gyldig E-postadresse");
        return false;
    }
    //betyr  gyldig i henhold til det regulære uttrykket. Feilmeldingen slettes.
    else{
        $("#feilEpost").html("");
        return true;
    }
}

function validerFilm() {
    //Henter tekst fra det valgte alternativet i dropdown menyen og setter den lik variabelen valgtFilm.
    //Utfører deretter validering på valgtFilm.
    const valgtFilm = $("#velgFilm option:selected").text();

    if (valgtFilm === "Velg film") {
        $("#feilFilm").html("Du har ikke valgt film");
        return false;
    } else {
        $("#feilFilm").html("");
        return true;
    }
}


//Lager en funksjon som henter innverdiene og sjekker at det kun er når inputverdiene (har gjennomgått
//valideringsfunksjonene) at informasjonen kan registreres.
function validerOgLagreBillettOrdre(){
    const fornavnOK = validerFornavn($("#fornavn").val());
    const etternavnOK = validerEtternavn($("#etternavn").val());
    const antallOK = validerAntall($("#antall").val());
    const tlfOK = validerTlf($("#telefonnummer").val());
    const epostOk = validerEpost($("#epost").val());
    const filmok = validerFilm($("#velgFilm").val());
    if(fornavnOK && etternavnOK && antallOK && tlfOK && epostOk && filmok){
        registrer();
    }
    else {
$("#feilmelding").html("Alle felter må fylles ut!");
    }
}


//Lager et objekt for som inneholder inputfelt-verdiene
function registrer(){
    const billettOrdre =
        {
            velgFilm: $("#valgtFilm").val(),
            antall: $("#antall").val(),
            fornavn: $("#fornavn").val(),
            etternavn: $("#etternavn").val(),
            telefonnummer: $("#telefonnummer").val(),
            epost: $("#epost").val(),
        }

    //lagre er punkt på server vi skal sende til, billettOrdre er objekt vi sender, function når vi får svar fra server
    //Vi skal sende dette objektet til server. Vi bruker POST AJAX-kall.
    $.post("/lagre", billettOrdre, function(){
        //hente alle billettOrdre-objekter som ligger lagret på server for å vise de på websiden.
        hentAlle();
    });

    //Resette feltene i skjemaet
    $("#valgtFilm").val("Velg film");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#telefonnummer").val("");
    $("#epost").val("");
}

//Implementere hentBilleter-funksjonen
function hentAlle(){
    //GET AJAX kall mot server. Access-punkt er /hentAlle. Sender ingen argumenter inn til server.
    //Kun funksjonen som kalles når serveren svarer som vi skal implementere.
    //Vi skal få et svar fra server, et array med billetter
    //Arrayet skal sendes videre til en ny Javascriptfunksjon som heter formaterData
    $.get("/hentAlle", function (billetter){
        formaterData(billetter);
    });
}

//Vise billettene på siden. Header for hver type vi vil vise.
function formaterData(billetter){
    let ut="<table class='table table-striped'><tr><th>Valgt film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>E-post</th></tr>";

//Itererer med en forløkke gjennom arrayet som heter billetter, som vi får inn som et argument.
    for(const billett of billetter){
        //legge til ny rad for hver registrert billett. Henter ut feltene fra input fra billettobjektet og skjøter ut på let ut.
        ut+= "<tr><td>" + billett.velgFilm + "</td><td>" + billett.antall + "</td><td>" + billett.fornavn + "</td><td>" + billett.etternavn + "</td><td>" + billett.telefonnummer + "</td><td>" + billett.epost + "</td></tr>";
    }
    ut+="</table>";
    //Skrive ut nye ut-strengen til div element billettene.
    $("#billettene").html(ut);}


//AJAX Get request til /slettAlle-endepunktet på serveren ved å bruke jQuery's Get metode. Hvis den er suksessfull,
//utføres funksjonen hentAlle. Så vi kaller på slettAllefunksjonen, serveren svarer med å slette innholdet i arrayet
    //deretter kaller vi på hentAlle funksjonen for å oppdatere. hentAlle henter frem oppdaterte billettregisteret.

function slettAlle() {
    $.get( "/slettAlle", function() {
        hentAlle();
    });
}

//Nå har vi alt for å registrere en billett og vise dem på hjemmesiden. Nå skal det lages et Plain Old Javascript objekt, se Bestilling i Java.
