<?php
/*

************************************
image_resize.php
************************************

	- Project:  cloud.skaut38
	- Author:   J. Humpl   
*/

const IMAGE_HANDLERS = [
    IMAGETYPE_JPEG => [
        'load' => 'imagecreatefromjpeg',
        'save' => 'imagejpeg',
        'quality' => 70
    ],
    IMAGETYPE_PNG => [
        'load' => 'imagecreatefrompng',
        'save' => 'imagepng',
        'quality' => 0
    ],
    IMAGETYPE_GIF => [
        'load' => 'imagecreatefromgif',
        'save' => 'imagegif'
    ]
];

function createThumbnail($src, $dest, $targetWidth, $targetHeight)
{
    // get the type of the image
    // we need the type to determine the correct loader
    $type = exif_imagetype($src);

    // if no valid type or no handler found -> exit
    if (!$type || !IMAGE_HANDLERS[$type]) {
        return null;
    }

    $image = call_user_func(IMAGE_HANDLERS[$type]['load'], $src);
    if (!$image) {
        return null;
    }

    // get original image width and height
    $width = imagesx($image);
    $height = imagesy($image);

    $widthOffset = 0;
    $heightOffset = 0;

    // get width to height ratio
    $ratio = $width / $height;
    $targetRatio = $targetWidth / $targetHeight;

    // use ratio to scale height to fit in target size
    if ($ratio > $targetRatio) {
        //get the difference between original width and used width and divide it by 2
        //so it return offset for centering result
        $widthOffset = ($width - ($height*$targetRatio))/2;
        //change width of source, so it will be in desired aspect ratio
        $width = $height * $targetRatio;
    }
    // if is too tall
    else {
        //same as above, just for the case image is too tall instaead of wide
        $heightOffset = ($height - ($width/$targetRatio))/2;
        $height = $width / $targetRatio;
    }


    // create duplicate image based on calculated target size
    $thumbnail = imagecreatetruecolor($targetWidth, $targetHeight);

    if ($type == IMAGETYPE_GIF || $type == IMAGETYPE_PNG) {

        imagecolortransparent(
            $thumbnail,
            imagecolorallocate($thumbnail, 0, 0, 0)
        );

        if ($type == IMAGETYPE_PNG) {
            imagealphablending($thumbnail, false);
            imagesavealpha($thumbnail, true);
        }
    }

    // copy entire source image to duplicate image and resize
    imagecopyresampled(
        $thumbnail,
        $image,
        0,
        0,
        $widthOffset,
        $heightOffset,
        $targetWidth,
        $targetHeight,
        $width,
        $height
    );

    // save the duplicate version of the image to disk
    return call_user_func(
        IMAGE_HANDLERS[$type]['save'],
        $thumbnail,
        $dest,
        IMAGE_HANDLERS[$type]['quality']
    );
}
