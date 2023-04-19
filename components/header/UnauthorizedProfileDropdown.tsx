import Link from "next/link";
import {Button} from "flowbite-react";
import React from "react";

export default function UnauthorizedDropdown() {
  return (
    <>
      <Link href={"/login"} className="my-auto px-1">
        <Button color="gray">
          Log in
        </Button>
      </Link>

      <Link href={"/signup"} className="my-auto px-1">
        <Button>
          Sign up
        </Button>
      </Link>
    </>
  )
}