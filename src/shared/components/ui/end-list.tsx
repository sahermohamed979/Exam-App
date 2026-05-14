export default function EndList({ className }: { className?: string }) {
  return (
    <div
      className={` flex  items-center  z-0 gap-2  bg-[#f9fafb]  flex-col  ${className}`}
    >
      <h2 className="text-1xl text-gray-400 font-semibold py-5 ">
        End of list{" "}
      </h2>
    </div>
  );
}
