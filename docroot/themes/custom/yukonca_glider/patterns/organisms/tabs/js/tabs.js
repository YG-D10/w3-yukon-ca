/**
 * Isolate the context in an IIFE
 *
 * @param object $ jQuery object
 * @param object Drupal Drupal object
 * @param window window Current window object
 */

(function ($, Drupal, once) {
  /**
   * Main script for the current theme
   */
  Drupal.behaviors.tabsJS = {
    attach (context) {
      const tabContainer = $('.tabs', context);
      const winLocation = window.location;

      tabContainer.each(() => {
        /* Navigate to tab if it exists in the URL. */
        if (winLocation.hash.substr(0, 2) === '#!') {
          $(`a[data-toggle="tab"][href="#${winLocation.hash.substr(2)}"]`).tab('show');
        }

        $('a[data-toggle="tab"]', context).on('shown.bs.tab', (e) => {
          // On tab switch: update URL fragment.
          const hash = $(e.target).attr('href');
          const tabScrollPosition = 'center';
          if (hash.substr(0, 1) === '#') {
            winLocation.replace(`#!${hash.substr(1)}`);
          }
          const $activeTab = document.querySelector(`${hash}-tab`);
          $activeTab.scrollIntoView({ behavior: 'smooth', block: tabScrollPosition });
        });
      });
    },
  };

  /**
   * Script for the pills variant.
   */
  Drupal.behaviors.pillsJS = {
    attach (context) {
      $(once('arrows', '.pills-arrow .pills-btn-link', context)).click(function () {
        if ($(this).parent().hasClass('next-step')) {
          $('.nav-pills .active').parent().next('li').find('a').tab('show');
        } else if ($(this).parent().hasClass('prev-step')) {
          $('.nav-pills .active').parent().prev('li').find('a').tab('show');
        }
      });

      $('.nav-pills .nav-item').click(function () {
        $('.pills-arrow .btn-links').removeClass('hide');
        if ($('.nav-pills .nav-item:first-child a').hasClass('active')) {
          $('.pills-arrow .prev-step.btn-links').addClass('hide');
        }
        if ($('.nav-pills .nav-item:last-child a').hasClass('active')) {
          $('.pills-arrow .next-step.btn-links').addClass('hide');
        }
      });
    },
  };
}(jQuery, Drupal, once));
