class ProjectCreateController {
  constructor ($scope) {
    'ngInject'
    $scope.test = 'test';
  }
}

export const ProjectCreateComponent = {
  templateUrl: './views/app/components/project-create/project-create.component.html',
  controller: ProjectCreateController,
  controllerAs: 'vm',
  bindings: {}
}
