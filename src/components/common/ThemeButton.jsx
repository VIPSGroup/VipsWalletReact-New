import { Loading } from ".";

const ThemeButton = ({value,onClick,loading,disabled=false}) => {
  return   <button type="submit" disabled={disabled} onClick={onClick} className={disabled?"btn-primery btn-disable":"btn-primery"}>{loading ?<Loading/> :value}</button>
  };
  export default ThemeButton;