import React, {useEffect, useState} from "react";
import {Button, Label, Textarea, TextInput} from "flowbite-react";
import {EditProfile, updateProfile, useProfile} from "../../lib/supabaseUtils";
import {PostgrestError} from "@supabase/postgrest-js";
import {toast} from "react-toast";

export default function BasicProfile() {
  const profile = useProfile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError>();
  const [newProfile, setNewProfile] = useState<EditProfile>(profile?.data || {
    username: "",
    bio: "",
  });

  useEffect(() => {
    if (profile?.data) {
      setNewProfile({...profile.data});
    }
  }, [profile]);

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target
    setNewProfile({
      ...newProfile,
      [name]: value
    })
  }

  const updateProfileData = async () => {
    setLoading(true)

    if (profile) {
      const {data, error} = await updateProfile(profile.data, newProfile)
    }

    setLoading(false)
  }

  if (!profile || !profile.data) {
    return <>Loading...</>
  }

  return (
    <div className="flex flex-col gap-y-4 w-3/4">

      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="username"
            value="Username"
          />
        </div>
        <TextInput
          id="username"
          name="username"
          placeholder={profile.data.username}
          defaultValue={profile.data.username}
          onChange={handleInputChange}
          required={true}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="bio"
            value="Bio"
          />
        </div>
        <Textarea
          id="bio"
          name="bio"
          rows={3}
          className="text-sm"
          placeholder={profile.data.bio}
          defaultValue={profile.data.bio}
          onChange={handleInputChange}
          required={true}
        />
      </div>

      <Button
        className="w-1/4"
        size={"xs"}
        onClick={updateProfileData}
        disabled={loading}
      >Update Profile</Button>
    </div>
  )
}