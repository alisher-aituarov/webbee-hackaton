import { useAppSelector } from "../../../store";
import { AppCardsGroup } from "../cards-group";

type Props<T> = {
  data: Record<string, (T & { id: string })[]> | (T & { id: string })[];
  card: React.FunctionComponent<any>;
  button?: React.ReactNode;
};

export const AppCards = <T extends unknown>({
  data,
  card: Card,
  button: Button,
}: Props<T>): JSX.Element => {
  const { types } = useAppSelector((state) => state);
  if (Array.isArray(data)) {
    return <AppCardsGroup data={data} card={Card} button={Button} />;
  }
  if (Object.entries(data).length) {
    return (
      <>
        {Object.entries(data).map(([id, group]) => (
          <AppCardsGroup
            key={id}
            name={types?.find((item) => item.id === id)?.name}
            data={group}
            card={Card}
            button={Button}
          />
        ))}
      </>
    );
  }
  return <></>;
};
