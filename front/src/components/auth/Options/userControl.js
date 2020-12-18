import axios from 'axios'
import SweetAlert from 'sweetalert2'
import { useState } from 'react'


export const UserControll = async () => {
    const [users, setUsers] = useState({})
    const usersGetter = async () => {
        axios({
            method: "get",
            url: "http://localhost:5000/printUser",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },

        })
            .then((res) => {
                console.log(res.data)
                // setUser(res.data)
            })
    }
    await SweetAlert.fire({
        title: "Controll users",
        onOpen: () => {
            usersGetter()
        },
        input: 'select',
        inputOptions: users,
    })



}