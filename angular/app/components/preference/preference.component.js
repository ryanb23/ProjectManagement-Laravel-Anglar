class PreferenceController {
    constructor(API, $scope, $sce, $compile, $filter) {
        'ngInject'

        let that = this

        this.userRoute = API.all('users');
        this.preference = {
            "id": null,
            "post": 0 ,
            "upvote": 0 ,
            "comment": 0 ,
            "popular": 0 ,
            "approved": 0 ,
            "dismissed": 0
        };
    }

    getPreference(){
        this.userRoute.get('user-setting').then((response) => {
            let result = response.plain().data;
            if(result.length)
            {
                let data = result[0];
                this.preference.id          = data.id;
                this.preference.post        = (data.post == '1')? true: false
                this.preference.upvote      = (data.upvote == '1')? true: false
                this.preference.comment     = (data.comment == '1')? true: false
                this.preference.popular     = (data.popular == '1')? true: false
                this.preference.approved    = (data.approved == '1')? true: false
                this.preference.dismissed   = (data.dismissed == '1')? true: false
            }
        })
    }

    save(){
        this.userRoute.all('user-setting').post({data:this.preference}).then((response) => {

        })
    }
    $onInit() {
        this.getPreference()
    }
}

export const PreferenceComponent = {
    templateUrl: './views/app/components/preference/preference.component.html',
    controller: PreferenceController,
    controllerAs: 'vm',
    bindings: {}
}
