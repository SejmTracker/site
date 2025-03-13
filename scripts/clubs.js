// © 2024 vimedia

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');

function checkImageExistence(url) {
  const img = new Image();
  let result = false;

  img.onload = function() {
    if (img.complete && img.naturalWidth > 0) {
      result = true;  // Image exists
    }
  };

  img.onerror = function() {
    result = false; // Image doesn't exist
  };

  img.src = url;

  // Return false immediately (because the image is loading asynchronously)
  return result;
}

function getImg(url) {
  if(checkImageExistence(url)) {
    return url;
  } else {
    return "/assets/BrakIkony.png";
  }
}

let email;
let txt = "";
let multipleEmails = false;

fetch(`https://api.sejm.gov.pl/sejm/term10/clubs/${id}`)
.then(response => {
    if (!response.ok) {
      document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 300px; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć klubu.<br><br></p></center>`
      document.title = "Wystąpił błąd | SejmTracker";
      throw new Error('Network response was not ok');
    }
        return response.json();
})
.then(data => {
  if(data.email.includes(", ")) {
    email = data.email.split(", ");
    multipleEmails = true;
    console.log(email);
  }

    document.getElementById("photo").src = `https://api.sejm.gov.pl/sejm/term10/clubs/${id}/logo`;
    document.getElementById("name").textContent = data.name;
    document.getElementById("membersCount").textContent = data.membersCount;
    document.getElementById("phone").textContent = data.phone;
    document.getElementById("fax").textContent = data.fax;
    if(!multipleEmails) {
      document.getElementById("email").innerHTML = `<a href="mailto:${data.email}">${data.email}</a>`;
    } else {
      document.getElementById("email-form").innerHTML = `Adresy e-mail: <span id="email"></span>`;
      for(let i = 0; i < email.length; i++) {
        txt += `<a href="mailto:${email[i]}">${email[i]}</a>`
        if(i != email.length - 1) {
          txt += ", ";
        }
      }
      if(txt.includes("undefined")) txt.replace("undefined", "");
      document.getElementById("email").innerHTML = txt;
    }
    document.title = `${data.id} | SejmTracker`;
});

fetch(`https://api.sejm.gov.pl/sejm/term10/MP`)
.then(response => {
    if (!response.ok) {
      document.getElementById("info").innerHTML = `<center><p style="background-color: red; width: 20%; height: auto; border-radius: 20px;"><br><i class="fa-solid fa-triangle-exclamation"></i><br>BŁĄD<br>Nie można odnaleźć klubu.<br><br></p></center>`
      throw new Error('Network response was not ok');
    }
        return response.json();
})
.then(mpData => {
  let ids = [];
  for(let x = 0; x < mpData.length; x++) {
    if(mpData[x].club == id && mpData[x].active) {
      ids.push(x);
    }
  }
  console.log(ids);

  for(let i = 0; i < ids.length; i++) {
    if(mpData[ids[i]].active == true) {
        let divS = document.getElementById("tab");
        let table = document.createElement("table");
        let row = document.createElement("tr");
        let c1 = document.createElement("td");
        let c2 = document.createElement("td");
        table.id = `mp${ids[i]}`;
        table.className = "single";
        c1.innerHTML = `<img src="https://api.sejm.gov.pl/sejm/term10/MP/${mpData[ids[i]].id}/photo-mini">`;
        c2.innerHTML = `<p>${mpData[ids[i]].lastFirstName}`;
        table.addEventListener('click', function() {
            window.open(`/result/mp.html?id=${mpData[ids[i]].id}`);
        });
        row.appendChild(c1);
        row.appendChild(c2);
        table.appendChild(row);
        divS.appendChild(table);
    }
  }
})