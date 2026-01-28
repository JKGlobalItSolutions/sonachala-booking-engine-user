


// import React, { useState } from "react";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import { FaArrowLeft, FaRupeeSign } from "react-icons/fa";

// import { auth, db, storage } from "../../../firebase/config";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";

// // Images
// import upiswcan from "../Upi/upiscan.png";
// import upiswcantop from "../Upi/upiscan1.png";
// import upiid from "../Upi/upiid.png";
// import allupiimg from "../Upi/allupiimg.png";

// const Upi = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const bookingData = location.state?.bookingData;

//   const [upiId, setUpiId] = useState("");
//   const [error, setError] = useState("");
//   const [screenshotFile, setScreenshotFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState(
//     bookingData?.latestProofUrl || null
//   );

//   const handlePaymentRequest = () => {
//     if (!upiId.includes("@")) {
//       setError("Please enter a valid UPI ID (example@upi)");
//     } else {
//       setError("");
//       alert("Payment request sent to: " + upiId);
//     }
//   };






//   const handleImageUpload = async () => {
//     if (!screenshotFile) {
//       alert("📎 Please select a screenshot to upload.");
//       return;
//     }

//     try {
//       setUploading(true);
//       const userId = bookingData?.userId;
//       const bookingId = bookingData?.id;

//       if (!userId || !bookingId) {
//         alert("❌ Missing User ID or Booking ID");
//         return;
//       }

//       const timestamp = Date.now();
//       const fileRef = ref(
//         storage,
//         `paymentProofs/${userId}/${bookingId}/${timestamp}.jpg`
//       );
//       await uploadBytes(fileRef, screenshotFile);
//       const downloadURL = await getDownloadURL(fileRef);

//       const newProof = {
//         url: downloadURL,
//         uploadedAt: new Date().toISOString(),
//       };

//       // Save to Firestore
//       const guestRef = doc(db, "Hotels", userId, "Guest Details", bookingId);
//       const dataToSave = {
//         ...bookingData,
//         latestProofUrl: downloadURL,
//         "Payment Status": "Pending",
//         "Payment Proof": [
//           ...(bookingData?.["Payment Proof"] || []),
//           newProof,
//         ],
//         createdAt: new Date(), // ✅ Add timestamp
//       };

//       await setDoc(guestRef, dataToSave, { merge: true });

//       console.log("🔥 Upload saved with data:", dataToSave);
//       setUploadedImageUrl(downloadURL);
//       alert("✅ Payment proof uploaded and saved.");

//       setTimeout(() => {
//         alert("✅ Navigating to home page...");
//         navigate("/");
//       }, 1500);
//     } catch (error) {
//       console.error("❌ Upload failed:", error);
//       alert("Upload failed, please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };




//   const guestName = bookingData?.["Full Name"] || "Guest";
//   const guestEmail = bookingData?.["Email Address"] || "example@email.com";
//   const guestPhone = bookingData?.["Phone Number"] || "N/A";
//   const totalPrice = bookingData?.["Total Price"] || 0;
//   const basePrice = totalPrice * 0.9;
//   const tax = totalPrice * 0.1;
//   const totalNights = bookingData?.["Total Nights"] || 1;
//   const roomsCount = bookingData?.Rooms?.length || 1;
//   const adultsCount = bookingData?.["Total Adults"] || 1;
//   const childrenCount = bookingData?.["Total Children"] || 0;
//   const propertyName = bookingData?.["Property Name"] || "Hotel";
//   const propertyAddress = bookingData?.["Property Address"] || "N/A";

//   const checkIn = bookingData?.["Check-In Date"]
//     ? new Date(bookingData["Check-In Date"].seconds * 1000).toLocaleDateString(
//         "en-IN"
//       )
//     : "N/A";

//   const checkOut = bookingData?.["Check-Out Date"]
//     ? new Date(bookingData["Check-Out Date"].seconds * 1000).toLocaleDateString(
//         "en-IN"
//       )
//     : "N/A";

//   return (
//     <div className="container my-4">
//       <div className="row">
//         <div className="col-md-8">
//           <div className="card shadow-sm mb-3">
//             <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start">
//               <div>
//                 <p><strong>Guest Name:</strong> {guestName}</p>
//                 <p><strong>Hotel Name:</strong> {propertyName}</p>
//                 <p><strong>Hotel Address:</strong> {propertyAddress}</p>
//                 <p><strong>Stay Dates:</strong> 📅 {checkIn} → {checkOut}</p>
//                 <p><strong>Rooms & Guests:</strong> 🛏️ {roomsCount} Room | 👤 {adultsCount} Adults, {childrenCount} Children</p>
//                 <p><strong>Total Nights:</strong> 🕒 {totalNights} Night(s)</p>
//                 <p><strong>Contact:</strong> 📧 {guestEmail}, 📱 +91-{guestPhone}</p>
//               </div>
//               <div className="text-end">
//                 <p className="text-muted"><strong>Total Due</strong></p>
//                 <h4 className="text-success">
//                   <FaRupeeSign /> {totalPrice.toLocaleString("en-IN")}
//                 </h4>
//                 <small className="text-muted">
//                   <strong>Breakup:</strong> Hotel Fare ₹{basePrice.toFixed(2)} + Taxes ₹{tax.toFixed(2)}
//                 </small>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="card shadow-sm mb-4">
//         <div className="card-body">
//           <Link
//             to="/PaymentPage"
//             state={{ bookingData }}
//             className="btn btn-link text-success p-0 mb-3"
//           >
//             <FaArrowLeft className="me-1" /> ALL PAYMENT OPTIONS
//           </Link>

//           <h5 className="fw-bold mb-3">UPI Options</h5>

//           <div className="border rounded p-3 mb-3">
//             <div className="d-flex align-items-center mb-3">
//               <img src={upiswcantop} alt="QR" style={{ width: "50px" }} className="rounded-circle me-2" />
//               <h6 className="fw-bold">Scan QR to Pay</h6>
//             </div>

//             <div className="d-flex flex-wrap align-items-center gap-5">
//               <img src={upiswcan} alt="QR" style={{ width: "350px" }} />
//               <button className="btn btn-outline-success">Generate new QR</button>
//             </div>

//             <div className="mt-4">
//               <label className="form-label fw-bold">Upload Payment Screenshot</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="form-control mb-2"
//                 onChange={(e) => setScreenshotFile(e.target.files[0])}
//               />
//               <button
//                 className="btn btn-success w-50"
//                 onClick={handleImageUpload}
//                 disabled={uploading}
//               >
//                 {uploading ? "Uploading..." : "Upload Screenshot Proof"}
//               </button>
//             </div>

//             {uploadedImageUrl && (
//               <div className="mt-3">
//                 <p className="text-muted">📸 Uploaded Screenshot Preview:</p>
//                 <img
//                   src={uploadedImageUrl}
//                   alt="Uploaded"
//                   className="img-fluid border rounded"
//                   style={{ maxWidth: "400px" }}
//                 />
//               </div>
//             )}
//           </div>

//           <div className="text-center my-2">
//             <hr />
//             <span className="px-3">OR</span>
//             <hr />
//           </div>





//           <div className="mb-3">
//             <div className="d-flex align-items-center mb-3">
//               <img src={upiid} alt="UPI ID" style={{ width: "50px" }} className="rounded-circle me-2" />
//               <h6 className="fw-bold">Enter your UPI ID</h6>
//             </div>
//             <input
//               type="text"
//               className={`form-control ${error ? "is-invalid" : ""}`}
//               placeholder="example@upi"
//               value={upiId}
//               onChange={(e) => setUpiId(e.target.value)}
//             />
//             {error && <div className="invalid-feedback">{error}</div>}
//           </div>

//           <button className="btn btn-success w-100" onClick={handlePaymentRequest}>
//             Send Payment Request
//           </button>







//           <div className="mt-4 text-center">
//             <p className="mb-1 text-muted">All UPI apps supported</p>
//             <img src={allupiimg} alt="UPI Apps" style={{ height: "50px" }} className="img-fluid" />
//             <p className="text-muted mt-2" style={{ fontSize: "0.8rem" }}>
//               Powered by <b>UPI</b>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Upi;














// import React, { useState } from "react";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import { FaArrowLeft, FaRupeeSign } from "react-icons/fa";

// import { auth, db, storage } from "../../../firebase/config";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";

// // Images
// import upiswcan from "../Upi/upiscan.png";
// import upiswcantop from "../Upi/upiscan1.png";
// import upiid from "../Upi/upiid.png";
// import allupiimg from "../Upi/allupiimg.png";

// const Upi = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const bookingData = location.state?.bookingData;

//   const [upiId, setUpiId] = useState("");
//   const [error, setError] = useState("");
//   const [screenshotFile, setScreenshotFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState(
//     bookingData?.latestProofUrl || null
//   );

//   // ✅ Handle Payment Request with UPI Deep Link
//   const handlePaymentRequest = async () => {
//     if (!upiId.includes("@")) {
//       setError("Please enter a valid UPI ID (example@upi)");
//       return;
//     }
//     setError("");

//     try {
//       const userId = bookingData?.userId;
//       const bookingId = bookingData?.id;
//       if (!userId || !bookingId) {
//         alert("❌ Missing booking information");
//         return;
//       }

//       // Save entered guest UPI ID to Firestore
//       const guestRef = doc(db, "Hotels", userId, "Guest Details", bookingId);
//       await setDoc(
//         guestRef,
//         { guestUpiId: upiId },
//         { merge: true }
//       );

//       // Your business/receiver UPI ID (replace with your own)
//       const receiverUpi = "yourmerchant@upi";
//       const amount = bookingData?.["Total Price"] || 0;
//       const payeeName = bookingData?.["Property Name"] || "Hotel Payment";

//       // Create UPI deep link
//       const upiLink = `upi://pay?pa=${encodeURIComponent(receiverUpi)}&pn=${encodeURIComponent(
//         payeeName
//       )}&am=${encodeURIComponent(amount)}&cu=INR&tn=Hotel%20Booking`;

//       // Open the UPI app chooser (works on mobile)
//       window.location.href = upiLink;

//     } catch (err) {
//       console.error("Error saving UPI ID:", err);
//       alert("Failed to save UPI ID. Please try again.");
//     }
//   };

//   // ✅ Handle Screenshot Upload
//   const handleImageUpload = async () => {
//     if (!screenshotFile) {
//       alert("📎 Please select a screenshot to upload.");
//       return;
//     }

//     try {
//       setUploading(true);
//       const userId = bookingData?.userId;
//       const bookingId = bookingData?.id;

//       if (!userId || !bookingId) {
//         alert("❌ Missing User ID or Booking ID");
//         return;
//       }

//       const timestamp = Date.now();
//       const fileRef = ref(
//         storage,
//         `paymentProofs/${userId}/${bookingId}/${timestamp}.jpg`
//       );
//       await uploadBytes(fileRef, screenshotFile);
//       const downloadURL = await getDownloadURL(fileRef);

//       const newProof = {
//         url: downloadURL,
//         uploadedAt: new Date().toISOString(),
//       };

//       // Save to Firestore
//       const guestRef = doc(db, "Hotels", userId, "Guest Details", bookingId);
//       const dataToSave = {
//         ...bookingData,
//         latestProofUrl: downloadURL,
//         "Payment Status": "Pending",
//         "Payment Proof": [
//           ...(bookingData?.["Payment Proof"] || []),
//           newProof,
//         ],
//         createdAt: new Date(),
//       };

//       await setDoc(guestRef, dataToSave, { merge: true });

//       setUploadedImageUrl(downloadURL);
//       alert("✅ Payment proof uploaded and saved.");

//       // setTimeout(() => {
//       //   navigate("/");
//       // }, 1500);


//     } catch (error) {
//       console.error("❌ Upload failed:", error);
//       alert("Upload failed, please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Guest & Booking details
//   const guestName = bookingData?.["Full Name"] || "Guest";
//   const guestEmail = bookingData?.["Email Address"] || "example@email.com";
//   const guestPhone = bookingData?.["Phone Number"] || "N/A";
//   const totalPrice = bookingData?.["Total Price"] || 0;
//   const basePrice = totalPrice * 0.9;
//   const tax = totalPrice * 0.1;
//   const totalNights = bookingData?.["Total Nights"] || 1;
//   const roomsCount = bookingData?.Rooms?.length || 1;
//   const adultsCount = bookingData?.["Total Adults"] || 1;
//   const childrenCount = bookingData?.["Total Children"] || 0;
//   const propertyName = bookingData?.["Property Name"] || "Hotel";
//   const propertyAddress = bookingData?.["Property Address"] || "N/A";

//   const checkIn = bookingData?.["Check-In Date"]
//     ? new Date(bookingData["Check-In Date"].seconds * 1000).toLocaleDateString("en-IN")
//     : "N/A";

//   const checkOut = bookingData?.["Check-Out Date"]
//     ? new Date(bookingData["Check-Out Date"].seconds * 1000).toLocaleDateString("en-IN")
//     : "N/A";

//   return (
//     <div className="container my-4">
//       <div className="row">
//         <div className="col-md-8">
//           <div className="card shadow-sm mb-3">
//             <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start">
//               <div>
//                 <p><strong>Guest Name:</strong> {guestName}</p>
//                 <p><strong>Hotel Name:</strong> {propertyName}</p>
//                 <p><strong>Hotel Address:</strong> {propertyAddress}</p>
//                 <p><strong>Stay Dates:</strong> 📅 {checkIn} → {checkOut}</p>
//                 <p><strong>Rooms & Guests:</strong> 🛏️ {roomsCount} Room | 👤 {adultsCount} Adults, {childrenCount} Children</p>
//                 <p><strong>Total Nights:</strong> 🕒 {totalNights} Night(s)</p>
//                 <p><strong>Contact:</strong> 📧 {guestEmail}, 📱 +91-{guestPhone}</p>
//               </div>
//               <div className="text-end">
//                 <p className="text-muted"><strong>Total Due</strong></p>
//                 <h4 className="text-success">
//                   <FaRupeeSign /> {totalPrice.toLocaleString("en-IN")}
//                 </h4>
//                 <small className="text-muted">
//                   <strong>Breakup:</strong> Hotel Fare ₹{basePrice.toFixed(2)} + Taxes ₹{tax.toFixed(2)}
//                 </small>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="card shadow-sm mb-4">
//         <div className="card-body">
//           <Link
//             to="/PaymentPage"
//             state={{ bookingData }}
//             className="btn btn-link text-success p-0 mb-3"
//           >
//             <FaArrowLeft className="me-1" /> ALL PAYMENT OPTIONS
//           </Link>

//           <h5 className="fw-bold mb-3">UPI Options</h5>

//           {/* QR Scan */}
//           <div className="border rounded p-3 mb-3">
//             <div className="d-flex align-items-center mb-3">
//               <img src={upiswcantop} alt="QR" style={{ width: "50px" }} className="rounded-circle me-2" />
//               <h6 className="fw-bold">Scan QR to Pay</h6>
//             </div>

//             <div className="d-flex flex-wrap align-items-center gap-5">
//               <img src={upiswcan} alt="QR" style={{ width: "350px" }} />
//               <button className="btn btn-outline-success">Generate new QR</button>
//             </div>

//             {/* Upload Screenshot */}
//             <div className="mt-4">
//               <label className="form-label fw-bold">Upload Payment Screenshot</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="form-control mb-2"
//                 onChange={(e) => setScreenshotFile(e.target.files[0])}
//               />
//               <button
//                 className="btn btn-success w-50"
//                 onClick={handleImageUpload}
//                 disabled={uploading}
//               >
//                 {uploading ? "Uploading..." : "Upload Screenshot Proof"}
//               </button>
//             </div>

//             {uploadedImageUrl && (
//               <div className="mt-3">
//                 <p className="text-muted">📸 Uploaded Screenshot Preview:</p>
//                 <img
//                   src={uploadedImageUrl}
//                   alt="Uploaded"
//                   className="img-fluid border rounded"
//                   style={{ maxWidth: "400px" }}
//                 />
//               </div>
//             )}
//           </div>

//           {/* OR Separator */}
//           <div className="text-center my-2">
//             <hr />
//             <span className="px-3">OR</span>
//             <hr />
//           </div>

//           {/* Enter UPI ID */}
//           <div className="mb-3">
//             <div className="d-flex align-items-center mb-3">
//               <img src={upiid} alt="UPI ID" style={{ width: "50px" }} className="rounded-circle me-2" />
//               <h6 className="fw-bold">Enter your UPI ID</h6>
//             </div>
//             <input
//               type="text"
//               className={`form-control ${error ? "is-invalid" : ""}`}
//               placeholder="example@upi"
//               value={upiId}
//               onChange={(e) => setUpiId(e.target.value)}
//             />
//             {error && <div className="invalid-feedback">{error}</div>}
//           </div>

//           <button className="btn btn-success w-100" onClick={handlePaymentRequest}>
//             Send Payment Request
//           </button>

//           {/* Supported Apps */}
//           <div className="mt-4 text-center">
//             <p className="mb-1 text-muted">All UPI apps supported</p>
//             <img src={allupiimg} alt="UPI Apps" style={{ height: "50px" }} className="img-fluid" />
//             <p className="text-muted mt-2" style={{ fontSize: "0.8rem" }}>
//               Powered by <b>UPI</b>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Upi;













import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaRupeeSign } from "react-icons/fa";

import { auth, db, storage } from "../../../core/firebase/config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Images
import upiswcan from "../Upi/upiscan.png";
import upiswcantop from "../Upi/upiscan1.png";
import upiid from "../Upi/upiid.png";
import allupiimg from "../Upi/allupiimg.png";

const Upi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  const [upiId, setUpiId] = useState("");
  const [error, setError] = useState("");
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(
    bookingData?.latestProofUrl || null
  );

  // ✅ Handle Payment Request with UPI Deep Link
  const handlePaymentRequest = async () => {
    if (!upiId.includes("@")) {
      setError("Please enter a valid UPI ID (example@upi)");
      return;
    }
    setError("");

    try {
      const userId = bookingData?.userId;
      const bookingId = bookingData?.id;
      if (!userId || !bookingId) {
        alert("❌ Missing booking information");
        return;
      }

      const guestRef = doc(db, "Hotels", userId, "Guest Details", bookingId);
      await setDoc(guestRef, { guestUpiId: upiId }, { merge: true });

      const receiverUpi = "yourmerchant@upi";
      const amount = bookingData?.["Total Price"] || 0;
      const payeeName = bookingData?.["Property Name"] || "Hotel Payment";

      const upiLink = `upi://pay?pa=${encodeURIComponent(
        receiverUpi
      )}&pn=${encodeURIComponent(payeeName)}&am=${encodeURIComponent(
        amount
      )}&cu=INR&tn=Hotel%20Booking`;

      window.location.href = upiLink;
    } catch (err) {
      console.error("Error saving UPI ID:", err);
      alert("Failed to save UPI ID. Please try again.");
    }
  };

  // ✅ Handle Screenshot Upload
  const handleImageUpload = async () => {
    if (!screenshotFile) {
      alert("📎 Please select a screenshot to upload.");
      return;
    }

    try {
      setUploading(true);
      const userId = bookingData?.userId;
      const bookingId = bookingData?.id;

      if (!userId || !bookingId) {
        alert("❌ Missing User ID or Booking ID");
        return;
      }

      // Fetch existing Firestore booking data (avoid overwriting)
      const guestRef = doc(db, "Hotels", userId, "Guest Details", bookingId);
      const guestSnap = await getDoc(guestRef);
      const existingData = guestSnap.exists() ? guestSnap.data() : {};

      // Preserve original extension
      const ext =
        screenshotFile.name.split(".").pop()?.toLowerCase() || "jpg";
      const timestamp = Date.now();
      const fileRef = ref(
        storage,
        `paymentProofs/${userId}/${bookingId}/${timestamp}.${ext}`
      );

      // Upload with resumable method (works better on mobile)
      const uploadTask = uploadBytesResumable(fileRef, screenshotFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress.toFixed(0)}% done`);
        },
        (error) => {
          console.error("❌ Upload failed:", error);
          alert("Upload failed, please try again.");
          setUploading(false);
        },
        async () => {
          // Upload complete → get download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          const newProof = {
            url: downloadURL,
            uploadedAt: new Date().toISOString(),
          };

          // Merge without overwriting existing proof array
          const updatedData = {
            ...existingData,
            latestProofUrl: downloadURL,
            "Payment Status": "Pending",
            "Payment Proof": [
              ...(existingData?.["Payment Proof"] || []),
              newProof,
            ],
            updatedAt: new Date(),
          };

          await setDoc(guestRef, updatedData, { merge: true });

          setUploadedImageUrl(downloadURL);
          alert("✅ Payment proof uploaded and saved.");
          setUploading(false);
        }
      );
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Upload failed, please try again.");
      setUploading(false);
    }
  };

  // Guest & Booking details
  const guestName = bookingData?.["Full Name"] || "Guest";
  const guestEmail =
    bookingData?.["Email Address"] || "example@email.com";
  const guestPhone = bookingData?.["Phone Number"] || "N/A";
  const totalPrice = bookingData?.["Total Price"] || 0;
  const basePrice = totalPrice * 0.9;
  const tax = totalPrice * 0.1;
  const totalNights = bookingData?.["Total Nights"] || 1;
  const roomsCount = bookingData?.Rooms?.length || 1;
  const adultsCount = bookingData?.["Total Adults"] || 1;
  const childrenCount = bookingData?.["Total Children"] || 0;
  const propertyName = bookingData?.["Property Name"] || "Hotel";
  const propertyAddress = bookingData?.["Property Address"] || "N/A";

  const checkIn = bookingData?.["Check-In Date"]
    ? new Date(
      bookingData["Check-In Date"].seconds * 1000
    ).toLocaleDateString("en-IN")
    : "N/A";

  const checkOut = bookingData?.["Check-Out Date"]
    ? new Date(
      bookingData["Check-Out Date"].seconds * 1000
    ).toLocaleDateString("en-IN")
    : "N/A";

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8">
          <div className="card shadow-sm mb-3">
            <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start">
              <div>
                <p><strong>Guest Name:</strong> {guestName}</p>
                <p><strong>Hotel Name:</strong> {propertyName}</p>
                <p><strong>Hotel Address:</strong> {propertyAddress}</p>
                <p><strong>Stay Dates:</strong> 📅 {checkIn} → {checkOut}</p>
                <p><strong>Rooms & Guests:</strong> 🛏️ {roomsCount} Room | 👤 {adultsCount} Adults, {childrenCount} Children</p>
                <p><strong>Total Nights:</strong> 🕒 {totalNights} Night(s)</p>
                <p><strong>Contact:</strong> 📧 {guestEmail}, 📱 +91-{guestPhone}</p>
              </div>
              <div className="text-end">
                <p className="text-muted"><strong>Total Due</strong></p>
                <h4 className="text-success">
                  <FaRupeeSign /> {totalPrice.toLocaleString("en-IN")}
                </h4>
                <small className="text-muted">
                  <strong>Breakup:</strong> Hotel Fare ₹{basePrice.toFixed(2)} + Taxes ₹{tax.toFixed(2)}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <Link
            to="/PaymentPage"
            state={{ bookingData }}
            className="btn btn-link text-success p-0 mb-3"
          >
            <FaArrowLeft className="me-1" /> ALL PAYMENT OPTIONS
          </Link>

          <h5 className="fw-bold mb-3">UPI Options</h5>

          {/* QR Scan */}
          <div className="border rounded p-3 mb-3">
            <div className="d-flex align-items-center mb-3">
              <img src={upiswcantop} alt="QR" style={{ width: "50px" }} className="rounded-circle me-2" />
              <h6 className="fw-bold">Scan QR to Pay</h6>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-5">
              <img src={upiswcan} alt="QR" style={{ width: "350px" }} />
              <button className="btn btn-outline-success">Generate new QR</button>
            </div>

            {/* Upload Screenshot */}
            <div className="mt-4">
              <label className="form-label fw-bold">Upload Payment Screenshot</label>
              <input
                type="file"
                accept="image/*"
                className="form-control mb-2"
                onChange={(e) => setScreenshotFile(e.target.files[0])}
              />
              <button
                className="btn btn-success w-50"
                onClick={handleImageUpload}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Screenshot Proof"}
              </button>
            </div>

            {uploadedImageUrl && (
              <div className="mt-3">
                <p className="text-muted">📸 Uploaded Screenshot Preview:</p>
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded"
                  className="img-fluid border rounded"
                  style={{ maxWidth: "400px" }}
                />
              </div>
            )}
          </div>

          {/* OR Separator */}
          <div className="text-center my-2">
            <hr />
            <span className="px-3">OR</span>
            <hr />
          </div>

          {/* Enter UPI ID */}
          <div className="mb-3">
            <div className="d-flex align-items-center mb-3">
              <img src={upiid} alt="UPI ID" style={{ width: "50px" }} className="rounded-circle me-2" />
              <h6 className="fw-bold">Enter your UPI ID</h6>
            </div>
            <input
              type="text"
              className={`form-control ${error ? "is-invalid" : ""}`}
              placeholder="example@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>

          <button className="btn btn-success w-100" onClick={handlePaymentRequest}>
            Send Payment Request
          </button>

          {/* Supported Apps */}
          <div className="mt-4 text-center">
            <p className="mb-1 text-muted">All UPI apps supported</p>
            <img src={allupiimg} alt="UPI Apps" style={{ height: "50px" }} className="img-fluid" />
            <p className="text-muted mt-2" style={{ fontSize: "0.8rem" }}>
              Powered by <b>UPI</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upi;








