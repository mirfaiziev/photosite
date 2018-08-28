import jQuery from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';
import '../scss/index.scss';
import slickCarousel from 'slick-carousel';

import Image from './images'

jQuery(function($) {
    Image.init($);
    $('#page-main-container').show();
    $('#page-loader').hide();

});