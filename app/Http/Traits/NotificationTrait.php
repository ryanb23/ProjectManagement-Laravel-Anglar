<?php

namespace App\Http\Traits;

use App\Models\Notification;
use Auth;

trait NotificationTrait
{
    /**
     * Create a new notification
     *
     * @return void
     */
    public function createNotification($sender_id, $notification_type, $resource_id, $users, $extra_data=array())
    {
        $user = Auth::user();
        $current_user_id = $user['id'];
        foreach($users as $user_id)
        {
            if($current_user_id == $user_id)
                continue;
            $data = array(
                'sender_id'         => $sender_id,
                'to_id'             => $user_id,
                'notification_type' => $notification_type,
                'resource_id'       => $resource_id,
                'is_read'           => 0,
                );
            $notification_item = Notification::firstOrNew($data);
            $notification_item->updated_at = \Carbon\Carbon::now();
            $notification_item->save();
        }
        return true;
    }
}
