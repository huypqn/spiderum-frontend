import { MainLayout } from '~/components/Layout'

import Home from '~/pages/Home';
import Register from '~/pages/Register';
import Login from '~/pages/Login';
import About from '~/pages/About';
import Post from '~/pages/Post';

// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: MainLayout },
    { path: '/register', component: Register, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/about', component: About, layout: null },
    { path: '/post', component: Post, layout: MainLayout },
]

// Private routes (user only)
const privateRoutes = [

]

export { publicRoutes, privateRoutes }