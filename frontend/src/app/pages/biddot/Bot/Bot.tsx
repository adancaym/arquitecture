import {useTranslation} from "../../../../_metronic/i18n/i18nProvider";
import {Input} from "../../../../components/common/input/Input";
import {Accordion, Card, Spinner} from "react-bootstrap";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Collections} from "../../../../api/backend/Collections";
import * as React from "react";
import {Assets} from "../../../../api/backend/Assets";
import {useEffect, useState} from "react";
import {OptionsFieldEntityHtmlHelper} from "../../../../api/core/EntityHtmlHelper";

import {ModalAssets} from "./ModalAssets";
import {Wallets} from "../../../../api/backend/Wallets";
import {LoadingContent} from "../../../../components/common/LoadingContent";
import {Bids} from "../../../../api/backend/Bids";
import {BidCreate, BidResponse} from "../../../../api/Types";
import {ModalCreatecollection} from "./ModalCreateCollection";
import {Navigate} from "react-router-dom";

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
    tokenFrom: number | undefined;
    tokenTo: number | undefined;
    traitTypes: string | undefined;
    traitValues: string | undefined;
}

const assetsController = new Assets();
const collectionController = new Collections();
const bidsController = new Bids();

export const Bot = () => {
    const [redirect, setRedirect] = useState(false);
    const onSubmit = (values: FormBotProps) => {
        if (values.expirationTime &&
            values.outbidAmount &&
            values.maximalBid &&
            values.minimalBid &&
            values.wallet)
        {
            bidsController.create<BidResponse, BidCreate>({
                expirationTime: values.expirationTime,
                outbidAmount: values.outbidAmount,
                maximalBid: values.maximalBid,
                minimalBid: values.minimalBid,
                wallet: values.wallet,
                assets: assets.map(asset => asset.value),
                id: undefined
            }).then(()=> {
                setRedirect(true);
            })
        }

    }

    const [collectionOptions, setCollectionOptions] = useState<Array<OptionsFieldEntityHtmlHelper>>([])
    const [wallets, setWallets] = useState<Array<OptionsFieldEntityHtmlHelper>>([])

    const [assets, setAssets] = useState<Array<OptionsFieldEntityHtmlHelper>>([])
    const [assetsFiltered, setAssetsFiltered] = useState<Array<OptionsFieldEntityHtmlHelper>>([])
    const [assetsFilteredTokens, setAssetsFilteredTokens] = useState<Array<OptionsFieldEntityHtmlHelper>>([])

    const [assetsCount, setAssetsCount] = useState<number>(0)
    const [assetsFilteredCount, setAssetsFilteredCount] = useState<number>(0)
    const [assetsFilteredCountTokens, setAssetsFilteredCountTokens] = useState<number>(0)

    const [traitTypes, setTraitTypes] = useState<Array<OptionsFieldEntityHtmlHelper>>([])
    const [traitTypesCount, setTraitTypesCount] = useState<number>(0)

    const [traitValues, setTraitValues] = useState<Array<OptionsFieldEntityHtmlHelper>>([])
    const [traitValuesCount, setTraitValuesCount] = useState<number>(0)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [tokenMax, setTokenMax] = useState<number | undefined>(0);
    const [tokenMin, setTokenMin] = useState<number | undefined>(0);
    const [totalAssets, setTotalAssets] = useState<number | undefined>(undefined);


    const fetchCollections = ()=> collectionController.options({params: {fields: 'id, name'}}).then(setCollectionOptions)

    useEffect(() => {
        fetchCollections()
    }, [])

    useEffect(() => {
        new Wallets().myWallets({
            params: {
                fields: 'id,name'
            }
        }).then(({rows}) => {
            setWallets(rows.map(w => ({value: w.id, name: w.name})))
        })
    }, [])


    const validationSchema = Yup.object().shape({
        srcCollection: Yup.string().required('Collection is required'),
        wallet: Yup.string().required('Wallet is required'),
        disableOutbid: Yup.string(),
        minimalBid: Yup.number().required(),
        maximalBid: Yup.number().required(),
        outbidAmount: Yup.number().required(),
        expirationTime: Yup.number().required(),
        rarityFrom: Yup.number(),
        rarityTo: Yup.number(),
        expectedSalesPrice: Yup.number(),
        tokens: Yup.string(),
        tokenFrom: Yup.number().min(tokenMin || 0).max(tokenMax || 0),
        tokenTo: Yup.number().min(tokenMin || 0).max(tokenMax || 0),
        traitTypes: Yup.string(),
        traitValues: Yup.string(),
    });

    const {handleChange, values, errors, handleSubmit, setFieldValue, isValid, isSubmitting} = useFormik<FormBotProps>({
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
        setTraitValues([])
        setAssetsFiltered([])
        setTraitValuesCount(0)
        setAssetsFilteredCount(0)
        setFieldValue('traitTypes', undefined);
        setFieldValue('traitValues', undefined);

        Promise.all([
            assetsController.findTraitTypesBySrcCollection(e.target.value).then(response => {
                setTraitTypes(response.rows.map(tt => ({name: tt, value: tt})))
                setTraitTypesCount(response.count);
            }),
            assetsController.findBySrcCollection(e.target.value, {params: {fields: 'asset.token_id'}}).then(r => {
                const tokens = r.rows.map(row => row.asset.token_id).map(token => parseInt(token));
                setTokenMax(Math.max(...tokens))
                setTokenMin(Math.min(...tokens))
                setTotalAssets(tokens.length)
            })
        ])
            .finally(() => {
                setIsLoading(false)
            })

    }
    const handleChangeTraitType = (e: React.ChangeEvent<any>) => {
        setFieldValue('traitTypes', e.target.value);
        if (values.srcCollection) {
            setFieldValue('traitValues', undefined);

            setTraitValues([])
            setAssetsFiltered([])
            setTraitValuesCount(0)
            setAssetsFilteredCount(0)
            assetsController.findTraitValuesBySrcCollectionAndTypeTrait(values.srcCollection, e.target.value).then(response => {
                setTraitValuesCount(response.count)
                setTraitValues(response.rows.map(tv => ({name: tv, value: tv})))
            })
        }

    }
    const handleChangeTraitTypeValue = (e: React.ChangeEvent<any>) => {
        setFieldValue('traitValues', e.target.value);
        if (values.srcCollection && values.traitTypes) {
            setAssetsFiltered([])
            setAssetsFilteredCount(0)
            assetsController.findBySrcCollectionAndTraitValue(values.srcCollection, values.traitTypes, e.target.value, {params: {fields: 'id,asset.name'}})
                .then(response => {
                    setAssetsFiltered(response.rows.map(value => ({value: value.id, name: value.asset.name})))
                    setAssetsFilteredCount(response.count)
                });
        }

    }

    const findAssetsByRange = () => {
        if (values.srcCollection && values.tokenTo && values.tokenFrom) {
            assetsController.findCollectionRangeTokenId(values.srcCollection, values.tokenFrom, values.tokenTo, {params: {fields: 'id,asset.name'}})
                .then(response => {
                    setAssetsFilteredTokens(response.rows.map(value => ({value: value.id, name: value.asset.name})))
                    setAssetsFilteredCountTokens(response.count)
                });
        }
    }

    const mergeAssetsFilteredWithActual = () => {
        const concatedAssets = Array.from(new Set([...assets, ...assetsFiltered, ...assetsFilteredTokens]))
        setAssets(concatedAssets)
        setAssetsCount(concatedAssets.length)
        setAssetsFiltered([])
        setAssetsFilteredTokens([])
        setAssetsFilteredCount(0)
        setAssetsFilteredCountTokens(0)
    }

    if (redirect) {
        return <Navigate to='/apps/biddot/trade-history' />
    }
    return <>
        <Card>
            <Card.Body>
                <h3 className={'text-center'}>
                    Biding collections
                </h3>
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
                        <div className="col-2 d-grid align-content-center justify-content-center ">
                            <LoadingContent isLoading={isLoading}>
                                <div className={'d-grid align-content-center justify-content-center gap-5 text-center'}>
                                    {totalAssets && <h3>Total assets: <span
                                        className={'badge badge-info  p-3 '}>{totalAssets}</span></h3>}
                                    <h3 className={'m-5'}>Assets selected</h3>
                                    <ModalAssets assets={assets} count={assetsCount}
                                                 title={`Assets selected ${assetsCount}`}/>
                                    <ModalCreatecollection
                                        title={'Create collection'}
                                        callback={()=> {
                                            fetchCollections();
                                        }}
                                    />
                                </div>
                            </LoadingContent>
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
                    <div className="row">
                        <div className="col-12 align-items-center align-content-center justify-content-center ">
                            <LoadingContent isLoading={isLoading}>
                                <Accordion className={'mt-5 w-100'} defaultActiveKey="byToken" alwaysOpen>
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
                                                <div className="col-12 mb-5">
                                                    {assetsFilteredCountTokens > 0 &&
                                                        <div className={'alert alert-info text-center w-100'}>
                                                            Number of assets filtered: {assetsFilteredCountTokens}
                                                        </div>}
                                                </div>
                                                <div className="col-10">
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
                                                                note={tokenMin !== undefined ? `Min token_id ${tokenMin}` : ''}
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
                                                                note={tokenMax !== undefined ? `Max token_id ${tokenMax}` : ''}

                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-2 d-grid ">
                                                    <button type={'button'} onClick={findAssetsByRange}
                                                            className={'fa fa-search btn btn-info btn-sm mt-5'}>Search
                                                        assets
                                                    </button>
                                                    <button type={'button'} onClick={mergeAssetsFilteredWithActual}
                                                            className={'fa fa-plus btn btn-success btn-sm mt-5'}>Add
                                                        assets
                                                    </button>
                                                    <ModalAssets
                                                        title={`Show assets ${assetsFilteredCountTokens}`}
                                                        assets={assetsFilteredTokens} count={assetsFilteredCountTokens}
                                                        className={'btn btn-info btn-sm mt-5 fa fa-eye'}
                                                    />
                                                </div>


                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="byTraitTypes">
                                        <Accordion.Header>Trait types</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="row">
                                                <div className="col-12 mb-5">
                                                    {assetsFilteredCount > 0 &&
                                                        <div className={'alert alert-info text-center w-100'}>
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
                                                    <div
                                                        className="col-3 d-grid align-content-center justify-content-center">
                                                        <button type={'button'} onClick={mergeAssetsFilteredWithActual}
                                                                className={'btn mt-3 btn-sm btn-success fa fa-plus'}>Add
                                                            assets
                                                        </button>
                                                        <ModalAssets
                                                            title={`Show assets filtered ${assetsFilteredCount}`}
                                                            assets={assetsFiltered} count={assetsFilteredCount}
                                                            className={'btn btn-info fa fa-eye btn-sm mt-5'}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </LoadingContent>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end mt-5">
                            <button className={'btn btn-sm btn-success'}
                                    type={'submit'}
                                    disabled={(!isValid || assets.length === 0 ) && isSubmitting}
                            >
                                Place a bid
                            </button>
                        </div>
                    </div>
                </form>
            </Card.Body>
        </Card>
    </>
}
