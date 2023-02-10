import * as yup from "yup"
import { useFormik } from "formik"

import { useAuth } from "../../hooks"
import styles from "../../styles/shared-login-register.module.css"

const validationSchema = yup.object().shape({
    nickName: yup.string().trim().min(2).max(20).required("Required Nick Name"),
    password: yup.string().trim().min(8).max(50).required("Required Password")
})

export default function LoginPage() {
    const { trigger } = useAuth({ url: "/auth/login", method: "POST" })

    const formik = useFormik({
        initialValues: {
            nickName: "",
            password: "",
        },
        validationSchema,
        onSubmit: (values) => {
            trigger({ ...values });
        }
    })

    return (
        <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
            <div>
                <input
                    type="text"
                    name="nickName"
                    value={formik.values.nickName}
                    onChange={formik.handleChange}
                    autoComplete="name"
                    placeholder="Input Your Nick Name" />
                <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    autoComplete="password"
                    placeholder="Input Your User Password" />

                {formik.errors && (
                    <ul>
                        {Object.values(formik.errors).map(text => <li key={text}>{text}</li>)}
                    </ul>
                )}

                <button>Login</button>
            </div>
        </form>
    )
}