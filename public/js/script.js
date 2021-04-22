//----------//-----------MENU MOBILE------------//-----------//
function myFunction() {
  var x = document.getElementById("myLinks");
  var y = document.getElementById("menu__burguer")
  if (x.style.display === "block") {
    x.style.display = "none"
    y.style.backgroundColor = "white";
  } else {
    x.style.display = "block";
    y.style.backgroundColor = "#ccc";
  }
}

//----------//-----------MENU PERFIL------------//-----------//
function myFunction2() {
  var z = document.getElementById("seta-baixo")
  var y = document.getElementById("button__header");
  var x = document.getElementById("myLinks-2");
  if (x.style.display === "flex") {
    x.style.display = "none";
    y.style.backgroundColor = "#00BCD4"
    z.style.borderBottom = "none";
    z.style.borderTop = "5px solid white";
  } else {
    x.style.display = "flex";
    y.style.backgroundColor = "#006dd4"
    z.style.borderBottom = "5px solid white";
    z.style.borderTop = "none";
  }
}

//----------//-----------MODAL DE LOGIN------------//-----------//
// Abrir modal
function open_modal() {
  var modal = document.getElementById('id01');
  
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
}

//Fechar ao clicar fora do modal
window.onclick = function(event) { 
  var modal = document.getElementById('id01');
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

//----------//----------PARA PROFESSORES------------//-----------//

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

//--------//--------------//--------//
