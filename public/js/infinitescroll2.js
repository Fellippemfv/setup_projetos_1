//Esse vai ficar para o index, listas de usuarios-categorias-artigos no dashboard
//infinito de verdade para artigos por categoria!


//Scroll infinito e mensagem de acabou
let ias = new InfiniteAjaxScroll('.wrapper', {
    item: '.block',
    next: '.next',
    pagination: '.pagination'
});

ias.on('last', function() {
  let el = document.querySelector('.no-more');
  el.style.opacity = '1';
})

