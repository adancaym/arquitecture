import {Modal} from "../../../../components/common/Modal";
import {useTranslation} from "../../../../_metronic/i18n/i18nProvider";
import {useFormik} from "formik";
import {Input} from "../../../../components/common/input/Input";
import * as Yup from "yup";
import {useState} from "react";

export const AddWallet = () => {
    const title = useTranslation('ADD_WALLET.TITLE', 'Add Wallet');
    const label = useTranslation('ADD_WALLET.LABEL', 'Wallet Name');
    const labelSecret = useTranslation('ADD_WALLET.LABEL_SECRET', 'Wallet Secret');
    const [show, setShow] = useState(false);

    const validationSchema = Yup.object().shape({
        idWallet: Yup.string()
            .required(useTranslation('ADD_WALLET.ID_WALLER.REQUIRED', 'Required'))
            .min(3, useTranslation('ADD_WALLET.ID_WALLER.MIN', 'Min 3 characters')),
        walletAddress: Yup.string()
            .required(useTranslation('ADD_WALLET.ID_WALLER.REQUIRED', 'Required'))
            .min(3, useTranslation('ADD_WALLET.ID_WALLER.MIN', 'Min 3 characters')),
        walletPrivateKey: Yup.string()
            .required(useTranslation('ADD_WALLET.SECRET_KEY.REQUIRED', 'Required'))
            .min(3, useTranslation('ADD_WALLET.SECRET_KEY.MIN', 'Min 3 characters')),
    });

    const {values, handleSubmit, handleChange, errors, submitForm, isValid} = useFormik({
        initialValues: {
            idWallet: '',
            secretKey: '',
        },
        onSubmit: (values) => {
            console.log(values);
        },
        validationSchema
    })

    return <Modal
        show={show}
        onCancel={() => setShow(false)}
        showModal={() => setShow(true)}
        title={title}
        className={'btn btn-sm'}
        onAccept={() => {
            if (isValid) {
                submitForm();
            }
        }}
    >
        <form onSubmit={handleSubmit}>
            <Input
                type="text"
                className="form-control mb-5"
                id="idWallet"
                error={errors.idWallet}
                name="idWallet"
                onChange={handleChange}
                value={values.idWallet}
                label={label}
            />
            <Input
                type="password"
                className="form-control mb-5"
                id="secretKey"
                error={errors.secretKey}
                name="secretKey"
                onChange={handleChange}
                value={values.secretKey}
                label={labelSecret}
            />
        </form>
    </Modal>
}