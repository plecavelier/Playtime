<?php

$dir = "photos";
if (isset($_GET['step']) && isset($_GET['uuid'])) {
	$filename = $_GET['uuid']."_".$_GET['step'].".jpeg";
	header("Content-type: image/jpeg");
	echo file_get_contents($dir."/".$filename);
} else if (!empty($_FILES) && !$_FILES['file']['error']) {
	$filename = $_POST['uuid']."_".$_POST['step'].".jpeg";
	move_uploaded_file($_FILES['file']['tmp_name'], $dir."/".$filename);
} else {
	http_response_code(404);
}

?>