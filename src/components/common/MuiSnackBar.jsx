// import { notification } from "antd";
// const SnackBar = ({ errorMsg, successMsg }) => {
//   const Key = errorMsg && errorMsg!=='' ? "error" : "success";
//   const value = errorMsg ? errorMsg : successMsg;
//   notification.destroy()
//   return notification[Key]({
//     message: value,
//     duration: 2,
//     placement: "bottomRight",
//   });
// };
// export default SnackBar;


import { Snackbar } from "@mui/material"
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import * as React from 'react';
import { useEffect } from 'react';

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

 const MuiSnackBar = ({open,setOpen,successMsg,errorMsg,setSuccess,setError}) => {

    const handleClose = (event, reason) => {
        setOpen(false);
        if(successMsg){

          setSuccess("");
        } else if(errorMsg){

          setError("")
        }
      };

      const getType = () => {
        if(errorMsg){
          return <Alert onClose={handleClose} severity="error">
          {errorMsg}
       </Alert>
        } else if(successMsg){
          return <Alert onClose={handleClose} severity="success">
          {successMsg}
       </Alert>
        }
      }
        
    return (
        <Snackbar onClose={() => setOpen(false)}  open={open} autoHideDuration={3000}  key="bottomright" anchorOrigin={ {vertical: 'bottom', horizontal: 'right' }}  >{getType()}</Snackbar>
    )

   
}
export default MuiSnackBar;