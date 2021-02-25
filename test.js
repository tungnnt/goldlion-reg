// console.log({
//     text1: decodeURI('data%5Breal_name%5D=V%C5%A9+H%E1%BB%AFu+Th%E1%BB%8D&data%5Bidentity%5D=030011124129&data%5Bimgs%5D=public%2Fuploads%2Fpaycode%2F2021022517233188473.jpeg'),
//     text2: decodeURIComponent('data%5Breal_name%5D=V%C5%A9+H%E1%BB%AFu+Th%E1%BB%8D&data%5Bidentity%5D=030011124129&data%5Bimgs%5D=public%2Fuploads%2Fpaycode%2F2021022517233188473.jpeg')
// })

const ocr = require("./api/ocr")
const uploadImage = require("./api/upload-image")

// console.log({
//     text1: encodeURIComponent('data[real_name]=Vũ+Hữu+Thọ&data[identity]=030011124129&data[imgs]=public/uploads/paycode/2021022517233188473.jpeg'),
//     text2: encodeURI('data[real_name]=Vũ+Hữu+Thọ&data[identity]=030011124129&data[imgs]=public/uploads/paycode/2021022517233188473.jpeg')
// })

// console.log(`${encodeURI('data[real_name]=Vũ+Hữu+Thọ&data[identity]=030011124129&data[imgs]=')}${encodeURIComponent('public/uploads/paycode/2021022517233188473.jpeg')}`);

setImmediate(async () => {
    const image = '/root/Desktop/unnamed.jpg'

    let response = await ocr(image)

    const [info] = response.data

    const { name, id } = info

    console.log({ name })

    response = await uploadImage('', image)

    const uploadedImage = response.data

    console.log({ uploadedImage })
})