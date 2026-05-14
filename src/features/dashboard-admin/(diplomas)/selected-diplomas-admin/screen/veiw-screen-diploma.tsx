import Image from "next/image";
import { getDiploma } from "../apis/get-diploma";
type ViewScreenDiplomaProps = {
  diplomaPromise: ReturnType<typeof getDiploma>;
};
export default async function ViewScreenDiploma({
  diplomaPromise,
}: ViewScreenDiplomaProps) {
  const diploma = await diplomaPromise;

  if (!diploma || "status" in diploma) {
    return <div>Diploma not found or unauthorized</div>;
  }

  return (
    <div className="flex w-full flex-col gap-4 bg-white p-2 pl-3 font-mono text-[14px] leading-6 text-black">
      <div className="space-y-1">
        <p className="text-[15px] font-normal text-slate-400">Image</p>
        <Image
          src={diploma.image ?? "/diploma.jpg"}
          alt={diploma?.title ?? ""}
          width={300}
          height={300}
          className="h-72 w-72 object-cover bg-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="text-[15px] font-normal text-slate-400">Title</p>
        <p className="text-black">{diploma.title}</p>
      </div>
      <div className="space-y-1">
        <p className="text-[15px] font-normal text-slate-400">Description</p>
        <p className="max-w-235 text-black">{diploma.description}</p>
      </div>
    </div>
  );
}
