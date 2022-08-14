import { FC } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { v4 } from "uuid";

import { AppItemCard } from "../elements/item-card";
import { AppCards } from "../elements/cards";
import { useAppDispatch, useAppSelector } from "../../store";
import { addMachine } from "../../store/slice";

export const MachinesPage: FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state);
  const { id } = useParams();

  const machines = id ? items[id] : items;

  return (
    <>
      <AppCards
        data={machines}
        card={AppItemCard}
        button={
          id ? (
            <Button
              className="w-100"
              onClick={() =>
                dispatch(addMachine({ id: v4(), machineTypeId: id as string }))
              }
            >
              Add Item
            </Button>
          ) : null
        }
      />
    </>
  );
};
