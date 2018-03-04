<?php
/**
 * Created by PhpStorm.
 * User: comnic
 * Date: 2018. 3. 3.
 * Time: 오후 2:44
 */

$target_dir = "uploads/";  //업로드될 디렉토리 (홈데렉토리에서 uploads 디렉토리에 파일이 업로드된다. 미리생성해줘야함)
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]); //파일의 주소
$uploadOk = 1; //파일이 업로드 될 수 있는 상태인지 확인
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION); //jpg, png등 파일형식 확인



// 이미지 파일이 진짜인지 가짜인지 확인
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}

// 이미 존재 하고 있는지 확인
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

// 파일 사이즈 확인
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// 허용되는 파일형식 확인
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}

// uploadOK가 1이면 파일업로드 실행
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>