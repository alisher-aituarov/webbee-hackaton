import { ChangeEvent, FC } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store";
import { changeMachineField, removeMachine } from "../../../store/slice";

type Props = {
  data: TMachine;
};
// TODO get rid of any
export const AppItemCard: FC<any> = ({ data }) => {
  const { id, machineTypeId, fields } = data;

  const { types } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const currentType = types.find(({ id }) => id === machineTypeId);

  const onFieldChange =
    (fieldId: string) => (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        changeMachineField({
          machineId: id,
          machineTypeId,
          value: e.target.value,
          fieldId,
        }),
      );
    };

  const onFieldChangeCheckbox =
    (fieldId: string) => (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        changeMachineField({
          machineId: id,
          machineTypeId,
          value: e.target.checked,
          fieldId,
        }),
      );
    };
  const cardTitle = `${currentType?.name} - ${
    currentType?.titleField && fields[currentType?.titleField]
      ? fields[currentType?.titleField]
      : "No title"
  }`;

  return (
    <Card>
      <Card.Header>{cardTitle}</Card.Header>
      <Card.Body className="p-2">
        {currentType?.fields?.map(({ id, type, name, value }: any) => (
          <Form.Group key={id} className="mb-1">
            {type === "checkbox" ? (
              <>
                <Form.Check
                  type={type}
                  label={name}
                  checked={
                    typeof fields?.[id] === "boolean" ? fields?.[id] : false
                  }
                  onChange={onFieldChangeCheckbox(id)}
                />
              </>
            ) : (
              <>
                <Form.Label column>{name}</Form.Label>
                <Form.Control
                  type={type}
                  value={fields?.[id] || ""}
                  onChange={onFieldChange(id)}
                />
              </>
            )}
          </Form.Group>
        ))}
        <Button
          className="w-100"
          size="sm"
          variant="danger"
          onClick={() => dispatch(removeMachine({ id, machineTypeId }))}
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};
