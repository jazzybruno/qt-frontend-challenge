"use client";
import React, { FC, useEffect } from "react";

interface AnimatedProps extends React.HTMLAttributes<HTMLDivElement> {}

const Animated: FC<AnimatedProps> = (props) => {
  const { children, className, ...rest } = props;
  const [animate, setAnimate] = React.useState("");

  useEffect(() => {
    setAnimate("animate-stop");
    setTimeout(() => {
      setAnimate("animate-start");
    }, 100);
    return () => {
      setAnimate("animate-stop");
    };
  }, [children]);

  return (
    <div className={`${animate} ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Animated;
