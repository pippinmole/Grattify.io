import { Sidebar } from "flowbite-react";
import {useSession} from "next-auth/react";
import Layout from "../layout";
import {HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser} from "react-icons/hi";

export default function Index({children}: {children: any}) {

    const {data: session} = useSession()

    return (
        <Layout>
            Settings for {session?.user?.name}

            <div className="w-fit">
                <Sidebar aria-label="Sidebar with multi-level dropdown example">
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item
                                href="account"
                                icon={HiChartPie}
                            >
                                Account
                            </Sidebar.Item>
                            <Sidebar.Collapse
                                icon={HiShoppingBag}
                                label="E-commerce"
                            >
                                <Sidebar.Item href="#">
                                    Products
                                </Sidebar.Item>
                            </Sidebar.Collapse>
                            <Sidebar.Item
                                href="#"
                                icon={HiInbox}
                            >
                                Inbox
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
                            <Sidebar.Item
                                href="#"
                                icon={HiArrowSmRight}
                            >
                                Sign In
                            </Sidebar.Item>
                            <Sidebar.Item
                                href="#"
                                icon={HiTable}
                            >
                                Sign Up
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>

                {children}
            </div>
        </Layout>
    )
}