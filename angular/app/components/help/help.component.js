class HelpController {
    constructor(API, $scope, ContextService, $anchorScroll) {
        'ngInject'
    }

    $onInit() {

    }
}

export const HelpComponent = {
    templateUrl: './views/app/components/home/home.component.html',
    controller: HelpController,
    controllerAs: 'vm',
    bindings: {}
}
