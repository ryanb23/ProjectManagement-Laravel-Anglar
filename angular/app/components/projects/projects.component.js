class ProjectsController {
  constructor ($scope) {
    'ngInject'
    $scope.test = 'test';
  }
}

export const ProjectsComponent = {
  templateUrl: './views/app/components/projects/projects.component.html',
  controller: ProjectsController,
  controllerAs: 'vm',
  bindings: {}
}
