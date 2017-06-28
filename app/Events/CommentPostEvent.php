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

    public $comment, $project_id, $created_at;
    public $user;
    /**
     * Create a new event instance.
     *
     * @return void
     */

    public function __construct($comment,$project_id,$created_at)
    {
        //
        $user = Auth::user();
        $this->user = $user;
        $this->comment = $comment;
        $this->created_at = $created_at;
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
