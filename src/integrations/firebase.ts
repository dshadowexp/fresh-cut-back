import * as admin from 'firebase-admin';

const serviceAccount = {

}

class FirebaseAdmin {
    private static instance: FirebaseAdmin;

    private constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(
                serviceAccount as admin.ServiceAccount
            )
        })
    }

    public static getInstance(): FirebaseAdmin {
        if (!FirebaseAdmin.instance) {
            FirebaseAdmin.instance = new FirebaseAdmin();
        }
        return FirebaseAdmin.instance;
    }

    public getAuth() {
        return admin.auth();
    }

    public getBucket() {
        return admin.storage().bucket('gs://winexp-b0996.appspot.com');
    }

    public getMessenger() {
        return admin.messaging();
    }
}

export default FirebaseAdmin