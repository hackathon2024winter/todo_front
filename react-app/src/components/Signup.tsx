import { FC, useState } from "react";
import { SignupForm } from "../utilities/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { BaseURL } from "../utilities/base_url";
import TitleIcon from "../../public/titile-icon.svg";
import { Link } from "react-router-dom";

const Signup: FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>();
  const [message, setMessage] = useState(""); // メッセージ表示用の状態

  const password = watch("password"); // 最初のパスワードフィールドの値を監視

  const mailadressCheck = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const usernameCheck = /^[a-zA-Z0-9_.-]{3,16}$/;

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    setMessage(""); // 送信前にメッセージをクリア

    try {
      const response = await fetch(`${BaseURL()}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password1: data.password, // 適切なフィールド名に調整
          password2: data.passwordConfirm, // 適切なフィールド名に調整
        }),
      });
      const responseData = await response.json(); // レスポンスのJSONを解析
      if (response.ok) {
        setMessage("ユーザー登録に成功しました。"); // 成功メッセージを設定
      } else {
        setMessage(responseData.detail || "登録に失敗しました。"); // 失敗メッセージを設定
      }
    } catch (error) {
      setMessage("通信エラーが発生しました。"); // エラーメッセージを設定
    }
  };

  return (
    <>
      <div className="bg-PoulGray py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="flex justify-center items-end mb-10 text-center text-2xl font-bold">
            <img
              src={TitleIcon}
              alt=""
              width={70}
              height={70}
              style={{ color: "red" }}
            />
            <h1 className="text-7xl text-PoulOrange">Narra</h1>
            <h1 className="text-7xl text-PoulYellow">-</h1>
            <h1 className="text-7xl text-PoulBlue">Belle</h1>
          </div>
          <h2 className="mb-1 text-center text-2xl font-bold text-gray-800 md:mb-1 lg:text-3xl">
            アカウントの作成
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-lg rounded-lg border bg-white border-l-8 border-l-PoulYellow"
          >
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                >
                  ユーザーネーム
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="username"
                  {...register("username", {
                    required: "ユーザーネームは必須です",
                    pattern: {
                      value: usernameCheck,
                      message:
                        "ユーザーネームは 半角大文字小文字 英数字と_.- 3文字〜16文字",
                    },
                  })}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-PoulYellow transition duration-100 focus:ring"
                />
                {errors.username && <div>{errors.username.message}</div>}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                >
                  メールアドレス
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="Email"
                  {...register("email", {
                    required: "メールアドレスは必須です",
                    pattern: {
                      value: mailadressCheck,
                      message: "メールアドレスを入力し直してください",
                    },
                  })}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-PoulYellow transition duration-100 focus:ring"
                />
                {errors.email && <div>{errors.email.message}</div>}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                >
                  パスワード
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "パスワードは必須です",
                  })}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-PoulYellow transition duration-100 focus:ring"
                />
                {errors.password && <div>{errors.password.message}</div>}
              </div>

              <div>
                <label
                  htmlFor="passwordConfirm"
                  className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                >
                  パスワード再入力
                </label>
                <input
                  id="passwordConfirm"
                  type="password"
                  placeholder="Confirm Password"
                  {...register("passwordConfirm", {
                    validate: (value) =>
                      value === password || "パスワードが一致しません",
                  })}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-PoulYellow transition duration-100 focus:ring"
                />
                {errors.passwordConfirm && (
                  <div>{errors.passwordConfirm.message}</div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
              >
                {isSubmitting ? "登録中..." : "登録"}
              </button>
              <Link className="text-center hover:text-gray-600" to="/login">
                すでにアカウントをお持ちの方ははこちら
              </Link>
            </div>
          </form>
          {message && (
            <div
              className="flex mx-auto max-w-lg m-1 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              role="alert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
              {message}
            </div>
          )}
        </div>
      </div>
      {/* <h2 className="text-2xl font-semibold mt-3 mb-3">Signup</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div>
          <label htmlFor="email">ユーザー名</label>
          <br />
          <input
            id="username"
            type="text"
            placeholder="username"
            {...register("username", {
              required: "ユーザーネームは必須です",
              pattern: {
                value: usernameCheck,
                message:
                  "ユーザーネームは 半角大文字小文字 英数字と_.- 3文字〜16文字",
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-1 focus:ring-gray-500 focus:ring-2"
          />
          {errors.username && <div>{errors.username.message}</div>}
        </div>

        <div>
          <label htmlFor="email">メールアドレス</label>
          <br />
          <input
            id="email"
            type="text"
            placeholder="Email"
            {...register("email", {
              required: "メールアドレスは必須です",
              pattern: {
                value: mailadressCheck,
                message: "メールアドレスを入力し直してください",
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-1 focus:ring-gray-500 focus:ring-2"
          />
          {errors.email && <div>{errors.email.message}</div>}
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <br />
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "パスワードは必須です",
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-1 focus:ring-gray-500 focus:ring-2"
          />
          {errors.password && <div>{errors.password.message}</div>}
        </div>
        <div>
          <label htmlFor="passwordConfirm">パスワード再入力</label>
          <br />
          <input
            id="passwordConfirm"
            type="password"
            placeholder="Confirm Password"
            {...register("passwordConfirm", {
              validate: (value) =>
                value === password || "パスワードが一致しません",
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-1 focus:ring-gray-500 focus:ring-2"
          />
          {errors.passwordConfirm && (
            <div>{errors.passwordConfirm.message}</div>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className="">
          {isSubmitting ? "送信中..." : "送信"}
        </button>
      </form>

      {message && <div>{message}</div>} */}
    </>
  );
};

export default Signup;
