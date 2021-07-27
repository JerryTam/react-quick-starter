import path from 'path';

export const isDev = process.env.NODE_ENV !== 'production';

export const PROJECT_PATH = path.resolve(__dirname, '../');
export const PROJECT_NAME = path.parse(PROJECT_PATH).name;
