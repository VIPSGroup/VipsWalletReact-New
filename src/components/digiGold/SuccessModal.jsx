import { Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessModal = ({ modal, response, route, handleCloseGiftSuccess }) => {
  const navigate = useNavigate();
  return (
    <>
      <Modal
        footer={[]}
        onCancel={handleCloseGiftSuccess}
        centered
        maskClosable={false}
        open={modal}
      >
        <div class="digigold-order-success text-center">
          <img
            alt=""
            src="/images/digigold-images/check-green.svg"
            class="img img-fluid check-green-img"
          />
          <p class="digigold-success-title mt-3 ">Thank You!</p>
          <p class="success-note">
            {`Successfully transferred ${response?.result?.data?.quantity?.toFixed(
              4
            )} grams of ${response?.result?.data?.metalType} `}
          </p>
          <div class="digigold-success-btn">
            <button
              onClick={() => {
                navigate(route);
              }}
              class="btn btn-primery"
            >
              Go to my Orders
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SuccessModal;
