// import {
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
//   uploadBytes,
// } from "firebase/storage";
// import { Request } from "express";
// import { TryCatch } from "./error.js";
// import ErrorHandler from "../utils/utility_class.js";
// import { v4 as uuid } from "uuid";
// import { storage } from "../firebase.js";

// interface CustomRequest extends Request {
//   fileDownloadURL?: string;
//   name: string;
//   category: string;
//   price: number;
//   stock: number;
// }

// export const uploadToStorageMiddleware = TryCatch(
//   async (req: Request<{}, {}, CustomRequest>, res, next) => {
//     const { name, price, stock, category } = req.body;
//     const photo = req.file;
//     console.log(photo);

//     if (!photo) return next(new ErrorHandler("Please add Photo", 400));

//     if (!name || !price || !stock || !category) {
//       return next(new ErrorHandler("Please enter All Fields", 400));
//     }
//     // console.log(photo);
//     try {
//       const id = uuid();
//       // Create a reference to the Firebase Storage bucket
//       const storageRef = ref(storage, id);
//       const metadata = {
//         contentType: photo.mimetype,
//       };
//       console.log("Metadata:", metadata);

//       // Upload file to Firebase Storage
//       const uploadTask = uploadBytesResumable(
//         storageRef,
//         photo.buffer,
//         metadata
//       );

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           console.log(snapshot.bytesTransferred);
//           // Track upload progress if needed
//         },
//         (error) => {
//           console.error("Error uploading file to Firebase:", error);
//           next(new ErrorHandler("Error uploading file to Firebase", 500));
//         },

//         async () => {
//           const downloadURL = await getDownloadURL(storageRef);
//           req.body.fileDownloadURL = downloadURL;
//           next();
//         }
//       );

//       // console.log(photo);
//     } catch (error) {
//       console.error("Error uploading file to Firebase:", error);
//       next(new ErrorHandler("Error uploading file to Firebase", 500));
//     }
//   }
// );

// export default uploadToStorageMiddleware;

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { Request } from "express";
import { TryCatch } from "./error.js";
import ErrorHandler from "../utils/utility_class.js";
import { v4 as uuid } from "uuid";
import { storage } from "../firebase.js";

interface CustomRequest extends Request {
  fileDownloadURL?: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export const uploadToStorageMiddleware = TryCatch(
  async (req: Request<{}, {}, CustomRequest>, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    console.log(photo);

    if (!photo) return next(new ErrorHandler("Please add Photo", 400));

    if (!name || !price || !stock || !category) {
      return next(new ErrorHandler("Please enter All Fields", 400));
    }
    // console.log(photo);
    try {
      const id = uuid();
      // Create a reference to the Firebase Storage bucket
      const storageRef = ref(storage, id);
      const metadata = {
        contentType: photo.mimetype,
      };
      console.log("Metadata:", metadata);

      // Upload file to Firebase Storage
      const uploadTask = uploadBytesResumable(
        storageRef,
        photo.buffer
        // metadata
      );

      uploadTask
        .then(async () => {
          const downloadURL = await getDownloadURL(storageRef);
          req.body.fileDownloadURL = downloadURL;
          next();
        })
        .catch((error) => {
          console.error("Error uploading file to Firebase:", error);
          next(new ErrorHandler(`${error}`, 500));
        });

      // console.log(photo);
    } catch (error) {
      console.error("Error uploading file to Firebase:", error);
      next(new ErrorHandler(`${error}`, 500));
    }
  }
);

export default uploadToStorageMiddleware;
