import { useGetCompanyQuery, useGetOneCompanyQuery } from "@/common/services/company.service";
import styles from "./index.module.css";
import Loader from "@/common/components/display/loader";
import Button from "@/common/components/form/button";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Popup from "@/common/components/display/popup";
import AddShipContent from "@/modules/ship/modals/addship";
import { useRouter } from "next/router";
import { StringLiteral } from "typescript";
import AddFormContent from "@/modules/form/modal/addform";

interface ICompanyDetail {
    id: string;
    refetchShips: () => void
}

export default function CompanyDetail(props: ICompanyDetail) {
    const router = useRouter();

    const [shipModalStatus, setShipModalStatus] = useState<boolean>(false);
    const [raftModalStatus, setRaftModalStatus] = useState<boolean>(false);
    const [formModalStatus, setFormModalStatus] = useState<boolean>(false);

    const shipModalToggleHandler = () => {
        setShipModalStatus((state) => !state);
        props.refetchShips();
    };

    const raftModalToggleHandler = () => {
        setRaftModalStatus((state) => !state);
        // refetch();
    };

    const formModalToggleHandler = () => {
        setFormModalStatus((state) => !state);
        // refetch();
    };
    const { data:company, isLoading, isSuccess } = useGetOneCompanyQuery({id: props.id})
    console.log(props.id)
    console.log(isSuccess && company?.data)
    return (
        <>
            <Loader status={isLoading}/>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div>
                        {isSuccess && company?.data.name}
                    </div>
                    <div className={styles.buttons}>
                        <Button icon={<Icon icon="ic:baseline-plus" />} label="Ship" onClick={shipModalToggleHandler}/>
                        <Button icon={<Icon icon="ic:baseline-plus" />} label="Raft" onClick={function (e: any): void {
                            throw new Error("Function not implemented.");
                        } }/>
                        <Button icon={<Icon icon="ic:baseline-plus" />} label="form" onClick={formModalToggleHandler}/>
                    </div>
                </header>
                <main className={styles.content}>
                    <div className={styles.column}>
                        <small className={styles.subheader}>Address:</small>
                        <p>{isSuccess && company?.data.address}</p>
                    </div>   
                    <div className={styles.column}>
                        <small className={styles.subheader}>Phone:</small>
                        <p></p>
                    </div>  
                    <div className={styles.column}>
                        <small className={styles.subheader}>Email:</small>
                        <p></p>
                    </div>  
                </main>
            </div>
            <Popup displayStatus={shipModalStatus} close={shipModalToggleHandler}>
                <AddShipContent companyId={router.query.id} close={shipModalToggleHandler} />
            </Popup>
            <Popup displayStatus={formModalStatus} close={formModalToggleHandler}>
                <AddFormContent companyId={router.query.id} close={formModalToggleHandler} />
            </Popup>
        </>
    )
}