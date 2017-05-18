(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/chat/chat.component.html',
    '<section class="app-content">\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-9">\n' +
    '            <div class="widget">\n' +
    '                <header class="widget-header">\n' +
    '                    <h4 class="widget-title">Sara Adams</h4>\n' +
    '                </header>\n' +
    '                <hr class="widget-separator">\n' +
    '                <div class="">\n' +
    '                    <div class="chat convo">\n' +
    '                        <ul class="chat-body">\n' +
    '                            <li class="answer left">\n' +
    '                                <div class="avatar">\n' +
    '                                    <img alt="User name" src="eficos/img/208.jpg">\n' +
    '                                    <div class="status offline"></div>\n' +
    '                                </div>\n' +
    '                                <div class="name">Alexander Herthic</div>\n' +
    '                                <div class="text">\n' +
    '                                    Lorem ipsum dolor amet, consectetur adipisicing elit Lorem ipsum dolor amet, consectetur adipisicing elit Lorem ipsum dolor amet, consectetur adiping elit\n' +
    '                                </div>\n' +
    '                                <div class="time">5 min ago</div>\n' +
    '                            </li>\n' +
    '                            <li class="answer right">\n' +
    '                                <div class="avatar">\n' +
    '                                    <img alt="User name" src="eficos/img/221.jpg">\n' +
    '                                    <div class="status offline"></div>\n' +
    '                                </div>\n' +
    '                                <div class="name">Alexander Herthic</div>\n' +
    '                                <div class="text">\n' +
    '                                    Lorem ipsum dolor amet, consectetur adipisicing elit Lorem ipsum dolor amet, consectetur adipisicing elit Lorem ipsum dolor amet, consectetur adiping elit\n' +
    '                                </div>\n' +
    '                                <div class="time">5 min ago</div>\n' +
    '                            </li>\n' +
    '                            <li class="answer left">\n' +
    '                                <div class="avatar">\n' +
    '                                    <img alt="User name" src="eficos/img/208.jpg">\n' +
    '                                    <div class="status online"></div>\n' +
    '                                </div>\n' +
    '                                <div class="name">Alexander Herthic</div>\n' +
    '                                <div class="text"> ...</div>\n' +
    '                                <div class="time">5 min ago</div>\n' +
    '                            </li>\n' +
    '                            <li class="answer right">\n' +
    '                                <div class="avatar">\n' +
    '                                    <img alt="User name" src="eficos/img/221.jpg">\n' +
    '                                    <div class="status busy"></div>\n' +
    '                                </div>\n' +
    '                                <div class="name">Alexander Herthic</div>\n' +
    '                                <div class="text">\n' +
    '                                    It is a long established fact that a reader will be. Thanks Mate!\n' +
    '                                </div>\n' +
    '                                <div class="time">5 min ago</div>\n' +
    '                            </li>\n' +
    '                            <li class="answer left">\n' +
    '                                <div class="avatar">\n' +
    '                                    <img alt="User name" src="eficos/img/208.jpg">\n' +
    '                                    <div class="status offline"></div>\n' +
    '                                </div>\n' +
    '                                <div class="name">Alexander Herthic</div>\n' +
    '                                <div class="text">\n' +
    '                                    Lorem ipsum dolor amet, consectetur adipisicing elit Lorem ipsum dolor amet, consectetur adipisicing elit Lorem ipsum dolor amet, consectetur adiping elit\n' +
    '                                </div>\n' +
    '                                <div class="time">5 min ago</div>\n' +
    '                            </li>\n' +
    '                            <li class="answer right">\n' +
    '                                <div class="avatar">\n' +
    '                                    <img alt="User name" src="eficos/img/221.jpg">\n' +
    '                                    <div class="status offline"></div>\n' +
    '                                </div>\n' +
    '                                <div class="name">Alexander Herthic</div>\n' +
    '                                <div class="text">\n' +
    '                                    Lorem ipsum dolor amet, consectetur adipisicing elit Lorem ipsum dolor amet, consectetur adipisicing elit Lorem ipsum dolor amet, consectetur adiping elit\n' +
    '                                </div>\n' +
    '                                <div class="time">5 min ago</div>\n' +
    '                            </li>\n' +
    '                            <li class="answer left">\n' +
    '                                <div class="avatar">\n' +
    '                                    <img alt="User name" src="eficos/img/208.jpg">\n' +
    '                                    <div class="status offline"></div>\n' +
    '                                </div>\n' +
    '                                <div class="name">Alexander Herthic</div>\n' +
    '                                <div class="text"> ...</div>\n' +
    '                                <div class="time">5 min ago</div>\n' +
    '                            </li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '                    <footer class="chat-input">\n' +
    '                        <input placeholder="Write a message">\n' +
    '                        <span class="answer-btn answer-btn-1"></span>\n' +
    '                        <span class="answer-btn answer-btn-2"></span>\n' +
    '                    </footer>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</section>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/contacts/contacts.component.html',
    '<section class="app-content">\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-2">\n' +
    '            <div class="app-action-panel" id="contacts-action-panel">\n' +
    '                <div class="action-panel-toggle" data-toggle="class" data-target="#contacts-action-panel" data-class="open"><i class="fa fa-chevron-right"></i> <i class="fa fa-chevron-left"></i></div>\n' +
    '                <div id="categories-list" class="app-actions-list scrollable-container">\n' +
    '                    <div class="list-group">\n' +
    '                        <h4>Departements</h4>\n' +
    '                        <a href="#" class="list-group-item">\n' +
    '                            <div class="item-data">\n' +
    '                                <span class="label-text">Finance</span>\n' +
    '                                <span class="pull-right hide-on-hover">70</span>\n' +
    '                            </div>\n' +
    '                        </a>\n' +
    '                        <a href="#" class="list-group-item">\n' +
    '                            <div class="item-data">\n' +
    '                                <span class="label-text">Human<br/>resources</span>\n' +
    '                                <span class="pull-right hide-on-hover">50</span>\n' +
    '                            </div>\n' +
    '                        </a>\n' +
    '                        <a href="#" class="list-group-item">\n' +
    '                            <div class="item-data">\n' +
    '                                <span class="label-text">Legal</span>\n' +
    '                                <span class="pull-right hide-on-hover">170</span>\n' +
    '                            </div>\n' +
    '                        </a>\n' +
    '                        <a href="#" class="list-group-item">\n' +
    '                            <div class="item-data">\n' +
    '                                <span class="label-text">Technology</span>\n' +
    '                                <span class="pull-right hide-on-hover">210</span>\n' +
    '                            </div>\n' +
    '                        </a>\n' +
    '                    </div>\n' +
    '                    <hr class="m-0 m-b-md" style="border-color: #ddd">\n' +
    '                    <div class="list-group">\n' +
    '                        <a href="#" class="list-group-item">\n' +
    '                            <span>All Departements</span>\n' +
    '                        </a>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="m-h-md"></div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="col-md-10">\n' +
    '            <div class="row">\n' +
    '                <div class="col-md-12">\n' +
    '                    <div class="mail-toolbar m-b-lg">\n' +
    '                        <div role="group" class="btn-group pull-left">\n' +
    '                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Filter\n' +
    '                                <span class="caret"></span>\n' +
    '                            </button>\n' +
    '                            <ul class="dropdown-menu">\n' +
    '                                <li><a href="#">Date</a></li>\n' +
    '                                <li><a href="#">Involvement</a></li>\n' +
    '                            </ul>\n' +
    '                        </div>\n' +
    '                        <div class="btn-group pull-left col-md-9">\n' +
    '                            <div class="form-group">\n' +
    '                                <input class="form-control promo-search-field" placeholder="What are you looking for" type="search">\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="btn-group pull-right" role="group">\n' +
    '                            <a href="#" class="btn btn-default">\n' +
    '                                <i class="fa fa-chevron-left"></i>\n' +
    '                            </a>\n' +
    '                            <a href="#" class="btn btn-default">\n' +
    '                                <i class="fa fa-chevron-right"></i>\n' +
    '                            </a>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="panel panel-default">\n' +
    '                <div class="panel-heading bg-white">\n' +
    '                    <p class="panel-title text-muted">About 512 results (.03 second)</p>\n' +
    '                </div>\n' +
    '                <div class="panel-body">\n' +
    '                    <div class="row m-b-lg">\n' +
    '                        <div class="col-md-4 col-sm-6">\n' +
    '                            <div class="user-card contact-item">\n' +
    '                                <div class="media">\n' +
    '                                    <div class="media-left">\n' +
    '                                        <div class="avatar avatar-lg avatar-circle">\n' +
    '                                            <a href="#profile">\n' +
    '                                                <img src="eficos/img/221.jpg" alt="">\n' +
    '                                            </a>\n' +
    '                                            <i class="status status-online"></i>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <div class="media-body">\n' +
    '                                        <h5 class="media-heading">\n' +
    '                                            <a href="#profile" class="title-color">John Doe</a>\n' +
    '                                        </h5>\n' +
    '                                        <small class="media-meta">Web Developer</small>\n' +
    '                                        <div class="contact-item-actions">\n' +
    '                                            <a href="javascript:void(0)" data-toggle="modal" data-target="#deleteItemModal" class="btn btn-success">\n' +
    '                                                <i class="fa fa-plus"></i>\n' +
    '                                            </a>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="col-md-4 col-sm-6">\n' +
    '                            <div class="user-card contact-item">\n' +
    '                                <div class="media">\n' +
    '                                    <div class="media-left">\n' +
    '                                        <div class="avatar avatar-lg avatar-circle">\n' +
    '                                            <a href="#profile">\n' +
    '                                                <img src="eficos/img/210.jpg" alt="">\n' +
    '                                            </a>\n' +
    '                                            <i class="status status-offline"></i>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <div class="media-body">\n' +
    '                                        <h5 class="media-heading">\n' +
    '                                            <a href="#" class="title-color">Ibraham Said</a>\n' +
    '                                        </h5>\n' +
    '                                        <small class="media-meta">Web Designer</small>\n' +
    '                                        <div class="contact-item-actions">\n' +
    '                                            <a href="javascript:void(0)" data-toggle="modal" data-target="#deleteItemModal" class="btn btn-success">\n' +
    '                                                <i class="fa fa-plus"></i>\n' +
    '                                            </a>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="col-md-4 col-sm-6">\n' +
    '                            <div class="user-card contact-item">\n' +
    '                                <div class="media">\n' +
    '                                    <div class="media-left">\n' +
    '                                        <div class="avatar avatar-lg avatar-circle">\n' +
    '                                            <a href="#profile">\n' +
    '                                                <img src="eficos/img/211.jpg" alt="">\n' +
    '                                            </a>\n' +
    '                                            <i class="status status-away"></i>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <div class="media-body">\n' +
    '                                        <h5 class="media-heading">\n' +
    '                                            <a href="#profile" class="title-color">Sally Adams</a>\n' +
    '                                        </h5>\n' +
    '                                        <small class="media-meta">Graphical Designer</small>\n' +
    '                                        <div class="contact-item-actions">\n' +
    '                                            <a href="javascript:void(0)" data-toggle="modal" data-target="#deleteItemModal" class="btn btn-success">\n' +
    '                                                <i class="fa fa-plus"></i>\n' +
    '                                            </a>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="col-md-4 col-sm-6">\n' +
    '                            <div class="user-card contact-item">\n' +
    '                                <div class="media">\n' +
    '                                    <div class="media-left">\n' +
    '                                        <div class="avatar avatar-lg avatar-circle">\n' +
    '                                            <a href="#profile">\n' +
    '                                                <img src="eficos/img/212.jpg" alt="">\n' +
    '                                            </a>\n' +
    '                                            <i class="status status-offline"></i>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <div class="media-body">\n' +
    '                                        <h5 class="media-heading">\n' +
    '                                            <a href="#profile" class="title-color">Jeffery Way</a>\n' +
    '                                        </h5>\n' +
    '                                        <small class="media-meta">Software Engineer</small>\n' +
    '                                        <div class="contact-item-actions">\n' +
    '                                            <a href="javascript:void(0)" data-toggle="modal" data-target="#deleteItemModal" class="btn btn-success">\n' +
    '                                                <i class="fa fa-plus"></i>\n' +
    '                                            </a>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="col-md-4 col-sm-6">\n' +
    '                            <div class="user-card contact-item">\n' +
    '                                <div class="media">\n' +
    '                                    <div class="media-left">\n' +
    '                                        <div class="avatar avatar-lg avatar-circle">\n' +
    '                                            <a href="#profile">\n' +
    '                                                <img src="eficos/img/213.jpg" alt="">\n' +
    '                                            </a>\n' +
    '                                            <i class="status status-away"></i>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <div class="media-body">\n' +
    '                                        <h5 class="media-heading">\n' +
    '                                            <a href="#profile" class="title-color">Jane Doe</a>\n' +
    '                                        </h5>\n' +
    '                                        <small class="media-meta">UI Designer</small>\n' +
    '                                        <div class="contact-item-actions">\n' +
    '                                            <a href="javascript:void(0)" data-toggle="modal" data-target="#deleteItemModal" class="btn btn-success">\n' +
    '                                                <i class="fa fa-plus"></i>\n' +
    '                                            </a>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="col-md-4 col-sm-6">\n' +
    '                            <div class="user-card contact-item">\n' +
    '                                <div class="media">\n' +
    '                                    <div class="media-left">\n' +
    '                                        <div class="avatar avatar-lg avatar-circle">\n' +
    '                                            <a href="#profile">\n' +
    '                                                <img src="eficos/img/214.jpg" alt="">\n' +
    '                                            </a>\n' +
    '                                            <i class="status status-online"></i>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <div class="media-body">\n' +
    '                                        <h5 class="media-heading">\n' +
    '                                            <a href="#profile" class="title-color">Sandy Matt</a>\n' +
    '                                        </h5>\n' +
    '                                        <small class="media-meta">Lawyer</small>\n' +
    '                                        <div class="contact-item-actions">\n' +
    '                                            <a href="javascript:void(0)" data-toggle="modal" data-target="#deleteItemModal" class="btn btn-success">\n' +
    '                                                <i class="fa fa-plus"></i>\n' +
    '                                            </a>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="col-md-4 col-sm-6">\n' +
    '                            <div class="user-card contact-item">\n' +
    '                                <div class="media">\n' +
    '                                    <div class="media-left">\n' +
    '                                        <div class="avatar avatar-lg avatar-circle">\n' +
    '                                            <a href="#profile">\n' +
    '                                                <img src="eficos/img/217.jpg" alt="">\n' +
    '                                            </a>\n' +
    '                                            <i class="status status-offline"></i>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <div class="media-body">\n' +
    '                                        <h5 class="media-heading">\n' +
    '                                            <a href="#profile" class="title-color">Sara Adams</a>\n' +
    '                                        </h5>\n' +
    '                                        <small class="media-meta">Actress</small>\n' +
    '                                        <div class="contact-item-actions">\n' +
    '                                            <a href="javascript:void(0)" data-toggle="modal" data-target="#deleteItemModal" class="btn btn-success">\n' +
    '                                                <i class="fa fa-plus"></i>\n' +
    '                                            </a>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="col-md-4 col-sm-6">\n' +
    '                            <div class="user-card contact-item">\n' +
    '                                <div class="media">\n' +
    '                                    <div class="media-left">\n' +
    '                                        <div class="avatar avatar-lg avatar-circle">\n' +
    '                                            <a href="#profile">\n' +
    '                                                <img src="eficos/img/218.jpg" alt="">\n' +
    '                                            </a>\n' +
    '                                            <i class="status status-offline"></i>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <div class="media-body">\n' +
    '                                        <h5 class="media-heading">\n' +
    '                                            <a href="#profile" class="title-color">John Doe</a>\n' +
    '                                        </h5>\n' +
    '                                        <small class="media-meta">Factional Character</small>\n' +
    '                                        <div class="contact-item-actions">\n' +
    '                                            <a href="javascript:void(0)" data-toggle="modal" data-target="#deleteItemModal" class="btn btn-success">\n' +
    '                                                <i class="fa fa-plus"></i>\n' +
    '                                            </a>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="col-md-4 col-sm-6">\n' +
    '                            <div class="user-card contact-item">\n' +
    '                                <div class="media">\n' +
    '                                    <div class="media-left">\n' +
    '                                        <div class="avatar avatar-lg avatar-circle">\n' +
    '                                            <a href="#profile">\n' +
    '                                                <img src="eficos/img/220.jpg" alt="">\n' +
    '                                            </a>\n' +
    '                                            <i class="status status-away"></i>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <div class="media-body">\n' +
    '                                        <h5 class="media-heading">\n' +
    '                                            <a href="#profile" class="title-color">Jane Doe</a>\n' +
    '                                        </h5>\n' +
    '                                        <small class="media-meta">Factional Character</small>\n' +
    '                                        <div class="contact-item-actions">\n' +
    '                                            <a href="javascript:void(0)" data-toggle="modal" data-target="#deleteItemModal" class="btn btn-success">\n' +
    '                                                <i class="fa fa-plus"></i>\n' +
    '                                            </a>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</section>\n' +
    '<div id="deleteItemModal" class="modal fade" tabindex="-1" role="dialog">\n' +
    '    <div class="modal-dialog">\n' +
    '        <div class="modal-content">\n' +
    '            <div class="modal-header">\n' +
    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
    '                <h4 class="modal-title">Add to contacts list</h4>\n' +
    '            </div>\n' +
    '            <div class="modal-body">\n' +
    '                <h5>Do you really want to add this individual to your contact list ?</h5>\n' +
    '            </div>\n' +
    '            <div class="modal-footer">\n' +
    '                <button type="button" class="btn btn-success" data-dismiss="modal">Send request</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/coming-soon/coming-soon.component.html',
    '<section class="content">\n' +
    '  <div class="row">\n' +
    '    <div class="col-md-12">\n' +
    '      <div class="box box-info">\n' +
    '        <div class="box-header with-border">\n' +
    '          <div class="box-tools pull-right">\n' +
    '            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>\n' +
    '            </button>\n' +
    '            <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '        <div class="box-body">\n' +
    '          <h3>Coming Soon... (Pull Requests are Welcome)</h3>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</section>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/dashboard/dashboard.component.html',
    '<section class="app-content">\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-6 col-sm-6">\n' +
    '            <div class="widget p-md clearfix">\n' +
    '                <div class="pull-left">\n' +
    '                    <h3 class="widget-title">Welcome to Efico</h3>\n' +
    '                    <small class="text-color">Number of projects</small>\n' +
    '                </div>\n' +
    '                <span class="pull-right fz-lg fw-500 counter" data-plugin="counterUp">144000</span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="col-md-6 col-sm-6">\n' +
    '            <div class="widget p-md clearfix">\n' +
    '                <div class="pull-left">\n' +
    '                    <h3 class="widget-title">Active</h3>\n' +
    '                    <small class="text-color">Projects</small>\n' +
    '                </div>\n' +
    '                <span class="pull-right fz-lg fw-500 counter" data-plugin="counterUp">183</span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-3 col-sm-6">\n' +
    '            <div class="widget stats-widget">\n' +
    '                <div class="widget-body clearfix">\n' +
    '                    <div class="pull-left">\n' +
    '                        <h3 class="widget-title text-primary">\n' +
    '              <span class="counter" data-plugin="counterUp">66</span>\n' +
    '            </h3>\n' +
    '                        <small class="text-color">Total Approved</small>\n' +
    '                    </div>\n' +
    '                    <span class="pull-right big-icon watermark"><i class="fa fa-paperclip"></i></span>\n' +
    '                </div>\n' +
    '                <footer class="widget-footer bg-primary"><small>% charge</small> <span class="small-chart pull-right" data-plugin="sparkline" data-options="[4,3,5,2,1], { type: \'bar\', barColor: \'#ffffff\', barWidth: 5, barSpacing: 2 }"></span></footer>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="col-md-3 col-sm-6">\n' +
    '            <div class="widget stats-widget">\n' +
    '                <div class="widget-body clearfix">\n' +
    '                    <div class="pull-left">\n' +
    '                        <h3 class="widget-title text-success">\n' +
    '              <span class="counter" data-plugin="counterUp">83</span>\n' +
    '            </h3>\n' +
    '                        <small class="text-color">Total Reconized</small>\n' +
    '                    </div>\n' +
    '                    <span class="pull-right big-icon watermark"><i class="fa fa-unlock-alt"></i></span>\n' +
    '                </div>\n' +
    '                <footer class="widget-footer bg-success"><small>% charge</small> <span class="small-chart pull-right" data-plugin="sparkline" data-options="[2,4,3,4,3], { type: \'bar\', barColor: \'#ffffff\', barWidth: 5, barSpacing: 2 }"></span></footer>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="col-md-3 col-sm-6">\n' +
    '            <div class="widget stats-widget">\n' +
    '                <div class="widget-body clearfix">\n' +
    '                    <div class="pull-left">\n' +
    '                        <h3 class="widget-title text-warning">\n' +
    '              <span class="counter" data-plugin="counterUp">34</span>\n' +
    '            </h3>\n' +
    '                        <small class="text-color">Total Pending</small>\n' +
    '                    </div>\n' +
    '                    <span class="pull-right big-icon watermark"><i class="fa fa-file-text-o"></i></span>\n' +
    '                </div>\n' +
    '                <footer class="widget-footer bg-warning"><small>% charge</small> <span class="small-chart pull-right" data-plugin="sparkline" data-options="[5,4,3,5,2],{ type: \'bar\', barColor: \'#ffffff\', barWidth: 5, barSpacing: 2 }"></span></footer>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="col-md-3 col-sm-6">\n' +
    '            <div class="widget stats-widget">\n' +
    '                <div class="widget-body clearfix">\n' +
    '                    <div class="pull-left">\n' +
    '                        <h3 class="widget-title text-danger">\n' +
    '              <span class="counter" data-plugin="counterUp">3</span>\n' +
    '            </h3>\n' +
    '                        <small class="text-color">Total Dismissed</small>\n' +
    '                    </div>\n' +
    '                    <span class="pull-right big-icon watermark"><i class="fa fa-ban"></i></span>\n' +
    '                </div>\n' +
    '                <footer class="widget-footer bg-danger"><small>% charge</small> <span class="small-chart pull-right" data-plugin="sparkline" data-options="[1,2,3,5,4], { type: \'bar\', barColor: \'#ffffff\', barWidth: 5, barSpacing: 2 }"></span></footer>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-6 col-sm-6">\n' +
    '            <div class="widget">\n' +
    '                <header class="widget-header">\n' +
    '                    <h4 class="widget-title">Feeds</h4>\n' +
    '                </header>\n' +
    '                <hr class="widget-separator">\n' +
    '                <div class="widget-body">\n' +
    '                    <div class="media-group feeds-group">\n' +
    '                        <div class="media-group-item">\n' +
    '                            <div class="media">\n' +
    '                                <div class="media-left">\n' +
    '                                    <div class="avatar avatar-sm avatar-circle"><img src="eficos/img/217.jpg" alt=""></div>\n' +
    '                                </div>\n' +
    '                                <div class="media-body">\n' +
    '                                    <h5><a href="javascript:void(0)" class="text-color">Some of the fantastic things people have had to say about Ooooh</a></h5>\n' +
    '                                    <small class="text-muted">2 days ago</small>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="media-group-item">\n' +
    '                            <div class="media">\n' +
    '                                <div class="media-left">\n' +
    '                                    <div class="avatar avatar-sm avatar-circle"><img src="eficos/img/218.jpg" alt=""></div>\n' +
    '                                </div>\n' +
    '                                <div class="media-body">\n' +
    '                                    <h5><a href="javascript:void(0)" class="text-color">Here are just some of the magazine reviews we have had</a></h5>\n' +
    '                                    <small class="text-muted">1 day ago</small>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="media-group-item">\n' +
    '                            <div class="media">\n' +
    '                                <div class="media-left">\n' +
    '                                    <div class="avatar avatar-sm avatar-circle"><img src="eficos/img/219.jpg" alt=""></div>\n' +
    '                                </div>\n' +
    '                                <div class="media-body">\n' +
    '                                    <h5><a href="javascript:void(0)" class="text-color">Lorem ipsum dolor amet, consectetur adipisicing elit.</a></h5>\n' +
    '                                    <small class="text-muted">2 days ago</small>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="media-group-item">\n' +
    '                            <div class="media">\n' +
    '                                <div class="media-left">\n' +
    '                                    <div class="avatar avatar-sm avatar-circle"><img src="eficos/img/215.jpg" alt=""></div>\n' +
    '                                </div>\n' +
    '                                <div class="media-body">\n' +
    '                                    <h5><a href="javascript:void(0)" class="text-color">“It’s just brilliant. I will recommend it to everyone!”</a></h5>\n' +
    '                                    <small class="text-muted">2 mins ago</small>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="media-group-item">\n' +
    '                            <div class="media">\n' +
    '                                <div class="media-left">\n' +
    '                                    <div class="avatar avatar-sm avatar-circle"><img src="eficos/img/221.jpg" alt=""></div>\n' +
    '                                </div>\n' +
    '                                <div class="media-body">\n' +
    '                                    <h5><a href="javascript:void(0)" class="text-color">John has just started working on the project</a></h5>\n' +
    '                                    <small class="text-muted">right now</small>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="col-md-6 col-sm-6">\n' +
    '            <div class="widget">\n' +
    '                <header class="widget-header">\n' +
    '                    <h4 class="widget-title">Streams</h4>\n' +
    '                </header>\n' +
    '                <hr class="widget-separator">\n' +
    '                <div class="widget-body">\n' +
    '                    <div class="streamline m-l-lg">\n' +
    '                        <div class="sl-item p-b-md">\n' +
    '                            <div class="sl-avatar avatar avatar-sm avatar-circle"><img class="img-responsive" src="eficos/img/221.jpg" alt="avatar"></div>\n' +
    '                            <div class="sl-content m-l-xl">\n' +
    '                                <h5 class="m-t-0"><a href="javascript:void(0)" class="m-r-xs theme-color">John Doe</a><small class="text-muted fz-sm">last month</small></h5>\n' +
    '                                <p>John has just started working on the project</p>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="sl-item p-b-md">\n' +
    '                            <div class="sl-avatar avatar avatar-sm avatar-circle"><img class="img-responsive" src="eficos/img/214.jpg" alt="avatar"></div>\n' +
    '                            <div class="sl-content m-l-xl">\n' +
    '                                <h5 class="m-t-0"><a href="javascript:void(0)" class="m-r-xs theme-color">Jane Doe</a><small class="text-muted fz-sm">last month</small></h5>\n' +
    '                                <p>Jane sent you invitation to attend the party</p>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="sl-item p-b-md">\n' +
    '                            <div class="sl-avatar avatar avatar-sm avatar-circle"><img class="img-responsive" src="eficos/img/217.jpg" alt="avatar"></div>\n' +
    '                            <div class="sl-content m-l-xl">\n' +
    '                                <h5 class="m-t-0"><a href="javascript:void(0)" class="m-r-xs theme-color">Sally Mala</a><small class="text-muted fz-sm">last month</small></h5>\n' +
    '                                <p>Sally added you to her circles</p>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="sl-item p-b-md">\n' +
    '                            <div class="sl-avatar avatar avatar-sm avatar-circle"><img class="img-responsive" src="eficos/img/211.jpg" alt="avatar"></div>\n' +
    '                            <div class="sl-content m-l-xl">\n' +
    '                                <h5 class="m-t-0"><a href="javascript:void(0)" class="m-r-xs theme-color">Sara Adams</a><small class="text-muted fz-sm">last month</small></h5>\n' +
    '                                <p>Sara has finished her task</p>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="sl-item p-b-md">\n' +
    '                            <div class="sl-avatar avatar avatar-sm avatar-circle"><img class="img-responsive" src="eficos/img/214.jpg" alt="avatar"></div>\n' +
    '                            <div class="sl-content m-l-xl">\n' +
    '                                <h5 class="m-t-0"><a href="javascript:void(0)" class="m-r-xs theme-color">Sandy Doe</a><small class="text-muted fz-sm">last month</small></h5>\n' +
    '                                <p>Sara has finished her task</p>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</section>\n' +
    '\n' +
    '\n' +
    '<div id="side-panel" class="side-panel">\n' +
    '      <div class="panel-header">\n' +
    '        <h4 class="panel-title">Contacts</h4>\n' +
    '      </div>\n' +
    '      <div class="scrollable-container">\n' +
    '        <div class="media-group">\n' +
    '          <a href="javascript:void(0)" class="media-group-item">\n' +
    '            <div class="media">\n' +
    '              <div class="media-left">\n' +
    '                <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/221.jpg" alt=""> <i class="status status-online"></i></div>\n' +
    '              </div>\n' +
    '              <div class="media-body">\n' +
    '                <h5 class="media-heading">John Doe</h5>\n' +
    '                <small class="media-meta">active now</small>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </a>\n' +
    '          <a href="javascript:void(0)" class="media-group-item">\n' +
    '            <div class="media">\n' +
    '              <div class="media-left">\n' +
    '                <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/205.jpg" alt=""> <i class="status status-online"></i></div>\n' +
    '              </div>\n' +
    '              <div class="media-body">\n' +
    '                <h5 class="media-heading">John Doe</h5>\n' +
    '                <small class="media-meta">active now</small>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </a>\n' +
    '          <a href="javascript:void(0)" class="media-group-item">\n' +
    '            <div class="media">\n' +
    '              <div class="media-left">\n' +
    '                <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/206.jpg" alt=""> <i class="status status-online"></i></div>\n' +
    '              </div>\n' +
    '              <div class="media-body">\n' +
    '                <h5 class="media-heading">Adam Kiti</h5>\n' +
    '                <small class="media-meta">active now</small>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </a>\n' +
    '          <a href="javascript:void(0)" class="media-group-item">\n' +
    '            <div class="media">\n' +
    '              <div class="media-left">\n' +
    '                <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/207.jpg" alt=""> <i class="status status-away"></i></div>\n' +
    '              </div>\n' +
    '              <div class="media-body">\n' +
    '                <h5 class="media-heading">Jane Doe</h5>\n' +
    '                <small class="media-meta">away</small>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </a>\n' +
    '          <a href="javascript:void(0)" class="media-group-item">\n' +
    '            <div class="media">\n' +
    '              <div class="media-left">\n' +
    '                <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/208.jpg" alt=""> <i class="status status-away"></i></div>\n' +
    '              </div>\n' +
    '              <div class="media-body">\n' +
    '                <h5 class="media-heading">Sara Adams</h5>\n' +
    '                <small class="media-meta">away</small>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </a>\n' +
    '          <a href="javascript:void(0)" class="media-group-item">\n' +
    '            <div class="media">\n' +
    '              <div class="media-left">\n' +
    '                <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/209.jpg" alt=""> <i class="status status-away"></i></div>\n' +
    '              </div>\n' +
    '              <div class="media-body">\n' +
    '                <h5 class="media-heading">Smith Doe</h5>\n' +
    '                <small class="media-meta">away</small>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </a>\n' +
    '          <a href="javascript:void(0)" class="media-group-item">\n' +
    '            <div class="media">\n' +
    '              <div class="media-left">\n' +
    '                <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/219.jpg" alt=""> <i class="status status-away"></i></div>\n' +
    '              </div>\n' +
    '              <div class="media-body">\n' +
    '                <h5 class="media-heading">Dana Dyab</h5>\n' +
    '                <small class="media-meta">away</small>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </a>\n' +
    '          <a href="javascript:void(0)" class="media-group-item">\n' +
    '            <div class="media">\n' +
    '              <div class="media-left">\n' +
    '                <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/210.jpg" alt=""> <i class="status status-offline"></i></div>\n' +
    '              </div>\n' +
    '              <div class="media-body">\n' +
    '                <h5 class="media-heading">Jeffry Way</h5>\n' +
    '                <small class="media-meta">2 hours ago</small>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </a>\n' +
    '          <a href="javascript:void(0)" class="media-group-item">\n' +
    '            <div class="media">\n' +
    '              <div class="media-left">\n' +
    '                <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/211.jpg" alt=""> <i class="status status-offline"></i></div>\n' +
    '              </div>\n' +
    '              <div class="media-body">\n' +
    '                <h5 class="media-heading">Jane Doe</h5>\n' +
    '                <small class="media-meta">5 hours ago</small>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </a>\n' +
    '          <a href="javascript:void(0)" class="media-group-item">\n' +
    '            <div class="media">\n' +
    '              <div class="media-left">\n' +
    '                <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/212.jpg" alt=""> <i class="status status-offline"></i></div>\n' +
    '              </div>\n' +
    '              <div class="media-body">\n' +
    '                <h5 class="media-heading">Adam Khoury</h5>\n' +
    '                <small class="media-meta">22 minutes ago</small>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </a>\n' +
    '          <a href="javascript:void(0)" class="media-group-item">\n' +
    '            <div class="media">\n' +
    '              <div class="media-left">\n' +
    '                <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/207.jpg" alt=""> <i class="status status-offline"></i></div>\n' +
    '              </div>\n' +
    '              <div class="media-body">\n' +
    '                <h5 class="media-heading">Sara Smith</h5>\n' +
    '                <small class="media-meta">2 days ago</small>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </a>\n' +
    '          <a href="javascript:void(0)" class="media-group-item">\n' +
    '            <div class="media">\n' +
    '              <div class="media-left">\n' +
    '                <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/211.jpg" alt=""> <i class="status status-offline"></i></div>\n' +
    '              </div>\n' +
    '              <div class="media-body">\n' +
    '                <h5 class="media-heading">Donia Dyab</h5>\n' +
    '                <small class="media-meta">3 days ago</small>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </a>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/login-form/login-form.component.html',
    '<div class="simple-page-wrap">\n' +
    '    <div class="simple-page-logo animated swing"><a href="/"><span><i class="fa fa-gg"></i></span> <span>Efico</span></a></div>\n' +
    '    <div class="simple-page-form animated flipInY" id="login-form">\n' +
    '        <h4 class="form-title m-b-xl text-center">Sign In With Your Efico Account</h4>\n' +
    '        <form ng-submit="vm.login()" method="post" name="vm.loginForm">\n' +
    '            <div class="callout callout-danger" ng-if="vm.loginfailederror">\n' +
    '                <h4>Login Failed</h4>\n' +
    '                <p>{{ vm.loginfailederror }}</p>\n' +
    '            </div>\n' +
    '            <div class="callout callout-danger" ng-if="vm.loginfailed">\n' +
    '                <h4>Login Failed</h4>\n' +
    '                <p>Incorrect Email/Username or Password.</p>\n' +
    '            </div>\n' +
    '            <div class="callout callout-danger" ng-if="vm.unverified">\n' +
    '                <h4>Email Unverified</h4>\n' +
    '                <p>Please check your email and click the verification link.</p>\n' +
    '            </div>\n' +
    '            <div class="callout callout-success" ng-if="vm.registerSuccess">\n' +
    '                <h4>Registration Success!</h4>\n' +
    '                <p>A verification link has been sent to your Email Account. Thank You!</p>\n' +
    '            </div>\n' +
    '            <div class="callout callout-success" ng-if="vm.successMsg">\n' +
    '                <h4>Success!</h4>\n' +
    '                <p>{{ vm.successMsg }}</p>\n' +
    '            </div>\n' +
    '            <div class="form-group has-feedback">\n' +
    '                <input id="sign-in-email" type="email" class="form-control" placeholder="Email" ng-model="vm.email" ng-required="true" ng-pattern="/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/">\n' +
    '                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>\n' +
    '            </div>\n' +
    '            <div class="form-group has-feedback">\n' +
    '                <input id="sign-in-password" name="password" type="password" class="form-control" placeholder="Password" ng-model="vm.password" ng-required="true">\n' +
    '                <span class="glyphicon glyphicon-lock form-control-feedback"></span>\n' +
    '            </div>\n' +
    '            <div class="form-group m-b-xl">\n' +
    '                <div class="checkbox checkbox-primary">\n' +
    '                    <input type="checkbox" id="keep_me_logged_in">\n' +
    '                    <label for="keep_me_logged_in">Keep me signed in</label>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <input type="submit" class="btn btn-primary" value="SING IN">\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="simple-page-footer">\n' +
    '        <p><a ui-sref="forgot_password">FORGOT YOUR PASSWORD ?</a></p>\n' +
    '        <p><small>Don\'t have an account ?</small> <a ui-sref="register">CREATE AN ACCOUNT</a></p>\n' +
    '    </div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/forgot-password/forgot-password.component.html',
    '<div class="simple-page-wrap">\n' +
    '    <div class="simple-page-logo animated swing"><a href="/"><span><i class="fa fa-gg"></i></span> <span>Efico</span></a></div>\n' +
    '    <div class="simple-page-form animated flipInY" id="reset-password-form">\n' +
    '        <h4 class="form-title m-b-xl text-center">Forgot Your Password ?</h4>\n' +
    '        <form ng-submit="vm.submit()" class="ForgotPassword-form" name="vm.forgotPasswordForm" novalidate>\n' +
    '            <div class="callout callout-danger" ng-if="vm.errorTrigger">\n' +
    '                <h4>Error:</h4>\n' +
    '                <p>Pl ease check your email and try again.</p>\n' +
    '            </div>\n' +
    '            <div class="form-group has-feedback" ng-class="{ \'has-error\': (vm.forgotPasswordForm.email.$invalid || vm.serverError) && ( vm.formSubmitted || vm.forgotPasswordForm.email.$touched) }">\n' +
    '                <input id="reset-password-email" type="email" class="form-control" placeholder="Please enter your email address" name="email" ng-model="vm.email" ng-required="true" ng-pattern="/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/">\n' +
    '                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>\n' +
    '                <p ng-show="vm.forgotPasswordForm.email.$error.email  && ( vm.formSubmitted || vm.forgotPasswordForm.email.$touched)" class="help-block">This is not a valid email</p>\n' +
    '                <p ng-show="vm.forgotPasswordForm.email.$error.required && ( vm.formSubmitted || vm.forgotPasswordForm.email.$touched)" class="help-block">Email is required.</p>\n' +
    '                <p ng-show=\'vm.serverError\' class="help-block">{{ vm.serverError }}</p>\n' +
    '            </div>\n' +
    '            <input type="submit" class="btn btn-primary" value="RESET YOUR PASSWORD">\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="simple-page-footer">\n' +
    '        <p><a ui-sref="login">Login In</a></p>\n' +
    '        <p><small>Don\'t have an account ?</small> <a ui-sref="register">CREATE AN ACCOUNT</a></p>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/nav-header/nav-header.component.html',
    '<nav id="app-navbar" class="navbar navbar-inverse navbar-fixed-top primary">\n' +
    '    <div class="navbar-header">\n' +
    '        <button type="button" id="menubar-toggle-btn" class="navbar-toggle visible-xs-inline-block navbar-toggle-left hamburger hamburger--collapse js-hamburger">\n' +
    '            <span class="sr-only">Toggle navigation</span>\n' +
    '            <span class="hamburger-box">\n' +
    '                        <span class="hamburger-inner"></span>\n' +
    '            </span>\n' +
    '        </button>\n' +
    '        <button type="button" class="navbar-toggle navbar-toggle-right collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">\n' +
    '            <span class="sr-only">Toggle navigation</span>\n' +
    '            <span class="zmdi zmdi-hc-lg zmdi-more"></span>\n' +
    '        </button>\n' +
    '        <button type="button" class="navbar-toggle navbar-toggle-right collapsed" data-toggle="collapse" data-target="#navbar-search" aria-expanded="false">\n' +
    '            <span class="sr-only">Toggle navigation</span>\n' +
    '            <span class="zmdi zmdi-hc-lg zmdi-search"></span>\n' +
    '        </button>\n' +
    '        <a href="#dashboard" class="navbar-brand">\n' +
    '            <span class="brand-icon">\n' +
    '                        <i class="fa fa-gg"></i>\n' +
    '                    </span>\n' +
    '            <span class="brand-name">Efico</span>\n' +
    '        </a>\n' +
    '    </div>\n' +
    '    <div class="navbar-container container-fluid">\n' +
    '        <div class="collapse navbar-collapse" id="app-navbar-collapse">\n' +
    '            <ul class="nav navbar-toolbar navbar-toolbar-left navbar-left">\n' +
    '                <li class="hidden-float hidden-menubar-top"><a href="javascript:void(0)" role="button" id="menubar-fold-btn" class="hamburger hamburger--arrowalt is-active js-hamburger"><span class="hamburger-box"><span class="hamburger-inner"></span></span></a></li>\n' +
    '                <li>\n' +
    '                    <h5 class="page-title hidden-menubar-top hidden-float">Dashboard</h5>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '            <ul class="nav navbar-toolbar navbar-toolbar-right navbar-right">\n' +
    '                <li class="nav-item dropdown hidden-float"><a href="javascript:void(0)" data-toggle="collapse" data-target="#navbar-search" aria-expanded="false"><i class="zmdi zmdi-hc-lg zmdi-search"></i></a></li>\n' +
    '                <li class="dropdown">\n' +
    '                    <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="zmdi zmdi-hc-lg zmdi-notifications"></i></a>\n' +
    '                    <div class="media-group dropdown-menu animated flipInY">\n' +
    '                        <a href="javascript:void(0)" class="media-group-item">\n' +
    '                            <div class="media">\n' +
    '                                <div class="media-left">\n' +
    '                                    <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/221.jpg" alt=""> <i class="status status-online"></i></div>\n' +
    '                                </div>\n' +
    '                                <div class="media-body">\n' +
    '                                    <h5 class="media-heading">John Doe</h5>\n' +
    '                                    <small class="media-meta">Active now</small>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </a>\n' +
    '                        <a href="javascript:void(0)" class="media-group-item">\n' +
    '                            <div class="media">\n' +
    '                                <div class="media-left">\n' +
    '                                    <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/205.jpg" alt=""> <i class="status status-offline"></i></div>\n' +
    '                                </div>\n' +
    '                                <div class="media-body">\n' +
    '                                    <h5 class="media-heading">John Doe</h5>\n' +
    '                                    <small class="media-meta">2 hours ago</small>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </a>\n' +
    '                        <a href="javascript:void(0)" class="media-group-item">\n' +
    '                            <div class="media">\n' +
    '                                <div class="media-left">\n' +
    '                                    <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/207.jpg" alt=""> <i class="status status-away"></i></div>\n' +
    '                                </div>\n' +
    '                                <div class="media-body">\n' +
    '                                    <h5 class="media-heading">Sara Smith</h5>\n' +
    '                                    <small class="media-meta">idle 5 min ago</small>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </a>\n' +
    '                        <a href="javascript:void(0)" class="media-group-item">\n' +
    '                            <div class="media">\n' +
    '                                <div class="media-left">\n' +
    '                                    <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/211.jpg" alt=""> <i class="status status-away"></i></div>\n' +
    '                                </div>\n' +
    '                                <div class="media-body">\n' +
    '                                    <h5 class="media-heading">Donia Dyab</h5>\n' +
    '                                    <small class="media-meta">idle 5 min ago</small>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </a>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <li class="dropdown"><a href="javascript:void(0)" class="side-panel-toggle" data-toggle="class" data-target="#side-panel" data-class="open" role="button"><i class="zmdi zmdi-hc-lg zmdi-apps"></i></a></li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</nav>\n' +
    '<aside id="menubar" class="menubar light">\n' +
    '    <div class="app-user">\n' +
    '        <div class="media">\n' +
    '            <div class="media-left">\n' +
    '                <div class="avatar avatar-md avatar-circle dropdown">\n' +
    '                    <a href="javascript:void(0)" class="dropdown-toggle usertitle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="img-responsive" src="eficos/img/221.jpg" alt="avatar"></a>\n' +
    '                    <ul class="dropdown-menu animated flipInY">\n' +
    '                                <li>\n' +
    '                                    <a class="text-color" href="#profile">\n' +
    '                                        <span class="m-r-xs">\n' +
    '                                                    <i class="fa fa-user"></i>\n' +
    '                                                </span>\n' +
    '                                        <span>Profile</span>\n' +
    '                                    </a>\n' +
    '                                </li>\n' +
    '                                <li>\n' +
    '                                    <a class="text-color" href="#setting">\n' +
    '                                        <span class="m-r-xs">\n' +
    '                                                    <i class="fa fa-gear"></i>\n' +
    '                                                </span>\n' +
    '                                        <span>Settings</span>\n' +
    '                                    </a>\n' +
    '                                </li>\n' +
    '                                <li role="separator" class="divider"></li>\n' +
    '                                <li>\n' +
    '                                    <a class="text-color" ui-sref="app.logout">\n' +
    '                                        <span class="m-r-xs">\n' +
    '                                                    <i class="fa fa-power-off"></i>\n' +
    '                                                </span>\n' +
    '                                        <span>Logout</span>\n' +
    '                                    </a>\n' +
    '                                </li>\n' +
    '                            </ul>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="media-body">\n' +
    '                <div class="foldable">\n' +
    '                    <h5><a href="javascript:void(0)" class="username">John Doe</a></h5>\n' +
    '                    <ul>\n' +
    '                        <li class="dropdown">\n' +
    '                            <a href="javascript:void(0)" class="dropdown-toggle usertitle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n' +
    '                                <small>Web Developer</small>\n' +
    '                                <span class="caret"></span>\n' +
    '                            </a>\n' +
    '                            <ul class="dropdown-menu animated flipInY">\n' +
    '                                <li>\n' +
    '                                    <a class="text-color" href="#profile">\n' +
    '                                        <span class="m-r-xs">\n' +
    '                                                    <i class="fa fa-user"></i>\n' +
    '                                                </span>\n' +
    '                                        <span>Profile</span>\n' +
    '                                    </a>\n' +
    '                                </li>\n' +
    '                                <li>\n' +
    '                                    <a class="text-color" href="#setting">\n' +
    '                                        <span class="m-r-xs">\n' +
    '                                                    <i class="fa fa-gear"></i>\n' +
    '                                                </span>\n' +
    '                                        <span>Settings</span>\n' +
    '                                    </a>\n' +
    '                                </li>\n' +
    '                                <li role="separator" class="divider"></li>\n' +
    '                                <li>\n' +
    '                                    <a class="text-color" ui-sref="app.logout">\n' +
    '                                        <span class="m-r-xs">\n' +
    '                                                    <i class="fa fa-power-off"></i>\n' +
    '                                                </span>\n' +
    '                                        <span>Logout</span>\n' +
    '                                    </a>\n' +
    '                                </li>\n' +
    '                            </ul>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="menubar-scroll">\n' +
    '        <div class="menubar-scroll-inner">\n' +
    '            <ul class="app-menu">\n' +
    '                <li>\n' +
    '                    <a ui-sref="app.landing">\n' +
    '                        <i class="menu-icon zmdi zmdi-view-dashboard zmdi-hc-lg"></i>\n' +
    '                        <span class="menu-text">Dashboard</span>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <a ui-sref="app.contacts">\n' +
    '                        <i class="menu-icon zmdi zmdi-balance zmdi-hc-lg"></i>\n' +
    '                        <span class="menu-text">Organization</span>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li class="has-submenu">\n' +
    '                    <a href="javascript:void(0)" class="submenu-toggle">\n' +
    '                        <i class="menu-icon zmdi zmdi-flash zmdi-hc-lg"></i>\n' +
    '                        <span class="menu-text">Innovative Ideas</span>\n' +
    '                        <i class="menu-caret zmdi zmdi-hc-sm zmdi-chevron-right"></i>\n' +
    '                    </a>\n' +
    '                    <ul class="submenu">\n' +
    '                        <li>\n' +
    '                            <a ui-sref="app.projects">\n' +
    '                                <span class="menu-text">Discover</span>\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '                        <li>\n' +
    '                            <a ui-sref="app.project-create">\n' +
    '                                <span class="menu-text">Create</span>\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <a ui-sref="app.chat">\n' +
    '                        <i class="menu-icon zmdi zmdi-comments zmdi-hc-lg"></i>\n' +
    '                        <span class="menu-text">Chat</span>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <a ui-sref="app.preferences">\n' +
    '                        <i class="menu-icon fa fa-sliders zmdi-hc-lg"></i>\n' +
    '                        <span class="menu-text">Preferences</span>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <hr>\n' +
    '                <li>\n' +
    '                    <a ui-sref="app.users">\n' +
    '                        <i class="menu-icon zmdi zmdi-file-text zmdi-hc-lg"></i>\n' +
    '                        <span class="menu-text">User Management</span>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</aside>\n' +
    '<div id="navbar-search" class="navbar-search collapse">\n' +
    '    <div class="navbar-search-inner">\n' +
    '        <form action="#">\n' +
    '            <span class="search-icon">\n' +
    '                        <i class="fa fa-search"></i>\n' +
    '                    </span>\n' +
    '            <input class="search-field" type="search" placeholder="search...">\n' +
    '        </form>\n' +
    '        <button type="button" class="search-close" data-toggle="collapse" data-target="#navbar-search" aria-expanded="false">\n' +
    '            <i class="fa fa-close"></i>\n' +
    '        </button>\n' +
    '    </div>\n' +
    '    <div class="navbar-search-backdrop" data-toggle="collapse" data-target="#navbar-search" aria-expanded="false"></div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/login-loader/login-loader.component.html',
    'Logging in...');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/nav-sidebar/nav-sidebar.component.html',
    '<div id="side-panel" class="side-panel">\n' +
    '    <div class="panel-header">\n' +
    '        <h4 class="panel-title">Contacts</h4>\n' +
    '    </div>\n' +
    '    <div class="scrollable-container">\n' +
    '        <div class="media-group">\n' +
    '            <a href="javascript:void(0)" class="media-group-item">\n' +
    '                <div class="media">\n' +
    '                    <div class="media-left">\n' +
    '                        <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/221.jpg" alt=""> <i class="status status-online"></i></div>\n' +
    '                    </div>\n' +
    '                    <div class="media-body">\n' +
    '                        <h5 class="media-heading">John Doe</h5>\n' +
    '                        <small class="media-meta">active now</small>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </a>\n' +
    '            <a href="javascript:void(0)" class="media-group-item">\n' +
    '                <div class="media">\n' +
    '                    <div class="media-left">\n' +
    '                        <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/205.jpg" alt=""> <i class="status status-online"></i></div>\n' +
    '                    </div>\n' +
    '                    <div class="media-body">\n' +
    '                        <h5 class="media-heading">John Doe</h5>\n' +
    '                        <small class="media-meta">active now</small>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </a>\n' +
    '            <a href="javascript:void(0)" class="media-group-item">\n' +
    '                <div class="media">\n' +
    '                    <div class="media-left">\n' +
    '                        <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/206.jpg" alt=""> <i class="status status-online"></i></div>\n' +
    '                    </div>\n' +
    '                    <div class="media-body">\n' +
    '                        <h5 class="media-heading">Adam Kiti</h5>\n' +
    '                        <small class="media-meta">active now</small>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </a>\n' +
    '            <a href="javascript:void(0)" class="media-group-item">\n' +
    '                <div class="media">\n' +
    '                    <div class="media-left">\n' +
    '                        <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/207.jpg" alt=""> <i class="status status-away"></i></div>\n' +
    '                    </div>\n' +
    '                    <div class="media-body">\n' +
    '                        <h5 class="media-heading">Jane Doe</h5>\n' +
    '                        <small class="media-meta">away</small>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </a>\n' +
    '            <a href="javascript:void(0)" class="media-group-item">\n' +
    '                <div class="media">\n' +
    '                    <div class="media-left">\n' +
    '                        <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/208.jpg" alt=""> <i class="status status-away"></i></div>\n' +
    '                    </div>\n' +
    '                    <div class="media-body">\n' +
    '                        <h5 class="media-heading">Sara Adams</h5>\n' +
    '                        <small class="media-meta">away</small>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </a>\n' +
    '            <a href="javascript:void(0)" class="media-group-item">\n' +
    '                <div class="media">\n' +
    '                    <div class="media-left">\n' +
    '                        <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/209.jpg" alt=""> <i class="status status-away"></i></div>\n' +
    '                    </div>\n' +
    '                    <div class="media-body">\n' +
    '                        <h5 class="media-heading">Smith Doe</h5>\n' +
    '                        <small class="media-meta">away</small>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </a>\n' +
    '            <a href="javascript:void(0)" class="media-group-item">\n' +
    '                <div class="media">\n' +
    '                    <div class="media-left">\n' +
    '                        <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/219.jpg" alt=""> <i class="status status-away"></i></div>\n' +
    '                    </div>\n' +
    '                    <div class="media-body">\n' +
    '                        <h5 class="media-heading">Dana Dyab</h5>\n' +
    '                        <small class="media-meta">away</small>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </a>\n' +
    '            <a href="javascript:void(0)" class="media-group-item">\n' +
    '                <div class="media">\n' +
    '                    <div class="media-left">\n' +
    '                        <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/210.jpg" alt=""> <i class="status status-offline"></i></div>\n' +
    '                    </div>\n' +
    '                    <div class="media-body">\n' +
    '                        <h5 class="media-heading">Jeffry Way</h5>\n' +
    '                        <small class="media-meta">2 hours ago</small>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </a>\n' +
    '            <a href="javascript:void(0)" class="media-group-item">\n' +
    '                <div class="media">\n' +
    '                    <div class="media-left">\n' +
    '                        <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/211.jpg" alt=""> <i class="status status-offline"></i></div>\n' +
    '                    </div>\n' +
    '                    <div class="media-body">\n' +
    '                        <h5 class="media-heading">Jane Doe</h5>\n' +
    '                        <small class="media-meta">5 hours ago</small>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </a>\n' +
    '            <a href="javascript:void(0)" class="media-group-item">\n' +
    '                <div class="media">\n' +
    '                    <div class="media-left">\n' +
    '                        <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/212.jpg" alt=""> <i class="status status-offline"></i></div>\n' +
    '                    </div>\n' +
    '                    <div class="media-body">\n' +
    '                        <h5 class="media-heading">Adam Khoury</h5>\n' +
    '                        <small class="media-meta">22 minutes ago</small>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </a>\n' +
    '            <a href="javascript:void(0)" class="media-group-item">\n' +
    '                <div class="media">\n' +
    '                    <div class="media-left">\n' +
    '                        <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/207.jpg" alt=""> <i class="status status-offline"></i></div>\n' +
    '                    </div>\n' +
    '                    <div class="media-body">\n' +
    '                        <h5 class="media-heading">Sara Smith</h5>\n' +
    '                        <small class="media-meta">2 days ago</small>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </a>\n' +
    '            <a href="javascript:void(0)" class="media-group-item">\n' +
    '                <div class="media">\n' +
    '                    <div class="media-left">\n' +
    '                        <div class="avatar avatar-xs avatar-circle"><img src="eficos/img/211.jpg" alt=""> <i class="status status-offline"></i></div>\n' +
    '                    </div>\n' +
    '                    <div class="media-body">\n' +
    '                        <h5 class="media-heading">Donia Dyab</h5>\n' +
    '                        <small class="media-meta">3 days ago</small>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </a>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/project-create/project-create.component.html',
    '<section class="app-content">\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-2">\n' +
    '            <div class="app-action-panel" id="compose-action-panel">\n' +
    '                <div class="action-panel-toggle" data-toggle="class" data-target="#compose-action-panel" data-class="open"><i class="fa fa-chevron-right"></i> <i class="fa fa-chevron-left"></i></div>\n' +
    '                <div class="app-actions-list scrollable-container">\n' +
    '                    <div class="list-group">\n' +
    '                        <h4>Lables</h4>\n' +
    '                        <a href="#" class="list-group-item">\n' +
    '                            <i class="m-r-sm fa fa-circle text-warning"></i>\n' +
    '                            <span>Personal</span>\n' +
    '                            <div class="item-actions">\n' +
    '                                <i class="item-action fa fa-edit" data-toggle="modal" data-target="#labelModal"></i>\n' +
    '                                <i class="item-action fa fa-trash" data-toggle="modal" data-target="#deleteItemModal"></i>\n' +
    '                            </div>\n' +
    '                        </a>\n' +
    '                        <a href="#" class="list-group-item">\n' +
    '                            <i class="m-r-sm fa fa-circle text-primary"></i>\n' +
    '                            <span>Work</span>\n' +
    '                            <div class="item-actions">\n' +
    '                                <i class="item-action fa fa-edit" data-toggle="modal" data-target="#labelModal"></i>\n' +
    '                                <i class="item-action fa fa-trash" data-toggle="modal" data-target="#deleteItemModal"></i>\n' +
    '                            </div>\n' +
    '                        </a>\n' +
    '                        <a href="#" class="list-group-item">\n' +
    '                            <i class="m-r-sm fa fa-circle text-danger"></i>\n' +
    '                            <span>Business</span>\n' +
    '                            <div class="item-actions">\n' +
    '                                <i class="item-action fa fa-edit" data-toggle="modal" data-target="#labelModal"></i>\n' +
    '                                <i class="item-action fa fa-trash" data-toggle="modal" data-target="#deleteItemModal"></i>\n' +
    '                            </div>\n' +
    '                        </a>\n' +
    '                        <a href="#" class="list-group-item">\n' +
    '                            <i class="m-r-sm fa fa-circle text-success"></i>\n' +
    '                            <span>Clients</span>\n' +
    '                            <div class="item-actions">\n' +
    '                                <i class="item-action fa fa-edit" data-toggle="modal" data-target="#labelModal"></i>\n' +
    '                                <i class="item-action fa fa-trash" data-toggle="modal" data-target="#deleteItemModal"></i>\n' +
    '                            </div>\n' +
    '                        </a>\n' +
    '                        <a href="#" class="list-group-item text-color" data-toggle="modal" data-target="#labelModal">\n' +
    '                            <i class="fa fa-plus m-r-sm"></i> Add New Label\n' +
    '                        </a>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="col-md-10">\n' +
    '            <div class="panel panel-default new-message">\n' +
    '                <form action="#projects" class="ng-pristine ng-valid" zzz>\n' +
    '                    <div class="panel-body">\n' +
    '                        <div class="form-group m-b-0">\n' +
    '                            <div class="row">\n' +
    '                                <div class="col-sm-8">\n' +
    '                                    <label>Title</label>\n' +
    '                                    <input class="form-control m-b-lg" type="text">\n' +
    '                                </div>\n' +
    '                                <div class="col-sm-4">\n' +
    '                                    <label>Departement</label>\n' +
    '                                    <select class="form-control">\n' +
    '                                        <option>Finance</option>\n' +
    '                                        <option>Human resources</option>\n' +
    '                                        <option>Legal</option>\n' +
    '                                        <option>Technology</option>\n' +
    '                                    </select>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="form-group">\n' +
    '                            <label>Objective</label>\n' +
    '                            <input class="form-control" type="text">\n' +
    '                        </div>\n' +
    '                        <div class="form-group m-b-0">\n' +
    '                            <div class="row">\n' +
    '                                <div class="col-sm-6">\n' +
    '                                    <label>Contributors</label>\n' +
    '                                    <input class="form-control m-b-lg" type="text">\n' +
    '                                </div>\n' +
    '                                <div class="col-sm-6">\n' +
    '                                    <label>Files attachements</label>\n' +
    '                                    <input class="form-control m-b-lg" multiple="" type="file">\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="form-group">\n' +
    '                            <label>Description</label>\n' +
    '                            <textarea name="new_message_body" class="form-control full-wysiwyg"></textarea>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="panel-footer clearfix">\n' +
    '                        <div class="pull-right">\n' +
    '                            <button type="button" class="btn btn-danger">\n' +
    '                                <i class="fa fa-trash"></i>\n' +
    '                            </button>\n' +
    '                            <button type="button" class="btn btn-success">\n' +
    '                                <i class="fa fa-save"></i>\n' +
    '                            </button>\n' +
    '                            <button type="submit" class="btn btn-primary">\n' +
    '                                Publish\n' +
    '                                <i class="fa fa-send"></i>\n' +
    '                            </button>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </form>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</section>\n' +
    '<div id="labelModal" class="modal fade" tabindex="-1" role="dialog">\n' +
    '    <div class="modal-dialog">\n' +
    '        <div class="modal-content">\n' +
    '            <div class="modal-header">\n' +
    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '                    <span aria-hidden="true">&times;</span>\n' +
    '                </button>\n' +
    '                <h4 class="modal-title">Create / update label</h4>\n' +
    '            </div>\n' +
    '            <form action="#" id="newCategoryForm">\n' +
    '                <div class="modal-body">\n' +
    '                    <div class="form-group m-0">\n' +
    '                        <input type="text" id="catLabel" class="form-control" placeholder="Label">\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="modal-footer">\n' +
    '                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>\n' +
    '                    <button type="button" class="btn btn-success" data-dismiss="modal">Save</button>\n' +
    '                </div>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div id="deleteItemModal" class="modal fade" tabindex="-1" role="dialog">\n' +
    '    <div class="modal-dialog">\n' +
    '        <div class="modal-content">\n' +
    '            <div class="modal-header">\n' +
    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '                    <span aria-hidden="true">&times;</span>\n' +
    '                </button>\n' +
    '                <h4 class="modal-title">Delete item</h4>\n' +
    '            </div>\n' +
    '            <div class="modal-body">\n' +
    '                <h5>Do you really want to delete this item ?</h5>\n' +
    '            </div>\n' +
    '            <div class="modal-footer">\n' +
    '                <button type="button" class="btn btn-danger" data-dismiss="modal">Delete</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/project-view/project-view.component.html',
    '<section class="app-content">\n' +
    '	<div class="row">\n' +
    '		<div class="col-md-8">\n' +
    '			<div class="row">\n' +
    '				<div class="col-md-12">\n' +
    '					<div class="mail-toolbar m-b-md">\n' +
    '						<a href="#" class="btn btn-default pull-right">\n' +
    '						<i class="fa fa-star"></i>\n' +
    '						</a>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '			<div class="mail-view">\n' +
    '				<div class="divid"></div>\n' +
    '				<div class="media">\n' +
    '					<div class="media-left">\n' +
    '						<div class="avatar avatar-lg avatar-circle">\n' +
    '							<img class="img-responsive" src="eficos/img/001.jpg" alt="avatar">\n' +
    '						</div>\n' +
    '					</div>\n' +
    '					<div class="media-body">\n' +
    '						<div class="m-b-sm">\n' +
    '							<h4 class="m-0 inline-block m-r-lg">\n' +
    '								<a href="#profile" class="title-color">John Doe</a>\n' +
    '							</h4>\n' +
    '							<a href="#">\n' +
    '							<span class="label label-success">Web Developer</span>\n' +
    '							<span class="label label-danger">Finance</span>\n' +
    '							<span class="label label-warning">Law</span>\n' +
    '							</a>\n' +
    '						</div>\n' +
    '						<p>\n' +
    '							Web Developer\n' +
    '						</p>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '				<div class="divid"></div>\n' +
    '				<div class="form-group">\n' +
    '					<div class="row">\n' +
    '						<div class="col-md-8">\n' +
    '							<label>Title</label>\n' +
    '							<input class="form-control" value="New user interface" type="text" disabled="">\n' +
    '						</div>\n' +
    '						<div class="col-md-4">\n' +
    '							<label>Departement</label>\n' +
    '							<input class="form-control" value="Technology" type="text" disabled="">\n' +
    '						</div>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '				<div class="form-group">\n' +
    '					<div class="row">\n' +
    '						<div class="col-md-10">\n' +
    '							<label>Objective</label>\n' +
    '							<input class="form-control" value="Deliver an intuitive and user friendly user interface" type="text" disabled="">\n' +
    '						</div>\n' +
    '						<div class="col-md-2">\n' +
    '							<label>Date</label>\n' +
    '							<input class="form-control" value="02/12/2016" type="text" disabled="">\n' +
    '						</div>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '				<div class="form-group m-b-0">\n' +
    '					<div class="row">\n' +
    '						<div class="col-sm-6">\n' +
    '							<label>Contributor(s)</label>\n' +
    '							<input class="form-control m-b-lg" value="Peter Chen Louis" type="text" disabled="">\n' +
    '						</div>\n' +
    '						<div class="col-sm-6">\n' +
    '							<label>Files</label>\n' +
    '							<input class="form-control m-b-lg" value="documentation.docx, data.excel" type="text" disabled="">\n' +
    '						</div>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '				<div class="form-group">\n' +
    '					<label>Description</label>\n' +
    '					<textarea name="new_message_body" class="form-control full-wysiwyg" disabled="" rows="14">We are excited to launch our new company and product Ooooh. After being featured in too many magazines to mention and having created an online stir, we know that Ooooh is going to be big. You may have seen us in the Dinosaurs’ Den where we were we told that we didn’t need them because we were already doing it so well ourselves, so that’s what we have continued to do. We also hope to win Startup Fictional Business of the Year this Year. We are excited to launch our new company and product Ooooh. After being featured in too many magazines to mention and having created an online stir, we know that Ooooh is going to be big. You may have seen us in the Dinosaurs’ Den where we were we told that we didn’t need them because we were already doing it so well ourselves, so that’s what we have continued to do. We also hope to win Startup Fictional Business of the Year this Year.</textarea>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '		<div class="col-md-4 col-sm-4">\n' +
    '			<div class="widget">\n' +
    '				<header class="widget-header">\n' +
    '					<h4 class="widget-title">Feeds</h4>\n' +
    '				</header>\n' +
    '				<hr class="widget-separator">\n' +
    '				<div class="widget-body">\n' +
    '					<div class="media-group feeds-group">\n' +
    '						<div class="media-group-item">\n' +
    '							<div class="media">\n' +
    '								<div class="media-left">\n' +
    '									<div class="avatar avatar-sm avatar-circle"><img src="eficos/img/217.jpg" alt=""></div>\n' +
    '								</div>\n' +
    '								<div class="media-body">\n' +
    '									<h5><a href="javascript:void(0)" class="text-color">Some of the fantastic things people have had to say about Ooooh</a></h5>\n' +
    '									<small class="text-muted">2 days ago</small>\n' +
    '								</div>\n' +
    '							</div>\n' +
    '						</div>\n' +
    '						<div class="media-group-item">\n' +
    '							<div class="media">\n' +
    '								<div class="media-left">\n' +
    '									<div class="avatar avatar-sm avatar-circle"><img src="eficos/img/218.jpg" alt=""></div>\n' +
    '								</div>\n' +
    '								<div class="media-body">\n' +
    '									<h5><a href="javascript:void(0)" class="text-color">Here are just some of the magazine reviews we have had</a></h5>\n' +
    '									<small class="text-muted">1 day ago</small>\n' +
    '								</div>\n' +
    '							</div>\n' +
    '						</div>\n' +
    '						<div class="media-group-item">\n' +
    '							<div class="media">\n' +
    '								<div class="media-left">\n' +
    '									<div class="avatar avatar-sm avatar-circle"><img src="eficos/img/219.jpg" alt=""></div>\n' +
    '								</div>\n' +
    '								<div class="media-body">\n' +
    '									<h5><a href="javascript:void(0)" class="text-color">Lorem ipsum dolor amet, consectetur adipisicing elit.</a></h5>\n' +
    '									<small class="text-muted">2 days ago</small>\n' +
    '								</div>\n' +
    '							</div>\n' +
    '						</div>\n' +
    '						<div class="media-group-item">\n' +
    '							<div class="media">\n' +
    '								<div class="media-left">\n' +
    '									<div class="avatar avatar-sm avatar-circle"><img src="eficos/img/215.jpg" alt=""></div>\n' +
    '								</div>\n' +
    '								<div class="media-body">\n' +
    '									<h5><a href="javascript:void(0)" class="text-color">“It’s just brilliant. I will recommend it to everyone!”</a></h5>\n' +
    '									<small class="text-muted">2 mins ago</small>\n' +
    '								</div>\n' +
    '							</div>\n' +
    '						</div>\n' +
    '						<div class="media-group-item">\n' +
    '							<div class="media">\n' +
    '								<div class="media-left">\n' +
    '									<div class="avatar avatar-sm avatar-circle"><img src="eficos/img/221.jpg" alt=""></div>\n' +
    '								</div>\n' +
    '								<div class="media-body">\n' +
    '									<h5><a href="javascript:void(0)" class="text-color">John has just started working on the project</a></h5>\n' +
    '									<small class="text-muted">right now</small>\n' +
    '								</div>\n' +
    '							</div>\n' +
    '						</div>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '			<div class="row">\n' +
    '				<div class="col-md-12">\n' +
    '					<div class="panel panel-default new-message">\n' +
    '						<div class="panel-body p-0">\n' +
    '							<textarea name="new_message_body" id="new-message-body"></textarea>\n' +
    '						</div>\n' +
    '						<div class="panel-footer">\n' +
    '							<button type="button" class="btn btn-primary">Forward</button>\n' +
    '						</div>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '</section>\n' +
    '<div class="modal fade" id="composeModal" tabindex="-1" role="dialog">\n' +
    '	<div class="modal-dialog">\n' +
    '		<div class="modal-content">\n' +
    '			<div class="modal-header">\n' +
    '				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
    '				<h4 class="modal-title">New Message</h4>\n' +
    '			</div>\n' +
    '			<div class="modal-body">\n' +
    '				<form action="#">\n' +
    '					<div class="form-group"><input name="mail_from_field" id="mail_from_field" type="text" class="form-control" placeholder="from"></div>\n' +
    '					<div class="form-group"><input name="mail_to_field" id="mail_to_field" type="text" class="form-control" placeholder="to"></div>\n' +
    '					<div class="form-group"><input name="mail_subject_field" id="mail_subject_field" type="text" class="form-control" placeholder="subject"></div>\n' +
    '					<textarea name="mail_body_field" id="mail_body_field" cols="30" rows="5" class="form-control" placeholder="content"></textarea>\n' +
    '				</form>\n' +
    '			</div>\n' +
    '			<div class="modal-footer"><button type="button" data-dismiss="modal" class="btn btn-danger"><i class="fa fa-trash"></i></button> <button type="button" data-dismiss="modal" class="btn btn-success"><i class="fa fa-save"></i></button> <button type="button" data-dismiss="modal" class="btn btn-primary">Send <i class="fa fa-send"></i></button></div>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '</div>\n' +
    '<div id="labelModal" class="modal fade" tabindex="-1" role="dialog">\n' +
    '	<div class="modal-dialog">\n' +
    '		<div class="modal-content">\n' +
    '			<div class="modal-header">\n' +
    '				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
    '				<h4 class="modal-title">Create / update label</h4>\n' +
    '			</div>\n' +
    '			<form action="#" id="newCategoryForm">\n' +
    '				<div class="modal-body">\n' +
    '					<div class="form-group m-0"><input type="text" id="catLabel" class="form-control" placeholder="Label"></div>\n' +
    '				</div>\n' +
    '				<div class="modal-footer"><button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button> <button type="button" class="btn btn-success" data-dismiss="modal">Save</button></div>\n' +
    '			</form>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '</div>\n' +
    '<div id="deleteItemModal" class="modal fade" tabindex="-1" role="dialog">\n' +
    '	<div class="modal-dialog">\n' +
    '		<div class="modal-content">\n' +
    '			<div class="modal-header">\n' +
    '				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
    '				<h4 class="modal-title">Delete item</h4>\n' +
    '			</div>\n' +
    '			<div class="modal-body">\n' +
    '				<h5>Do you really want to delete this item ?</h5>\n' +
    '			</div>\n' +
    '			<div class="modal-footer"><button type="button" class="btn btn-danger" data-dismiss="modal">Delete</button></div>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/projects/projects.component.html',
    '<div class="row">\n' +
    '    <div class="col-md-2">\n' +
    '        <div class="app-action-panel" id="inbox-action-panel">\n' +
    '            <div class="action-panel-toggle" data-toggle="class" data-target="#inbox-action-panel" data-class="open"><i class="fa fa-chevron-right"></i> <i class="fa fa-chevron-left"></i></div>\n' +
    '            <div class="app-actions-list scrollable-container">\n' +
    '                <div class="list-group">\n' +
    '                    <h4>Status</h4>\n' +
    '                    <a href="javascript:void(0)" class="text-color list-group-item"><i class="m-r-sm fa fa-check"></i>Recognized</a>\n' +
    '                    <a href="javascript:void(0)" class="text-color list-group-item"><i class="m-r-sm fa fa-exclamation-triangle"></i>Dismissed</a>\n' +
    '                </div>\n' +
    '                <hr class="m-0 m-b-md" style="border-color: #ddd">\n' +
    '                <div class="list-group">\n' +
    '                    <h4>Departements</h4>\n' +
    '                    <a href="#" class="list-group-item">\n' +
    '                        <div class="item-data">\n' +
    '                            <span class="label-text">Finance</span>\n' +
    '                            <span class="pull-right hide-on-hover">7</span>\n' +
    '                        </div>\n' +
    '                    </a>\n' +
    '                    <a href="#" class="list-group-item">\n' +
    '                        <div class="item-data">\n' +
    '                            <span class="label-text">Human<br>resources</span>\n' +
    '                            <span class="pull-right hide-on-hover">5</span>\n' +
    '                        </div>\n' +
    '                    </a>\n' +
    '                    <a href="#" class="list-group-item">\n' +
    '                        <div class="item-data">\n' +
    '                            <span class="label-text">Legal</span>\n' +
    '                            <span class="pull-right hide-on-hover">7</span>\n' +
    '                        </div>\n' +
    '                    </a>\n' +
    '                    <a href="#" class="list-group-item">\n' +
    '                        <div class="item-data">\n' +
    '                            <span class="label-text">Technology</span>\n' +
    '                            <span class="pull-right hide-on-hover">10</span>\n' +
    '                        </div>\n' +
    '                    </a>\n' +
    '                </div>\n' +
    '                <hr class="m-0 m-b-md" style="border-color: #ddd">\n' +
    '                <div class="list-group">\n' +
    '                    <h4>Labels</h4>\n' +
    '                    <a href="#" class="list-group-item"><i class="m-r-sm fa fa-circle text-warning"></i> <span>Personal</span></a>\n' +
    '                    <a href="#" class="list-group-item"><i class="m-r-sm fa fa-circle text-primary"></i> <span>Work</span></a>\n' +
    '                    <a href="#" class="list-group-item"><i class="m-r-sm fa fa-circle text-danger"></i> <span>Business</span></a>\n' +
    '                    <a href="#" class="list-group-item"><i class="m-r-sm fa fa-circle text-success"></i> <span>Clients</span></a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="col-md-10">\n' +
    '        <div class="row">\n' +
    '            <div class="col-md-12">\n' +
    '                <div class="mail-toolbar m-b-lg">\n' +
    '                    <div role="group" class="btn-group pull-left">\n' +
    '                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Filter\n' +
    '                            <span class="caret"></span>\n' +
    '                        </button>\n' +
    '                        <ul class="dropdown-menu">\n' +
    '                            <li><a href="#">Date</a></li>\n' +
    '                            <li><a href="#">Starred</a></li>\n' +
    '                            <li><a href="#">Involvement</a></li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '                    <div class="btn-group pull-left col-md-9">\n' +
    '                        <div class="form-group">\n' +
    '                            <input class="form-control promo-search-field" placeholder="What are you looking for" type="search">\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="btn-group pull-right" role="group">\n' +
    '                        <a href="#" class="btn btn-default">\n' +
    '                            <i class="fa fa-chevron-left"></i>\n' +
    '                        </a>\n' +
    '                        <a href="#" class="btn btn-default">\n' +
    '                            <i class="fa fa-chevron-right"></i>\n' +
    '                        </a>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table mail-list">\n' +
    '                <tr>\n' +
    '                    <td>\n' +
    '                        <div class="mail-item">\n' +
    '                            <table class="mail-container">\n' +
    '                                <tr>\n' +
    '                                    <td class="mail-left">\n' +
    '                                        <div class="avatar avatar-lg avatar-circle">\n' +
    '                                            <a href="#"><img src="eficos/img/208.jpg" alt="sender photo"></a>\n' +
    '                                        </div>\n' +
    '                                    </td>\n' +
    '                                    <td class="mail-center">\n' +
    '                                        <div class="pull-right">\n' +
    '                                            <span>\n' +
    '                                                    <i class="fa fa-comments-o" aria-hidden="true"></i> 620\n' +
    '                                                </span>\n' +
    '                                            <span>\n' +
    '                                                    <i class="fa fa-users" aria-hidden="true"></i> 40\n' +
    '                                                </span>\n' +
    '                                        </div>\n' +
    '                                        <div class="mail-item-header">\n' +
    '                                            <h4 class="mail-item-title">\n' +
    '                                                    <a href="#project-info" class="title-color">Idea collaboration platform</a>\n' +
    '                                                </h4>\n' +
    '                                            <a href="#">\n' +
    '                                                <span class="label label-success">client</span>\n' +
    '                                            </a>\n' +
    '                                            <a href="#">\n' +
    '                                                <span class="label label-primary">work</span>\n' +
    '                                            </a>\n' +
    '                                        </div>\n' +
    '                                        <p class="mail-item-excerpt">\n' +
    '                                            Processes that help multiple people or groups within the same entreprise to interact and share information to achieve common goals.\n' +
    '                                        </p>\n' +
    '                                    </td>\n' +
    '                                    <td class="mail-right">\n' +
    '                                        <p class="mail-item-date">2 hours ago</p>\n' +
    '                                        <p class="mail-item-star starred"><a href="#"><i class="zmdi zmdi-star"></i></a></p>\n' +
    '                                    </td>\n' +
    '                                </tr>\n' +
    '                            </table>\n' +
    '                        </div>\n' +
    '                        <div class="mail-item">\n' +
    '                            <table class="mail-container">\n' +
    '                                <tr>\n' +
    '                                    <td class="mail-left">\n' +
    '                                        <div class="avatar avatar-lg avatar-circle">\n' +
    '                                            <a href="#"><img src="eficos/img/209.jpg" alt="sender photo"></a>\n' +
    '                                        </div>\n' +
    '                                    </td>\n' +
    '                                    <td class="mail-center">\n' +
    '                                        <div class="pull-right">\n' +
    '                                            <span>\n' +
    '                                                    <i class="fa fa-comments-o" aria-hidden="true"></i> 120\n' +
    '                                                </span>\n' +
    '                                            <span>\n' +
    '                                                    <i class="fa fa-users" aria-hidden="true"></i> 20\n' +
    '                                                </span>\n' +
    '                                        </div>\n' +
    '                                        <div class="mail-item-header">\n' +
    '                                            <h4 class="mail-item-title">\n' +
    '                                                    <a href="#project-info" class="title-color">Cross-platform software support</a>\n' +
    '                                                </h4>\n' +
    '                                            <a href="#">\n' +
    '                                                <span class="label label-warning">personal</span>\n' +
    '                                            </a>\n' +
    '                                        </div>\n' +
    '                                        <p class="mail-item-excerpt">\n' +
    '                                            Implemented efico on multiple computing platforms. (e.g. Android, BlackBerry, iDevices, Windows phone)\n' +
    '                                        </p>\n' +
    '                                    </td>\n' +
    '                                    <td class="mail-right">\n' +
    '                                        <p class="mail-item-date">1 minute ago</p>\n' +
    '                                        <p class="mail-item-star"><a href="#"><i class="zmdi zmdi-star-outline"></i></a></p>\n' +
    '                                    </td>\n' +
    '                                </tr>\n' +
    '                            </table>\n' +
    '                        </div>\n' +
    '                        <div class="mail-item">\n' +
    '                            <table class="mail-container">\n' +
    '                                <tr>\n' +
    '                                    <td class="mail-left">\n' +
    '                                        <div class="avatar avatar-lg avatar-circle">\n' +
    '                                            <a href="#"><img src="eficos/img/210.jpg" alt="sender photo"></a>\n' +
    '                                        </div>\n' +
    '                                    </td>\n' +
    '                                    <td class="mail-center">\n' +
    '                                        <div class="pull-right">\n' +
    '                                            <span>\n' +
    '                                                    <i class="fa fa-comments-o" aria-hidden="true"></i> 450\n' +
    '                                                </span>\n' +
    '                                            <span>\n' +
    '                                                    <i class="fa fa-users" aria-hidden="true"></i> 50\n' +
    '                                                </span>\n' +
    '                                        </div>\n' +
    '                                        <div class="mail-item-header">\n' +
    '                                            <h4 class="mail-item-title">\n' +
    '                                                    <a href="#project-info" class="title-color">Stand alone infrastructure</a>\n' +
    '                                                </h4>\n' +
    '                                            <a href="#">\n' +
    '                                                <span class="label label-primary">work</span>\n' +
    '                                            </a>\n' +
    '                                        </div>\n' +
    '                                        <p class="mail-item-excerpt">\n' +
    '                                            Use file and data management operations to directly manipulate groups of files and information in those files.\n' +
    '                                        </p>\n' +
    '                                    </td>\n' +
    '                                    <td class="mail-right">\n' +
    '                                        <p class="mail-item-date">2 hours ago</p>\n' +
    '                                        <p class="mail-item-star">\n' +
    '                                            <a href="#">\n' +
    '                                                <i class="zmdi zmdi-star-outline"></i>\n' +
    '                                            </a>\n' +
    '                                        </p>\n' +
    '                                    </td>\n' +
    '                                </tr>\n' +
    '                            </table>\n' +
    '                        </div>\n' +
    '                        <div class="mail-item">\n' +
    '                            <table class="mail-container">\n' +
    '                                <tr>\n' +
    '                                    <td class="mail-left">\n' +
    '                                        <div class="avatar avatar-lg avatar-circle">\n' +
    '                                            <a href="#"><img src="eficos/img/211.jpg" alt="sender photo"></a>\n' +
    '                                        </div>\n' +
    '                                    </td>\n' +
    '                                    <td class="mail-center">\n' +
    '                                        <div class="pull-right">\n' +
    '                                            <span>\n' +
    '                                                    <i class="fa fa-comments-o" aria-hidden="true"></i> 100\n' +
    '                                                </span>\n' +
    '                                            <span>\n' +
    '                                                    <i class="fa fa-users" aria-hidden="true"></i> 12\n' +
    '                                                </span>\n' +
    '                                        </div>\n' +
    '                                        <div class="mail-item-header">\n' +
    '                                            <h4 class="mail-item-title">\n' +
    '                                                    <a href="#project-info" class="title-color">Reward system</a>\n' +
    '                                                </h4>\n' +
    '                                            <a href="#">\n' +
    '                                                <span class="label label-danger">business</span>\n' +
    '                                            </a>\n' +
    '                                        </div>\n' +
    '                                        <p class="mail-item-excerpt">\n' +
    '                                            Approach to reward one or more persons who act in a desirable way.\n' +
    '                                        </p>\n' +
    '                                    </td>\n' +
    '                                    <td class="mail-right">\n' +
    '                                        <p class="mail-item-date">Just now</p>\n' +
    '                                        <p class="mail-item-star starred">\n' +
    '                                            <a href="#">\n' +
    '                                                <i class="zmdi zmdi-star"></i>\n' +
    '                                            </a>\n' +
    '                                        </p>\n' +
    '                                    </td>\n' +
    '                                </tr>\n' +
    '                            </table>\n' +
    '                        </div>\n' +
    '                        <div class="mail-item">\n' +
    '                            <table class="mail-container">\n' +
    '                                <tr>\n' +
    '                                    <td class="mail-left">\n' +
    '                                        <div class="avatar avatar-lg avatar-circle">\n' +
    '                                            <a href="#"><img src="eficos/img/212.jpg" alt="sender photo"></a>\n' +
    '                                        </div>\n' +
    '                                    </td>\n' +
    '                                    <td class="mail-center">\n' +
    '                                        <div class="pull-right">\n' +
    '                                            <span>\n' +
    '                                                    <i class="fa fa-comments-o" aria-hidden="true"></i> 120\n' +
    '                                                </span>\n' +
    '                                            <span>\n' +
    '                                                    <i class="fa fa-users" aria-hidden="true"></i> 17\n' +
    '                                                </span>\n' +
    '                                        </div>\n' +
    '                                        <div class="mail-item-header">\n' +
    '                                            <h4 class="mail-item-title">\n' +
    '                                                    <a href="#project-info" class="title-color">Social media integration</a>\n' +
    '                                                </h4>\n' +
    '                                            <a href="#">\n' +
    '                                                <span class="label label-warning">personal</span>\n' +
    '                                            </a>\n' +
    '                                        </div>\n' +
    '                                        <p class="mail-item-excerpt">\n' +
    '                                            Increase awareness of your marketing efforts.\n' +
    '                                        </p>\n' +
    '                                    </td>\n' +
    '                                    <td class="mail-right">\n' +
    '                                        <p class="mail-item-date">a minute ago</p>\n' +
    '                                        <p class="mail-item-star"><a href="#"><i class="zmdi zmdi-star-outline"></i></a></p>\n' +
    '                                    </td>\n' +
    '                                </tr>\n' +
    '                            </table>\n' +
    '                        </div>\n' +
    '                        <div class="mail-item">\n' +
    '                            <table class="mail-container">\n' +
    '                                <tr>\n' +
    '                                    <td class="mail-left">\n' +
    '                                        <div class="avatar avatar-lg avatar-circle">\n' +
    '                                            <a href="#"><img src="eficos/img/213.jpg" alt="sender photo"></a>\n' +
    '                                        </div>\n' +
    '                                    </td>\n' +
    '                                    <td class="mail-center">\n' +
    '                                        <div class="pull-right">\n' +
    '                                            <span>\n' +
    '                                                    <i class="fa fa-comments-o" aria-hidden="true"></i> 500\n' +
    '                                                </span>\n' +
    '                                            <span>\n' +
    '                                                    <i class="fa fa-users" aria-hidden="true"></i> 40\n' +
    '                                                </span>\n' +
    '                                        </div>\n' +
    '                                        <div class="mail-item-header">\n' +
    '                                            <h4 class="mail-item-title">\n' +
    '                                                    <a href="#project-info" class="title-color">Multi file format viewer</a>\n' +
    '                                                </h4>\n' +
    '                                            <a href="#">\n' +
    '                                                <span class="label label-primary">work</span>\n' +
    '                                            </a>\n' +
    '                                        </div>\n' +
    '                                        <p class="mail-item-excerpt">\n' +
    '                                            With so many different types of file around these days, it can be quite difficult to now what each of them does...\n' +
    '                                        </p>\n' +
    '                                    </td>\n' +
    '                                    <td class="mail-right">\n' +
    '                                        <p class="mail-item-date">10 days ago</p>\n' +
    '                                        <p class="mail-item-star starred">\n' +
    '                                            <a href="#">\n' +
    '                                                <i class="zmdi zmdi-star"></i>\n' +
    '                                            </a>\n' +
    '                                        </p>\n' +
    '                                    </td>\n' +
    '                                </tr>\n' +
    '                            </table>\n' +
    '                        </div>\n' +
    '                        <div class="mail-item">\n' +
    '                            <table class="mail-container">\n' +
    '                                <tr>\n' +
    '                                    <td class="mail-left">\n' +
    '                                        <div class="avatar avatar-lg avatar-circle">\n' +
    '                                            <a href="#"><img src="eficos/img/214.jpg" alt="sender photo"></a>\n' +
    '                                        </div>\n' +
    '                                    </td>\n' +
    '                                    <td class="mail-center">\n' +
    '                                        <div class="pull-right">\n' +
    '                                            <span>\n' +
    '                                                    <i class="fa fa-comments-o" aria-hidden="true"></i> 200\n' +
    '                                                </span>\n' +
    '                                            <span>\n' +
    '                                                    <i class="fa fa-users" aria-hidden="true"></i> 20\n' +
    '                                                </span>\n' +
    '                                        </div>\n' +
    '                                        <div class="mail-item-header">\n' +
    '                                            <h4 class="mail-item-title">\n' +
    '                                                    <a href="#project-info" class="title-color">Quota based pricing</a>\n' +
    '                                                </h4>\n' +
    '                                            <a href="#">\n' +
    '                                                <span class="label label-success">client</span>\n' +
    '                                            </a>\n' +
    '                                        </div>\n' +
    '                                        <p class="mail-item-excerpt">\n' +
    '                                            Offers free quota that allows you to get started at no cost...\n' +
    '                                        </p>\n' +
    '                                    </td>\n' +
    '                                    <td class="mail-right">\n' +
    '                                        <p class="mail-item-date">2 years ago</p>\n' +
    '                                        <p class="mail-item-star"><a href="#"><i class="zmdi zmdi-star-outline"></i></a></p>\n' +
    '                                    </td>\n' +
    '                                </tr>\n' +
    '                            </table>\n' +
    '                        </div>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '</section>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/register-form/register-form.component.html',
    '<div class="simple-page-form animated flipInY" id="signup-form">\n' +
    '    <h4 class="form-title m-b-xl text-center">Sign Up For a new Account</h4>\n' +
    '    <form name="vm.registerForm" ng-submit="vm.register(vm.registerForm.$valid)" novalidate>\n' +
    '        <div class="form-group has-feedback" ng-class="{ \'has-error\': vm.registerForm.name.$invalid && ( vm.formSubmitted || vm.registerForm.name.$touched) }">\n' +
    '            <input type="text" class="form-control" placeholder="Full name" ng-model="vm.name" name="name" ng-maxlength="30" required>\n' +
    '            <span class="glyphicon glyphicon-user form-control-feedback"></span>\n' +
    '            <p ng-show="vm.registerForm.name.$error.required && ( vm.formSubmitted || vm.registerForm.name.$touched)" class="help-block">Full Name is required.</p>\n' +
    '            <p ng-show="vm.registerForm.name.$error.maxlength" class="help-block">Full Name is too long.</p>\n' +
    '            <p ng-show="vm.registerForm.name.$invalid && (vm.formSubmitted || vm.errors.name)" class="help-block">{{vm.errors.name}}</p>\n' +
    '        </div>\n' +
    '        <div class="form-group has-feedback" ng-class="{ \'has-error\': vm.registerForm.email.$invalid && ( vm.formSubmitted || vm.registerForm.email.$touched) }">\n' +
    '            <input type="email" class="form-control" placeholder="Email" ng-model="vm.email" name="email" ng-maxlength="30" ng-pattern="/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/" required>\n' +
    '            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>\n' +
    '            <p ng-show="vm.registerForm.email.$invalid && (vm.formSubmitted || vm.errors.email)" class="help-block">{{vm.errors.email}}</p>\n' +
    '            <p ng-show="vm.registerForm.email.$error.required && ( vm.formSubmitted || vm.registerForm.email.$touched)" class="help-block">Email is required.</p>\n' +
    '            <p ng-show="vm.registerForm.email.$error.email && vm.registerForm.email.$touched" class="help-block">This is not a valid email.</p>\n' +
    '        </div>\n' +
    '        <div class="form-group has-feedback" ng-class="{ \'has-error\': vm.registerForm.password.$invalid && ( vm.formSubmitted || vm.registerForm.password.$touched) }">\n' +
    '            <input type="password" class="form-control" placeholder="Password" ng-model="vm.password" name="password" ng-minlength="8" ng-maxlength="50" required>\n' +
    '            <span class="glyphicon glyphicon-lock form-control-feedback"></span>\n' +
    '            <p ng-show="vm.registerForm.password.$error.required && ( vm.formSubmitted || vm.registerForm.password.$touched)" class="help-block">Password is required.</p>\n' +
    '            <p ng-show="vm.registerForm.password.$error.maxlength" class="help-block">Password is too long.</p>\n' +
    '            <p ng-show="vm.registerForm.password.$invalid && vm.registerForm.password.$error.minlength && vm.registerForm.password.$touched" class="help-block">Password is too short, Please enter more than 8 characters.</p>\n' +
    '            <p ng-show="vm.registerForm.password.$invalid && (vm.formSubmitted || vm.errors.password)" class="help-block">{{vm.errors.password}}</p>\n' +
    '        </div>\n' +
    '        <div class="form-group has-feedback" ng-class="{ \'has-error\': vm.registerForm.password_confirmation.$invalid && ( vm.formSubmitted || vm.registerForm.password_confirmation.$touched) }">\n' +
    '            <input type="password" class="form-control" placeholder="Password confirmation" ng-model="vm.password_confirmation" password-verify="vm.password" name="password_confirmation" ng-minlength="8" ng-maxlength="50" required>\n' +
    '            <span class="glyphicon glyphicon-lock form-control-feedback"></span>\n' +
    '            <p ng-show="vm.registerForm.password_confirmation.$error.required && ( vm.formSubmitted || vm.registerForm.password_confirmation.$touched)" class="help-block">Password confirmation is required.</p>\n' +
    '            <p ng-show="vm.registerForm.password_confirmation.$error.passwordVerify && ( vm.formSubmitted || vm.registerForm.password_confirmation.$touched)" class="help-block">Password confirmation does not match.</p>\n' +
    '            <p ng-show="vm.registerForm.password_confirmation.$error.maxlength" class="help-block">Password confirmation is too long.</p>\n' +
    '            <p ng-show="vm.registerForm.password_confirmation.$invalid && vm.registerForm.password_confirmation.$error.minlength && vm.registerForm.password_confirmation.$touched" class="help-block">Password confirmation is too short, Please enter more than 8 characters.</p>\n' +
    '            <p ng-show="vm.registerForm.password_confirmation.$invalid && (vm.formSubmitted || vm.errors.password_confirmation)" class="help-block">{{vm.errors.password_confirmation}}</p>\n' +
    '        </div>\n' +
    '        <div class="row">\n' +
    '            <div class="col-xs-12">\n' +
    '                <button type="submit" class="btn btn-primary btn-block btn-flat">Register</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </form>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/reset-password/reset-password.component.html',
    '<form ng-submit="vm.submit(vm.resetPasswordForm.$valid)" name="vm.resetPasswordForm" novalidate>\n' +
    '  <div ng-if="!vm.isValidToken" layout="row" layout-align="center center">\n' +
    '    <md-progress-circular md-mode="indeterminate"></md-progress-circular>\n' +
    '  </div>\n' +
    '  <div ng-if="vm.alerts" class="alert alert-{{alert.type}}" ng-repeat="alert in vm.alerts">\n' +
    '    <h4>{{alert.title}}</h4>\n' +
    '    <p>{{alert.msg}}</p>\n' +
    '  </div>\n' +
    '  <div ng-show="vm.isValidToken">\n' +
    '    <div class="form-group has-feedback" ng-class="{ \'has-error\': vm.resetPasswordForm.password.$invalid && ( vm.formSubmitted || vm.resetPasswordForm.password.$touched) }">\n' +
    '      <input type="password" class="form-control" placeholder="Please enter your new password" ng-model="vm.password" name="password" ng-minlength="8" ng-maxlength="50" required>\n' +
    '      <span class="glyphicon glyphicon-lock form-control-feedback"></span>\n' +
    '      <p ng-show="vm.resetPasswordForm.password.$error.required && ( vm.formSubmitted || vm.resetPasswordForm.password.$touched)" class="help-block">Password is required.</p>\n' +
    '      <p ng-show="vm.resetPasswordForm.password.$error.maxlength" class="help-block">Password is too long.</p>\n' +
    '      <p ng-show="vm.resetPasswordForm.password.$invalid && vm.resetPasswordForm.password.$error.minlength && vm.resetPasswordForm.password.$touched" class="help-block">Password is too short, Please enter more than 8 characters.</p>\n' +
    '      <p ng-show="vm.resetPasswordForm.password.$invalid && (vm.formSubmitted || vm.errors.password)" class="help-block">{{vm.errors.password}}</p>\n' +
    '    </div>\n' +
    '    <div class="form-group has-feedback" ng-class="{ \'has-error\': vm.resetPasswordForm.password_confirmation.$invalid && ( vm.formSubmitted || vm.resetPasswordForm.password_confirmation.$touched ) }">\n' +
    '      <input type="password" class="form-control" placeholder="Please confirm your new password" ng-model="vm.password_confirmation" password-verify="vm.password" name="password_confirmation" ng-minlength="8" ng-maxlength="50" required>\n' +
    '      <span class="glyphicon glyphicon-lock form-control-feedback"></span>\n' +
    '      <p ng-show="vm.resetPasswordForm.password_confirmation.$error.required && ( vm.formSubmitted || vm.resetPasswordForm.password_confirmation.$touched)" class="help-block">Password confirmation is required.</p>\n' +
    '      <p ng-show="vm.resetPasswordForm.password_confirmation.$error.passwordVerify && (vm.formSubmitted || vm.resetPasswordForm.password_confirmation.$touched)" class="help-block">Password confirmation does not match.</p>\n' +
    '      <p ng-show="vm.resetPasswordForm.password_confirmation.$error.maxlength" class="help-block">Password confirmation is too long.</p>\n' +
    '      <p ng-show="vm.resetPasswordForm.password_confirmation.$invalid && vm.resetPasswordForm.password_confirmation.$error.minlength && vm.resetPasswordForm.password_confirmation.$touched" class="help-block">Password confirmation is too short, Please enter more than 8 characters.</p>\n' +
    '      <p ng-show="vm.resetPasswordForm.password_confirmation.$invalid && (vm.formSubmitted || vm.errors.password_confirmation)" class="help-block">{{vm.errors.password_confirmation}}</p>\n' +
    '    </div>\n' +
    '    <div class="row">\n' +
    '      <div class="col-xs-12">\n' +
    '        <button type="submit" class="btn btn-primary btn-block btn-flat">Submit</button>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</form>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/user-verification/user-verification.component.html',
    '<div ng-if="vm.alerts" class="alert alert-{{alert.type}}" ng-repeat="alert in vm.alerts">\n' +
    '  <h4>{{alert.title}}</h4>\n' +
    '  <p>{{alert.msg}}</p>\n' +
    '</div>\n' +
    '<a ui-sref="login" class="btn btn-default">Login Page</a>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/footer/footer.page.html',
    '<div class="wrap p-t-0">\n' +
    '    <footer class="app-footer">\n' +
    '        <div class="clearfix">\n' +
    '            <ul class="footer-menu pull-right">\n' +
    '                <li><a href="javascript:void(0)">Careers</a></li>\n' +
    '                <li><a href="javascript:void(0)">Privacy Policy</a></li>\n' +
    '                <li><a href="javascript:void(0)">Feedback <i class="fa fa-angle-up m-l-md"></i></a></li>\n' +
    '            </ul>\n' +
    '            <div class="copyright pull-left">Copyright Efico 2017 &copy;</div>\n' +
    '        </div>\n' +
    '    </footer>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/forgot-password/forgot-password.page.html',
    '<div class="simple-page">\n' +
    '    <div id="back-to-home"><a href="/" class="btn btn-outline btn-default"><i class="fa fa-home animated zoomIn"></i></a></div>\n' +
    '    <forgot-password></forgot-password>\n' +
    '</div>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/header/header.page.html',
    '<nav-header></nav-header>\n' +
    '<nav-sidebar></nav-sidebar>');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/landing/landing.page.html',
    '<dashboard></dashboard>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/layout/layout.page.html',
    '<div ui-view="header"></div>\n' +
    '<main id="app-main" class="app-main">\n' +
    '    <div class="wrap ng-scope" ui-view="main"></div>\n' +
    '    <div ui-view="footer"></div>\n' +
    '</main>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/login/login.page.html',
    '<div class="simple-page">\n' +
    '    <div id="back-to-home"><a href="/" class="btn btn-outline btn-default"><i class="fa fa-home animated zoomIn"></i></a></div>\n' +
    '    <login-form></login-form>\n' +
    '</div>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/login-loader/login-loader.page.html',
    '<div class="login-box">\n' +
    '  <div class="login-logo">\n' +
    '    <a ui-sref="login"><b>Admin</b>LTE</a>\n' +
    '  </div>\n' +
    '  <div class="login-box-body">\n' +
    '    <login-loader></login-loader>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/register/register.page.html',
    '<div class="simple-page">\n' +
    '    <div id="back-to-home"><a href="/" class="btn btn-outline btn-default"><i class="fa fa-home animated zoomIn"></i></a></div>\n' +
    '    <div class="simple-page-wrap">\n' +
    '        <div class="simple-page-logo animated swing"><a href="/"><span><i class="fa fa-gg"></i></span> <span>Efico</span></a></div>\n' +
    '        <register-form></register-form>\n' +
    '        <div class="simple-page-footer">\n' +
    '            <p><small>Do you have an account ?</small> <a ui-sref="login">SIGN IN</a></p>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/reset-password/reset-password.page.html',
    '<div class="login-box">\n' +
    '  <div class="login-logo">\n' +
    '    <a ui-sref="login"><b>Admin</b>LTE</a>\n' +
    '  </div>\n' +
    '  <div class="login-box-body">\n' +
    '    <div class="row-">\n' +
    '      <div class="col-xs-12">\n' +
    '        <div class="text-center">\n' +
    '          <h3>Reset Password</h3>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <div class="row">\n' +
    '      <div class="col-xs-12">\n' +
    '        <reset-password></reset-password>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/user-verification/user-verification.page.html',
    '<div class="login-box">\n' +
    '  <div class="login-logo">\n' +
    '    <a ui-sref="login"><b>Admin</b>LTE</a>\n' +
    '  </div>\n' +
    '  <div class="login-box-body">\n' +
    '    <user-verification></user-verification>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();
