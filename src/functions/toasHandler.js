import toast from "react-hot-toast";
import CustomToast from "@/src/components/CustomToast";

const toastHandler = (status, title, duration = 5000) => {
  const toastId = toast.custom(() =>
    <CustomToast status={status} title={title} id={toastId} duration={duration} />,
    { position: 'bottom-left', removeDelay: true, duration: duration }
  );
};

export default toastHandler;
