import Link from 'next/link';
import styles from './index.module.css';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';

export interface Item {
    id: string;
    url: string;
    label: string;
    current: boolean;
}

interface IBreadcrumb {
    path?: Item[]
}
export default function Breadcrumb(props: IBreadcrumb) {

    const router = useRouter();

    // const list = props.path.map((item: Item, index: number) => {
    //     if (item.current) {
    //         return (
    //             <>
    //                 <p key={index}>
    //                     {item.label}
    //                 </p>
    //             </>
    //         )
    //     } else {
    //         return (
    //             <>
    //                 <Link key={index} href={item.url}>
    //                     {item.label}
    //                 </Link> /
    //             </>
    //         )
    //     }
    // })

    return (
        <>
            <section className={styles.container} onClick={() => router.back()}>
                <Icon icon="ep:back" height="30" width="30"/> Go Back
            </section>
        </>
    )
}