import { FC } from "react"
import { LoginForm } from "../utilities/types"
import { SubmitHandler, useForm } from "react-hook-form"

const Login:FC = () => {
    const {
        register, 
        handleSubmit, 
        formState: {errors, isSubmitting }
    } = useForm<LoginForm>();

    const mailadressCheck = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        //送信ボタンの確認のためのタイムアウト
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log(data)
    }

    return (
    <>
        <h2 className="text-2xl font-semibold mt-3 mb-3">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="">
            <div>
                <label htmlFor="email">メールアドレス</label><br/>
                <input id="email" type="text" placeholder="Email" {...register("email",{
                    required: "メールアドレスは必須です",
                    pattern: {
                        value: mailadressCheck,
                        message: "メールアドレスを入力し直してください"
                    }
                })} 
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-1 focus:ring-gray-500 focus:ring-2" />
                {errors.email && <div >{errors.email.message}</div>}
            </div>
            <div>
                <label htmlFor="password">パスワード</label><br />
                <input id="password" type="password" placeholder="Password" {...register("password",{
                    required: "パスワードは必須です"   
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-3 py-1 focus:ring-gray-500 focus:ring-2" />
                {errors.password && <div >{errors.password.message}</div>}
            </div>

            <button type="submit" disabled={isSubmitting} className="">
                {isSubmitting ? "送信中...": "送信"}
            </button>
        </form>
    </>
)}

export default Login;