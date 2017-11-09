class ProjectsController {
  constructor (API, $state, $stateParams, $scope, $sce, $compile, $filter,$location, ContextService) {
    'ngInject'

    let that = this
    this.$sce = $sce;
    this.$scope = $scope;
    this.$compile = $compile;
    this.$filter = $filter;
    this.$state = $state;
    this.$location = $location;
    this.API = API;
    this.userData = [];
    this.status = null;
    if ($stateParams.status) {
      this.status = $stateParams.status;
    }

    this.totalProject = 0;
    this.countArr = {
        'opened' : 0,
        'approved' : 0,
        'dismissed' : 0
    }

    this.departmentRoute = API.all('departments');
    this.departments = [];

    this.projectRoute = API.all('projects');
    this.projects = [];
    this.filterName = null;
    this.filterTypes = [
        { 'name': 'By Date', 'value': 'by_date'},
        { 'name': 'By Likes', 'value': 'by_likes'},
    ]

    this.depSel = {'type':'dep','value': 'all'};
    this.statusArr = {};

    this.projectPagination ={
        'lastID'  : 1,
        'count' : 5,
        'busy'  : true,
        'end'   : false
    }

    this.imageTypeArr = [
        'image/gif',
        'image/png',
        'image/jpeg',
        'image/bmp',
        'image/webp'
    ]

    ContextService.me(function (data) {
        that.userData = data
        console.log(that.userData)
    })
  }

  detailView(project){
      this.$state.go('app.projects.view', {projectId: project.id})
  }

  editProject(id){
      this.$state.go('app.projects.edit', {projectId: id})
  }

  viewProfile(user)
  {
      let $state = this.$state
      $state.go('app.user.other-profile',{userId:user.id})
  }

  getDepartment() {
      this.departmentRoute.get('department-tree').then((response) => {
        var dep_list = response.plain().data
        this.departments = dep_list['treeData'];
        this.countArr = dep_list['countArr'];
        this.totalProject = dep_list['countArr']['all'];
      })
  }

  getProjects(depParam){
      this.depSel =  depParam;
      this.projectPagination ={
          'lastID'  : 1,
          'count' : 5,
          'busy'  : true,
          'end'   : false
      }
      this.projects = []
      this.getStatusInfo();
      this.loadProjects(depParam);
  }

  getStatusInfo(){
      let param = {
          'depParam': this.depSel
      }
      console.log(param)
      this.projectRoute.get('all-status',param).then((response) => {
          this.statusArr = response.plain().data;
      })
  }

  loadProjects(depParam){
      this.depSel =  depParam;
      let param = {
          'depParam'    : depParam,
          'order'       : this.filterName,
          'pagination'  : this.projectPagination
      }

      if(!this.projectPagination['end'])
        this.projectPagination['busy'] = true;

      this.projectRoute.get('all',param).then((response) => {
          var result = response.plain().data
          if(result.length)
          {
              this.projects = this.projects.concat(result);
              this.projectPagination['lastID'] ++;
          }else{
              this.projectPagination['end'] = true;
          }
          this.projectPagination['busy'] = false;
      })
  }

  getImageUrl(project_id, filename){
      return 'pro_imgs/' + project_id+ '/' + filename
  }

  trustAsHtml(value) {
      return this.$sce.trustAsHtml(value);
  };

  toggleVote(project_id,is_vote){
      if(!is_vote)
      {
          this.projectRoute.all('upvote').post({'project_id':project_id}).then((response) => {
              let project = this.projects.find(function(item){
                  return item.id == project_id;
              })
              project.votes_count ++;
              project.is_vote = true;
          });
      }else{
          this.projectRoute.all('downvote').post({'project_id':project_id}).then((response) => {
              let project = this.projects.find(function(item){
                  return item.id == project_id;
              })
              project.votes_count --;
              project.is_vote = false;
          });
      }
  }
  shareYammer(item){
      let url = this.$location.absUrl().split('?')[0]
      var options = {
        defaultMessage: item.title, //optionally pass a message to prepopulate your post
        pageUrl: url + '/' + item.id //current browser url is used by default. You can pass your own url if you want to generate the OG object from a different URL.
      };
      yam.platform.yammerShareOpenPopup(options);
  }

  filterSelect(){
      this.getProjects(this.depSel);
  }
  $onInit() {
      this.getDepartment();
      let param = this.depSel;

      if(this.status != null)
      {
          param.type = 'status';
          param.value = this.status;

      }
      this.getProjects(param);
  }
}

export const ProjectsComponent = {
  templateUrl: './views/app/components/projects/projects.component.html',
  controller: ProjectsController,
  controllerAs: 'vm',
  bindings: {}
}
