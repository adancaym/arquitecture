import {useTranslation} from "../../../../_metronic/i18n/i18nProvider";
import {Input} from "../../../../components/common/input/Input";
import {Accordion, Card} from "react-bootstrap";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Collections} from "../../../../api/backend/Collections";
import * as React from "react";
import {Assets} from "../../../../api/backend/Assets";
import {useEffect, useState} from "react";
import {OptionsFieldEntityHtmlHelper} from "../../../../api/core/EntityHtmlHelper";

import {ModalAssets} from "./ModalAssets";
import {Wallets} from "../../../../api/backend/Wallets";

interface FormBotProps {
    srcCollection: string | undefined;
    wallet: string | undefined;
    disableOutbid: string | undefined;
    minimalBid: number | undefined;
    maximalBid: number | undefined;
    outbidAmount: number | undefined;
    expirationTime: number | undefined;
    rarityFrom: number | undefined;
    rarityTo: number | undefined;
    expectedSalesPrice: number | undefined;
    tokens: string | undefined;
    tokenFrom: string | undefined;
    tokenTo: string | undefined;
    traitTypes: string | undefined;
    traitValues: string | undefined;
}

const assetsController = new Assets();
const collectionController = new Collections()

export const Bot = () => {

    const onSubmit = (values: FormBotProps) => {
        console.log(values);
    }

    const [collectionOptions, setCollectionOptions] = useState<Array<OptionsFieldEntityHtmlHelper>>([])
    const [assets, setAssets] = useState<Array<OptionsFieldEntityHtmlHelper>>([])
    const [wallets, setWallets] = useState<Array<OptionsFieldEntityHtmlHelper>>([])
    const [assetsFiltered, setAssetsFiltered] = useState<Array<OptionsFieldEntityHtmlHelper>>([])
    const [assetsCount, setAssetsCount] = useState<number>(0)
    const [assetsFilteredCount, setAssetsFilteredCount] = useState<number>(0)

    const [traitTypes, setTraitTypes] = useState<Array<OptionsFieldEntityHtmlHelper>>([])
    const [traitTypesCount, setTraitTypesCount] = useState<number>(0)
    const [traitValues, setTraitValues] = useState<Array<OptionsFieldEntityHtmlHelper>>([])
    const [traitValuesCount, setTraitValuesCount] = useState<number>(0)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        collectionController.options({params: {fields: 'id, name'}}).then(setCollectionOptions)
    }, [])

    useEffect(()=>{
        new Wallets().myWallets({
            params: {
                fields: 'id,name'
            }
        }).then(({rows}) => {
            setWallets(rows.map(w => ({value: w.id, name: w.name})))
        })
    },[])

    const validationSchema = Yup.object().shape({
        srcCollection: Yup.string().required('Collection is required'),
        wallet: Yup.string().required('Wallet is required'),
        disableOutbid: Yup.string(),
        minimalBid: Yup.number(),
        maximalBid: Yup.number(),
        outbidAmount: Yup.number(),
        expirationTime: Yup.number(),
        rarityFrom: Yup.number(),
        rarityTo: Yup.number(),
        expectedSalesPrice: Yup.number(),
        tokens: Yup.string(),
        tokenFrom: Yup.string(),
        tokenTo: Yup.string(),
        traitTypes: Yup.string(),
        traitValues: Yup.string(),
    });

    const {handleChange, values, errors, handleSubmit, setFieldValue} = useFormik<FormBotProps>({
        initialValues: {
            srcCollection: undefined,
            wallet: undefined,
            disableOutbid: undefined,
            minimalBid: undefined,
            maximalBid: undefined,
            outbidAmount: undefined,
            expirationTime: undefined,
            rarityFrom: undefined,
            rarityTo: undefined,
            expectedSalesPrice: undefined,
            tokens: undefined,
            tokenFrom: undefined,
            tokenTo: undefined,
            traitTypes: undefined,
            traitValues: undefined,
        },
        onSubmit,
        validationSchema,
    })

    const handleChangeCollection = (e: React.ChangeEvent<any>) => {
        setIsLoading(true)
        setFieldValue('srcCollection', e.target.value);
        Promise.all([
            assetsController.findTraitTypesBySrcCollection(e.target.value).then(response => {
                setTraitTypes(response.rows.map(tt => ({name: tt, value: tt})))
                setTraitTypesCount(response.count);
            })
        ])
            .finally(() => {
                setIsLoading(false)
            })

    }
    const handleChangeTraitType = (e: React.ChangeEvent<any>) => {
        setFieldValue('traitTypes', e.target.value);
        setFieldValue('traitValues', undefined);

        setTraitValues([])
        setAssetsFiltered([])
        setTraitValuesCount(0)
        setAssetsFilteredCount(0)
        assetsController.findTraitValuesBySrcCollectionAndTypeTrait(values.srcCollection!, e.target.value).then(response => {
            setTraitValuesCount(response.count)
            setTraitValues(response.rows.map(tv => ({name: tv, value: tv})))
        })
    }
    const handleChangeTraitTypeValue = (e: React.ChangeEvent<any>) => {
        setFieldValue('traitValues', e.target.value);
        setAssetsFiltered([])
        setAssetsFilteredCount(0)
        assetsController.findBySrcCollectionAndTraitValue(values.srcCollection!, values.traitTypes!, e.target.value, {params: {fields: 'id,asset.name'}}).then(response => {
            setAssetsFiltered(response.rows.map(value => ({value: value.id, name: value.asset.name})))
            setAssetsFilteredCount(response.count)
        });
    }

    const mergeAssetsFilteredWithActual = () => {
        const concatedAssets =  Array.from(new Set([...assets, ...assetsFiltered]))
        setAssets(concatedAssets)
        setAssetsCount(concatedAssets.length)
        setAssetsFiltered([])
        setAssetsFilteredCount(0)
        values.traitValues = undefined
        values.traitTypes = undefined;
    }

    return <>
        <Card>
            <Card.Header>
                {useTranslation('BOT.TITLE', 'Biding collections')}
            </Card.Header>
            <Card.Body>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-10">
                            <Input
                                label={'Collection'}
                                className={'form-control'}
                                type={'select'}
                                name={'srcCollection'}
                                options={Promise.resolve(collectionOptions)}
                                onChange={handleChangeCollection}
                                value={values.srcCollection}
                                error={errors.srcCollection}
                            />
                            <Input
                                label={'Wallet'}
                                className={'form-control'}
                                type={'select'}
                                name={'wallet'}
                                options={Promise.resolve(wallets)}
                                onChange={handleChange}
                                value={values.wallet}
                                error={errors.wallet}
                            />
                        </div>
                        <div className="col-2">
                            <div className={'d-grid align-content-center justify-content-center'}>
                                <h3 className={'m-5 text-center'}>Assets selected</h3>
                                <span className={'badge badge-info m-5'}>{isLoading ? 'Loading' :
                                    <ModalAssets assets={assets} count={assetsCount}
                                                 title={`Assets selected ${assetsCount}`}/>
                                }</span>
                            </div>
                        </div>
                    </div>

                    <Input
                        label={'Disable outbid'}
                        type={'checkbox'}
                        name={'disableOutbid'}
                        onChange={handleChange}
                        value={values.disableOutbid}
                        error={errors.disableOutbid}
                    />
                    <div className="row">
                        <div className="col-6">
                            <Input
                                className={'form-control'}
                                label={'Minimal bid'}
                                type={'number'}
                                name={'minimalBid'}
                                onChange={handleChange}
                                value={values.minimalBid}
                                error={errors.minimalBid}
                            />
                        </div>
                        <div className="col-6">
                            <Input
                                className={'form-control'}
                                label={'Maximal bid'}
                                type={'number'}
                                name={'maximalBid'}
                                onChange={handleChange}
                                value={values.maximalBid}
                                error={errors.maximalBid}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <Input
                                className={'form-control'}
                                label={'Outbid by this amount'}
                                type={'number'}
                                name={'outbidAmount'}
                                onChange={handleChange}
                                value={values.outbidAmount}
                                error={errors.outbidAmount}
                            />
                        </div>
                        <div className="col-6">
                            <Input
                                className={'form-control'}
                                label={'Expiration time in hours'}
                                type={'number'}
                                name={'expirationTime'}
                                onChange={handleChange}
                                value={values.expirationTime}
                                error={errors.expirationTime}
                            />
                        </div>
                    </div>
                    <Accordion className={'mt-5'} defaultActiveKey="byToken" alwaysOpen>
                        {/*   <Accordion.Item eventKey="byRarity">
                            <Accordion.Header>By Rarity</Accordion.Header>
                            <Accordion.Body>
                                <div className="row">
                                    <div className="col-6">
                                        <Input
                                            className={'form-control'}
                                            label={'Rarity from'}
                                            type={'number'}
                                            name={'rarityFrom'}
                                            note={'Set rarities as "0" to bid on the whole collection'}
                                            onChange={handleChange}
                                            value={values.rarityFrom}
                                            error={errors.rarityFrom}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <Input
                                            className={'form-control'}
                                            label={'Rarity to'}
                                            type={'number'}
                                            name={'rarityTo'}
                                            onChange={handleChange}
                                            value={values.rarityTo}
                                            error={errors.rarityTo}
                                        />
                                    </div>
                                    <div className="col-12 mt-5 mb-5">
                                        <button className={'btn btn-primary btn-sm'}>Show rarity floor prices</button>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>*/}
                        <Accordion.Item eventKey="byToken">
                            <Accordion.Header>By Token</Accordion.Header>
                            <Accordion.Body>
                                <div className="row">
                                    <div className="col-6">
                                        <Input
                                            className={'form-control'}
                                            label={'Token from'}
                                            type={'text'}
                                            name={'tokenFrom'}
                                            onChange={handleChange}
                                            value={values.tokenFrom}
                                            error={errors.tokenFrom}
                                            note={'Set range fileds as "0" to bid on the whole collection'}
                                        />

                                    </div>
                                    <div className="col-6">
                                        <Input
                                            className={'form-control'}
                                            label={'Token to'}
                                            type={'text'}
                                            name={'tokenTo'}
                                            onChange={handleChange}
                                            value={values.tokenTo}
                                            error={errors.tokenTo}
                                        />
                                    </div>
                                    <div className="col-12 d-flex justify-content-end">
                                        <button className={'btn btn-info btn-sm mt-5'}>Search assets</button>

                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="byTraitTypes">
                            <Accordion.Header>Trait types</Accordion.Header>
                            <Accordion.Body>
                                <div className="row">
                                    <div className="col-12 mb-5">
                                        {assetsFilteredCount > 0 && <div className={'alert alert-info text-center w-100'}>
                                            Number of assets filtered: {assetsFilteredCount}
                                        </div>}
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-9 d-grid align-content-center ">
                                            <Input
                                                label={`Trait types: ${traitTypesCount}`}
                                                className={'form-control'}
                                                type={'select'}
                                                name={'traitTypes'}
                                                options={Promise.resolve(traitTypes)}
                                                onChange={handleChangeTraitType}
                                                value={values.traitTypes}
                                                error={errors.traitTypes}
                                            />
                                            <Input
                                                label={`Trait values: ${traitValuesCount}`}
                                                className={'form-control'}
                                                type={'select'}
                                                name={'traitValues'}
                                                options={Promise.resolve(traitValues)}
                                                onChange={handleChangeTraitTypeValue}
                                                value={values.traitValues}
                                                error={errors.traitValues}
                                            />
                                        </div>
                                        <div className="col-3 d-grid align-content-center justify-content-center">
                                            <button onClick={mergeAssetsFilteredWithActual}
                                                    className={'btn mt-3 btn-sm btn-success'}>Add selection
                                            </button>
                                            <ModalAssets
                                                title={`Show assets filtered ${assetsFilteredCount}`}
                                                assets={assetsFiltered} count={assetsFilteredCount}
                                                className={'btn btn-info btn-sm mt-5'}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </form>
            </Card.Body>
        </Card>
    </>
}
