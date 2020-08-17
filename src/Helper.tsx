import React, { FC, SVGProps, ReactChild, ReactChildren, MouseEvent } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";


//Button
interface ButtonProps {
  active?: boolean;
  reversed?: boolean;
  children: ReactChild | ReactChildren;
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
export const Button = React.forwardRef<HTMLSpanElement, ButtonProps>(
  ({ active, reversed, onMouseDown, children }, ref) => (
    <StyledButton active={active} reversed={reversed} onMouseDown={onMouseDown} ref={ref}>
      {children}
    </StyledButton>
  )
);

//icon
interface IconProps {
  svg: FC<SVGProps<SVGSVGElement>>;
  color?: string;
}
export const StyledIcon = styled.svg`
  fill: ${(props) => props.color};
  & use {
    fill: ${(props) => props.color};
  }
`;

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ svg, color = "#ffffff" }, ref) => (
    <StyledIcon as={svg} color={color} ref={ref} width="11px" height="14px" />
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

export const Menu: any = React.forwardRef(
  ({ ...props }, ref: React.Ref<HTMLDivElement>) => (
    <Container ref={ref}>
      <Triangle />
      <StyledMenu {...props} />
    </Container>
  )
);

interface PortalProps {
  children: React.ReactNode
}
export const Portal : React.SFC<PortalProps> = ({ children }: PortalProps) =>{
  let container;
  if (typeof window !== "undefined") {
    const rootContainer = document.createElement("div");
    const parentElemNext = document.querySelector("#__next");
    const parentElemReact = document.getElementById("root");
    let parentElem: any;
    
    if(parentElemNext !== null) parentElem = parentElemNext;
    else parentElem = parentElemReact;
    
    parentElem?.appendChild(rootContainer);
    container = rootContainer;
  }
  return container ? ReactDOM.createPortal(children, container) : null;
};
