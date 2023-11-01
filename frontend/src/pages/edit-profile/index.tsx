import DashboardLayout from "@/common/layout/dashboard"
import EditProfileContent from "@/modules/user/edit-profile"

const EditProfile = () => {
    return (
        <>
            <DashboardLayout>
                <EditProfileContent/>
            </DashboardLayout>
        </>
    )
}

export default EditProfile;