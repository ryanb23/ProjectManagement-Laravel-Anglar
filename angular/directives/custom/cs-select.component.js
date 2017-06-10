/* ============================================================
 * Directive: csSelect
 * AngularJS directive for SelectFx jQuery plugin
 * https://github.com/codrops/SelectInspiration
 * ============================================================ */

csSelect.$inject = ['$compile']
function csSelect ($compile) {
  return {
      restrict: 'A',
      link: function (scope, element, attrs) {
          if (!window.SelectFx) return;

          var newElement = angular.element('<div class="cs-wrapper"></div>');
          element.wrap($compile(newElement)(scope));
          new SelectFx(element[0]);
      }
  };
}

export const CsSelect = csSelect
