import toast from "react-hot-toast";

const toastConfig = {
  duration: 4000,
  style: {
    padding: "24px",
    color: "#fff",
    fontSize: "16px",
    borderRadius: 0,
    width: "350px",
    minHeight: "72px",
      textAlign: "left",
         borderLeft: "8px solid #177D68",
      boxShadow: "0 0 15px rgba(0,0,0,0.15)",
        background:"#2EB397",
  },
};

const toastConfigError = {
  duration: 6000,
  success: {
    style: {
      border: "1px solid green",
      color: "green",
    },
  },
  error: {
    style: {},
  },
  style: {
    padding: "24px",
    color: "#000",
    fontSize: "16px",
    borderRadius: "3px",
    maxWidth: "360px",
    minHeight: "72px",
    textAlign: "left",
    borderLeft: "8px solid red",
    color: "#fff",
    background: "#EA4848",
    boxShadow: "0 0 15px rgba(0,0,0,0.15)",
  },
};

export const AlertSuccess = (message) => {
  toast.success(message, toastConfig);
};

export const AlertError = (message) => {
  toast.error(message, toastConfigError);
};

export const AlertWarning = (message) => {
  toast(message, { ...toastConfig, icon: "⚠️" });
};
