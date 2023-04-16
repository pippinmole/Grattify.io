const headerNavLinks = [
    { href: '/', title: 'Home', authorize: false },
    { href: '/discover', title: 'Discover', authorize: false },
    { href: '/profile', title: 'My Profile', authorize: true },

    // { href: '/server', title: 'Server' },
    // { href: '/protected', title: 'Protected' },
    // { href: '/api-example', title: 'API' },
    // { href: '/admin', title: 'Admin' },
    // { href: '/me', title: 'Me' },
];

const dropdownNavLinks = [
    { href: '/profile', title: 'My Profile', authorize: true },
    { href: '/profile', title: 'My Profile', authorize: true },
    { href: '/profile', title: 'My Profile', authorize: true },
    { href: '/profile', title: 'Sign in', authorize: true },
    { href: '/profile', title: 'Sign out', authorize: true },
];

export default headerNavLinks
