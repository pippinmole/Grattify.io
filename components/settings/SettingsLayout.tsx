import { Sidebar } from "flowbite-react";
import {HiChartPie, HiShoppingBag, HiUser} from "react-icons/hi";
import {ReactNode} from "react";
import Link from "next/link";

export default function SettingsLayout({children}: {children: ReactNode}) {
  return (
    <>
      <div className="md:flex flex-row">
        <Sidebar aria-label="Sidebar with multi-level dropdown example" className="flex md:w-1/4 w-full">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                icon={HiChartPie}
                as={Link}
                href="/settings/account"
              >
                Account
              </Sidebar.Item>

              <Sidebar.Item
                icon={HiChartPie}
                as={Link}
                href="/settings/notifications"
              >
                Notifications
              </Sidebar.Item>

              <Sidebar.Item
                href="#"
                icon={HiUser}
              >
                Users
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiShoppingBag}
              >
                Products
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>

        <div className="w-full p-4 md:w-3/4">
          {children}
        </div>
      </div>
    </>
  )
}