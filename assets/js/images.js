class Images {
  static init() {
    //console.log('images init');
    $('.carousel').slick({
      arrows       : true,
      lazyLoad     : 'ondemand',
      autoplay     : true,
      autoplaySpeed: 5000,
      // speed: 1000,
    });
  }

  static initImageModal()
  {
    $('#fullSizeImageModal').on('show.bs.modal', function (event) {
      var target = $(event.relatedTarget);
      var fullImageModal = $(this);
      fullImageModal.find('.fullSizeImage').attr('src', target.data('fullImageSrc'));

    });

    $('.closeModal').on('click', function(event) {
      $('#fullSizeImageModal').modal('hide');
    });
  }
}

export default Images;