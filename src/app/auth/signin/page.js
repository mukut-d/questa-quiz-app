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
import { app } from "@/config/firebase.config";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Image from "next/image";
import { validateUserJWTToken } from "@/utils/validateUser";
import userStore from "@/store/userStore";

export default function SignInPage() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUID } = userStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email) {
        toast.error("Email is required");
        return;
      }

      if (!password) {
        toast.error("Password is required");
        return;
      }

      await signInWithEmailAndPassword(firebaseAuth, email, password).then(
        (userCred) => {
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
        }
      );
    } catch (error) {
      toast.error("Something went wrong");
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your Questa account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
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

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {"Don't have an account"}
              <Link
                href="/auth/signup"
                className="text-indigo-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
