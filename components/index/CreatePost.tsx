import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {toast} from "react-toast";
import {Button, FileInput, Label, Spinner, Textarea, TextInput} from "flowbite-react";
import {useSession, useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {Database} from "../../models/schema";
import {PostgrestError} from "@supabase/postgrest-js";
import {createPost} from "../../lib/supabaseUtils";
import {uploadFiles} from "../../lib/supabaseFileUtils";
import {StorageError} from "@supabase/storage-js";

export interface IPostForm {
    title: string
    content: string
    files: FileList | null
}

export default function CreatePost() {
    const {push} = useRouter();
    const user = useUser();
    const session = useSession();
    const supabaseClient = useSupabaseClient<Database>()
    const [error, setError] = useState<PostgrestError | StorageError | null>()
    const [submitting, setSubmitting] = useState(false)
    const [form, setForm] = useState<IPostForm>({
        title: '',
        content: '',
        files: null
    });

    const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = event.target;

        setForm({
            ...form,
            files: files
        });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if(!user) {
            push('/login')
            return
        }

        const {name, value} = event.target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    async function submitDailyGratitude(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!user || !session) {
            await push('/login')
            return
        }

        setSubmitting(true)

        const fileResult = await uploadFiles(
          supabaseClient, "media", "post_media", form.files
        )

        const fileError = fileResult.find(x => x.error);
        if(fileError) {
            setError(fileError.error)
            setSubmitting(false)
        } else {
            const files = fileResult
              .filter(x => x && x.data)
              .map(file => file.data!.publicUrl);

            const postResult = await createPost(
              supabaseClient, session, form, files
            );

            if (!error) {
                await push(`/post/${postResult.data?.id}`)
            } else {
                setError(error)
            }
        }

        setSubmitting(false)
    }

    useEffect(() => {
        if (error) {
            toast.hideAll()
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
                        value={form.title}
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
                        value={form.content}
                        onChange={handleChange}
                        required={true}
                    />
                </div>

                <div id="fileUpload">
                    <div className="mb-2 block">
                        <Label
                          htmlFor="file"
                          value="Upload file"
                        />
                    </div>
                    <FileInput
                      id="file"
                      name="files"
                      onChange={handleFiles}
                      helperText="Attach media to your post"
                      multiple={true}/>
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