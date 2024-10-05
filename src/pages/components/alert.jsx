import React from "react";
import { Alert } from "@material-tailwind/react";
 
function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function AlertCustomStyles({ openPopUp, closePopUp, message }){
  const handlelosePopUp = () => {closePopUp()}
  if (openPopUp !== true) return null

  return (
    <Alert
      className="absolute z-10 w-30 top-10 right-5 border border-white-700 bg-red-500"
      open={openPopUp}
      icon={<Icon />}
      onClose={handlelosePopUp}
      animate={{
        mount: { y: 0 },
        unmount: { y: 100 },
      }}
    >
      {message}
    </Alert>
  );
}

export default AlertCustomStyles