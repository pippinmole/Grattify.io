import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {toast} from "react-toast";
import {Button, Label, Spinner, Textarea, TextInput} from "flowbite-react";
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {Database} from "../../models/schema";
import {PostgrestError} from "@supabase/postgrest-js";

interface IPostForm {
    title: string
    content: string
}

export default function CreatePost() {
    const {push} = useRouter();
    const user = useUser();
    const supabaseClient = useSupabaseClient<Database>()
    const [error, setError] = useState<PostgrestError>()
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

        if (!user) {
            await push('/login')
            return
        }

        setSubmitting(true)

        const { data, error} = await supabaseClient
          .from('posts')
          .insert({
              author_id: user.id,
              title: formData.title,
              content: formData.content,
              images: []
          })
          .select()
          .maybeSingle()

        if (error) {
            setError(error)
        } else {
            await push(`/post/${data?.id}`)
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