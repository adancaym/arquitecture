import {useState} from "react";
import {useFormik} from "formik";
import {Input} from "../../../../components/common/input/Input";
import {useTranslation} from "../../../../_metronic/i18n/i18nProvider";
import {useApiShvl} from "../../../../hooks/useApiShvl";

export const CreateCollection = () => {
    const { assets, histories } = useApiShvl()
    const [message, setMessage] = useState<string| undefined>(undefined);

    const { values, submitForm , handleChange} = useFormik({
        initialValues: {
            slug: '',
        },
        onSubmit: ({slug}) => {
            console.log(slug)

        }
    })
    return <>
        {message && <div className={'alert alert-success'}>{message}</div>}
        <Input
            label={'Create collection'}
            name={'slug'}
            value={values.slug}
            className={'form-control'}
            onChange={handleChange}
            icon={'fa fa-search'}
            placeholder={useTranslation('TOOLS.SLUG', 'Slug')}
            callbackIcon={() => {
                submitForm()
            }}
        />
    </>
}