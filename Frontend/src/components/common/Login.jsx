import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
      <div className="p-6 bg-[#1e1e1e] rounded-xl shadow-lg">
        <SignIn
          path="/login"
          routing="path"
          signUpUrl="/signup"
          appearance={{
            elements: {
              formButtonPrimary: "bg-[#FFD700] hover:bg-[#e6c200] text-black",
            },
          }}
        />
      </div>
    </div>
  );
}
