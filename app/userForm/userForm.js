function initializeForm() {
    let forma = document.querySelector("#user-form");
    forma.addEventListener("submit", saveUser);

    let cancelBtn = document.getElementById("cancelBtn");
    cancelBtn.addEventListener("click", function (){
        window.location.href = "../index.html";
    });

    let parametri = new URLSearchParams(window.location.search);
    let id = parametri.get("id");

    if(id){
        document.querySelector("#form-title").textContent = "Izmena korisnika";

        getUser(id);
    }
}

function getUser(id) {
    fetch("http://localhost:5018/api/korisnici/" + encodeURIComponent(id))
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Greška prilikom učitavanja korisnika: " + response.status);
        }
        return response.json();
    })
    .then(function(korisnik) {
        document.querySelector("#korisnickoIme").value = korisnik.korisnickoIme;
        document.querySelector("#ime").value = korisnik.ime;
        document.querySelector("#prezime").value = korisnik.prezime;
        document.querySelector("#datumRodjenja").value = korisnik.datumRodjenja.slice(0, 10);
    })
    .catch(function(error) {
        console.error(error);
        document.querySelector("#form-error").textContent = "Nije moguće učitati korisnika.";
    });
}

function saveUser(event) {
    event.preventDefault();

    let poruka = document.querySelector("#form-error");
    poruka.textContent = "";

    let parametri = new URLSearchParams(window.location.search);
    let id = parametri.get("id");

    let korisnik = {
        korisnickoIme: document.querySelector("#korisnickoIme").value.trim(),
        ime: document.querySelector("#ime").value.trim(),
        prezime: document.querySelector("#prezime").value.trim(),
        datumRodjenja: document.querySelector("#datumRodjenja").value
    };

    if(!korisnik.korisnickoIme || !korisnik.ime || !korisnik.prezime || !korisnik.datumRodjenja) {
        poruka.textContent = "Sva polja su obavezna.";
        return;
    }

    let method = "POST";
    let url = "http://localhost:5018/api/korisnici";

    if(id) {
        method = "PUT";
        url += "/" + encodeURIComponent(id);
        korisnik.id = Number(id);
    }

    let dugme = document.querySelector("#user-form button[type='submit']");
    dugme.disabled = true;

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(korisnik)
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Greška prilikom čuvanja korisnika: " + response.status);
        }
        window.location.href = "../index.html";
    })
    .catch(function(error) {
        console.error(error);
        poruka.textContent = error.message;
        dugme.disabled = false;
    });
}
document.addEventListener("DOMContentLoaded", initializeForm);