import { Navigate, Outlet } from 'react-router-dom'
import { routesPath } from '~/config';
import { MainLayout } from '~/layouts'
import { ProfileSetting } from '~/pages/private';
import { Home, Login, Register, About, Post, Profile, Error404, Topic, AccountCreate } from '~/pages/public'


// Public routes
const routing = (auth) => [
    {
        path: routesPath.home,
        children: [
            {
                index: true,
                element: <MainLayout><Home /></MainLayout>
            },
            {
                path: routesPath.register,
                element: <><Register /></>
            },
            {
                path: routesPath.login,
                element: <><Login /></>
            },
            {
                path: routesPath.about,
                element: <><About /></>
            },
            {
                path: routesPath.topic,
                element: <Outlet/>,
                children: [ 
                    {
                        path: ':topicName',
                        element: <MainLayout><Topic/></MainLayout>
                    }
                ]
            },
            {
                path: routesPath.post,
                element: <Outlet/>,
                children: [
                    {
                        path: ':title',
                        element: <MainLayout><Post></Post></MainLayout>
                    }
                ]
            },
            {
                path: routesPath.user,
                element: <Outlet/>,
                children: [
                    {
                        path: ':username',
                        element: <><Profile/></>
                    },
                    {
                        path: 'setting',
                        element: auth.token
                            ? <ProfileSetting/>
                            : <Navigate to={'/' + routesPath.login}/>
                    }
                ]
            },
        ],
    },
    {
        path: routesPath.accountCreate,
        element: <AccountCreate />
    },
    {
        path: routesPath.error404,
        element: <Error404 />
    }
]

export { routing }