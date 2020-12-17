import SweetAlert from 'sweetalert2'
import { passwordChange } from './Options/passwordChange'
import { NewUser } from './Options/addUser'
export const userSettings = async (user) => {

    if (user.permissions === 'admin') {
        SweetAlert.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `<i class="fa fa-lock"/>`,
            denyButtonText: `<i class="fa fa-users"/>`,
            cancelButtonText: `<i class="fa fa-user-plus"/>`

        }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
                passwordChange(user)
            } else if (result.isDenied) {
            } else if (result.isDismissed) {
                NewUser()
            }
        })


    }
}
// export default userSettings

    //< i id = "addusr"class="cardio fa fa-user-plus" aria - hiddentrue" ></i >
    // <i id="settings" class="cardio fa fa-users" aria-hidden="true"></i>