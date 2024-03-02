import { FC } from "react";
import TitleWhite from "../../public/title-icon-white.svg";
import { BaseURL } from "../utilities/base_url";
import { useNavigate } from "react-router-dom";

const MenuBar: FC = () => {
  const navigate = useNavigate();
  // ログアウト処理関数
  const handleLogout = async () => {
    try {
      const response = await fetch(`${BaseURL()}/signout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.error("ログアウト成功");

      } else {
        // エラー処理
        console.error("ログアウト失敗");
      }
      navigate("/login");
    } catch (error) {
      console.error("ログアウト中にエラーが発生しました", error);
    }
  };

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
          <button
            onClick={handleLogout}
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
