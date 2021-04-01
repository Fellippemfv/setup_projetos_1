// import if you use the NPM package (not needed if you use CDN)



let ias2 = new InfiniteAjaxScroll('.wrapper', {
    item: '.block',
    next: '.next',
    pagination: '.pagination'
  });

  ias2.on('last', function() {
    let el = document.querySelector('.no-more');
  
    el.style.opacity = '1';
  })

