import { FC } from "react";
import TitleWhite from "../../public/title-icon-white.svg";

const MenuBar: FC = () => {
  return (
    <div className="bg-PoulBlue mb-5 fixed w-full h-[58px]">
      <div className="flex  justify-between items-center px-2 py-2 mx-auto">
        <div className="flex items-center">
          <img
            src={TitleWhite}
            alt=""
            width={30}
            height={30}
            style={{ color: "white" }}
          />
          <h1 className="text-3xl text-white">Narra</h1>
          <h1 className="text-3xl text-white">-</h1>
          <h1 className="text-3xl text-white">Belle</h1>
        </div>
        <div className="flex justify-end space-x-8 lg:flex">
          {/* <a
            href="/"
            className="inline-flex items-center h-8 px-6 font-medium tracking-wide text-Black transition duration-200 rounded shadow-md bg-white hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
            aria-label="Sign up"
            title="Sign up"
          >
            ログアウト
          </a> */}
          <button
            type="submit"
            // disabled={}
            className="block rounded-lg bg-gray-600 px-3 py-2 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-400 focus-visible:ring active:bg-gray-600 md:text-base"
          >
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );
};
export default MenuBar;
