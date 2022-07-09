import {useEffect, useState} from "react";
import styled from "styled-components";
import {useSocketContext} from "../../../context/SocketContext";
import {useCollectionContext} from "./CollectionContext";
import {Input} from "../../../components/common/input/Input";
import {Modal} from "../../../components/common/Modal";
import {toAbsoluteUrl} from "../../../_metronic/helpers";
import {Button} from "react-bootstrap";
import {Lists} from "../widgets/components/Lists";

const Box = styled.div`
  display: grid;
  gap: 2em;
  align-items: center;
  justify-content: center;
  height: min-content;
  background: #212e48;
  padding: 20px 0px;
  border-radius: 50px;
  width: 100%;
`
const Row = styled.div`
  display: grid;
  gap: 2em;
  text-align: center;
  justify-items: center;
  align-self: center;
  justify-self: center;
  width: 90%;
  background: red
  height: min-content;
`
const HelpIcon = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: #fff;
  border-radius: 50%;
  padding: 2px;
  margin-left: 40px;
`
const MiniBox = styled.div`
  display: grid;
  grid-column: auto;
  grid-gap: 50px;
  width: 100%;
  justify-items: center;
  align-items: center;
`
const Img = styled.img`
  width: 50px;
  border-radius: 50%;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`
const GridTwoColumns = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  gap: 3em;
  width: 90%;
  justify-items: center;
  align-items: center;
  padding: 20px 0px;
  height: min-content;
`

interface IPaymentToken {
    id: number,
    symbol: string,
    address: string,
    image_url: string,
    name: string,
    decimals: number,
    eth_price: number,
    usd_price: number,
}

export const CollectionCreatePage = () => {

    const {name, setNameColection, loading, error, addCollection, setLoading} = useCollectionContext();
    const {socket, status} = useSocketContext();
    const [minNumber, setMinNumber] = useState<number | undefined>(50);
    const [maxNumber, setMaxNumber] = useState<number | undefined>(100);
    const [statusCollection, setStatusCollection] = useState<string | undefined>('Downdload');
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [paymentToken, setPaymentToken] = useState<Array<IPaymentToken> | undefined>(undefined);

    const [minmaxComponent, setMinmaxComponent] = useState<JSX.Element | undefined>(undefined);
    const [statusComponent, setStatusComponent] = useState<JSX.Element | undefined>(undefined);
    const [progressComponent, setProgressComponent] = useState<JSX.Element | undefined>(undefined);
    const [imgComponent, setImgComponent] = useState<JSX.Element | undefined>(undefined);
    const [realName, setRealName] = useState<JSX.Element | undefined>(undefined);
    const [description, setDescription] = useState<JSX.Element | undefined>(undefined);
    useEffect(() => {
        socket.on('collectionMax', (number: number) => {
            setMaxNumber(number)
        })
        socket.on('collectionMin', (number: number) => {
            setMinNumber(number)
        })
        socket.on('collectionStatus', (status: string) => {
            console.log(status)
            setStatusCollection(status)
        })
        socket.on('collectionImg', (url: string) => {
            console.log(url)
            setImgComponent(<Row><img className={'img-responsive img-circle'} style={{
                width: '200px',
            }} src={url}/></Row>)
        })
        socket.on('collectionName', (realName: string) => {
            console.log(realName)
            setRealName(<Row>{realName}</Row>)
        })
        socket.on('collectionPaymentTokents', (paymentTokens: Array<IPaymentToken>) => {
            setPaymentToken(paymentTokens)
        })
        socket.on('collectionDescription', (description: string) => {
            setDescription(<Row>{description}</Row>)
        })

    }, [socket])

    const search = () => {
        setAllUndefined();
        socket.emit('createCollection', name)
    }

    const setAllUndefined = () => {
        setStatusCollection(undefined)
        setPaymentToken(undefined)
        setMinmaxComponent(undefined)
        setStatusComponent(undefined)
        setProgressComponent(undefined)
        setImgComponent(undefined)
        setRealName(undefined)
        setDescription(undefined)
    }
    useEffect(() => {
        if (minNumber && maxNumber) {
            setMinmaxComponent(<Row>{minNumber} / {maxNumber} </Row>);
        }
    }, [minNumber, maxNumber]);

    useEffect(() => {
        setStatusComponent(<Row>{statusCollection}</Row>);
    }, [statusCollection]);

    useEffect(() => {
        if (minNumber && maxNumber) {
            setProgressComponent(<div
                className={`bg-success rounded h-4px`}
                role='progressbar'
                style={{width: `${(minNumber / maxNumber) * 100}%`}}
            />)
        }
    }, [minNumber, maxNumber]);


    useEffect(() => {
        if (name === '') {
            setNameColection(undefined);
            setAllUndefined()
        }
    }, [name])

    return <Box className={'bg-dark-light'}>
        {progressComponent}
        {statusComponent}
        {minmaxComponent}
        {status !== "connected" && <Row><h2>Connecting to the server...</h2></Row>}
        <h3 className={'text-center'}> Welcome , you are in the fetch collection assistant
            <Modal title={'What is a slug?'}
                   style={{
                       background: "transparent",
                       outline: "none",
                       border: "none",
                       top: "10px",
                   }}
                   className={'mt-5'}
                   buttonTrigger={<HelpIcon>?</HelpIcon>}
                   onAccept={() => setIsOpenModal(false)}
                   showModal={() => setIsOpenModal(true)}
                   onCancel={() => setIsOpenModal(false)}
                   show={isOpenModal}>
                <MiniBox>
                    <h3 className={'text-center'}>The slug are the word(s) to next one(s) at the slash</h3>
                    <img alt='Logo' src={toAbsoluteUrl('/shvl/help/img.png')} className='w-100'/>
                    <p>in this case the slug is: im-0dajlba4re</p>
                </MiniBox>
            </Modal>
        </h3>
        <Row>
            <Row><a href="https://opensea.io/" target={"_blank"}>Explore OpenSea</a></Row>
        </Row>

        <Row>
            <Input
                className={'w-100'}
                value={name}
                onChange={(e: any) => setNameColection(e.target.value)}
                placeholder={'Collection slug'}
                isValid={(name !== undefined && name.length > 0)}
            />
            <Button
                variant={'primary'}
                type={'button'}
                color={'primary'}
                onClick={search}
            >Search</Button>
        </Row>

        <Row>
            {imgComponent}
            {realName}
            {description}
        </Row>
        <Row>
            <table className={'table bg-dark table-hover table-bordered table-striped table-rounded text-center'}>
                <thead>
                <tr>
                    <th colSpan={7}>Payment tokens</th>
                </tr>
                <tr>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Address</th>
                    <th>Decimals</th>
                    <th>ETH Price</th>
                    <th>USD Price</th>
                    <th>Image</th>
                </tr>
                </thead>
                <tbody>
                {paymentToken?.map((token: IPaymentToken) => <tr>
                    <td> {token.name}</td>
                    <td>  {token.symbol}</td>
                    <td>  {token.address}</td>
                    <td>  {token.decimals}</td>
                    <td>  {token.eth_price}</td>
                    <td>  {token.usd_price}</td>
                    <td><Img src={token.image_url}/></td>

                </tr>)}
                </tbody>
            </table>
        </Row>

    </Box>


}