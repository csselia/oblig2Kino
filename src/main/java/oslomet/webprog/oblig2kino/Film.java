
package oslomet.webprog.oblig2kino;
//Lager en klasse for Film.
public class Film {
    private String navn;

    public Film(String navn) {
        this.navn = navn;
    }

    public Film() {
    }

    public String getNavn() {
        return navn;
    }

    public void setNavn(String navn) {
        this.navn = navn;

    }
}


