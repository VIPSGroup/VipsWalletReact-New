import { Button, Modal, Space } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserNotExist = () => {
  const navigate = useNavigate();
  const { isServiceEnable, ServiceEnableLoading } = useSelector(
    (state) => state.coreSlice
  );
  const { logData, loading: digiLogLoading } = useSelector(
    (state) => state.registerDigiSlice.login
  );
  return (
    <>
      {isServiceEnable.ResponseStatus === 1 &&
        (isServiceEnable.Data.IsServiceEnabled === false ||
          logData.ResponseStatus === 3) &&
        !ServiceEnableLoading && (
          <>
            <Modal
              open={true}
              footer={null}
              centered
              maskClosable={false}
              closable={false}
              width={500}
              bodyStyle={{ textAlign: "center" }}
            >
              <p style={{ fontSize: 20, fontWeight: "600" }}>
                {isServiceEnable.ResponseStatus === 1 &&
                isServiceEnable.Data.IsServiceEnabled === false
                  ? isServiceEnable.Remarks
                  : logData.Remarks}
              </p>
              <Space />
              <Button type="primary" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </Modal>
          </>
        )}
    </>
  );
};

export default UserNotExist;
