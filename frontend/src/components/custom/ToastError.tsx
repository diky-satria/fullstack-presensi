import { ToastPosition, toast } from "react-hot-toast";

export default function ToastError(
  notification: string,
  position: ToastPosition
) {
  toast.error(notification, {
    position: position,
    iconTheme: {
      primary: "#ff5959",
      secondary: "#fff",
    },
    style: {
      borderRadius: "10px",
      background: "#ff3131",
      color: "#fff",
    },
  });
}
