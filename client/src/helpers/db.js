import firebase from 'firebase';

const database = firebase.database();

/* returns a list of contact objs of a user */
export function getContacts(uid) {
  const path = `users/${uid}/template`;
  database.ref(path).once('value').then(snapshot => snapshot.val());
}

/* returns a template object of a user */
export function getTemplate(uid) {
  const path = `users/${uid}/template`;
  database.ref(path).once('value').then(snapshot => snapshot.val());
}
