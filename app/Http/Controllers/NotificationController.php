<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use Bican\Roles\Models\Permission;
use Bican\Roles\Models\Role;
use Hash;
use Input;
use \Config;
use Validator;
use App\Http\Requests;

use App\User;
use App\Models\Message;
use App\Models\Notification;

class NotificationController extends Controller
{
    /**
     * Get All notificaiton Number (for Header)
     *
     * @return JSON
     */
    public function getAllNumber()
    {
        $user = Auth::user();
        $messageNotification = self::getMessageNotificationCount($user->id);
        $totalNotificaitonCnt = $messageNotification[0]->cnt;
        return response()->success($totalNotificaitonCnt);
    }

    public function getNotifications(){
        $result = self::userNotifications();
        return response()->success($result);
    }
    public function postUpdateNotifications(Request $request)
    {
        Notification::where(array(
            'sender_id' => $request['user']['id'],
            'notification_type' => $request['type'],
            'resource_id' => $request['resource_id'],
            'is_read' => 0
        ))->update(['is_read' => 1]);

        $result = self::userNotifications();
        return response()->success($result);
    }

    private function userNotifications(){
        $user = Auth::user();
        $user_id = $user->id;
        $notifications = Notification::with(array('sender' => function($query){
                $query->select(['id','name','avatar','firstname','lastname']);
            }))->where('to_id',$user_id)->where('is_read',0)->orderBy('updated_at','desc')->get()->toArray();

        $result = array_map(function($item){
            return array(
                'type' => $item['notification_type'],
                'user' => $item['sender'],
                'resource_id' => $item['resource_id'],
                'message' => Config::get("notificaitonMessages.{$item['notification_type']}"),
                'updateTime' => $item['updated_at']
            );
        }, $notifications);
        return $result;
    }

    private function getMessageNotificationCount($user_id){
        $result = Message::where('to_id',$user_id)->where('is_read',0)->selectRaw('count(*) as cnt')->get('cnt');
        return $result;
    }

    public function getChatNotificationList(){
        $user = Auth::user();
        $user_id = $user->id;
        $db_result = Message::where('to_id',$user_id)->where('is_read',0)->selectRaw('count(*) as cnt,user_id')->groupby('user_id')->get()->toArray();
        $result = [];
        foreach($db_result as $key=>$value)
        {
            $result[$value['user_id']] = $value['cnt'];
        }
        return response()->success($result);
    }

    public function postReadAll(){
        $user = Auth::user();
        $user_id = $user->id;
        $result = Message::where('to_id',$user_id)->where('is_read',0)->update(['is_read' => 1]);
        return $result;
    }
}
