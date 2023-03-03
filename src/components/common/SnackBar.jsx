import { notification } from "antd";
const SnackBar = ({ errorMsg, success }) => {
  const Key = errorMsg ? "error" : "success";
  const value = errorMsg ? errorMsg : success;
  return notification[Key]({
    message: value,
    duration: 2,
    placement: "bottomRight",
  });
};
export default SnackBar;
