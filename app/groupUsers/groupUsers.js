function initialize(){
    let parametri = new URLSearchParams(window.location.search);
    let grupaId = parametri.get("id");
   
    if(!grupaId){
        alert("Nije izabrana grupa");
        return;
    }
    getGroupUsers(grupaId);
}

function getGroupUsers(grupaId){
    fetch("http://localhost:5018/api/clanstva/" + encodeURIComponent(grupaId))
        .then(function(response) {
            if(!response.ok){
                throw new Error("Greska prilikom učitavanja grupe" + response.status);
            }
            return response.json();
        })
        .then(function(korisnici) {
            renderData(korisnici);
        })
        .catch(function(error) {
            console.error(error);
            alert("Nije moguće učitati korisnike grupe.");
        });
}
function renderData(korisnici){
    let tbody = document.querySelector("table tbody");
    let zaglavlje = document.querySelector("table thead");
    let poruka = document.querySelector("#no-data-message");
    tbody.innerHTML = "";

    if(korisnici.length === 0){
        zaglavlje.classList.add("hidden");
        poruka.classList.remove("hidden");
        return;
    }
    zaglavlje.classList.remove("hidden");
    poruka.classList.add("hidden");
    
    korisnici.forEach(function(korisnik){
        let red = document.createElement("tr");

        let korisnickoIme= document.createElement("td");
        korisnickoIme.textContent = korisnik.korisnickoIme;
        
        let ime = document.createElement("td");
        ime.textContent = korisnik.ime;
        
        let prezime = document.createElement("td");
        prezime.textContent = korisnik.prezime;

        let datumRodjenja = document.createElement("td");
        datumRodjenja.textContent = korisnik.datumRodjenja;
        
        red.appendChild(korisnickoIme);
        red.appendChild(ime);
        red.appendChild(prezime);
        red.appendChild(datumRodjenja);

        tbody.appendChild(red);
    });
}

document.addEventListener("DOMContentLoaded", initialize);