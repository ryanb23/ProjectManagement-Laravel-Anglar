class ProjectViewController {
  constructor (API, $state, $stateParams, $scope, $sce, $compile, $filter, Lightbox) {
    'ngInject'

    let that = this

    this.projectId = $stateParams.projectId;
    this.$sce = $sce;
    this.$scope = $scope;
    this.$compile = $compile;
    this.$filter = $filter;
    this.$state = $state;
    this.API = API;
    this.Lightbox = Lightbox;

    this.projectRoute = API.all('projects');
    this.projectDetail = []
    this.images = [];
  }

  openLightboxModal(index) {
      this.Lightbox.openModal(this.images, index);
  }

  setImageUrls(params){
      for(var i=0; i<params.length; i++)
      {
          this.images.push({
              'url': 'pro_imgs/'+this.projectId+'/'+params[i]['filename'],
              'thumbUrl': 'pro_imgs/'+this.projectId+'/'+params[i]['filename'],
              'caption': params[i]['org_filename']
          });
      }
  }

  getProjectDetail(){
      var param = {'id':this.projectId}
      this.projectRoute.get('project',param).then((response) => {
          var result = response.plain().data
          this.projectDetail = result;
          this.setImageUrls(result.file);
      })
  }

  postProjectStatusUpdate(params){
      this.projectRoute.all('status-update').post(params).then((response) => {
          this.$state.go('app.projects',{ status: params.status});
      })
  }

  $onInit() {
     this.getProjectDetail();
  }
}

export const ProjectViewComponent = {
  templateUrl: './views/app/components/project-view/project-view.component.html',
  controller: ProjectViewController,
  controllerAs: 'vm',
  bindings: {}
}
