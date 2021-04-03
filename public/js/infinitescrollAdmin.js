//Esse vai ficar para o index, listas de usuarios-categorias-artigos no dashboard
//infinito de verdade para artigos por categoria!


//Scroll limitado com botão de mais e mensagem de acabou
let ias2 = new InfiniteAjaxScroll('.table', {
    item: 'tbody',
    next: '.next',
    pagination: '.pagination',
    trigger: '.load-more'
});

ias2.on('last', function() {
  let el = document.querySelector('.no-more');
  el.style.opacity = '1';
})

