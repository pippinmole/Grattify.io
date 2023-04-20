import React, {useEffect, useState} from "react";
import {Button, Label, ToggleSwitch} from "flowbite-react";
import {
  EditPreferencesProfile,
  updateBasicProfile,
  updatePreferencesProfile,
  usePreferences,
  useProfile
} from "../../lib/supabaseUtils";
import {toast} from "react-toast";
import {PostgrestError} from "@supabase/postgrest-js";

export default function NotificationsSettings() {

  const preferences = usePreferences()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError>();
  const [form, setForm] = useState<EditPreferencesProfile>({
    email_can_post: true
  })

  const handleInput = (name: string, value: boolean) => {
    setForm({
      ...form,
      [name]: value
    })
  }

  const updateProfileData = async () => {
    setLoading(true)

    if (preferences) {
      const {data, error} = await updatePreferencesProfile(preferences.data, form)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (preferences?.data) {
      setForm({...preferences.data} as EditPreferencesProfile);
    }
  }, [preferences]);

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error]);

  if (!preferences || !preferences.data) {
    return <>Loading...</>
  }

  return (
    <div>
      <h1 className="text-2xl">
        Notifications
      </h1>

      <hr className="h-px mt-2 mb-4 bg-gray-200 border-0 dark:bg-gray-700"/>

      <div className="mb-2 block">
        <Label
          htmlFor="event"
          value="Events"
        />

        {/*<hr className="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-700"/>*/}

      </div>

      <div className="flex flex-col gap-y-2">
        <ToggleSwitch
          checked={form.email_can_post}
          label="When you can create a new post"
          onChange={(value) => handleInput("email_can_post", value)}
        />

        <Button
          size={"xs"}
          className="w-fit"
          onClick={updateProfileData}
          disabled={loading}
        >
          Update Notifications
        </Button>
      </div>
    </div>
  )
}