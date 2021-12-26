import * as HoverCard from "@radix-ui/react-hover-card";

const InformationLabel = () => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger />
      <HoverCard.Content>
        <HoverCard.Arrow />
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

export default InformationLabel;
