
function vnEncodeUrl(string) {
    return (
        string.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .replace(/\s/g, '-')
    )
}

export default vnEncodeUrl