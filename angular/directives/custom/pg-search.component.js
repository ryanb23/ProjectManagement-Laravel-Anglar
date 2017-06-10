/* ============================================================
 * Directive: pgSearch
 * AngularJS directive for Pages Overlay Search jQuery plugin
 * ============================================================ */

pgSearch.$inject = ['$parse']
function pgSearch($parse) {
  return {
      restrict: 'A',
      link: function(scope, element, attrs) {
          angular.element(element).search();

          scope.$on('toggleSearchOverlay', function(scopeDetails, status) {
              if(status.show){
                  angular.element(element).data('pg.search').toggleOverlay('show');
              } else {
                  angular.element(element).data('pg.search').toggleOverlay('hide');
              }
          })

      }
  }
}

export const PgSearch = pgSearch
