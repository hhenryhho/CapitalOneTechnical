import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDyyxuf1seE3ZfXk9Zupez8259rdiaT4cg',
  authDomain: 'capitalone-technical.firebaseapp.com',
  projectId: 'capitalone-technical',
  storageBucket: 'capitalone-technical.appspot.com',
  messagingSenderId: '924540975222',
  appId: '1:924540975222:web:16896aaa9ee5ab2d28c757',
  measurementId: 'G-KC85DZ6Q52'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
