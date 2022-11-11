const pathName = {
    register: "dang-ky",
    accountCreate: "tao-tai-khoan",
    login: "dang-nhap",
    about: "about",
    topic: "danh-muc",
    post: "bai-dang",
    user: "nguoi-dung"
}

const routesPath = {
    home: '/',
    register: pathName.register,
    accountCreate: pathName.accountCreate,
    login: pathName.login,
    about: pathName.about,
    topic: `${pathName.topic}/:topicName`,
    post: `${pathName.post}/:postName`,
    user: `${pathName.user}/:username`,
    error404: '*'
}

export { routesPath, pathName }
