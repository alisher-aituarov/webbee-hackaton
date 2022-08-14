import { MachinesPage } from "../components/pages/machines";
import { ManageTypesPage } from "../components/pages/manage-types";

export const ROUTES: TRoute[] = [
  {
    path: "",
    name: "All",
    component: MachinesPage,
  },
  {
    path: "manage",
    name: "Manage types",
    component: ManageTypesPage,
  },
];
