class HelpController {
    constructor(API, $scope, ContextService, $anchorScroll) {
        'ngInject'
    }

    $onInit() {

    }
}

export const HelpComponent = {
    templateUrl: './views/app/components/help/help.component.html',
    controller: HelpController,
    controllerAs: 'vm',
    bindings: {}
}
