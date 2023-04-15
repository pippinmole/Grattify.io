import Layout from "../components/layout"
import React, {useState} from "react";
import {useRouter} from "next/router";
import {MongooseError} from "mongoose";

interface IPostForm {
    content: string
}

export default function IndexPage() {

    const { push } = useRouter();
    const [error, setError] = useState<MongooseError | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [formData, setFormData] = useState<IPostForm>({
        content: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function submitDailyGratitude(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setSubmitting(true)
        setError(null)

        const response = await fetch('/api/post/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        const data = await response.json()

        if (!data || !response.ok) {
            setError(data)
        } else {
            await push(`post/${data._id}`)
            setError(null)
        }

        setSubmitting(false)
    }

    return (
        <Layout>
            {error && <ErrorMessage error={error}></ErrorMessage> }

            <h1 className="text-3xl font-bold text-center">
                What are you grateful for today?
            </h1>

            <form onSubmit={(e) => submitDailyGratitude(e)}>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your message
                </label>

                <textarea id="message"
                          rows={7}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write your thoughts here..."
                          name="content"
                          value={formData.content}
                          onChange={handleChange}>
                </textarea>

                <div className="text-center">
                    <LoadingButton isLoading={submitting}></LoadingButton>
                </div>
            </form>
        </Layout>
    )
}

function ErrorMessage({error}: {error: MongooseError}) {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-4 rounded relative" role="alert">
            <span className="block sm:inline">{error.message}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 20 20"><title>Close</title><path
        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
        </div>
    )
}

function LoadingButton({ isLoading }: { isLoading: boolean }) {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded disabled:bg-blue-300"
            type="submit"
            disabled={isLoading}>

            {isLoading ? (
                <div>
                    <svg aria-hidden="true" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span>Loading...</span>
                </div>
            ) : (
                <>Submit</>
            )}
        </button>
    )
}