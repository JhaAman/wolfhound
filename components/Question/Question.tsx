import cn from "classnames";
import * as Accordion from "@radix-ui/react-accordion";

interface Props {}

const Question = ({}: Props) => {
  return (
    <Accordion.Root type="single" defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Header>
          <Accordion.Trigger />
        </Accordion.Header>
        <Accordion.Content />
      </Accordion.Item>
    </Accordion.Root>
  );
};
export default Question;
