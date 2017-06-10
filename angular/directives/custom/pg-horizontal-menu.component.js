/* ============================================================
 * Directive: pgHorizontalMenu
 * AngularJS directive for Pages Horizontal Menu
 * ============================================================ */

pgHorizontalMenu.$inject = ['$parse']
function pgHorizontalMenu($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            $(document).on('click', '.horizontal-menu .bar-inner > ul > li', function(){
                $(this).toggleClass('open').siblings().removeClass('open');
            });

            $('.content').on('click', function () {
                $('.horizontal-menu .bar-inner > ul > li').removeClass('open');
            });
        }
    }
}

export const PgHorizontalMenu = pgHorizontalMenu

pgHorizontalMenuToggle.$inject = ['$parse']
function pgHorizontalMenuToggle($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            $(element).click(function(e) {
                e.preventDefault();
                $('body').toggleClass('menu-opened');
            });

        }
    }
}

export const PgHorizontalMenuToggle = pgHorizontalMenuToggle
