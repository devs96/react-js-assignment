import React, { FC } from "react";
import "./index.css";

interface HeaderProps {
  RenderLeft?: React.FC | undefined;
  RenderMiddle?: React.FC | undefined;
  RenderRight?: React.FC | undefined;
}

const Header: FC<HeaderProps> = ({ RenderLeft, RenderRight, RenderMiddle }) => {
  return (
    <div className="main-view">
      {RenderLeft && <RenderLeft />}
      {RenderMiddle && <RenderMiddle />}
      {RenderRight && <RenderRight />}
    </div>
  );
};

export default Header;
