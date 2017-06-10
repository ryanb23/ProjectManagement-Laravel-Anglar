/* ============================================================
 * Directive: pgNotificationCenter
 * Shows a list of notifications in a dropdown in header
 * ============================================================ */

function pgNotificationCenter() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).on('click', function(event) {
                event.stopPropagation();
            });
            $(element).find('.toggle-more-details').on('click', function(event) {
                var p = $(this).closest('.heading');
                p.closest('.heading').children('.more-details').stop().slideToggle('fast', function() {
                    p.toggleClass('open');
                });
            });

        }
    }
}

export const PgNotificationCenter = pgNotificationCenter
