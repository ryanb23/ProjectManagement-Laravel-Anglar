<?php
use Psr\Http\Message\UploadedFileInterface;

$api->group(['middleware' => ['api']], function ($api) {
    $api->controller('auth', 'Auth\AuthController');

    // Password Reset Routes...
    $api->post('auth/password/email', 'Auth\PasswordResetController@sendResetLinkEmail');
    $api->get('auth/password/verify', 'Auth\PasswordResetController@verify');
    $api->post('auth/password/reset', 'Auth\PasswordResetController@reset');

    $api->post('images/upload', 'ProjectController@imageUpload');
});

$api->group(['middleware' => ['api', 'api.auth', 'role:admin.super|admin.user']], function ($api) {

});

$api->group(['middleware' => ['api', 'api.auth']], function ($api) {
    $api->get('users/me', 'UserController@getMe');
    $api->put('users/me', 'UserController@putMe');
    $api->get('users/all-chat-user', 'UserController@getAllChatUser');
    /**
    ** Message Api
    **/
    $api->controller('users', 'UserController');
    $api->controller('message','MessageController');
    $api->controller('projects','ProjectController');
    $api->controller('departments','DepartmentController');
    $api->controller('labels','LabelController');
    $api->controller('todos','TodosController');
    $api->controller('tasks','TaskController');
    $api->controller('notifications','NotificationController');
    $api->controller('rewards','RewardController');
    $api->controller('jobtitles','JobtitleController');

    /**
    ** Image UploadedFileInterface
    **/
});
