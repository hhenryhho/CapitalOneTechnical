import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase-config'

export const deleteTransaction = async id => {
  console.log(id)
  await deleteDoc(doc(db, 'transactions', id.id))
}
