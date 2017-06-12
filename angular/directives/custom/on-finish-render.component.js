/* ============================================================
 * Directive: onFinishRender
 * ============================================================ */

onFinishRender.$inject = ['$timeout']
function onFinishRender ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
        if (scope.$last === true) {
            $timeout(function () {
                scope.$emit(attr.onFinishRender);
            });
        }
    }
  };
}

export const OnFinishRender = onFinishRender
