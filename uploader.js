var uploader = {
	url : 'uploader.php',

	idBrowse : 'uploaderBrowse',
	idProgress : 'uploaderProgress',
	idPhoto : 'uploaderPhoto',
	idError : 'uploaderError',
	
	imageWidth : 500,

	init : function(step) {

		this.step = step;

		var thiz = this;
		
		$('#' + thiz.idError).hide();
		$('#' + thiz.idProgress).hide();

		var up = new plupload.Uploader({
			browse_button : this.idBrowse,
			url : this.url,
			multipart_params : {
				"step" : step,
				"uuid" : this.getUUID()
			},
			filters : {
				mime_types : [ {
					title : "Image files",
					extensions : "jpg,jpeg"
				} ]
			},
			resize : {
				width : this.imageWidth
			}
		});

		up.bind('FilesAdded', function(up, files) {
			console.log('File added. Start upload...');
			up.start();
			$('#' + thiz.idError).hide();
		});

		up.bind('UploadProgress', function(up, file) {
			console.log('Progress file upload to ' + file.percent + '%');
			$('#' + thiz.idProgress).show();
			$('#' + thiz.idProgress).attr('value', file.percent);
		});

		up.bind('FileUploaded', function(up, file, response) {
			console.log('File uploaded');
			console.log(response);
			thiz.refreshImage();
		});

		up.bind('Error', function(up, err) {
			console.error('Error during upload');
			console.error(err);
			$('#' + thiz.idError).show();
		});

		up.init();

		this.refreshImage();
	},

	refreshImage : function() {
		var url = this.getImageURL();
		$('#' + this.idPhoto).attr('src', url);
	},

	getImageURL : function() {
		return this.url + '?step=' + this.step + "&uuid=" + this.getUUID();
	},

	getUUID : function() {
		var uuid = localStorage.getItem('uuid');
		if (uuid == null) {
			uuid = this.generateUUID();
			localStorage.setItem('uuid', uuid);
		}
		return uuid;
	},

	generateUUID : function() {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
			function(c) {
				var r = (d + Math.random() * 16) % 16 | 0;
				d = Math.floor(d / 16);
				return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
			});
		return uuid;
	}
};