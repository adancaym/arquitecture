import {OptionsFieldEntityHtmlHelper} from "../../../../api/core/EntityHtmlHelper";
import {Modal} from "../../../../components/common/Modal";
import {TableAssetName} from "./TableAssetName";
import * as React from "react";
import {useState} from "react";

interface ModalAssetsProps {
    assets: Array<OptionsFieldEntityHtmlHelper>;
    count: number;
    title: string;
    className?: string
}

export const ModalAssets = ({assets, count, title, className='btn btn-info btn-sm fa fa-eye'}: ModalAssetsProps) => {
    const [show, setShow] = useState<boolean>(false)
    return <Modal
        title={title}
        className={className}
        show={show}
        onAccept={() => setShow(false)}
        onCancel={() => setShow(false)}
        showModal={() => setShow(true)}
    >
        <h3>{count}</h3>
        <TableAssetName assetsName={assets}></TableAssetName>
    </Modal>
}