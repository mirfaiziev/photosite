class Images
{
  static init($) {
    console.log('images init');
    var $welcomeImageContainer = $('.welcome-image-container');
    var $welcomeImageCss = 'url("'+$welcomeImageContainer.data('src')+'")';
    $welcomeImageContainer.css(
      'background-image',
      $welcomeImageCss
    );
  }
}

export default Images;