import React from "react";
import { Input } from "antd";

import Modal from "@molecules/Modal";

interface ICreateIssuePopupProps {
  onClose: () => void;
}
const CreateIssuePopup = ({ onClose }: ICreateIssuePopupProps) => {
  return (
    <Modal
      width={600}
      height={700}
      buttons={[
        { name: "Save", type: "primary", width: "80px" },
        { name: "Close", type: "normal", width: "80px" },
      ]}
      onClose={onClose}
    >
      <div>
        task name
        <Input />
      </div>
    </Modal>
  );
};

export default CreateIssuePopup;
