/* ============================================================
 * Directive: pgDropdown
 * Prepare Bootstrap dropdowns to match Pages theme
 * ============================================================ */

function pgDropdown() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            var btn = angular.element(element).find('.dropdown-menu').siblings('.dropdown-toggle');
            var offset = 0;

            var padding = btn.actual('innerWidth') - btn.actual('width');
            var menuWidth = angular.element(element).find('.dropdown-menu').actual('outerWidth');

            if (btn.actual('outerWidth') < menuWidth) {
                btn.width(menuWidth - offset);
                angular.element(element).find('.dropdown-menu').width(btn.actual('outerWidth'));
            } else {
                angular.element(element).find('.dropdown-menu').width(btn.actual('outerWidth'));
            }

        }
    }
}

export const PgDropdown = pgDropdown
