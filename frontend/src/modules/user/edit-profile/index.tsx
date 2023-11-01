import InputField from '@/common/components/form/inputfield';
import styles from './index.module.css';
import Button from '@/common/components/form/button';

const EditProfileContent = () => {
    return (
        <>
            <section className={styles.container}>
                <div className={styles.col2}>
                <InputField
                    label='Firstname'
                    type="text"
                    name={"firstname"}
                    placeholder="firstname"
                    // value={formik.values.email}
                    // onChange={formik.handleChange}
                    // error={formik.touched.email && Boolean(formik.errors.email)}
                    // helperText={formik.touched.email && formik.errors.email}
                />
                <InputField
                    label='Lastname'
                    type="text"
                    name={"lastname"}
                    placeholder="lastname"
                    // value={formik.values.email}
                    // onChange={formik.handleChange}
                    // error={formik.touched.email && Boolean(formik.errors.email)}
                    // helperText={formik.touched.email && formik.errors.email}
                />
                </div>
                <InputField
                    label='Email'
                    type="email"
                    name={"email"}
                    placeholder="email"
                    // value={formik.values.email}
                    // onChange={formik.handleChange}
                    // error={formik.touched.email && Boolean(formik.errors.email)}
                    // helperText={formik.touched.email && formik.errors.email}
                />
                <InputField
                    label='Phone'
                    type="text"
                    name={"phone"}
                    placeholder="phone"
                    // value={formik.values.email}
                    // onChange={formik.handleChange}
                    // error={formik.touched.email && Boolean(formik.errors.email)}
                    // helperText={formik.touched.email && formik.errors.email}
                />
                <InputField
                    label='Date of Birth'
                    type="date"
                    name={"date_of_birth"}
                    placeholder="Date of birth"
                    // value={formik.values.email}
                    // onChange={formik.handleChange}
                    // error={formik.touched.email && Boolean(formik.errors.email)}
                    // helperText={formik.touched.email && formik.errors.email}
                />
                <InputField
                    label='Position'
                    type="text"
                    name={"position"}
                    placeholder="Position"
                    // value={formik.values.email}
                    // onChange={formik.handleChange}
                    // error={formik.touched.email && Boolean(formik.errors.email)}
                    // helperText={formik.touched.email && formik.errors.email}
                />
                <InputField
                    label='Date Hired'
                    type="date"
                    name={"date_hired"}
                    placeholder="Date hired"
                    // value={formik.values.email}
                    // onChange={formik.handleChange}
                    // error={formik.touched.email && Boolean(formik.errors.email)}
                    // helperText={formik.touched.email && formik.errors.email}
                />
                <InputField
                    label='Date Fired'
                    type="date"
                    name={"date_fired"}
                    placeholder="Date fired"
                    // value={formik.values.email}
                    // onChange={formik.handleChange}
                    // error={formik.touched.email && Boolean(formik.errors.email)}
                    // helperText={formik.touched.email && formik.errors.email}
                />

                <Button
                    button="primary"
                    isLoading={false}
                    label={"Update Profile"}
                    onClick={()=> {}}
                />
            </section>
        </>
    )
}

export default EditProfileContent;