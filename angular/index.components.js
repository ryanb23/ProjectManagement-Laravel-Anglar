import { LoginLoaderComponent } from './app/components/login-loader/login-loader.component'
import { ResetPasswordComponent } from './app/components/reset-password/reset-password.component'
import { ForgotPasswordComponent } from './app/components/forgot-password/forgot-password.component'
import { LoginFormComponent } from './app/components/login-form/login-form.component'
import { RegisterFormComponent } from './app/components/register-form/register-form.component'
import { NavSidebarComponent } from './app/components/nav-sidebar/nav-sidebar.component'
import { NavHeaderComponent } from './app/components/nav-header/nav-header.component'
import { ProjectCreateComponent } from './app/components/project-create/project-create.component'
import { ProjectEditComponent } from './app/components/project-edit/project-edit.component'
import { ProjectsComponent } from './app/components/projects/projects.component'
import { ProjectViewComponent } from './app/components/project-view/project-view.component'
import { ContactsComponent } from './app/components/contacts/contacts.component'
import { DashboardComponent } from './app/components/dashboard/dashboard.component'
import { QuickSearchComponent } from './app/components/quick-search/quick-search.component'
import { QuickViewComponent } from './app/components/quick-view/quick-view.component'
import { OrganizationComponent } from './app/components/organization/organization.component'
import { PreferenceComponent } from './app/components/preference/preference.component'
import { UserManagementComponent } from './app/components/user-management/user-management.component'
import { DepartmentManagementComponent } from './app/components/department-management/department-management.component'
import { RewardManagementComponent } from './app/components/reward-management/reward-management.component'
import { LabelManagementComponent } from './app/components/label-management/label-management.component'
import { JobtitleManagementComponent } from './app/components/jobtitle-management/jobtitle-management.component'
import { ProjectCommentComponent } from './app/components/project-comment/project-comment.component'
import { HelpComponent } from './app/components/help/help.component'
import { UserProfileComponent } from './app/components/user-profile/user-profile.component'
import { UserProfileEditComponent } from './app/components/user-profile-edit/user-profile-edit.component'
import { UserPasswordEditComponent } from './app/components/user-password-edit/user-password-edit.component'
import { UserProfileOtherComponent } from './app/components/user-profile-other/user-profile-other.component'

angular.module('app.components')
    .component('loginLoader', LoginLoaderComponent)
    .component('resetPassword', ResetPasswordComponent)
    .component('forgotPassword', ForgotPasswordComponent)
    .component('loginForm', LoginFormComponent)
    .component('registerForm', RegisterFormComponent)
    .component('navSidebar', NavSidebarComponent)
    .component('navHeader', NavHeaderComponent)
    .component('projectView', ProjectViewComponent)
    .component('projectCreate', ProjectCreateComponent)
    .component('projectEdit', ProjectEditComponent)
    .component('projects', ProjectsComponent)
    .component('contacts', ContactsComponent)
    .component('dashboard', DashboardComponent)
    .component('quickSearch', QuickSearchComponent)
    .component('quickView', QuickViewComponent)
    .component('organization', OrganizationComponent)
    .component('preference', PreferenceComponent)
    .component('userManagement', UserManagementComponent)
    .component('departmentManagement', DepartmentManagementComponent)
    .component('rewardManagement', RewardManagementComponent)
    .component('labelManagement', LabelManagementComponent)
    .component('jobtitleManagement', JobtitleManagementComponent)
    .component('projectComment', ProjectCommentComponent)
    .component('helpPage', HelpComponent)
    .component('userProfile', UserProfileComponent)
    .component('userProfileOther', UserProfileOtherComponent)
    .component('userProfileEdit', UserProfileEditComponent)
    .component('userPasswordEdit', UserPasswordEditComponent)
