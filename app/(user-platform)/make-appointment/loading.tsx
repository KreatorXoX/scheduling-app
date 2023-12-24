import { Loader2 } from "lucide-react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader2 size={50} className=" animate-spin  text-neutral-500" />
    </div>
  );
};

export default Loading;
