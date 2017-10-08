<?php

namespace App\Events;

use App\Events\Event;
use App\User;
use Auth;
use \Config;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

use App\Http\Traits\NotificationTrait;

class NotificationEvent extends Event implements ShouldBroadcast
{
    use SerializesModels;
    use NotificationTrait;

    public $data, $to_ids;
    public $user;
    /**
     * Create a new event instance.
     *
     * @return void
     */

    public function __construct($sender_id, $notification_type, $resource_id, $user_ids, $extra_data=array())
    {
        $user = Auth::user();

        $this->createNotification($sender_id, $notification_type, $resource_id, $user_ids, $extra_data=array());
        $message = Config::get("notificaitonMessages.{$notification_type}");

        $this->data = [
            'type' => $notification_type,
            'user' => $user,
            'resource_id' => $resource_id,
            'message' => $message,
            'updateTime' => \Carbon\Carbon::now()->toDateTimeString(),
        ];

        $this->to_ids = $user_ids;
        $this->user = $user;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return ['notification-channel'];
    }
}
