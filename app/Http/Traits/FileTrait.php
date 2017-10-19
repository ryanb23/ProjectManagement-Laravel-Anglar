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
        $file_extension = isset($path_parts['extension']) ? '.'.$path_parts['extension']:'';
        $filename = $path_parts['filename'].'_'.time().$file_extension;
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

    public function removeFromTmp($filename)
    {
        $upload_dir = env('UPLOAD_DIR');
        $file_des = $upload_dir.'/tmp/'.$filename;
        return unlink($file_des);
    }

    public function base64_to_png($base64_string, $user_id) {
        $upload_dir = env('UPLOAD_DIR');
        if (!file_exists($upload_dir.'/profile/')) {
            mkdir($upload_dir.'/profile/', 0777, true);
        }
        $output_file = $upload_dir.'/profile/'.$user_id.'_'.time().'png';
        // open the output file for writing
        $ifp = fopen( $output_file, 'wb' );

        // split the string on commas
        // $data[ 0 ] == "data:image/png;base64"
        // $data[ 1 ] == <actual base64 string>
        $data = explode( ',', $base64_string );

        // we could add validation here with ensuring count( $data ) > 1
        fwrite( $ifp, base64_decode( $data[ 1 ] ) );

        // clean up the file resource
        fclose( $ifp );

        return $output_file;
    }
}
