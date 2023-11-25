import Head from "next/head";
import Image from "next/image";
// import styles from '@/styles/Home.module.css'
import QRCode from "qrcode";
import { useState, useEffect } from "react";

export default function Qrcodegen({ obj }:any) {
  console.log(obj);

  //   const [url, setUrl] = useState('')
  const [qr, setQr] = useState("");

const GenerateQRCode = () => {
  QRCode.toDataURL(
    obj,
    {
      width: 800,
      margin: 2,
      color: {
        dark: "#000000ff", // Dark color inverted to white
        light: "#FFFFFFFF", // Light color inverted to black
      },
    },
    (err: any, url: any) => {
      if (err) return console.error(err);

      setQr(url);
    }
  );
};


  useEffect(() => {
    GenerateQRCode();
  }, []);

  return (
    <div className="app">
      {/* <h1>QR Generator</h1>
			<input 
				type="text"
				placeholder="e.g. https://google.com"
				value={url}
				onChange={e => setUrl(e.target.value)} />
			<button onClick={GenerateQRCode}>Generate</button> */}
      {qr && (
        <>
          <img src={qr} className="h-1/2 rounded-3xl aspect-square" />
        </>
      )}
    </div>
  );
}
