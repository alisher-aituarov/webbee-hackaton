import { FC } from "react";
import { Col, Row } from "react-bootstrap";

import { AppHeading } from "../heading";

type Props = {
  data: Array<unknown & { id: string }>;
  name?: string;
  card: React.FunctionComponent<any>;
  button?: React.ReactNode;
};

const COL_CLASSNAMES = "mb-3";

export const AppCardsGroup: FC<Props> = ({
  card: Card,
  button,
  data,
  name,
}) => {
  return (
    <>
      {name && <AppHeading as="h3">{name}</AppHeading>}
      <Row>
        {data.map((item) => (
          <Col key={item.id} lg={4} md={6} sm={12} className={COL_CLASSNAMES}>
            <Card data={item} />
          </Col>
        ))}
        {button && (
          <Col lg={3} className={COL_CLASSNAMES}>
            {button}
          </Col>
        )}
      </Row>
    </>
  );
};
