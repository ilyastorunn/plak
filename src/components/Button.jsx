import React from "react";
import { MdArrowRightAlt } from "react-icons/md";

const Button = () => {
  return (
    <button className="cta">
      <span className="hover-underline-animation font-Inter flex items-center">
        EXPLORE NOW!
        <MdArrowRightAlt className="icon" />
      </span>
    </button>
  );
};

const styles = `
.cta {
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;
}

.cta span {
  font-size: 16px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 500;
}

.icon {
  padding-left: 4px;
  display: inline-flex;
  align-items: center;
  color: #4B5E6C;
}

.hover-underline-animation {
  position: relative;
  color: #4B5E6C;
  padding-bottom: 4px;
}

.hover-underline-animation:after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: #4B5E6C;
  transform-origin: bottom right;
  transition: transform 0.3s ease;
}

.cta:hover .hover-underline-animation:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}
`;

const StyleSheet = () => <style>{styles}</style>;

const ButtonWithStyles = () => (
  <>
    <StyleSheet />
    <Button />
  </>
);

export default ButtonWithStyles;
