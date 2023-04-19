import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import IntakeLayout from "../components/IntakeLayout";
import {Checkbox, Label, TextInput} from "flowbite-react";
import Link from "next/link";
import {toast} from "react-toast";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Database} from "../models/schema";
import {AuthError} from "@supabase/gotrue-js";

interface ISignupForm {
  email: string
  password: string
}

export default function Signup() {

  const {push} = useRouter();
  const supabaseClient = useSupabaseClient<Database>();
  const [error, setError] = useState<AuthError | null>()
  const [form, setForm] = useState<ISignupForm>({
    email: '',
    password: ''
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(form)

    supabaseClient.auth.signUp({
      email: form.email,
      password: form.password
    })
      .then(({data, error}) => {
        setError(error)

        // If we successfully logged in, redirect!
        if (data.user) {
          toast.success(`Successfully created account!`)
          push('/login')
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error, toast])

  return (
    <>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Create and account
      </h1>

      <form className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => handleSubmit(e)}>

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

        <div className="flex items-start">
          <div className="flex items-start h-5">
            <Checkbox id="terms"
                      name="terms"
                      onChange={handleToggle}
                      required={true}/>
            <Label htmlFor="terms" className="ml-3">
              I accept the
              <Link href="/terms" className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1">
              Terms and Conditions
            </Link>
            </Label>
          </div>
        </div>
        <button type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          Create an account
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?

          <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1">
            Login here
          </Link>
        </p>
      </form>
    </>
  )
}

Signup.getLayout = (page: React.ReactNode) => <IntakeLayout>{page}</IntakeLayout>