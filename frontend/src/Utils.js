import { toast } from "react-toastify";

const options = {
  position: "top-right",
  autoClose: 5000, // Auto close after 5 seconds
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
const handleSuccess = (msg) => {
  toast.success(msg, options);
};

const handleError = (msg) => {
  toast.error(msg, options);
};

export { handleSuccess, handleError };
