import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {AuthError, Provider} from "@supabase/gotrue-js";
import {toast} from "react-toast";
import {AiFillGithub} from "react-icons/ai";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Button, Checkbox, Label, TextInput} from "flowbite-react";
import IntakeLayout from "../components/intake/IntakeLayout";
import Link from "next/link";

interface ILoginForm {
  email: string
  password: string,
  rememberMe: boolean
}

Login.title = "Log in"

export default function Login() {

  const supabaseClient = useSupabaseClient();

  const {push} = useRouter();
  const [error, setError] = useState<AuthError | null>()
  const [form, setForm] = useState<ILoginForm>({
    email: '',
    password: '',
    rememberMe: true
  })

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = event.target
    setForm({
      ...form,
      [name]: checked,
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const {email, password} = form
    const {data, error} = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    })

    const {user} = data

    setError(error)

    if(user) {
      toast.success(`Welcome back ${user.email}!`)
      await push('/')
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error, toast])

  return (
    <>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Sign in to your account
      </h1>

      <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email"/>
            </div>
            <TextInput
              id="email"
              type="email"
              name="email"
              placeholder="name@email.com"
              required={true}
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password"/>
            </div>
            <TextInput
              id="password"
              name="password"
              type="password"
              placeholder="••••••••••••"
              required={true}
              onChange={handleChange}
              value={form.password}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-start h-5">
            <Checkbox id="remember"
                      name="rememberMe"
                      onChange={handleToggle}
                      required={false}/>
            <Label htmlFor="remember" className="ml-3">
              Remember me
            </Label>
          </div>

          <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
            Forgot password?
          </a>
        </div>

        <Button type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          Sign in
        </Button>

        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?

          <Link href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1">
            Sign up
          </Link>
        </p>
      </form>

      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>

        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-800">
          or
        </span>
      </div>

      <SocialLogins/>
    </>
  )
}

Login.getLayout = (page: React.ReactNode) => <IntakeLayout>{page}</IntakeLayout>

function SocialLogins() {

  const supabaseClient = useSupabaseClient()
  const [error, setError] = useState<AuthError | null>();

  const handleOauthButton = (e: React.UIEvent<HTMLButtonElement>) => {
    const {name} = e.target as HTMLButtonElement;

    supabaseClient.auth.signInWithOAuth({
      provider: name as Provider,
    })
      .then(({error}) => setError(error))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  return (
    <div className="flex flex-col gap-y-2">
      <button type="button"
              name="github"
              onClick={handleOauthButton}
              className="w-full text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2">
        <AiFillGithub size="1.5rem" className="mr-2"/>
        Sign in with Github
      </button>
      <button type="button"
              name="google"
              onClick={handleOauthButton}
              className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55">
        <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google"
             role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <path fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
        </svg>
        Sign in with Google
      </button>
      {/*<button type="button"*/}
      {/*        name="apple"*/}
      {/*        onClick={handleOauthButton}*/}
      {/*        className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30">*/}
      {/*  <svg className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple"*/}
      {/*       role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">*/}
      {/*    <path fill="currentColor"*/}
      {/*          d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>*/}
      {/*  </svg>*/}
      {/*  Sign in with Apple*/}
      {/*</button>*/}

    </div>
  )
}