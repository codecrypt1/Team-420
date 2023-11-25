import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { Input } from "@nextui-org/react";
import { useAuth } from "../Authcontext";
import { useState } from "react";
import { database, storage } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function AddStore() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [type, setType] = React.useState("");
  const [city, setCity] = React.useState("");
  const { user, login, loging } = useAuth();
  const [submitdone, setsubmitdone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [add, setAdd] = useState("upload");
  const [image, setImage] = useState("");
  const [product, setProduct] = useState("");

  const router = useRouter();

  const handleAddDoc = async () => {
    setLoading(true);

    try {
      const dbInstance = collection(database, "shop");
      const volunteerDocRef = doc(dbInstance, user.email.toString());
      await setDoc(volunteerDocRef, {
        shop_name: name,
        shop_id: domain,
        shop_type: type,
        shop_email: user.email,
        shop_logo: image,
        shop_product: product,
      });
      toast.success(" submission successfully!");

      setLoading(false);
      setsubmitdone(true);
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong");
      console.error("error, ", error);
      setLoading(false);
    }
  };

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const image = new Image();

      image.onload = async () => {
        handleUploadClick(selectedFile);
      };

      // Load the selected file as an image
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          image.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUploadClick = (file: File) => {
    if (file) {
      const accidentImagesRef = ref(storage, `banner/${file.name}`);
      setAdd("uploading");

      uploadBytes(accidentImagesRef, file).then((snapshot) => {
        getDownloadURL(accidentImagesRef)
          .then((url) => {
            setAdd("uploaded");
            setImage(url);
            toast.success("Image uploaded");
          })
          .catch((error) => {
            setAdd("upload");
            toast.error("Image uploading failed");
          });
      });
    }
  };
  return (
    <div className="w-full">
      <section className="relative w-full py-10 h-full bg-gray-900 sm:py-16 lg:py-18">
        <div className="absolute inset-0">
          <img className="object-cover w-full h-full" src="/bg2.png" alt="" />
        </div>
        <div className="absolute inset-0 bg-gray-900/20"></div>

        <div className="relative max-w-lg px-4 mx-auto sm:px-0">
          <div className="overflow-hidden bg-white rounded-3xl shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-10 flex gap-3 flex-col justify-center">
              <h2 className="text-4xl font-body4 mb-3 text-[#8f2525]">
                Create your shop
              </h2>
              <Input
                type="text"
                variant="bordered"
                label="Name"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
              <Input
                type="text"
                variant="bordered"
                label="Domain"
                value={domain}
                onChange={(e: any) => setDomain(e.target.value)}
              />
              <Input
                type="text"
                variant="bordered"
                label="Type"
                value={type}
                onChange={(e: any) => setType(e.target.value)}
              />

              <Input
                type="text"
                variant="bordered"
                label="Product"
                value={product}
                onChange={(e: any) => setProduct(e.target.value)}
              />
              <label className=" items-center font-body1 text-black flex border-2 w-fit px-4 py-3 border-gray-400 rounded-xl">
                <input
                  onChange={(event) => handleFileInputChange(event)}
                  type="file"
                  className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />{" "}
                Logo
              </label>
              <Button
                onClick={handleAddDoc}
                className="bg-[#8f2525] mt-3 py-2 rounded-3xl font-body text-white"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Toaster />
    </div>
  );
}
