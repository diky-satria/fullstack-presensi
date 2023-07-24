import { ToastPosition, toast } from "react-hot-toast";

export default function ToastSuccess(
  notification: string,
  position: ToastPosition
) {
  toast.success(notification, {
    position: position,
    duration: 2000,
    iconTheme: {
      primary: "#1bff1f",
      secondary: "#000000",
    },
    style: {
      borderRadius: "10px",
      background: "#1bff23",
      color: "#000000",
    },
  });
}
