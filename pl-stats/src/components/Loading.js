import React from "react";
import "./Loading.css";
import spinner from "../assets/loading.gif";

export const Loading = () => {
  return (
    <div className="loading-spinner">
      <img src={spinner} alt="로딩중" width="5%" />
    </div>
  );
};

export default Loading;
