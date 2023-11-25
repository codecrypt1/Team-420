import { cookies } from "next/headers";

export default async function Index() {
  return (
    <section className="min-h-screen">
      <header>
        <div className="bg-white border-b border-gray-100">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex items-center justify-between h-16 lg:h-[72px]">
              <button
                type="button"
                className="p-2 -m-2 text-gray-900 transition-all duration-200 lg:hidden hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <div className="flex items-center flex-shrink-0 ml-4 lg:ml-0">
                <a
                  href="#"
                  title=""
                  className="inline-flex rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  <img className="w-auto h-12" src="/logo.png" alt="" />
                </a>
              </div>

              <div className="flex items-center justify-end ml-auto">
                <div className="hidden lg:flex lg:items-center lg:space-x-8">
                  <a
                    href="/login"
                    title=""
                    className="text-base font-medium  px-6 py-2 bg-red-600 text-white font-body transition-all duration-200 rounded-full hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  >
                    {" "}
                    Login{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative pt-12 bg-red-800 sm:pt-16 lg:py-32 xl:py-32">
        <div className="absolute inset-0 hidden lg:block">
          <img
            className="object-cover opacity-50 object-right w-full h-full"
            src="/bg.jpg"
            alt=""
          />
        </div>

        <div className="relative flex gap-12 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-lg bg-red-50 p-12 rounded-3xl mx-auto text-center lg:mx-0 lg:max-w-xl lg:text-left">
            <p className="text-base font-bold font-body1 text-red-900">
            From concept to cuisine in minutes
            </p>
            <h1 className="mt-3 text-4xl font-bold font-body4 text-[#431414] sm:mt-8 sm:text-5xl xl:text-6xl">
              Your virtual restaurant is ready in minutes
            </h1>

            <div className="mt-8 sm:mt-12">
              <a
                href="/login"
                title=""
                className="
                            inline-flex
                            items-center
                            justify-center
                            px-8
                            py-3
                            text-base
                            font-bold
                            leading-7
                            text-red-900
                            border-2
                            border-red-900
                            transition-all
                            duration-200
                            bg-white
                            rounded-full
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                            hover:bg-red-500
                            hover:text-white
                            font-body4
                            focus:ring-offset-[#FFE942]
                        "
                role="button"
              >
                Create Now{" "}
              </a>
            </div>
          </div>

          <div className="mt-4 ">
            <img
              className="w-full scale-105 relative z-10 rounded-3xl "
              src="/bg.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
