const Card = ({ title, text }: { title: string, text: number | string }) => {
  return (
    <div className="min-h-32 rounded-sm border p-3 flex justify-between items-center">
       <div className="">
        <h3 className="text-[#2a3547] font-semibold">{title}</h3>
        <p className="text-[#2a3547] text-xl font-bold mt-5">{text}</p>
       </div>
    </div>
  );
}

export default Card;