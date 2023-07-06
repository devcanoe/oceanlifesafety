import Breadcrumb from "@/common/layout/Breadcrumb";
import styles from "./index.module.css";
import Dropdown from "@/common/components/form/dropdown";
import InputField from "@/common/components/form/inputfield";
import { useState } from "react";
import FormColumn from "@/common/model/form_columns.model";
import Button from "@/common/components/form/button";



export default function CreateEEPDContent() {

    const [rows, setRows] = useState<FormColumn[]>([]);

    return (
        <>
            <section className={styles.container}>
                <Breadcrumb/>
                <div className={styles.container}>
                    <Dropdown label={"Company"} disabled={false} items={[]} onChange={function (e: any): void {
                        throw new Error("Function not implemented.");
                    } }/>
                    <Dropdown label={"Ships"} disabled={false} items={[]} onChange={function (e: any): void {
                        throw new Error("Function not implemented.");
                    } }/>
                    <InputField type={"text"} label="Location of vessel"/>
                    <InputField type={"date"} label="Service Date"/>
                    <InputField type={"text"} label="Flag state"/>
                    <InputField type={"date"} label="Last Service Date"/>
                    <InputField type={"text"} label="Type"/>
                </div>
                <table className={styles.container}>
                    <tr className={styles.header}>
                        <td>
                            Serial No
                        </td>
                        <td>
                            Make
                        </td>
                        <td>
                            Location
                        </td>
                        <td>
                            Data HYD <br/> Tested
                        </td>
                        <td>
                            Cylinder <br/>Condition
                        </td>
                        <td>
                            Testing <br/>Bar
                        </td>
                        <td>
                            Refilling <br/>Bar
                        </td>
                        <td>
                            Remark
                        </td>
                        <td>
                            Action(s)
                        </td>
                    </tr>
                    <tr className={styles.main}>
                        <td>
                            <InputField type={"text"}/>
                        </td>
                        <td>
                            <InputField type={"text"}/>
                        </td>
                        <td>
                            <InputField type={"text"}/>
                        </td>
                        <td>
                            <InputField type={"text"}/>
                        </td>
                        <td>
                            <InputField type={"text"}/>
                        </td>
                        <td>
                            <InputField type={"text"}/>
                        </td>
                        <td>
                            <InputField type={"text"}/>
                        </td>
                        <td>
                            <InputField type={"text"}/>
                        </td>
                        <td>
                            <Button label="Delete" onClick={function (e: any): void {
                                throw new Error("Function not implemented.");
                            } }/>
                        </td>
                    </tr>
                </table>
            </section>
        </>
    )
}