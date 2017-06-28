<?php

namespace App\Events;

use App\Events\Event;
use App\User;
use Auth;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class CommentPostEvent extends Event implements ShouldBroadcast
{
    use SerializesModels;

    public $comment, $project_id, $time_ago;
    public $user;
    /**
     * Create a new event instance.
     *
     * @return void
     */

    public function __construct($comment,$project_id,$time_ago)
    {
        //
        $user = Auth::user();
        $this->user = $user;
        $this->comment = $comment;
        $this->time_ago = $time_ago;
        $this->project_id = $project_id;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return ['project-channel-'.$this->project_id];
    }
}
