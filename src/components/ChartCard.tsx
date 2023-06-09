import { Card, Avatar } from "antd";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import FavouriteToggle from "./FavouriteToggle";

interface Props {
  title: string;
  id: "chartOne" | "chartTwo";
  children: React.ReactNode;
}

const ChartCard = ({ title = "Missing title", id, children }: Props) => {
  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <h2>{title}</h2>
          <FavouriteToggle chartId={id} />
        </div>
      }
      hoverable
      bodyStyle={{
        padding: 0,
        minHeight: 500,
        background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
      }}
      headStyle={{
        background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
      }}
      style={{
        borderRadius: "0.75em",
      }}
      bordered={false}
      className="width-full lg:w-1/2"
    >
      {children}
      <Card.Meta
        className="flex items-center border-t border-indigo-500/75 p-4"
        avatar={<Avatar src="https://i.pravatar.cc/100" />}
        description={[
          <div
            className="flex justify-end gap-2 text-indigo-200"
            key="ReactWarnsIfNotPresent"
          >
            <span>3</span>
            <ChatBubbleBottomCenterTextIcon
              className="h-6 w-6"
              stroke="currentColor"
            />
          </div>,
        ]}
      />
    </Card>
  );
};

export default ChartCard;
