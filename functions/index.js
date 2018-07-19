const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

var serviceAccount = require("./config").firebase;

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://roqaapplive.firebaseio.com'
});

exports.createCustomToken = functions.https.onRequest((request, response) => {

	cors(request, response, () => {

		var uid = request.query.uid;

		admin.auth().createCustomToken(uid)
			.then(function(customToken) {
				response.json({
					type: 'success',
					token: customToken
				})
			})
			.catch(function(error) {
				response.json({
					type: 'failed',
					message: 'Error creating custom token',
					error: error
				})
			});
	});

});
