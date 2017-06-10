scrollToBottom.$inject = ['$timeout', '$window']
function scrollToBottom ($timeout,$window) {
  return {
        scope: {
            scrollToBottom: "="
        },
        restrict: 'A',
        link: function(scope, element, attr) {

            scope.$watchCollection('scrollToBottom', function(newVal) {
                if (newVal) {
                    $timeout(function() {
                        element[0].scrollTop =  element[0].scrollHeight;
                    }, 0);
                }

            });
        }
    };
}

export const ScrollToBottomComponent = scrollToBottom
