import React, { PropsWithChildren } from "react";

export interface RenderIfProps extends PropsWithChildren {
  isTrue: boolean;
  component: JSX.Element;
}

export const RenderIf = ({ isTrue, component }: RenderIfProps) => {
  return <>{isTrue ? component : null}</>;
};
