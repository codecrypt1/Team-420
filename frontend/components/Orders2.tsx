"use client";

import React from "react";
import { useListVals } from "react-firebase-hooks/database";
import { CallData } from "./type/calls";
import { realtime } from "../firebase";
import { ref, set } from "firebase/database";
import { useAuth } from "../Authcontext";
import Map from "./Map";

import { useState } from "react";
import Link from "next/link";
type StatusesKeys = "open" | string;

interface MarkerData {
  id: string;
  address: string;
  lat: number;
  lng: number;
}

const containerStyle = {
  height: "400px",
  width: "100%",
  borderRadius: "10px",
};

const center = {
  lat: 10.0261,
  lng: 76.3125,
};

export default function Dashboard() {
  const [values, loading, error] = useListVals<CallData>(
    ref(realtime, "orders")
  );
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(1);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  console.log(values);
  const { user, login, loging } = useAuth();

  const filteredCalls: CallData[] = (values || [])
    .filter((call: any) => call.status === ("ordered" as StatusesKeys))
    .map((call: any) => ({ ...call, key: call.unique_id }));

  const filteredCalls2: CallData[] = (values || [])
    .filter((call: any) => call.status === ("accepted" as StatusesKeys))
    .map((call: any) => ({ ...call, key: call.unique_id }));

  const filteredCalls3: CallData[] = (values || [])
    .filter((call: any) => call.status === ("delivered" as StatusesKeys))
    .map((call: any) => ({ ...call, key: call.unique_id }));

  console.log(values);

  const handleAccept = (unique_id: string) => {
    const orderStatusRef = ref(realtime, `orders/${unique_id}/status`);

    set(orderStatusRef, "delivered")
      .then(() => {
        console.log("Order status updated to accepted");

        const selectedCall = filteredCalls.find(
          (call) => call.unique_id === unique_id
        );
      })
      .catch((error) => {
        console.error("Failed to update order status:", error);
      });
  };

  const handleCancel = (unique_id: string) => {
    const orderStatusRef = ref(realtime, `orders/${unique_id}/status`);
    set(orderStatusRef, "cancelled")
      .then(() => {
        console.log(unique_id);

        console.log("Order status updated to accepted");

        const selectedCall = filteredCalls.find(
          (call) => call.unique_id === unique_id
        );

       
      })
      .catch((error) => {
        console.error("Failed to update order status:", error);
      });
  };

  const [infoWindowData, setInfoWindowData] = React.useState<MarkerData | null>(
    null
  );
  const [isOpen, setIsOpen] = React.useState(false);

  const handleMarkerClick = (marker: MarkerData) => {
    setInfoWindowData(marker);
    setIsOpen(true);
  };
  return (
    <>
      <header className="bg-white border-b px-6 border-red-200">
        <div className="px-4 mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center -m-2 xl:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-red-400 bg-white rounded-lg hover:text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
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
                  className="block w-auto h-8 bg-red-300/60  lg:hidden"
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
      <div className="bg-[#9d5c5c] flex min-h-screen w-full">
        <div
          className="flex w-full bg-[#762525] sm:w-64 m-0 p-0"
          style={{ flex: 0.6 }}
        >
          {" "}
          <div className="hidden mt-4 bg-red-50 border-r-2 border-red-700 rounded-r-3xl  min-h-screen xl:flex xl:w-64 xl:flex-col">
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
        </div>
        <div
          className="flex w-full flex-col bg-red-50 sm:w-64 m-4 rounded-3xl p-2"
          style={{ flex: 3 }}
        >
          <div className="py-12 bg-red-50 sm:py-16 lg:py-7 w-full">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="grid max-w-5xl grid-cols-1 gap-12 mx-auto sm:grid-cols-2 lg:grid-cols-3">
                <Link href="/order">
                  <div className="bg-white border border-red-200 rounded-xl">
                    <div className="px-5 py-4">
                      <p className="text-sm font-medium tracking-wider text-red-700 uppercase">
                        <svg
                          className="inline-block"
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 1024 1024"
                          color="#B7791F"
                          height="20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                          <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path>
                        </svg>{" "}
                        Orders{" "}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xl font-bold text-red-900 ml-3">
                          {filteredCalls.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link href="/accepted">
                  <div className="bg-white border border-red-200 rounded-xl">
                    <div className="px-5 py-4">
                      <p className="text-sm font-medium tracking-wider text-red-700 uppercase">
                        <img
                          className="inline-block mr-2"
                          width="30"
                          height="30"
                          src="https://img.icons8.com/arcade/64/shopping-cart--v2.png"
                          alt="shopping-cart--v2"
                        />{" "}
                        Accepted{" "}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xl font-bold text-red-900 ml-3">
                          {" "}
                          {filteredCalls2.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link href="/delivered">
                  <div className="bg-white border shadow-xl scale-105  border-red-200 rounded-xl">
                    <div className="px-5 py-4">
                      <p className="text-sm font-medium tracking-wider text-red-700 uppercase">
                        <svg
                          className="inline-block"
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 16 16"
                          color="green"
                          height="20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"></path>
                          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"></path>
                        </svg>{" "}
                        Delivered{" "}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xl font-bold text-red-900 ml-3">
                          {" "}
                          {filteredCalls3.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="px-10  mt-4">
            <div className="py-12 bg-white sm:py-16 lg:py-2 rounded-3xl">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between"></div>

                <div className="flex flex-col mt-4 lg:mt-8">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="grid grid-cols-8 gap-x-3.5">
                        <div className="py-3.5 pl-4 pr-3 text-left text-sm whitespace-nowrap font-medium  text-red-900">
                          <div className="flex items-center">ID</div>
                        </div>

                        <div className="py-3.5 px-3 text-left col-span-3 text-sm whitespace-nowrap font-medium font-body1 text-red-900">
                          <div className="flex items-center">Location</div>
                        </div>
                        <div className="py-3.5 px-3 text-left col-span-2 text-sm whitespace-nowrap font-medium font-body1 text-red-900">
                          <div className="flex items-center">Mobile NO</div>
                        </div>

                        <div className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium font-body1 text-red-900">
                          <div className="flex items-center">Status</div>
                        </div>

                        <div className="py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                          <span className="sr-only">Actions</span>
                        </div>
                      </div>
                      {filteredCalls3.map((call, index) => (
                        <div>
                          <div className="divide-y divide-red-200">
                            <div
                              className="grid grid-cols-8 gap-x-3.5"
                              key={call.key}
                            >
                              <div className="py-4 pl-4 pr-3 font-body1 text-sm font-medium text-gray-900 whitespace-nowrap">
                                {index + 1}
                              </div>

                              <div className="px-4 font-body1 py-4 col-span-3 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                {call.location}
                              </div>
                              <div className="px-4 col-span-2 font-body1 py-4 text-sm font-bold text-gray-900 whitespace-nowrap">
                                <a href={`tel:${call.phone_no}`}>
                                  <img
                                    className="inline-block mr-2 "
                                    width="30"
                                    height="30"
                                    src="https://img.icons8.com/color/48/apple-phone.png"
                                    alt="apple-phone"
                                  />
                                  {call.phone_no}
                                </a>
                              </div>
                              <div className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                <div className="inline-flex font-body1 items-center">
                                  <svg
                                    className="mr-1.5 h-2.5 w-2.5 text-green-600"
                                    fill="currentColor"
                                    viewBox="0 0 8 8"
                                  >
                                    <circle cx="4" cy="4" r="3" />
                                  </svg>
                                  {call.status}
                                </div>
                              </div>
                              <div className="px-4 py-4 text-sm font-medium text-right text-red-900 whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedOrderIndex(index);
                                    setShowOrderDetails(!showOrderDetails);
                                  }}
                                  className="inline-flex items-center justify-center w-8 h-8 text-red-400 transition-all duration-200 bg-white rounded-full hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                >
                                  <img
                                    className={`transform transition-transform ${
                                      showOrderDetails &&
                                      index === selectedOrderIndex
                                        ? ""
                                        : "rotate-180"
                                    }`}
                                    width="20"
                                    height="20"
                                    src="https://img.icons8.com/ios/50/collapse-arrow--v2.png"
                                    alt="collapse-arrow--v2"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          {showOrderDetails && selectedOrderIndex === index && (
                            <div className="py-1 mb-5 bg-white grid  grid-cols-6">
                              <div className="py-12 col-span-4 bg-white sm:py-16 lg:py-2">
                                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-3">
                                  <div>
                                    <p className="text-md font-medium text-red-900">
                                      Latest Transactions
                                    </p>
                                  </div>

                                  <div className="mt-6 ring-1 ring-red-300 rounded-2xl">
                                    <table className="min-w-full lg:divide-y lg:divide-red-200">
                                      <thead className="hidden lg:table-header-group">
                                        <tr>
                                          <td
                                            width="50%"
                                            className="px-6 py-4 text-sm font-medium text-red-400 whitespace-normal"
                                          >
                                            item
                                          </td>
                                          <td
                                            width="50%"
                                            className="px-6 py-4 text-sm font-medium text-red-400 whitespace-normal"
                                          >
                                            price
                                          </td>

                                          <td className="px-6 py-4 text-sm font-medium text-red-400 whitespace-normal">
                                            Quantity
                                          </td>
                                        </tr>
                                      </thead>

                                      <tbody className="divide-y divide-red-200">
                                        <tr>
                                          <td className="px-6 py-4 font-body1 text-sm font-normal text-red-900 whitespace-nowrap">
                                            {call.order_tittle}
                                          </td>
                                          <td className="px-6 font-body1 py-4 text-sm font-normal text-red-900 whitespace-nowrap">
                                            ₹ {call.order_price}
                                          </td>
                                          <td className="px-6 py-4 font-body1 text-sm font-normal text-red-900 whitespace-nowrap">
                                            {call.order_quantity}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="px-6 font-body1 py-4 text-sm font-bold text-red-900 whitespace-nowrap">
                                            Total price{" "}
                                          </td>

                                          <td className="hidden px-6 py-4 text-sm font-body1 font-bold text-red-900 lg:table-cell whitespace-nowrap">
                                            ₹ {call.order_price}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="py-12 col-span-1 bg-white sm:py-16 lg:py-2">
                                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-3">
                                  <div>
                                    <p className="text-md font-medium text-red-900">
                                      Action{" "}
                                    </p>
                                  </div>

                                  <div className="mt-6  rounded-2xl">
                                    <button
                                      onClick={() =>
                                        handleAccept(call.unique_id)
                                      }
                                      className="bg-green-400 text-white px-9 py-2 rounded-2xl "
                                    >
                                      Delivered
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleCancel(call.unique_id)
                                      }
                                      className="bg-red-400 mt-2 text-white px-9 py-2 rounded-2xl "
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {showOrderDetails && selectedOrderIndex === index && (
                            //  map
                            <div className=" mb-8 relative w-full rounded-3xl h-80">
                              {" "}
                              <Map
                                lat={call.coordinates.lat}
                                lng={call.coordinates.lng}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
