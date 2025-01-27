/*
 * Info Screen
 */

Alloy.Globals.response='';

var Cloud = require('ti.cloud');

var window2 = {response:'test'};

var userBio;  //user data

var filename;		// global variableused to store filename url of profile picture
var username;		// user data
var firstname;		// user data
var lastname;		// user data
var email;			// user data
var userID;			// user data
var image;			// global variable used to store profile picture object
var labelCount = 0;	// label counter
var label = [];	// label array

var responseGlobal;

// gets the user ID
function getUserID() {
	Ti.API.info(userID);
	Ti.API.info('User ID: (get user ID) ' + document.userID);
	return userID;
}

// allows a user to upload their profile picture at any time
function uploadPhoto(){
	var uid;
	Cloud.Users.showMe(function(e){
		if (e.success) {
			var user = e.users[0];			
			uid = user.id;
		} 
		else {
				Ti.API.info('Error:\n' +
				((e.error && e.message) || JSON.stringify(e)));
		} 
	});
	
	Titanium.Media.openPhotoGallery({
	    success: function(e){
	    //  Ti.API.info(e.mediaType);
	        if(e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO){
	           image = e.media;
	           Ti.API.info(image);
	
	           Cloud.Photos.create({
	                photo: image,
	                name: 'profile' + uid,
	                user_id: uid
	            }, function(e){
	                if(e.success){
	                    var photo = e.photos[0];
	                    Ti.API.info('Success:\n' +
	                        'id: ' + photo.id + '\n' +
	                        'filename: ' + photo.filename + '\n' +
	                        'size: ' + photo.size,
	                        'updated_at: ' + photo.updated_at);
	                }else{
	                    Ti.API.info('Error:\n' +
	                    ((e.error && e.message) || JSON.stringify(e)));
	                    Ti.API.info("Code: "+e.code);
	                }
	            });
	       }
	    },
	    cancel: function(){
	
	    },
	    error: function(err){
	        Ti.API.info("ERROR: "+err);
	    },
	    mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

// searches for your profile picture and sets it
function searchPhoto() {
	var uid;
	Cloud.Users.showMe(function(e){
		if (e.success) {
			var user = e.users[0];			
			uid = user.id;
		} 
		else {
				Ti.API.info('Error:\n' +
				((e.error && e.message) || JSON.stringify(e)));
		} 
	});
	
	Cloud.Photos.search({
	    user_id: uid
	}, function (e) {
	    if (e.success) {
	        for (var i = 0; i < e.photos.length; i++) {
	            var photo = e.photos[i];
	            /*Ti.API.info('id: ' + photo.id + '\n' +
	                  'name: ' + photo.name + '\n' +
	                  'filename: ' + photo.filename + '\n' +
	                  'updated_at: ' + photo.updated_at + '\n' +
	                  'url: ' + photo.urls.original + '\n' +
	                  'userID: ' + photo.user_id);*/
				filename = photo.urls.original;
				//filename = '/images/avatar.jpeg';
	        }
	        
	        Ti.API.info(filename);
	        
	       // $.picture.image = filename;
	        
	        var pPicture = $.UI.create('ImageView', {
	        	height: '100%',
				id: 'pPicture',
				image:filename,
				layout: 'vertical'
			});
			
			$.profilePicture.add(pPicture);
	        
	    } else {
	        Ti.API.info('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
			filename = '/images/avatar.jpeg';
			
			var pImage = Ti.UI.createImageView({
				width:"200px",
				height:"200px",
				image:filename
			});
			
			$.profilePicture.add(pImage);
	    }
	});
}

function addLabel(title, fontsize, fontcolor, textalign, classes, id, layout) {
	//var count = labelCount;
	
	var label = $.UI.create('Label', {
	   text: title,
	   font: {fontSize: fontsize},
	   color:fontcolor,
	   textAlign: textalign,
	   classes: [classes],
	   id: id,
	   layout: layout
	});
	
	//label[count] = label;
	
	//labelCount = labelCount + 1;
	
	return label;
}

function addUploadButton() {
	var uploadPhotoButton = $.UI.create('View', {
	   classes: ["button"],
	   id: 'uploadBtn'
	});
	
	var uploadButtonLabel = $.UI.create('Label', {
	   text: 'Upload Photo',
	   classes: ["buttonLabel"],
	   id: 'Lbl'
	});
	
	uploadPhotoButton.add(uploadButtonLabel);
	$.uploadPictureButton.add(uploadPhotoButton);
	
	uploadPhotoButton.addEventListener('click', function(){
	    uploadPhoto();
	});	
}

function addDataButton() {
	var uploadDataButton = $.UI.create('View', {
	   classes: ["button"],
	   id: 'Btn'
	});
	
	var uploadDataLabel = $.UI.create('Label', {
	   text: 'Upload Photo',
	   classes: ["buttonLabel"],
	   id: 'Lbl'
	});
	
	uploadDataButton.add(uploadDataLabel);
	$.profileSpecific.add(uploadDataButton);
	
	uploadDataButton.addEventListener('click', function(){
	    createDocument('mobileapp', 'data', document);
	});	
}

function getDatabases() {
	var url = "https://api.mongolab.com/api/1/databases?apiKey=EGS_uas-aVUXdr5G2lvujnOtuJytdvPE";
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received text: " + JSON.parse(this.responseText));
			Ti.API.info('success');
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			Ti.API.info('error');
		},
		timeout : 5000  // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();
}

function getCollections() {
	var url = "https://api.mongolab.com/api/1/databases/mobileapp/collections?apiKey=EGS_uas-aVUXdr5G2lvujnOtuJytdvPE";
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received text: " + JSON.parse(this.responseText));
			Ti.API.info('success');
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			Ti.API.info('error');
		},
		timeout : 5000  // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();
}


function responseCallback(data) {
	Ti.API.info(data);
}


function getDocuments(database, collection, query) {
	var url = "https://api.mongolab.com/api/1/databases/" + database + "/collections/" + collection + query + "apiKey=EGS_uas-aVUXdr5G2lvujnOtuJytdvPE";
	var json;
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			json = this.responseText;
			responseCallback(json);
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			Ti.API.info('error');
		},
		timeout : 5000  // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();
}

function createDocument(database, collection, data) {
	var url = 
	"https://api.mongolab.com/api/1/databases/"+database+"/collections/"+collection+"?apiKey=EGS_uas-aVUXdr5G2lvujnOtuJytdvPE";
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received text: " + JSON.parse(this.responseText));
			Ti.API.info('success 1');
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			Ti.API.info(e.error);
		},
		timeout : 15000  // in milliseconds
	});
	client.open('POST',url,false);
	
	var send = JSON.stringify(data);
	
	client.setRequestHeader('Content-Type','application/json');
	
	client.send(send);
}

// gets the user info needed to present data
function getUserInfo(e) {
	Cloud.Users.showMe(function(e){
		if (e.success) {
			var user = e.users[0];
			username = user.username;
			firstname = user.first_name;
			lastname = user.last_name;
			email = user.email;
			userID = user.id;
			userBio = firstname + " lived the life others wish they had.";
			
			userData = {
				'_id':userID,
				'username':username,
				'firstname':firstname,
				'lastname':lastname, 
				'email':email,
				'userID':userID,
				'userBio':userBio
			};
			
			createDocument('mobileapp', 'data', userData);
			
			var database = 'mobileapp';
			var collection = 'data';
			var query = '/'+userID+'?';
			
			var url = "https://api.mongolab.com/api/1/databases/" + database + "/collections/" + collection + query + "apiKey=EGS_uas-aVUXdr5G2lvujnOtuJytdvPE";
			var json;
			var client = Ti.Network.createHTTPClient();
			
			client.onload = function(e) {
				json = JSON.parse(this.responseText);
				Ti.API.info(json);
				/*if (userData.userID != json.userID) {
					createDocument('mobileapp', 'data', userData);
				}*/
			};
			// Prepare the connection.
			client.open("GET", url);
			// Send the request.
			client.send();
			
			
			
			
			
			/*getDocuments('mobileapp', 'data', '/'+userID+'?');
			Ti.API.info(window2.response);*/

			/*if (getDocuments('mobileapp', 'data', '/'+userID+'?') != null) {
				createDocument('mobileapp', 'data', userData);
			} */
			  
			  
			$.username.text = "Username: " + user.username;
			$.firstname.text = "First Name: " + user.first_name;
			$.lastname.text = "Last Name: " + user.last_name;
			$.email.text = "Email: " + user.email;
			$.userID.text = "User ID: " + user.id;
			
		} 
		else {
				Ti.API.info('Error:\n' +
				((e.error && e.message) || JSON.stringify(e)));
		} 
	});
}

function init() {
	getUserInfo();
	searchPhoto();
	addUploadButton();
	//$.profileImage.add(addLabel('test', '20px', 'blue', 'left', 'custom', 'custom1', 'vertical'));
}

init();

/////////////////////////
// Bio Section
////////////////////////

function addBioButton() {
	var uploadBioButton = $.UI.create('View', {
	   classes: ["button"],
	   id: 'btnRight'
	});
	
	var uploadBioLabel = $.UI.create('Label', {
	   text: 'Edit Bio',
	   classes: ["buttonLabel"],
	   id: 'Lbl'
	});
	
	uploadBioButton.add(uploadBioLabel);
	$.specificProfile.add(uploadBioButton);
	 
	uploadBioButton.addEventListener('click', function(){
		var window = Alloy.createController("bio").getView();
		window.open();
	});
}

addBioButton();
    
function updateUserBio(e) {
	Cloud.Users.showMe(function (e) {
		if (e.success) {
			var user = e.users[0];
			var row = Ti.UI.createTableViewRow({
				title: user.custom_fields.userBio,
				textAlign: "left",
				font: {fontSize: 14},
				textColor: "white"
			});
			$.bioText.appendRow(row);
		} else {
			Ti.API.info('Error:\n' +
				((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

updateUserBio();

/////////////////////////
// Courses Section
////////////////////////

function getCourses() {
	//var url = "http://johnkuiphoff.com/courses/mobilecomputing/things/getthings.php";
	var url = "http://jamesfreund.com/mobile/getThings.php";
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			// parse json coming from the server
			var json = JSON.parse(this.responseText);
			// Ti.API.info('success 9' + JSON.stringify(json));
			
			// if things are returned
	 		if(json.courses)
			{
		 		// loop through all of our things
		 		for (var i = 0; i < json.courses.length; i++) 
		 		{
					// Ti.API.info(json.courses[i].courseName);
					var row = Ti.UI.createTableViewRow({
						textAlign: "center",
						border: 10,
						// borderColor: "#141925",
						borderColor: "red",
						id: json.courses[i].id
					});
					var newView = Ti.UI.createView({
						layout: "horizontal"
					});
					var labelOne = Ti.UI.createLabel({
						text: " " + json.courses[i].courseNumber,
						width: "15%",
						height: "auto",
						font: {fontSize: 14}
					});
					var labelTwo = Ti.UI.createLabel({
						text: "|\t" + json.courses[i].courseName,
						width: "85%",
						height: "auto",
						font: {fontSize: 14}
					});
					// Ti.API.info("Course Number: " + json.courses[i].courseNumber + "\nCourse Name: " + json.courses[i].courseName);
					newView.add(labelOne);
					newView.add(labelTwo);
					row.add(newView);
					$.courseList.appendRow(row);
				}
			}
			},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			Ti.API.info('error');
		},
		timeout : 55000  // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url, true);
	// Send the request.
	client.send();
}

getCourses();