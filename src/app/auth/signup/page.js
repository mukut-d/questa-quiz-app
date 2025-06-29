"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { toast, Toaster } from "react-hot-toast";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "@/config/firebase.config";
import Image from "next/image";
import { validateUserJWTToken } from "@/utils/validateUser";

export default function SignUpPage() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.name) {
      toast.error("Name is Required");
      setIsLoading(false);
      return;
    }

    if (!formData.email) {
      toast.error("Email is Required");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    console.log(JSON.stringify(formData, null, 2));

    try {
      await createUserWithEmailAndPassword(
        firebaseAuth,
        formData?.email,
        formData?.password
      ).then((userCred) => {
        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred?.getIdToken().then((token) => {
              validateUserJWTToken(token).then((data) => {
                console.log("data " + JSON.stringify(data, null, 2));
                if (!data?.uid) {
                  toast.error("User is not valid");
                  return;
                }

                setUID(data?.uid);
                router.push("/");
              });
            });
          }
        });
      });
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogleHandler = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred?.getIdToken().then((token) => {
            console.log(token);
            validateUserJWTToken(token).then((data) => {
              console.log("data " + JSON.stringify(data, null, 2));
            });
          });
        }
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Join Questa and start creating quizzes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            <div className="flex justify-center">
              <span className="py-2 text-md">Login With</span>
              <Button
                onClick={loginWithGoogleHandler}
                type="submit"
                disabled={isLoading}
              >
                <Image
                  src={"/google.png"}
                  width={30}
                  height={30}
                  alt="Google Logo"
                />
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-indigo-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
