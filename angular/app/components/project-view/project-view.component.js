class ProjectViewController {
  constructor ($scope) {
    'ngInject'
    $scope.test = 'test';
  }
}

export const ProjectViewComponent = {
  templateUrl: './views/app/components/project-view/project-view.component.html',
  controller: ProjectViewController,
  controllerAs: 'vm',
  bindings: {}
}
