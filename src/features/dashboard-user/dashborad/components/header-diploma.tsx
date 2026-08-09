import { GraduationCap } from "lucide-react";

export default function HeaderDiploma() {
  return (
    <>
      <header className="mb-3 text-gray-400 ms-2">Diplomas</header>

      <div className={`flex items-center gap-3 mb-3 text-white `}>
        <div className="flex items-center gap-3  bg-blue-600 w-full p-2 py-3">
          <GraduationCap size={43} />
          <h1 className="text-3xl font-semibold capitalize ">Diplomas</h1>
        </div>
      </div>
    </>
  );
}
