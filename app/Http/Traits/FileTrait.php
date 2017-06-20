<?php

namespace App\Http\Traits;

trait FileTrait
{
    public function fileUpload($project_id, $files){
        $upload_dir = env('UPLOAD_DIR');
        $result = array();
        foreach($files as $key => $file)
        {
            $filename = $file['filename'];
            $file_des = $upload_dir.'/'.$project_id.'/'.$filename;

            if (!file_exists($upload_dir.'/'.$project_id.'/')) {
                mkdir($upload_dir.'/'.$project_id.'/', 0777, true);
            }
            if (rename($upload_dir.'/tmp/'.$filename, $file_des))
            {
                $result[] = $file;
            }
        }
        return $result;
    }

    public function fileToTmp($file){
        $upload_dir = env('UPLOAD_DIR');
        $result = array();
        $path_parts = pathinfo($file['file']['name']);
        $filename = $path_parts['filename'].'_'.time().'.'.$path_parts['extension'];
        $file_des = $upload_dir.'/tmp/'.$filename;

        if (!file_exists($upload_dir.'/tmp/')) {
            mkdir($upload_dir.'/tmp/', 0777, true);
        }
        if (move_uploaded_file($file['file']['tmp_name'], $file_des))
        {
            $result = array(
                'type'=> $file['file']['type'],
                'filename'=> $filename,
                'org_filename'=> $file['file']['name']
            );
        }
        return $result;
    }
}
