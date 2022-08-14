import { FC } from "react";
import { Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../store";

type Props = {
  routes: TRoute[];
};

export const AppNav: FC<Props> = ({ routes: routesProp }) => {
  const { types } = useAppSelector((state) => state);
  const { pathname } = useLocation();
  const routes = [
    ...routesProp,
    ...types.map((type) => ({ name: type.name, path: type.id })),
  ];

  return (
    <Nav className="me-auto">
      {routes.map(({ path, name }) => (
        <Nav.Link active={`/${path}` === pathname} key={path} href={`/${path}`}>
          {name}
        </Nav.Link>
      ))}
    </Nav>
  );
};
