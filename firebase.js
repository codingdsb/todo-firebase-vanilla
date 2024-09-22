import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
} from 'firebase/firestore'
import * as firebaseConfig from './firebase.json'

/**
 * Initializes the Firebase app with the given config.
 * @returns {FirebaseApp} The newly initialized Firebase app.
 */
export const initializeAppWithFirebase = () => {
  return initializeApp(firebaseConfig)
}

/**
 * Returns the Firestore database for the given Firebase app.
 * @param {FirebaseApp} firebaseApp The Firebase app.
 * @returns {Firestore} The Firestore database.
 */
export const getFirestoreDB = (firebaseApp) => {
  return getFirestore(firebaseApp)
}

/**
 * Retrieves all todos from the given Firestore database.
 * @param {Firestore} firestoreDB The Firestore database.
 * @returns {Promise<Array<{id: string, task: string}>>} A promise
 *   that resolves with an array of todo objects, each with an id and a task.
 */
export const getAllTodos = async (firestoreDB) => {
  const querySnapshot = await getDocs(collection(firestoreDB, 'todos'))
  const todos = []
  querySnapshot.forEach((doc) => {
    todos.push({
      id: doc.id,
      task: doc.data().task,
      currentTimestamp: doc.data().currentTimestamp,
    })
  })
  return todos
}

/**
 * Deletes the todo with the given id from the given Firestore database.
 * @param {Firestore} firestoreDB The Firestore database.
 * @param {string} id The id of the todo to delete.
 */
export const deleteTodo = async (firestoreDB, id) => {
  await deleteDoc(doc(firestoreDB, 'todos', id))
}

/**
 * Adds a new todo with the given task to the given Firestore database.
 * @param {Firestore} firestoreDB The Firestore database.
 * @param {string} task The task of the new todo.
 */
export const addTodo = async (firestoreDB, task) => {
  const docRef = await addDoc(collection(firestoreDB, 'todos'), {
    task: task,
    currentTimestamp: Date.now(),
  })
}
