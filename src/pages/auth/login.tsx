import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Error from "@/components/shared/Error";
import { useLogin } from "@/query/auth/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  username: string;
  password: string;
}

// Yup validation schema
const schema = yup.object().shape({
  username: yup.string().required("لطفاً نام کاربری را وارد کنید"),
  password: yup.string().required("لطفاً رمز عبور را وارد کنید"),
});

export default function LogIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  // ✅ mutation hook
  const { mutate, isPending, isError, error, isSuccess } = useLogin();

  const onSubmit = (data: LoginFormInputs) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log(res, ":::: data");
        localStorage.setItem("accessToken", res?.data?.accessToken);
        toast.success(" ورود موفق!", {
          style: { fontFamily: "Vazir, sans-serif" },
        });
        navigate("/dashboard");
      },
      onError: () => {
        toast.error("خطا در ورود", {
          style: { fontFamily: "Vazir, sans-serif" },
        });
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            ورود به حساب کاربری
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username">نام کاربری</Label>
              <Input
                id="username"
                placeholder="نام کاربری"
                {...register("username")}
              />
              {errors.username && <Error error={errors.username} />}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">رمز عبور</Label>
              <Input
                id="password"
                type="password"
                placeholder="رمز عبور"
                {...register("password")}
              />
              {errors.password && <Error error={errors.password} />}
            </div>

            {/* Show API error */}
            {isError && (
              <p className="text-red-600 text-sm mt-2">
                {(error as any)?.response?.data?.message || "خطا در ورود"}
              </p>
            )}

            {/* Success message */}
            {isSuccess && (
              <p className="text-green-600 text-sm mt-2">
                ورود با موفقیت انجام شد 🎉
              </p>
            )}

            <Button type="submit" className="w-full mt-2" disabled={isPending}>
              {isPending ? "در حال ورود..." : "ورود"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
