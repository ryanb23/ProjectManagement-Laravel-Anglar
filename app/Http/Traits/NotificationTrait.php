<?php

namespace App\Http\Traits;

use App\Models\Notification;

trait NotificationTrait
{
    /**
     * Create a new notification
     *
     * @return void
     */
    public function createNotification($sender_id, $notification_type, $resource_id, $users, $extra_data=array())
    {
        $notification_data = array_map(function($user_id) use($sender_id,$notification_type,$resource_id,$extra_data){
            return array(
                'sender_id'         => $sender_id,
                'to_id'             => $user_id,
                'notification_type' => $notification_type,
                'resource_id'       => $resource_id,
                'is_read'           => 0,
                "created_at" =>  \Carbon\Carbon::now(),
                "updated_at" => \Carbon\Carbon::now()
            );
        },$users);
        return Notification::insert($notification_data);
    }
}
