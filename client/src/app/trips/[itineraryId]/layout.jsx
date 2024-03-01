import React from "react";

const layout = ({children}) => {
  return <div className="container flex flex-col mx-auto px-8 mt-8 max-h-96 max-w-7xl">{children}</div>;
};

export default layout;
