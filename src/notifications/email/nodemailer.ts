import { Transporter, createTransport } from 'nodemailer';

const ETHEREAL_EMAIL = '';
const SENDGRID_EMAIL = '';

const etherealTransportOptions = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: ETHEREAL_EMAIL,
        pass: ''
    }
};

const sendGridTransporterOptions = {
    host: 'smtp.sendgrid.net',
    pool: true,
    maxConnections: 20,
    rateDelta: 1000,
    rateLimit: 150,        
    auth: {
        user: 'apiKey',
        pass: ""
    }
};

type TransportMap = {
    [key: string]: {transport: Transporter, from: string};
}

export const emailTransports: TransportMap  = {
    'ethereal': {
        transport: createTransport(etherealTransportOptions),
        from: ETHEREAL_EMAIL,
    },
    'sendGrid': {
        transport: createTransport(sendGridTransporterOptions),
        from: SENDGRID_EMAIL
    }
}
