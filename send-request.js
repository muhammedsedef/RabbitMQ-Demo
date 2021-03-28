const axios = require('axios');
const url = 'http://localhost:3000/posts/newPost'

const post = {
    firstName: 'Muhammed',
    lastName: 'Sedef',
    email: 'slsdf@gmail.com',
    message: 'Yeni Deneme',
    date: Date.now()
}

axios({
    method: 'post',
    url: url,
    data: post
  })
.then(data => {console.log(data)})
.catch(err => {console.log(err)})