import DashboardLayout from "@/common/layout/dashboard";
import ShipContent from "@/modules/ship";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index(){


    const router = useRouter();

    useEffect(()=> {

    },[router.isReady])

    return (
        <>
            <DashboardLayout>
                {router.isReady &&
                <ShipContent id={router.query.id }/>
                }
            </DashboardLayout>
        </>
    )
}