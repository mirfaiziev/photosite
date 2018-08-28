class Images
{
  static init($) {
    console.log('images init');
   $('.carousel').slick({
     arrows: true,
     lazyLoad: 'ondemand',
     autoplay: true,
     autoplaySpeed: 5000,
     // speed: 1000,
   });
  }
}

export default Images;