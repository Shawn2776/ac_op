import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <div className="flex flex-col">
      <div className="text-center my-6">
        <h1 className="text-primary text-3xl font-bold">
          Enroll in the NIC Adventure Center
        </h1>
        <p className="text-neutral mb-6">
          Join the adventure! Fill out the form below to start your journey.
        </p>
      </div>
      <div className="flex justify-center mt-0">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
