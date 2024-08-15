// import React from "react";
import { toast } from "react-toastify";
export default function CustomToast({ type, message }) {
    // //console.log("Error : ", message)
    if (type === 'error') {
        toast.error(message, {
            position: 'top-right',
        });
    } else if (type === 'success') {
        toast.success(message);
    }
};
