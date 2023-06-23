import { useEffect, useState } from "react";
import { storage } from "../firebase/config";
import { listAll, getDownloadURL, ref, getMetadata } from "firebase/storage";

export const useImages = (folder) => {
  const [imgUrls, setImgUrls] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [error, setError] = useState(null);

  const folderRef = ref(storage, folder);

  useEffect(() => {
    listAll(folderRef).then((res) => {
      res?.items?.forEach((img) => {
        getDownloadURL(img).then((url) => {
            // console.log(url)
          setImgUrls((prev) => [...prev, url]);


          getMetadata(img)
          .then((metadata) => {
            setMetadata(metadata);
        })
          .catch((error) => {
            setError(error + ' Uh-oh, an error occurred!');
          });
        });
      });
    });
  }, []);

  return { error, imgUrls, metadata };
};
