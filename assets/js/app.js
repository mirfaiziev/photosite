import $ from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';
import '../scss/index.scss';
import slickCarousel from 'slick-carousel';

import Image from './images'

window.$ = window.jQuery = $;

$(function() {
    Image.init();
    Image.initImageModal();
    $('#page-main-container').show();
    $('#page-loader').hide();
});