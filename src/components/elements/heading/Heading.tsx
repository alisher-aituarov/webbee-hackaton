import { FC } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
}

export const AppHeading: FC<Props> = ({ as = "h1", children, ...props }) => {
  const Component = as;
  return <Component {...props}>{children}</Component>;
};
