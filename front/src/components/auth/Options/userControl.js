import Axios from 'axios'
import SweetAlert from 'sweetalert2'
import axios from Axios


export const UserControll = async () => {
    const [users, setUsers] = useState([])

    const usersGetter = async () => {
        axios({
            method: "get",
            url: "http://localhost:5000/printUser",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },

        })
            .then((res) => {
                setUsers(res.data)
            })
    }
    await SweetAlert.fire({
        title: "Controll users",
        html: <Select
            placeholder="select User"
            onMenuOpen={usersGetter}
            isSearchable={true}
            options={users}
            name="users"
            defaultOptions={true}
            className="SheetSelect m-2"
            onChange={e => { console.log(e.value) }}
        />

    })



}