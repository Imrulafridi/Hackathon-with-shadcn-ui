import { CheckCircle2 } from "lucide-react";


const Success = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-[60vh] p-8">
      <CheckCircle2 size={48} color="#4bb95d" strokeWidth={3} />
      <h1 className="font-bold text-4xl uppercase">Success</h1>
    </div>
  );
};

export default Success;
