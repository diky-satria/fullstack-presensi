import React from "react";
import { Button } from "antd";

interface Props {
  text: string;
  loading: boolean;
  click(): void;
}

export default function ButtonCustom({ text, loading, click }: Props) {
  return (
    <div>
      <Button
        type="primary"
        loading={loading}
        onClick={click}
        style={{
          backgroundColor: "#5356FB",
          color: "white",
          border: "#5356FB",
          marginRight: "2px",
          float: "right",
          margin: "15px 0",
        }}
      >
        {text}
      </Button>
    </div>
  );
}
