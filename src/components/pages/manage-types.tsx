import { FC } from "react";
import { Button } from "react-bootstrap";
import { v4 } from "uuid";

import { useAppDispatch, useAppSelector } from "../../store";
import { addType } from "../../store/slice";
import { AppCards } from "../elements/cards";
import { AppTypeCard } from "../elements/type-card";

export const ManageTypesPage: FC = () => {
  const { types } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <>
      <AppCards
        data={types}
        card={AppTypeCard}
        button={
          <Button
            className="w-100"
            onClick={() => dispatch(addType({ id: v4() }))}
          >
            Add Type
          </Button>
        }
      />
    </>
  );
};
