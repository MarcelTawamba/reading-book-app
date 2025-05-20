// npx expo install react-native-appwrite react-native-url-polyfill
import { Account, Avatars, Client, Databases } from 'react-native-appwrite';

export const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('68269ad90028c9ee5d69')
  .setPlatform('dev.netninja.shelfie');

  export const account = new Account(client);

  export const avatars = new Avatars(client);

  export const databases = new Databases(client);