import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RegisterForm2 from "@/components/RegisterForm/RegisterForm2";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <RegisterForm2 />
      </div>
    </div>
  );
};

export default RegisterPage;
