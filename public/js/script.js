//----------//-----------MODAL DE LOGIN------------//-----------//
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}//-------FALTA VER O QUE TA ERRADO NO SCRIPT DE LOGIN

//----------//-----------MENU MOBILE------------//-----------//
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

//----------//-----------MENU PERFIL------------//-----------//
function myFunction2() {
  var x = document.getElementById("myLinks-2");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

//----------//-----------MODAL DE PESQUISA MOBILE------------//-----------//
// Open the full screen search box
function openSearch() {
  document.getElementById("myOverlay").style.display = "flex";
}

// Close the full screen search box
function closeSearch() {
  document.getElementById("myOverlay").style.display = "none";
}

//----------//-----------EFEITO NO MENU------------//-----------//
