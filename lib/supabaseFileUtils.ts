import {SupabaseClient} from "@supabase/supabase-js";
import {Database} from "../models/schema";
import { v4 as uuidv4 } from 'uuid';
import * as Path from "path";
import {StorageError} from "@supabase/storage-js";

export async function uploadFile(
  supabase: SupabaseClient<Database>,
  bucket: string,
  path: string,
  file: File
): Promise<{
  data: {publicUrl: string} | null
  error: StorageError | null
}> {
  const {data, error} = await supabase
    .storage
    .from(bucket)
    .upload(path, file)

  if(error) {
    return {
      data: null,
      error: error
    }
  }

  const result = await getAbsolutePath(supabase, bucket, data.path)

  return {
    data: result.data,
    error: null
  }
}

export async function uploadFiles(
  supabase: SupabaseClient<Database>,
  bucket: string,
  folders: string,
  files: FileList | null
) {

  const jobs = []

  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const ext = file.name.split('.').pop();
      const name = uuidv4()
      const newName = name + '.' + ext

      const path = Path.join(folders, newName)
      jobs.push(uploadFile(supabase, bucket, path, file))
    }
  }

  return Promise.all(jobs)
}

export async function getAbsolutePath (
  supabase: SupabaseClient<Database>,
  bucket: string,
  localPath: string
) {
  return supabase
    .storage
    .from(bucket)
    .getPublicUrl(localPath)
}