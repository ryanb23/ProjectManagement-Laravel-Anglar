<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use Bican\Roles\Models\Permission;
use Bican\Roles\Models\Role;
use Hash;
use Input;
use Validator;
use App\Http\Requests;

use App\User;
use App\Models\Message;

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

    private function getMessageNotificationCount($user_id){
        $result = Message::where('to_id',$user_id)->where('is_read',0)->selectRaw('count(*) as cnt')->get('cnt');
        return $result;
    }

    public function getChatNotificationList(){
        $user = Auth::user();
        $user_id = $user->id;
        $result = Message::where('to_id',$user_id)->where('is_read',0)->selectRaw('count(*) as cnt,user_id')->groupby('user_id')->get()->toArray();
        foreach($result as $key=>$value)
        {
            $result[$value['user_id']] = $value['cnt'];
            unset($result[$key]);
        }
        return response()->success($result);
    }
}
