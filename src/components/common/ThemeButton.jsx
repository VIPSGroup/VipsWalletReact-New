import { Button } from "antd";
import { Loading } from ".";

const ThemeButton = ({value,onClick,loading,disabled=false}) => {
  return   <button type="submit" disabled={disabled} onClick={onClick} className="btn-primery">{loading ?<Loading/> :value}</button>
  // <Button onClick={onClick}  className="btn-primery" block>
    // {loading ?<Loading/> :value}
  // </Button>
  };
  
  export default ThemeButton;