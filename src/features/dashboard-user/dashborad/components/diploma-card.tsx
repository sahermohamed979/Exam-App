import Image from "next/image";
import { IDiploma } from "../types/diploma";
import Link from "next/link";
import { generateSlug } from "@/src/shared/components/lib/utils";

export default function DiplomaCard({ diplomas }: { diplomas: IDiploma }) {
  return (
    <div className="relative overflow-hidden  w-full group cursor-pointer ">
      <Link href={`/${generateSlug(diplomas.title)}-${diplomas.id}-`}>
        {/* Image */}
        <div className="relative w-auto h-86">
          {diplomas.image ? (
            <Image
              src={diplomas.image}
              alt={diplomas.title}
              fill
              sizes="(max-width: 768) 90vw , 33vw"
              className="object-fill transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="relative w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-xl font-semibold">
                No Image
              </span>
            </div>
          )}
        </div>

        {/* Overlay */}
        <div
          className="absolute bottom-2 left-2 right-2 backdrop-blur-md exam-scroll  bg-blue-600/70 
                opacity-90 group-hover:opacity-100 transition-all duration-300
                max-h-[88px] group-hover:max-h-[200px] overflow-hidden group-hover:overflow-y-auto "
        >
          <div className="p-4 text-white">
            <h3 className="text-lg font-semibold">{diplomas.title}</h3>
            <p
              className="text-sm opacity-90 break-all w-full
                  line-clamp-2 group-hover:line-clamp-none
                  transition-all duration-300"
            >
              {diplomas.description}
            </p>
          </div>
        </div>
      </Link>{" "}
    </div>
  );
}
