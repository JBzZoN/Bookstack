import axios  from "axios"


export async function getBooks() {
  try {
    // create url
    const url = `http://localhost:8080/admin/books`

    // create headers with require token
    // send GET request and get the response
    const response = await axios.get(url //{
      //headers: {
        //token: localStorage.getItem('token'),
      //},
//    }
)

    // return response body
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}

export async function getstaffs() {
  try {
    // create url
    const url = `http://localhost:8080/admin/staff`

    // create headers with require token
    // send GET request and get the response
    const response = await axios.get(url //{
      //headers: {
        //token: localStorage.getItem('token'),
      //},
//    }
)

    // return response body
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}


export async function getmembers() {
  try {
    // create url
    const url = `http://localhost:8080/admin/members`

    // create headers with require token
    // send GET request and get the response
    const response = await axios.get(url //{
      //headers: {
        //token: localStorage.getItem('token'),
      //},
//    }
)

    // return response body
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}
