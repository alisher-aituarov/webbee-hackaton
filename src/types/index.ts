type TRoute = {
  path: string;
  name: string;
  component: React.FunctionComponent;
};

type TSupportedType = "text" | "date" | "number" | "checkbox";

type TMachine = {
  id: string;
  machineTypeId: string;
  // will point to id of machine type
  fields?: Record<string, any>;
};

type TMachinesType = {
  id: string;
  name?: string;
  titleField?: string;
  fields?: {
    id: string;
    name?: string;
    type: TSupportedType;
  }[];
};
