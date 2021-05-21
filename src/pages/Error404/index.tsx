import React from "react";

export default function Error404() {
  return (
    <>
      <div className="flex flex-col justify-center h-screen ">
        <div className="flex flex-col m-auto">
          <i className="-mt-32  text-8xl m-auto text-red-600 animate-bounce fas fa-exclamation-triangle"></i>
          <h1 className="mt-6  m-auto font-sans text-7xl md:text-8xl">404</h1>
          <p className="mt-3 m-auto text-xl md:text-4xl">ไม่พบหน้านี้</p>
        </div>
      </div>
    </>
  );
}
