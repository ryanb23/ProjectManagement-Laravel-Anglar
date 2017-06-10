/* ============================================================
 * Directive: pgQuickview
 * AngularJS directive for Pages Overlay Search jQuery plugin
 * ============================================================ */

pgQuickview.$inject = ['$parse']
function pgQuickview($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var $quickview = $(element)
            $quickview.quickview($quickview.data())

        }
    }
}

export const PgQuickview = pgQuickview
