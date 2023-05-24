import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          marginTop: 100,
        }}
        className=""
      >
        <div class=" text-center cart-no-data empty-cart">
          <img style={{ width: 500 }} src="/images/NotFound.svg" />
        </div>
        <Button
          onClick={() => navigate("/")}
          style={{ marginTop: 40, marginBottom: 40 }}
          size="large"
          type="primary"
        >
          Back to Homepage
        </Button>
      </div>
    </>
  );
};

export default NotFound;
