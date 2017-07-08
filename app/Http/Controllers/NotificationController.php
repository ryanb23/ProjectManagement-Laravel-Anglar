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
        $result = Message::where('to_id',$user_id)->selectRaw('count(*) as cnt')->get('cnt');
        return $result;
    }
}
