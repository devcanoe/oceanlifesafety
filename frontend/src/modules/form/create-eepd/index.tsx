import Breadcrumb from "@/common/layout/Breadcrumb";
import styles from "./index.module.css";
import Dropdown from "@/common/components/form/dropdown";
import InputField from "@/common/components/form/inputfield";
import { useState } from "react";
import FormColumn from "@/common/model/form_columns.model";
import Button from "@/common/components/form/button";

export default function CreateEEPDContent() {
    const [rows, setRows] = useState<FormColumn[]>([]);
    const [ serialNo, setSerialNo] = useState<string>();
    const [ make, setMake ] = useState<string>();
    const [ location, setLocation ] = useState<string>();
    const [ remark, setRemark ] = useState<string>();
    const [ dateHyd, setDateHyd] = useState<Date>();
    const [ cylinderCondition, setCylinderCondition ] = useState<string>();
    const [ testBar, setTestBar ] = useState<string>();
    const [ refilingBar, setRefilingBar ] = useState<string>();

    const handleAddRow = () => {
        setRows((state) => [
            ...state,
            {
                serial_no: serialNo,
                make,
                location,
                remark,
                date_hyd_tested: dateHyd,
                cylinder_condition: cylinderCondition,
                testing_bar: testBar,
                refiling_bar: refilingBar
            }
        ])
    }

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
                {rows.map((row: FormColumn, index: number)=> {
                    return (<>
                        <div className={styles.formcontainer}>
                        
                            <div className={styles.buttoncontainer}>
                                <Button label="Delete" onClick={function (e: any): void {
                                        throw new Error("Function not implemented.");
                                    } }
                                />
                            </div>
                            <div className={styles.main}>
                                <div className={styles.input}>
                                    <small>Serial No</small>
                                    <InputField type={"text"}/>
                                </div>
                                <div className={styles.input}>
                                    <small>Make</small>
                                    <InputField type={"text"}/>
                                </div>
                                <div className={styles.input}>
                                    <small>Location</small>
                                    <InputField type={"text"}/>
                                </div>
                                <div className={styles.input}>
                                    <small>Date HYD testing</small>
                                    <InputField type={"date"}/>
                                </div>
                                <div className={styles.input}>
                                    <small>Cylinder condition</small>
                                    <InputField type={"text"}/>
                                </div>
                                <div className={styles.input}>
                                    <small>Testing bar</small>
                                    <InputField type={"text"}/>
                                </div>
                                <div className={styles.input}>
                                    <small>Refilling bar</small>
                                    <InputField type={"text"}/>
                                </div>
                                <div className={styles.input}>
                                    <small>Remark</small>
                                    <InputField type={"text"}/>
                                </div>
                            </div>
                        </div>
                    </>)
                })}
                <div className={styles.formcontainer}>
                    <div className={styles.buttoncontainer}>
                        <Button label="Add" onClick={handleAddRow}
                        />
                    </div>
                    <div className={styles.main}>
                        <div className={styles.input}>
                            <small>Serial No</small>
                            <InputField type={"text"} onChange={(e: any) => {setSerialNo(e.target.value)}}/>
                        </div>
                        <div className={styles.input}>
                            <small>Make</small>
                            <InputField type={"text"} onChange={(e: any) => {setMake(e.target.value)}}/>
                        </div>
                        <div className={styles.input}>
                            <small>Location</small>
                            <InputField type={"text"} onChange={(e: any) => {setLocation(e.target.value)}}/>
                        </div>
                        <div className={styles.input}>
                            <small>Date HYD testing</small>
                            <InputField type={"date"} onChange={(e: any) => {setDateHyd(e.target.value)}}/>
                        </div>
                        <div className={styles.input}>
                            <small>Cylinder condition</small>
                            <InputField type={"text"} onChange={(e: any) => {setCylinderCondition(e.target.value)}}/>
                        </div>
                        <div className={styles.input}>
                            <small>Testing bar</small>
                            <InputField type={"text"} onChange={(e: any) => {setTestBar(e.target.value)}}/>
                        </div>
                        <div className={styles.input}>
                            <small>Refilling bar</small>
                            <InputField type={"text"} onChange={(e: any) => {setRefilingBar(e.target.value)}}/>
                        </div>
                        <div className={styles.input}>
                            <small>Remark</small>
                            <InputField type={"text"} onChange={(e: any) => {setRemark(e.target.value)}}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}