import React, { ReactElement, PropsWithChildren } from "react";

export interface RenderIfProps extends PropsWithChildren {
  isTrue: boolean;
  component: ReactElement;
}

export const RenderIf = ({ isTrue, component }: RenderIfProps) => {
  return <>{isTrue ? component : null}</>;
};
