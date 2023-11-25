"use client";
import React, { use } from "react";
import { useState, useEffect } from "react";
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
import { database, storage } from "../../firebase";
import { useAuth } from "../../Authcontext";
import toast, { Toaster } from "react-hot-toast";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Shop = {
  shop_name: string;
  shop_id: string;
  shop_type: string;
  shop_email: string;
  shop_logo: string;
  shop_product: string;
};

export default function shop({ params }:any) {
  const router = useRouter();
  console.log(router.prefetch);
  const { themenID } = params;
  console.log(themenID);


  const [shops, setShops] = useState<Shop[]>([]);

  const [items, setItems] = useState<any[]>([]);

  const addVal1 = async () => {
    const q = query(collection(database, "shop"), where("shop_id", "==", slug));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((event) => {
      // console.log(event.id, " => ", event.data());
    });
    const filteredData = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as Shop),
    }));
    setShops(filteredData);
  };
  const addVal2 = async () => {
    const q = query(
      collection(database, "items"),
      where("shop_id", "==", slug)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((event) => {
      // console.log(event.id, " => ", event.data());
    });
    const filteredData = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as any),
    }));
    setItems(filteredData);
  };
  useEffect(() => {
    addVal1();
    addVal2();
  }, []);

  return (
    <section className="relative py-12 bg-gray-900 sm:py-16 lg:py-20 xl:py-32">
      <div className="absolute inset-0">
        <img className="object-cover w-full h-full" src="shop.jpeg" alt="" />
      </div>
      <div className="absolute inset-0 bg-gray-900/70 lg:bg-gray-900/50"></div>
      <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-5xl">
            Pet Food Collection
          </h1>

          <nav className="flex justify-center mt-5">
            <ol role="list" className="flex items-center space-x-0.5">
              <li>
                <div className="-m-1">
                  <a
                    href="#"
                    title=""
                    className="p-1 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:text-white focus:ring-white hover:text-white"
                  >
                    {" "}
                    Home{" "}
                  </a>
                </div>
              </li>

              <li>
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <div className="-m-1">
                    <a
                      href="#"
                      title=""
                      className="p-1 ml-0.5 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:text-white focus:ring-white hover:white"
                    >
                      {" "}
                      Category{" "}
                    </a>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <div className="-m-1">
                    <a
                      href="#"
                      title=""
                      className="p-1 ml-0.5 text-sm font-medium text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:text-white focus:ring-white hover:text-white"
                      aria-current="page"
                    >
                      {" "}
                      Pet Food{" "}
                    </a>
                  </div>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
