import React, {useState} from "react";
import {Button, Label, ToggleSwitch} from "flowbite-react";
import {useProfile} from "../../lib/supabaseUtils";

type NotificationSettings = {
  canPostAgain: boolean
}

export default function NotificationsSettings() {

  const profile = useProfile()
  const [form, setForm] = useState<NotificationSettings>({
    canPostAgain: true
  })

  const handleInput = (name: string, value: boolean) => {
    setForm({
      ...form,
      [name]: value
    })
  }

  if (!profile || !profile.data) {
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
          checked={form.canPostAgain}
          label="When you can create a new post"
          onChange={(value) => handleInput("canPostAgain", value)}
        />

        <ToggleSwitch
          checked={false}
          label="When you can create a new post"
          onChange={(value) => handleInput("emailNotifications", value)}
        />

        <Button
          size={"xs"}
          className="w-fit"
          // onClick={updateProfileData}
          // disabled={loading}
        >
          Update Notifications
        </Button>
      </div>
    </div>
  )
}