import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {}

let fs: FirebaseFirestore.Firestore;

exports.setupUser = functions
  .region('europe-west1')
  .auth.user()
  .onCreate(async (user, context) => {
    if (!fs) {
      fs = admin.firestore();
      fs.settings({
        timestampsInSnapshots: true,
        ignoreUndefinedProperties: true,
      });
    }

    return fs
      .collection('users')
      .doc(user.uid)
      .set(
        {
          email: user.email ? user.email.toLowerCase() : '',
          userGroup: user.email == 'admin@corona.at' ? 'admin' : 'user',
          registrationDate: new Date(user.metadata.creationTime),
        },
        { merge: true }
      );
  });
