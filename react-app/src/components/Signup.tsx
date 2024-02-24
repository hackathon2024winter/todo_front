import { FC, useState } from "react";
import { SignupForm } from "../utilities/ttyeps";
import { SubmitHandler, useForm } from "react-hook-form";
import { BaseURL } from "../utilities/base_url";

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
      <h2 className="text-2xl font-semibold mt-3 mb-3">Signup</h2>

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

      {message && <div>{message}</div>}
    </>
  );
};

export default Signup;
