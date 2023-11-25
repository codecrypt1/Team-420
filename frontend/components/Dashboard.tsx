"use client";

import React, { use, useEffect } from "react";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import AddStore from "./AddStore";
import { useAuth } from "../Authcontext";
import axios from "axios";
import router, { useRouter } from "next/router";
import { database, storage } from "../firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";
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
import { set } from "firebase/database";
import { afterEach } from "node:test";
import { Spinner } from "@nextui-org/react";

type Shop = {
  shop_name: string;
  shop_id: string;
  shop_type: string;
  shop_email: string;
  shop_logo: string;
  shop_product: string;
};

type Feedback = {
  id: number;
  user: number;
  emoji: string;
  user_name: string;
  feed_summary: string;
};

export default function Dashboard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [shops, setShops] = useState<Shop[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [add, setAdd] = useState("upload");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const { user, login, loging } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(database, "shop"),
          where("shop_email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((event) => {
          // console.log(event.id, " => ", event.data());
        });
        const filteredData = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Shop),
        }));
        // .filter((data) => data.verified);
        setShops(filteredData as Shop[]);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(database, "items"),
          where("shop_email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((event) => {
          // console.log(event.id, " => ", event.data());
        });
        const filteredData = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Shop),
        }));
        // .filter((data) => data.verified);
        setItems(filteredData as any[]);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  console.log(items);

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
  const handleUploadClick = (file: any) => {
    setLoading(true);
    const metadata = {
      contentType: "image/png",
    };
    if (file) {
      const accidentImagesRef = ref(storage, `banner/jama.png`);
      setAdd("uploading");

      uploadBytes(accidentImagesRef, file, metadata).then((snapshot) => {
        getDownloadURL(accidentImagesRef)
          .then((url) => {
            setAdd("uploaded");
            toast.success("Image uploaded");
            axios
              .post(
                "https://0f3c-2409-40f3-2b-8243-431-a168-c3a9-795f.ngrok-free.app/extract-menu",
                {
                  image_url: url,
                }
              )
              .then(async (response: any) => {
                console.log(response);
                toast.success("menu created");

                const dbInst = collection(database, "items");
                const volunteerDocRef = doc(dbInst, user.email.toString());
                await setDoc(volunteerDocRef, {
                  shop_email: user.email,
                  items: response.data,
                  domain: shops[0].shop_id,
                });
                window.location.reload();
                setLoading(false);
              })
              .catch((error: Error) => {
                console.error("Error sending POST request:", error);
                toast.error("Failed to send POST request");
                setLoading(false);
              });
          })
          .catch((error) => {
            setAdd("upload");
            toast.error("Image uploading failed");
          });
      });
    }
  };
  console.log("hii", items[0]?.items?.length);
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Toaster />
      <header className="bg-white border-b px-6 border-red-200">
        <div className="px-4 mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center -m-2 xl:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-lg hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="flex ml-6 xl:ml-0">
              <div className="flex items-center flex-shrink-0">
                <img
                  className="block w-auto h-8 bg-gray-300/60  lg:hidden"
                  src="/logod.png"
                  alt=""
                />
                <img
                  className="hidden w-auto h-12 lg:block"
                  src="/logo.png"
                  alt=""
                />
              </div>
            </div>

            <div className="flex items-center justify-end ml-auto space-x-6">
              <button
                type="button"
                className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                <img
                  className="object-cover bg-gray-300 rounded-full w-9 h-9"
                  src={user.photoURL}
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-screen">
        <div className="hidden bg-red-50 border-r-2 border-red-700 rounded-r-xl  min-h-screen xl:flex xl:w-64 xl:flex-col">
          <div className="flex flex-col pt-5 overflow-y-auto">
            <div className="flex flex-col justify-between flex-1 h-full px-4">
              <div className="space-y-4">
                <nav className="flex-1 space-y-1">
                  <a
                    href="/dashboard"
                    title=""
                    className="flex font-body1 items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-red-900 rounded-lg hover:bg-slate-100 group"
                  >
                    <span className="text-lg mr-2">🏠</span>
                    Dashboard
                  </a>
                  <a
                    href="/order"
                    title=""
                    className="flex font-body1 items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-red-900 rounded-lg hover:bg-slate-100 group"
                  >
                    <span className="text-lg mr-2">🛒</span>
                    Orders
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 overflow-x-hidden">
          <main className="flex gap-8 w-full min-h-screen">
            {shops.length == 0 ? (
              <AddStore />
            ) : (
              <>
                <div className="py-12 w-full bg-gray-50 sm:pt-16 lg:pt-12">
                  <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="relative  bg-cover bg-center bg-no-repeat bg-[url(../public/bg3.jpg)] flex justify-center mx-auto overflow-hidden bg-red-600 max-w-7xl rounded-3xl">
                      <div className="absolute top-0 left-0">
                        <img
                          className="w-16 md:w-24 lg:w-32 opacity-40 xl:w-full"
                          src="https://landingfoliocom.imgix.net/store/collection/saasui/images/newsletter/3/ring-pattern.svg"
                          alt=""
                        />
                      </div>

                      <div className="relative px-8 py-12 md:p-16 xl:p-12">
                        <div className="max-w-2xl mx-auto text-center">
                          <h2 className="text-3xl font-semibold tracking-tight font-body4  text-white sm:text-4xl lg:text-5xl">
                            {shops[0].shop_name}
                          </h2>
                          <p className="mt-3 text-lg font-body1 text-white">
                            {shops[0].shop_type}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!items[0]?.items.length && (
                    <div className="flex flex-row py-7 justify-between items-center  mx-12 bg-red-50 rounded-3xl border-red-400 border-2 px-12  mt-8">
                      {!loading && (
                        <>
                          <h2 className="font-body2 text-xl">
                            Upload your menu
                          </h2>
                          <label className=" items-center font-body1 text-black flex border-2 w-fit px-4 py-3 border-red-200 rounded-xl">
                            <input
                              onChange={(event) => handleFileInputChange(event)}
                              type="file"
                              className="block w-full text-sm text-red-700 font-body file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-100 file:text-red-700 hover:file:bg-blue-100"
                            />
                            {add}
                          </label>
                        </>
                      )}
                      {loading && <Spinner color="danger" />}
                    </div>
                  )}
                  {items[0]?.items.length && (
                    <section className="py-12 sm:py-6 lg:py-10 bg-gray-50">
                      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="flex items-center justify-center text-center md:justify-between sm:text-left">
                          <h2 className="text-2xl font-body1 font-bold text-gray-900 sm:text-3xl">
                            Your shop menu{" "}
                          </h2>
                        </div>

                        <div className="grid grid-cols-1 mt-8 text-center sm:mt-12 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-6 sm:text-left">
                          {items[0]?.items?.map((item: any) => (
                            <div className="relative group">
                              <div className="overflow-hidden aspect-w-4 aspect-h-2 rounded-2xl">
                                <img
                                  className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                                  src={
                                    item.image_url
                                      ? item.image_url
                                      : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D"
                                  }
                                  alt=""
                                />
                              </div>

                              <h3 className="mt-5 text-lg font-body4 font-semibold  text-gray-900">
                                {item.item_name}
                              </h3>
                              <p className="text-sm font-body1 text-gray-800 font-medium mt-1.5">
                                ₹ {item.price}{" "}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="block mt-8 text-center md:hidden">
                          <a
                            href="#"
                            title=""
                            className="inline-flex items-center p-1 -m-1 text-xs font-bold tracking-wide text-gray-400 uppercase transition-all duration-200 rounded hover:text-gray-900 focus:ring-2 focus:text-gray-900 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none"
                            role="button"
                          >
                            All Categories
                            <svg
                              className="w-4 h-4 ml-1.5 -mt-0.5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                              ></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
