import * as admin from 'firebase-admin';

const serviceAccount = {
    project_id: ''
    // type: "service_account",
    // project_id: "winexp-b0996",
    // private_key_id: "c77ddce68fbdf239f3f0a27c004b2bfce11ebdf0",
    // private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1YopcUW8/9RPJ\np2n+kMx2ov5W7RFSPmQPg1xWAXnRaf8B/IpVq9jjl0yUHcLvYK1/1G1niMgv1Okj\nx7XoTErHRCwUSsPDXIyb8lvnWfjvEH+zUmTkw0N+xALUNynH5kvab+XCFWBUTG9b\n/c7yrT5Xj3j13KgehRgBmqMCoDklm+1iHfoaPfMDOj95j7PZkx9qOXT9XMEKxUsn\niZYfxP2+gXEuZ77JEP5hHVHsDuzzr3r/8+bS4/Bb/NVGvgvSAkNTxcLv/O/if7Tf\n/RIJU0WqL3VPqIfZCYVf1OKvap8qmIY6AFNu8wEN66+D28EVOkJyR452b9prZ7u8\nAeHd2nuZAgMBAAECggEADbGKcofErKvAOllvkMQLu5UjOxrF/lMu01ZTx+Zv9OsE\npni9/35sGa/YHIKBWfhkK3dfvxDo1BDwfOlchqoOfIFdYTbNFVhNATpId+x8n50Q\n7E/McCd8VqX49LPUF/7/O6wg8127xQF0PW9UNVFLmJQAn3HGJhpe1+19taVfoG1x\nmzUUBVH5htY6i7eJRiIfCruITI9E6nHh+LGfe6trpR+u6dQSme5XPnR/J8r6YfNR\nfV+Nm5o58uqcGSWleWy8vvh0SsInA/2J0EDmz0YzxmFryDJkpEqnKfHOP2atxZ/r\nWhTn8BRVANtHVm72TU1OkuKefqbi7ImX8WA4vzLVUQKBgQDcfpJyLIgWXlFvCqHS\nqz07uUrNQyKPk5MW6GSdl316bFqpsx7D8YfQlK54q5bmoEfs6ZPpS3HQooc8c9cj\nmd652QPZy7ET27fhPRDT6VEZD0iO9/TRtcYMieqMlR17ZUjlCTH4xCmHp+ioSMFA\nAW09cJ5FKfPYZZ9w2Aglld6wfQKBgQDSl8KOELAb9+X3QnHJXMvVeENErA4i9VFm\nY46VXPWbZ4D2fPncrSmaaieaeW3tD/dbRqFgGx/ycXU76JhL+Sz2YEo4CWKNHPvJ\nDrKvf7rR8OLj2CH7KPlw1iQjkzU55oK3j2kp9jq/3FjxlVNHRLMafI4EH587OhD7\nWRwjI4/eTQKBgF7+nQNZkivo6LapYvyLT+9KLiLu2JX443cMGkUW/jVfN1RDWm7a\nwUOout48NuAXj8VPAK2TFm7nhtIRqk+pPB7fk1wi+KBwmfENSRGzRIBCaGVICI7M\n/I1sYcO9fp0qDtS2OHRPtwC942uVJMT5mGHPAjEUGP1TEvUf7aqbvfxVAoGAPXfQ\ncNkMHk3AUOiS/9xXHqror42s3qVOKh2bC5vDkKWobcnSwIfGoeykPKF+5XgIkhrO\nlZe1PnXBa0gb0+kaJ5u5bhvHKTsxfuEMZM9af1bZUvnOCVpPXJEUoVGhcpIGy39P\nidD2GvQ8/d7BHQc/Y9bBORDl0ErFlCfRX6xMnO0CgYEAhdV9liQNknpZX7WawXMf\nAz+XZY+QFlmTUpIGiewkpgEjgt6Wx2e2eYQ/npJQwCzDMmwLDPF8PWDSLAhGa9Xy\njAA7ZU5l4miFPzRVa0Uy7l7dtVhQEeKH5IZbPAUHxr2j29rb2UQV+L4drc1DuVdN\nck5Ltc2ob3W9NqJSSONpB/Q=\n-----END PRIVATE KEY-----\n",
    // client_email: "firebase-adminsdk-p5r94@winexp-b0996.iam.gserviceaccount.com",
    // client_id: "107442982737322291396",
    // auth_uri: "https://accounts.google.com/o/oauth2/auth",
    // token_uri: "https://oauth2.googleapis.com/token",
    // auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    // client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-p5r94%40winexp-b0996.iam.gserviceaccount.com",
    // universe_domain: "googleapis.com"
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
        return admin.storage().bucket(`gs://${serviceAccount.project_id}.appspot.com`);
    }

    public getMessenger() {
        return admin.messaging();
    }
}

export default FirebaseAdmin