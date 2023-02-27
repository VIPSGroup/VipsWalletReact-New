import { Spin } from "antd";
import { ThreeDots } from "react-loader-spinner";

const LoadingBar = ({ color = "#fff" }) => {
  return (
    <div className="service-loader">
      <ThreeDots
        height="20"
        width="50"
        radius="7"
        color={color}
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        className="threedots-animation"
        visible={true}
      />
    </div>
  );
};

export default LoadingBar;

export const LatestLoading = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
        }}
      >
        <Spin size="large" />
      </div>
    </>
  );
};
