import { useEffect, useState } from "react";
import {
  query,
  where,
  onSnapshot,
  collection,
  // orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { authUser } from "../firebase/config";

export const useCollection = (collectionName) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [user] = useAuthState(authUser);


  useEffect(() => {
    let postRef = collection(db, collectionName);
    let ref = query(postRef, where("uid", "==", user.uid));

    
    const unsubscribe = onSnapshot(ref, (querySnapshot) => {
        const results = [];
        querySnapshot?.forEach((doc) => {
          results.push(doc?.data());
        });
        setDocuments(results);
      }, error => {
        setError(error);
      }
    );

    return () => unsubscribe();
  }, [collectionName, user.uid]);

  return { documents, error };
};
