import { ChangeEvent, FC } from "react";
import {
  Button,
  Card,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";
import { v4 } from "uuid";

import { SUPPORTED_FIELD_TYPES } from "../../../constants";
import { useAppDispatch } from "../../../store";
import {
  addField,
  changeField,
  changeType,
  removeField,
  removeType,
} from "../../../store/slice";

type Props = {
  data: TMachinesType;
};

export const AppTypeCard: FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();
  const onFieldNameChange =
    (fieldId: string) => (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        changeField({ machineTypeId: data.id, fieldId, name: e.target.value }),
      );
    };

  const onFieldTypeChange = (fieldId: string) => (type: TSupportedType) => {
    dispatch(changeField({ machineTypeId: data.id, fieldId, type }));
  };

  const onTypeTitleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      changeType({ machineTypeId: data.id, titleFieldId: e.target.value }),
    );
  };

  const onTypeNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeType({ machineTypeId: data.id, name: e.target.value }));
  };

  return (
    <Card>
      <Card.Header>{data.name}</Card.Header>
      <Card.Body className="p-2">
        <Form.Group className="mb-1">
          <Form.Label column>Object type</Form.Label>
          <Form.Control value={data.name || ""} onChange={onTypeNameChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label column>Object title</Form.Label>
          <Form.Select
            aria-label="Select the title"
            onChange={onTypeTitleChange}
            value={data.titleField}
          >
            {data.fields?.map((field) => (
              <option key={field.id} value={field.id}>
                {field.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {data.fields?.map((field) => (
          <Form.Group className="mb-1" key={field.id}>
            <InputGroup className="mb-3">
              <Button
                size="sm"
                variant="danger"
                onClick={() =>
                  dispatch(
                    removeField({ machineTypeId: data.id, fieldId: field.id }),
                  )
                }
              >
                X
              </Button>
              <Form.Control
                value={field.name || ""}
                type="text"
                onChange={onFieldNameChange(field.id)}
              />
              <DropdownButton
                variant="outline-secondary"
                title={field.type}
                align="end"
                size="sm"
              >
                {SUPPORTED_FIELD_TYPES.map(({ name, type }) => (
                  <Dropdown.Item
                    key={type}
                    onClick={() => onFieldTypeChange(field.id)(type)}
                  >
                    {name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </InputGroup>
          </Form.Group>
        ))}
        <Form.Group className="mb-1">
          <Dropdown>
            <Dropdown.Toggle size="sm" className="w-100">
              Add Field
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {SUPPORTED_FIELD_TYPES.map(({ name, type }) => (
                <Dropdown.Item
                  key={type}
                  onClick={() =>
                    dispatch(
                      addField({ machineTypeId: data.id, type, fieldId: v4() }),
                    )
                  }
                >
                  {name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Button
          className="w-100"
          size="sm"
          variant="danger"
          onClick={() => dispatch(removeType(data.id))}
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};
