import styles from "../components/header.module.css";
import Link from "next/link";

const headerNavLinks = [
    { href: '/', title: 'Home' },
    { href: '/client', title: 'Client' },
    { href: '/server', title: 'Server' },
    { href: '/protected', title: 'Protected' },
    { href: '/api-example', title: 'API' },
    { href: '/admin', title: 'Admin' },
    { href: '/me', title: 'Me' },
]

export default headerNavLinks
