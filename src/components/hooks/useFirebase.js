import { useReducer, useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { setDoc, doc, collection } from "firebase/firestore";

const initialValues = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firebaseReducer = (state, action) => {
    switch(action.type){
        case 'IS_PENDING':
            return {
                ...state, document: null, isPending: true, error: null, succes: false
            }
        case 'ADDED_DOCUMENT':
            return {
                ...state, document: action.paylod, isPending: false, error: null, succes: true
            }
        case 'DELETE_DOCUMENT':
            return {
                ...state, document: null, isPending: false, error: null, succes: true
            }
        case "ERROR":
            return{ 
                document: null, isPending: false, error: action.paylod, succes: false
            }
        default:
            return state
    }
}

export const useFirebase = (collectionDb) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialValues);

  const ref = doc(collection, (db, collectionDb));

  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const addedDocument = await setDoc(ref, { ...doc });
      dispatch({ type: "ADDED_DOCUMENT", paylod: addedDocument });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  return { addDocument };
};
