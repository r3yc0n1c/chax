import { OAuth2Client } from 'google-auth-library';
import config from './config';

const googleOAuth2Client = new OAuth2Client(
    config.googleAuth.clientId,
    config.googleAuth.clientSecret,
    'postmessage',
);

export default googleOAuth2Client;