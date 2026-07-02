import {
  BookOpenCheck,
  Brain,
  LucideFolderCode,
  RectangleEllipsis,
} from "lucide-react";

export default function AuthHero() {
  return (
    <div className={`h-screen bg-[linear-gradient(126deg,#ffffff,#d0e5ff,#f3f8ff)] hidden lg:block`}>
      <div className="max-w-3xl mx-auto px-3 py-5 mt-10">
        {/* Logo */}
        <div className={`flex items-center gap-3 font-semibold text-lg mb-12`}>
          <LucideFolderCode className="w-10 h-10" />
          <span className="font-semibold text-2xl">Exam App</span>
        </div>

        {/* Title */}
        <div className="pt-8">
          <h1 className="text-4xl  font-bold   text-gray-800 leading-snug mb-8 max-w-xl">
            Empower your learning journey with our smart exam platform.
          </h1>
        </div>

        {/* Features */}
        <div className="space-y-12 pt-8">
          {/* Item 1 */}
          <div className="flex gap-4 ">
            <div className="p-2 border-3 h-full border-blue-500 text-blue-600">
              <Brain />
            </div>
            <div>
              <h3 className="text-blue-600 font-semibold text-xl font-mono">Tailored Diplomas</h3>
              <p className="text-gray-600  max-w-md text-lg mt-2 font-mono">
                Choose from specialized tracks like Frontend, Backend, and
                Mobile Development.
              </p>  
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex gap-4">
            <div className="p-2 border-3 h-full border-blue-500 text-blue-600">
              <BookOpenCheck />
            </div>
            <div>
              <h3 className="text-blue-600 font-semibold text-xl font-mono">Focused Exams</h3>
              <p className="text-gray-600 text-lg max-w-md mt-2 font-mono">
                Access topic-specific tests including HTML, CSS, JavaScript, and
                more.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex gap-4">
            <div className="p-2 border-3 h-full border-blue-500 text-blue-600">
              <RectangleEllipsis className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-blue-600 font-semibold text-xl font-mono">
                Smart Multi-Step Forms
              </h3>
              <p className="text-gray-600 text-lg max-w-md mt-2 font-mono">
                Choose from specialized tracks like Frontend, Backend, and
                Mobile Development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
