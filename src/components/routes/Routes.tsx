import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import { useAppSelector } from "../../store";
import { MachinesPage } from "../pages/machines";

type Props = {
  routes: TRoute[];
};

export const AppRoutes: FC<Props> = ({ routes: routesProp }) => {
  const { types } = useAppSelector((state) => state);

  const routes = [
    ...routesProp,
    ...types.map((type) => ({
      name: type.name,
      path: "/:id",
      component: MachinesPage,
    })),
  ];
  return (
    <Routes>
      {routes.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />}></Route>
      ))}
    </Routes>
  );
};
