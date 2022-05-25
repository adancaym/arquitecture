import React, {ChangeEventHandler, HTMLInputTypeAttribute, InputHTMLAttributes, useEffect, useState} from "react";
import './inputText.scss'
import {OptionsFieldEntityHtmlHelper} from "../../../api/core/EntityHtmlHelper";

type Type = HTMLInputTypeAttribute

interface BasicProps {
    name?: string
    label?: string
    error?: string
    icon?: string
    callbackIcon?: () => void
    isValid?: boolean
    note?: string
    className?: string;
    id?: string;
}

interface IInputProps extends InputHTMLAttributes<HTMLInputElement>, BasicProps {
    type?: Type
    onChange?: ChangeEventHandler<HTMLInputElement>
}

interface IInputPropsMulti extends IInputProps, BasicProps {
    type?: 'arrayString';
    onChange?: ChangeEventHandler<HTMLInputElement>
    options: Promise<Array<OptionsFieldEntityHtmlHelper>>
    removeItem?: (value: string) => void
}

interface ISelectProps extends InputHTMLAttributes<HTMLSelectElement>, BasicProps {
    name: string
    type?: 'select'
    label?: string
    error?: string
    icon?: string
    callbackIcon?: () => void
    isValid?: boolean
    options: Promise<Array<OptionsFieldEntityHtmlHelper>>
    onChange?: ChangeEventHandler<HTMLSelectElement>
}

export const Input = (props: IInputProps | ISelectProps | IInputPropsMulti) => {
    const {error, type, label, name, icon, isValid = true, callbackIcon, className, id, value, note, placeholder} = props

    const [options, setOptions] = useState<Array<OptionsFieldEntityHtmlHelper>>([])
    useEffect(() => {
        if ("options" in props && props.options) {
            props.options.then((options:Array<OptionsFieldEntityHtmlHelper>) => {
                setOptions(options)
            })
        }
    })

    const renderInput = () => {
        switch (type) {
            case 'select': {
                const {onChange} = props as ISelectProps;
                return <>
                    {!icon && label && <label className={''} htmlFor={name}>{label}</label>}
                    <select value={value} name={name} id={id} className={className} onChange={onChange}>
                        <option value={undefined}></option>
                        {options.map((option: OptionsFieldEntityHtmlHelper) =>
                            <option key={option.name} value={option.value}>{option.name}</option>)}
                    </select>
                    {!icon && error && <div className={'text-danger float-end'}>{error}</div>}
                </>
            }
            case 'checkbox': {
                const {onChange} = props as IInputProps;
                return <div className={'form-check mt-5 mb-5'}>
                    <input value={value} type={type} className={`${className} form-check-input`} id={id} name={name} style={{    padding: '2px'}} onChange={onChange}/>
                    {!icon && label && <label className={'form-check-label'} htmlFor={name}>{label}</label>}
                    {!icon && error && <div className={'text-danger float-end'}>{error}</div>}

                </div>
            }
            case 'arrayString': {
                const {onChange} = props as IInputPropsMulti;
                return <>
                    {!icon && label && <label className={''} htmlFor={name}>{label}</label>}
                    <input placeholder={placeholder} value={value} type={'text'} className={className} id={id} name={name} onChange={onChange}/>
                    {!icon && error && <div className={'text-danger float-end'}>{error}</div>}
                </>
            }
            default: {
                const {onChange} = props as IInputProps;
                return <>
                    {!icon && label && <label className={''} htmlFor={name}>{label}</label>}
                    <input placeholder={placeholder} value={value} type={type} className={className} id={id} name={name} onChange={onChange}/>
                    {!icon && error && <div className={'text-danger float-end'}>{error}</div>}

                </>

            }
        }
    }
    return <>
        {icon && label && <label className={''} htmlFor={name}>{label}</label>}
        {icon && error && <div className={'text-danger float-end'}>{error}</div>}
        <div className={icon ? 'input-group' : 'w-100'}>
            {renderInput()}
            {icon && <span onClick={() => isValid && callbackIcon && callbackIcon()} className="input-group-text"><i className={`${icon}`}/></span>}
            {note && <span className="text-info mt-5">{note}</span>}
        </div>
        {type === 'arrayString' &&      <ul className={'list-group'}>
            { options.map(opt => <li key={opt.name} className={'list-group-item bg-transparent'}>
                <div className="row">
                    <div className="col">
                        {opt.name}
                    </div>
                    <div className="col d-flex justify-content-end"><i className={'fa fa-times'} onClick={()=> {
                        if ('removeItem' in props && props.removeItem) {
                            props.removeItem(opt.value)
                        }
                    }} /></div>
                </div>
            </li>)}
        </ul>}

    </>
}
