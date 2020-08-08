import React, { FC, SVGProps, ReactNode, MouseEvent } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";


//Button
interface ButtonProps {
  active: boolean;
  reversed?: boolean;
  ref?: React.Ref<HTMLInputElement>;
  children: ReactNode;
  onMouseDown?: (event: MouseEvent) => void;
}

export const StyledButton = styled.span<ButtonProps>`
  cursor: pointer;
  color: ${(props) =>
    props.reversed
      ? props.active
        ? "white"
        : "#aaa"
      : props.active
        ? "black"
        : "#ccc"};
`;
export const Button: (props: ButtonProps) => any = React.forwardRef(
  ({ active, reversed, ...props }, ref) => (
    <div>
      <StyledButton ref={ref} active={active} reversed={reversed} {...props} />
    </div>
  )
);

//icon
interface IconProps {
  svg: FC<SVGProps<SVGSVGElement>>;
  color?: string;
  ref?: React.RefObject<SVGSVGElement>;
}
export const StyledIcon = styled.svg`
  fill: ${(props) => props.color};
  & use {
    fill: ${(props) => props.color};
  }
`;

export const Icon: (props: IconProps) => any = React.forwardRef(
  ({ svg, color = "#ffffff" }, ref) => (
    <div>
      <StyledIcon as={svg} color={color} ref={ref} width="11px" height="14px" />
    </div>
  )
);

//Menu
const Container = styled.div`
  padding: 8px 7px 6px;
  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;
  opacity: 0;
  background-color: #050b21;
  border-radius: 3px;
  transition: opacity 0.75s;
  & > * {
    display: inline-block;
  }
`;
export const Triangle = styled.div`
  position: absolute;
  top: auto;
  bottom: 100%;
  left: 44%;
  border: solid 8px;
  border-color: transparent transparent #050b21 transparent;
  margin: 0 auto;
`;
const StyledMenu = styled.div`
    border-radius: 3px;
    transition: opacity 0.75s;
    & > * {
      display: inline-block;
    }
    & > * + * {
      margin-left: 15px;
    `;

interface Props {
   ref?: React.MutableRefObject<HTMLDivElement | null>;
}

export const Menu : React.RefForwardingComponent<HTMLDivElement, Props> = React.forwardRef<HTMLDivElement, Props>(
  ({ ...props }, ref) => (
    <Container ref={ref}>
      <Triangle />
      <StyledMenu {...props} />
    </Container>
  )
);

export const Portal = ({ children }: any) => {
  let container;
  if (typeof window !== "undefined") {
    const rootContainer = document.createElement("div");
    const parentElem = document.querySelector("#__next");
    parentElem?.appendChild(rootContainer);
    container = rootContainer;
  }
  return container ? ReactDOM.createPortal(children, container) : null;
};
