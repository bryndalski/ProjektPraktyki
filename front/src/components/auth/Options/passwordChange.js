import SweetAlert from 'sweetalert2'
import axios from 'axios'

export const passwordChange = async (user) => {
    const { value: formValues } = await SweetAlert.fire({
        title: `Settinfs for ${user.username}`,
        html:`<label for="SweetAlert-email">Email</label>
            <input id="SweetAlert-email" class="swal2-input" placeholder='${user.email}' value='${user.email}'>
            <label for="SweetAlert-password">New Password</label>
            <input id="SweetAlert-password" class="swal2-input" placeholder="New Password" type="password">
            `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            return [
                document.getElementById('SweetAlert-password').value,
                document.getElementById('SweetAlert-email').value
            ]
        }
    })
    if (formValues) {
        SweetAlert.fire(JSON.stringify(formValues))
    }

}
// export default passwordChange