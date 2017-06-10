class OrganizationController {
  constructor ($scope) {
    'ngInject'

    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    $scope.series = ['Series A', 'Series B']
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ]

    $scope.onClick = function () {}

    $scope.pieLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales']
    $scope.pieData = [300, 500, 100]
  }
}

export const OrganizationComponent = {
  templateUrl: './views/app/components/organization/organization.component.html',
  controller: OrganizationController,
  controllerAs: 'vm',
  bindings: {}
}
