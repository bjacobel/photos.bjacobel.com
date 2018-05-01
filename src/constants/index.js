import config from '../../config';

export const SHOW_DEV_TOOLS = process.env.NODE_ENV !== 'production';
export const TRACK_ANALYTICS = process.env.NODE_ENV === 'production';
export const LOG_ERRORS = process.env.NODE_ENV === 'production';
export const RAVEN_ENDPT = config.RavenDSN;
export const GA_ID = config.GAProperty;
export const RELEASE = process.env.TRAVIS_COMMIT;
export const COGNITO_POOL_ID = 'us-east-1:291b18d6-cafb-49a6-9240-125a118b7998';
export const COGNITO_POOL_ROLE_ARN = 'arn:aws:iam::956518986395:role/photos-read-list-only';
