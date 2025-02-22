import React from "react";

const Button = ({ text, Icon }) => {
  return (
    <button className="cta border-none bg-transparent cursor-pointer flex items-center gap-2 p-0">
      <span className="hover-underline-animation relative text-[#4B5E6C] hover:text-customorange pb-1 text-base tracking-[2px] font-medium font-Inter flex items-center group">
        {text}
        {Icon && <Icon className="icon pl-1 inline-flex items-center text-[#4B5E6C] group-hover:text-customorange" />}
      </span>
    </button>
  );
};

const styles = `
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
  transition: transform 0.5s ease;
}

.cta:hover .hover-underline-animation:after {
  transform: scaleX(1);
  transform-origin: bottom left;
  background-color: #D7521D;
}


`;

const StyleSheet = () => <style>{styles}</style>;

const ButtonWithStyles = ({ text, Icon }) => (
  <>
    <StyleSheet />
    <Button text={text} Icon={Icon} />
  </>
);

export default ButtonWithStyles;
