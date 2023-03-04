import { notification } from "antd";
const SnackBar = ({ errorMsg, successMsg }) => {
  const Key = errorMsg && errorMsg!=='' ? "error" : "success";
  const value = errorMsg ? errorMsg : successMsg;
  notification.destroy()
  return notification[Key]({
    message: value,
    duration: 2,
    placement: "bottomRight",
  });
};
export default SnackBar;
