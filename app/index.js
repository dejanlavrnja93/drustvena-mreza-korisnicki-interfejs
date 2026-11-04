function initiaize(){
    let addBtn = document.querySelector("#addBtn");

    addBtn.addEventListener("click", function(){
        window.location.href = "./userForm/userForm.html";
    });

    getAll();
}

function getAll(){
    fetch("http://localhost:5018/api/korisnici")
    .then(function(response){
        if (!response.ok){
            throw new Error("Greška pri učitavanju: " + response.status);
        }
        return response.json();
    })
    .then(function(korisnici){
        renderData(korisnici);
    })
    .catch(function(error){
        console.error(error);
        alert("Nije moguće učitati korisnike.");
    });
}
function renderData(korisnici){
    let tbody = document.querySelector("table tbody");
    let zaglavlje = document.querySelector("table thead");
    let poruka = document.querySelector("#no-data-message");

    tbody.innerHTML = "";

    if (korisnici.length === 0){
        zaglavlje.classList.add("hidden");
        poruka.classList.remove("hidden");
        return;
    }

    zaglavlje.classList.remove("hidden");
    poruka.classList.add("hidden");

    korisnici.forEach(function(korisnik){
        let red = document.createElement("tr");

        let korisnickoIme = document.createElement("td")
        korisnickoIme.textContent = korisnik.korisnickoIme;

        let ime = document.createElement("td");
        ime.textContent = korisnik.ime;

        let prezime = document.createElement("td");
        prezime.textContent = korisnik.prezime;

        let datumRodjenja = document.createElement("td");
        datumRodjenja.textContent = korisnik.datumRodjenja;

        let izmena = document.createElement("td");
        let izmeniBtn = document.createElement("button");
        izmeniBtn.textContent = "Izmeni";

        izmeniBtn.addEventListener("click", function(){
            window.location.href = "./userForm/userForm.html?id=" + korisnik.id;
        });

        izmena.appendChild(izmeniBtn);

        red.appendChild(korisnickoIme);
        red.appendChild(ime);
        red.appendChild(prezime);
        red.appendChild(datumRodjenja);
        red.appendChild(izmena);

        tbody.appendChild(red);
    });
}
document.addEventListener("DOMContentLoaded", initiaize);