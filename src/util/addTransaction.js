import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase-config'

export const addTransaction = async (UID, date, merchant, amount) => {
  await addDoc(collection(db, 'transactions'), {
    UID,
    date,
    merchant,
    amount
  })
}
