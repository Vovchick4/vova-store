import * as yup from "yup"
import { useFormik } from "formik"

import { useAuth } from "../../hooks"
import styles from "../../styles/shared-login-register.module.css"

const validationSchema = yup.object().shape({
    nickName: yup.string().trim().min(2).max(20).required("Required User Name"),
    email: yup.string().required("Required User Email").email("Must be a valid email address"),
    password: yup.string().trim().min(8).max(50).required("Required Password")
})

export default function RegisterPage() {
    const { trigger } = useAuth({ url: "/auth/register", method: "POST" })

    const formik = useFormik({
        initialValues: {
            nickName: "",
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: (values) => {
            trigger({ ...values })
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
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    autoComplete="email"
                    placeholder="Input Your User Email" />
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

                <button>Register</button>
            </div>
        </form>
    )
} 