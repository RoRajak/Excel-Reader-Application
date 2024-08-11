/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useState } from "react";
import Image from "next/image";
import {
  appleIcon,
  googleIcon,
  logoBlueIcon,
  logoWhiteIcon,
  modelIcon,
} from "@/constants";
import Themebtn from "@/components/Themebtn";
import { signIn,useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

function page() {
  const [email,setEmail]=useState("");
  const[password,setPassword]=useState("")
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession()
  const router = useRouter()

  React.useEffect(() => {
    if (session) {
      router.push('/')
    }
  }, [session, router])

  const handleGoogleSignIn = () => {
    
    signIn('google')
  }

  const handleSignin=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setErrorMessage(""); // Reset error message

    try {
      const response = await axios.post("https://task-management-application-vj6i.onrender.com/user/signin", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
      router.push("/");
    } catch (error) {
      console.error("Error signing in:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }

  }

  return (
    <div className="min-h-screen sm:p-4 flex flex-col sm:flex-row sm:justify-center sm:items-center sm:w-full sm:gap-x-20 ">
      <div className=" hidden sm:block bg-[#605bff] rounded-2xl p-8 sm:w-[704px]">
        <div className="bg-blue-200 bg-opacity-25 rounded-2xl flex flex-col pl-8">
          <div className="bg-white rounded-3xl flex max-w-fit py-3 px-4 gap-x-2 mt-4 items-center">
            <Image src={logoBlueIcon} alt="logo" />
            <h5 className="font-bold text-3xl dark:text-black font-montserrat">Base</h5>
          </div>
          <div className="flex flex-wrap mt-14 w-[504px] h-[189px]">
            <h2 className="font-bold text-5xl text-white leading-[69px] font-lato">
              Generate detailed reports with just one click
            </h2>
          </div>
          <div className="flex  justify-between items-center ">
            <Themebtn value="-172px" />

            <Image src={modelIcon} alt="model" className="z-10" />
          </div>
        </div>
      </div>
      <div >
        <header className="bg-indigo-600 text-white p-4 flex gap-x-2  sm:hidden">
          <Image src={logoWhiteIcon} alt="logo" />
          <h1 className="text-2xl font-bold font-montserrat">Base</h1>
        </header>

        <main className="flex-grow flex flex-col justify-center px-7 mt-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white font-montserrat ">Sign In</h2>
          <p className="mb-6 font-normal text-sm dark:text-white font-lato">Sign in to your account</p>

          <div className="flex space-x-4 mb-6">
            <button 
            onClick={handleGoogleSignIn}
            className=" border border-gray-300 rounded-md py-1 px-4 flex items-center justify-center bg-white dark:bg-black dark:text-white dark:border-none">
              <Image src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
              <p className="font-normal text-[10px] text-[#858585] font-montserrat">
                Sign in with Google
              </p>
            </button>
            <button className="flex-1 border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center bg-white dark:bg-black dark:text-white dark:border-none">
              <Image src={appleIcon} alt="Apple" className="w-5 h-5 mr-2" />
              <p className="font-normal text-[10px] text-[#858585] font-montserrat">
                Sign in with Apple
              </p>
            </button>
          </div>

          <form 
          onSubmit={handleSignin}
          className="space-y-4 bg-[#FFFFFF] rounded-3xl p-4 drop-shadow-md dark:bg-black dark:text-white">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                <p className="font-bold text-base dark:text-white font-lato">Email address</p>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                name="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 dark:border-none dark:outline-none font-lato "
                placeholder="johndoe@gmail.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 "
              >
                <p className="font-bold text-base dark:text-white font-lato">Password</p>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                name="password"
                placeholder="password"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 dark:border-none dark:outline-none font-lato"
              />
            </div>
            <div className="text-sm">
              <a href="#" className="text-indigo-600 hover:text-indigo-500 font-lato">
                Forgot password?
              </a>
            </div>
            {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p>
            )}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 font-montserrat"
            >
              {loading?"Signining":"Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 font-lato">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:text-indigo-500 font-lato">
              Register here
            </a>
          </p>
        </main>

        <footer className="mt-8 mb-4 flex justify-center space-x-4 sm:pt-[5rem] sm:gap-x-4">
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">GitHub</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">LinkedIn</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Discord</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
            </svg>
          </a>
        </footer>
      </div>
    </div>
  );
}

export default page;
