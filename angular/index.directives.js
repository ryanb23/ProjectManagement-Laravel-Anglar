import { RouteBodyClassComponent } from './directives/route-bodyclass/route-bodyclass.component'
import { PasswordVerifyClassComponent } from './directives/password-verify/password-verify.component'
import { ScrollToBottomComponent } from './directives/chat/scroll-to-bottom.component'
import { CsSelect } from './directives/custom/cs-select.component'
import { PgDropdown } from './directives/custom/pg-dropdown.component'
import { PgFormGroup } from './directives/custom/pg-form-group.component'
import { PgHorizontalMenu } from './directives/custom/pg-horizontal-menu.component'
import { PgHorizontalMenuToggle } from './directives/custom/pg-horizontal-menu.component'
import { PgNavigate } from './directives/custom/pg-navigate.component'
import { PgNotificationCenter } from './directives/custom/pg-notification-center.component'
import { PgPortlet } from './directives/custom/pg-portlet.component'
import { PgQuickview } from './directives/custom/pg-quickview.component'
import { PgSearch } from './directives/custom/pg-search.component'
import { PgSidebar } from './directives/custom/pg-sidebar.component'
import { PgTabDropdownfx } from './directives/custom/pg-tab-dropdownfx.component'
import { PgTab } from './directives/custom/pg-tab.component'
import { Skycons } from './directives/custom/skycons.component'
import { OnFinishRender } from './directives/custom/on-finish-render.component'

angular.module('app.components')
  .directive('routeBodyclass', RouteBodyClassComponent)
  .directive('passwordVerify', PasswordVerifyClassComponent)
  .directive('scrollToBottom', ScrollToBottomComponent)
  .directive('csSelect', CsSelect)
  .directive('pgDropdown', PgDropdown)
  .directive('pgFormGroup', PgFormGroup)
  .directive('pgHorizontalMenu', PgHorizontalMenu)
  .directive('pgHorizontalMenu', PgHorizontalMenuToggle)
  .directive('pgNavigate', PgNavigate)
  .directive('pgNotificationCenter', PgNotificationCenter)
  .directive('pgPortlet', PgPortlet)
  .directive('pgQuickview', PgQuickview)
  .directive('pgSearch', PgSearch)
  .directive('pgSidebar', PgSidebar)
  .directive('pgTabDropdownfx', PgTabDropdownfx)
  .directive('pgTab', PgTab)
  .directive('skycons', Skycons)
  .directive('onFinishRender', OnFinishRender)
  .directive('includeReplace', function() {
      return {
          require: 'ngInclude',
          restrict: 'A',
          link: function(scope, el) {
              el.replaceWith(el.children());
          }
      };
  })
  .directive('checkImage', function () {
      return {
         link: function(scope, element, attrs) {
            if(typeof element.attr('src') == 'undefined' || element.attr('src') == '')
                element.attr('src', 'dist/img/default.jpeg'); // set default image
            element.bind('error', function() {
                element.attr('src', 'dist/img/default.jpeg'); // set default image
            });
          }
      }
  });
