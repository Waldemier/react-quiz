import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-d15db-default-rtdb.firebaseio.com'
})