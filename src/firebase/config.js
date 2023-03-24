// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCCcWm0REddZJUnHOeVX9emv8j0suIV-aA',
  authDomain: 'travel-98df9.firebaseapp.com',
  projectId: 'travel-98df9',
  storageBucket: 'travel-98df9.appspot.com',
  messagingSenderId: '829557897540',
  appId: '1:829557897540:web:b5203d59c4cd3087c8ff11',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const storage = getStorage()
