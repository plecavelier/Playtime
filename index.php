<?php 

$step = isset($_GET['step']) ? $_GET['step'] : 1;

?>

<!DOCTYPE html>
<html>
<head>

<meta charset="utf-8">

<title>Upload photo</title>

<link rel="stylesheet" href="uploader.css" type="text/css"
	media="screen">

<script src="jquery-1.11.3.min.js"></script>
<script src="plupload.full.min.js"></script>
<script src="uploader.js"></script>

</head>

<body>

	<div>
		<a id="uploaderBrowse" href="javascript:void(0);">Prendre une
			photo</a>

		<progress id="uploaderProgress" value="0" max="100"></progress>

		<span id="uploaderError">Erreur durant l'enregistrement de
			l'image</span>
	</div>
	
	<br/>
	
	<div>
		<?php if ($step > 1) { ?>
		<a href="?step=<?php echo $step - 1 ?>">Etape precedente</a>
		<?php } ?>
		<a href="?step=<?php echo $step + 1 ?>">Etape suivante</a>
	</div>
	
	<br/>

	<div>
		<img id="uploaderPhoto" src="" alt="" />
	</div>

	<script>
		uploader.init(<?php echo $step ?>);
	</script>

</body>
</html>
