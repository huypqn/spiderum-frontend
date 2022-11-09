
function pageList(pages, maxSize, activePage) {
    const numberOfPages = pages > maxSize ? maxSize : pages
    const middle = Math.floor(maxSize / 2) + 1
    const arrPages = []
    for(let i = 1; i <= numberOfPages; ++i) {
        if (pages > maxSize) {
            if (pages - activePage > maxSize - middle) {
                if (activePage > middle) {
                    arrPages.push(activePage - middle + i)
                }
                else {
                    arrPages.push(i)
                }
            }
            else {
                arrPages.push(pages - maxSize + i)
            }
        }
        else {
            arrPages.push(i)
        }
    }
    return arrPages
}

export default pageList