import { FC } from "react";
import { Container } from "react-bootstrap";
import { AppNavbar } from "../elements/navbar";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <AppNavbar />
      <Container>{children}</Container>
    </div>
  );
};
