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

//----------//-----------MODAL DE PESQUISA MOBILE------------//-----------//
// Open the full screen search box
function openSearch() {
  document.getElementById("myOverlay").style.display = "flex";
}

// Close the full screen search box
function closeSearch() {
  document.getElementById("myOverlay").style.display = "none";
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
