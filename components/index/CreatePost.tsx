import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import React, {useEffect, useState} from "react";
import {toast} from "react-toast";
import {Button, FileInput, Label, Spinner, Textarea, TextInput} from "flowbite-react";

interface IPostForm {
    title: string
    content: string
}

export default function CreatePost() {
    const {push} = useRouter();
    const {data: session} = useSession()
    const [error, setError] = useState<any>(null)
    const [submitting, setSubmitting] = useState(false)
    const [formData, setFormData] = useState<IPostForm>({
        title: '',
        content: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function submitDailyGratitude(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!session?.user) {
            await push('/api/auth/signin')
            return
        }

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

        if (response.ok) {
            await push(`post/${data._id}`)
        } else {
            setError(data)
        }

        setSubmitting(false)
    }

    useEffect(() => {
        if (error) {
            toast.error(error?.message)
        }
    }, [error])

    return (
        <>
            <h1 className="text-3xl font-bold text-center">
                What are you grateful for today?
            </h1>

            <p className="tracking-normal text-gray-500 md:text-sm dark:text-gray-400 text-center my-4">
                Posts can be made every 24 hours. Please wait until the time has elapsed. 😃
            </p>

            <form onSubmit={(e) => submitDailyGratitude(e)}
                  className="max-w-screen-md mx-auto flex flex-col gap-4">

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="title1" value="Title"/>
                    </div>
                    <TextInput
                        id="title1"
                        type="text"
                        name="title"
                        placeholder="I am grateful for Karl Pilkington..."
                        value={formData.title}
                        onChange={handleChange}
                        required={true}/>
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="title1" value="Description"/>
                    </div>
                    <Textarea
                        id="content1"
                        name="content"
                        rows={6}
                        className="text-sm"
                        placeholder="... because he is clueless"
                        value={formData.content}
                        onChange={handleChange}
                        required={true}
                    />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="title1" value="Attach media"/>
                    </div>

                    <FileInput name="files" multiple/>
                </div>

                <div>
                    <Button type="submit" disabled={submitting} className="mx-auto">
                        {submitting ? (
                            <>
                                <div className="mr-3">
                                    <Spinner size="sm" light={true}/>
                                </div>

                                Loading...
                            </>
                        ) : (
                            <>Submit</>
                        )}
                    </Button>
                </div>
            </form>
        </>
    )
}