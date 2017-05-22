<?php

namespace App\Events;

use App\Events\Event;
use App\User;
use Auth;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MessagePostEvent extends Event implements ShouldBroadcast
{
    use SerializesModels;

    public $message, $to_id;
    public $user;
    /**
     * Create a new event instance.
     *
     * @return void
     */

    public function __construct($message,$to_id)
    {
        //
        $this->message = $message;
        $user = Auth::user();
        $this->to_id = $to_id;
        $this->user = $user;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return ['chat-channel-'.$this->to_id];
    }
}
