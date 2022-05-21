import React, {FC, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import './dashboard.scss'
import {useFormik} from "formik";
import {Input} from "../../../components/common/input/Input";
import {AddWallet} from "./components/AddWallet";
import {ManageBids} from "./components/ManageBids";
import * as Yup from "yup";
import {CardCollection} from "./components/CardCollection";

const DashboardPage: FC = () => {


    const validationSchema = Yup.object().shape({
        search: Yup.string().min(3, 'Min 3 characters').required('Required'),
    });

    const {handleChange, handleSubmit, values, errors, submitForm, setTouched} = useFormik({
        initialValues: {
            search: '',
        },
        onSubmit: values => {
            console.log(values)
        },
        validationSchema
    })
    useEffect(() => {
        setTouched({search: true})
    }, [])


    return <>
        <div style={{textAlign: 'right'}} className={'mt-5'}>
            <ManageBids/>
            <AddWallet/>
        </div>
        <form onSubmit={handleSubmit} className={'mt-5'}>
            <Input
                name={'search'}
                onChange={handleChange}

                className={'inputSearch form-control'}
                type={"text"}
                icon={'fa fa-search'}
                placeholder={'Search'}
                value={values.search}
                error={errors.search}
                callbackIcon={() => {
                    submitForm();
                }}
            />
        </form>
        <div className="row mt-5">

        </div>
    </>
}


const DashboardWrapper: FC = () => {
    const intl = useIntl()
    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
            <DashboardPage/>
        </>
    )
}

export {DashboardWrapper}
