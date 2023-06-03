import { Card, Avatar } from "antd";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";

interface Props {
  title: string;
}

const ChartCard = ({ title = "Missing title" }: Props) => {
  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <h2>{title}</h2>
          <HeartIcon className="h-5 w-5" />
        </div>
      }
      hoverable
      bodyStyle={{
        padding: 0,
      }}
      //className="w-full"
    >
      <div>Foobar</div>
      <Card.Meta
        className="flex items-center border-t p-4"
        avatar={<Avatar src="https://i.pravatar.cc/100" />}
        description={[
          <div className="flex justify-end gap-2">
            <span>3</span>
            <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
          </div>,
        ]}
      />
    </Card>
  );
};

export default ChartCard;
