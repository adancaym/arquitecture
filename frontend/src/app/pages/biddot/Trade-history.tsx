import {useEffect, useState} from "react";
import {Bids} from "../../../api/backend/Bids";
import {BidWithPlacement, Placement, Asset, Row as IROW, Event} from "../../../api/shvl/BidsWithPlacements";
import {Col, Nav, Row, Tab} from "react-bootstrap";
import {Modal} from "../../../components/common/Modal";

const bidsController = new Bids();


const EventComponent = (props: { e: Event }) => {
    return <div className={'table-responsive'}>
        <table className={'table table-sm table-hover table-sm table-striped'}>
            <tbody>
            <tr>
                <th>Asset name</th>
                <td>{props.e.asset?.name}</td>
            </tr>
            <tr>
                <th>Collection slug</th>
                <td>{props.e.collection_slug}</td>
            </tr>
            <tr>
                <th>From account</th>
                <td>{props.e.from_account.address}</td>
            </tr>
            <tr>
                <th>Winner account</th>
                <td>{props.e.winner_account}</td>
            </tr>
            <tr>
                <th>Contract address</th>
                <td>{props.e.contract_address}</td>
            </tr>
            <tr>
                <th>Ending price</th>
                <td>{props.e.ending_price}</td>
            </tr>
            <tr>
                <th>Event type</th>
                <td>{props.e.event_type}</td>
            </tr>
            <tr>
                <th>Created date</th>
                <td>{new Date(props.e.created_date).toLocaleString()}</td>
            </tr>
            <tr>
                <th>Event bid amount</th>
                <td>{parseFloat('' + parseInt(props.e.bid_amount) / 1e18).toFixed(18)}</td>
            </tr>
            <tr>
                <th>Event collection slug</th>
                <td>{props.e.collection_slug}</td>
            </tr>
            </tbody>
        </table>
    </div>


}

const PlacementComponent = (props: { placement: Placement }) => {
    return <div className={'table-responsive'}>
        <table className={'table table-sm table-hover table-sm table-striped'}>
            <tbody>
            <tr>
                <th>Id</th>
                <td>{props.placement.id}</td>
            </tr>
            <tr>
                <th>Status</th>
                <td>{props.placement.status.toUpperCase()}</td>
            </tr>
            {props.placement.error && <tr>
                <th>Error</th>
                <td>{props.placement.error.error}</td>
            </tr>}
            <tr>
                <th>Updated At</th>
                <td>{new Date(props.placement.updatedAt).toLocaleString()}</td>
            </tr>
            </tbody>
        </table>
    </div>
}

const OrderComponent = (props: { placement: Placement }) => {

    if (!props.placement.order) return <div>No order available yet</div>

    return <div className="table-responsive">
        <table className="table table-sm table-hover table-striped">
            <thead>
            <tr>
                <th colSpan={2}>Offer</th>
            </tr>
            <tr>
                <th>Expiration time</th>
                <th>{new Date(parseInt(props.placement.order.expirationTime) * 1000).toLocaleString()}</th>
            </tr>
            <tr>
                <th>
                    Current Price
                </th>
                <th>{parseFloat("" + parseInt(props.placement.order.currentPrice) / 1e18).toFixed(18)}</th>
            </tr>

            <tr>
                <th>Base Price</th>
                <th>{parseFloat("" + parseInt(props.placement.order.currentBounty) / 1e18).toFixed(18)}</th>

            </tr>
            <tr>
                <th>Created Time</th>
                <th>{new Date(parseInt(props.placement.order.createdTime) * 1000).toLocaleString()}</th>

            </tr>
            <tr>
                <th>Quantity</th>
                <th>{props.placement.order.quantity}</th>
            </tr>
            <tr>
                <th>Waiting For Best Counter Order</th>
                <th>{props.placement.order.waitingForBestCounterOrder ? "Yes" : "No"}</th>
            </tr>
            <tr>
                <th>Target</th>
                <th>{props.placement.order.target}</th>
            </tr>
            </thead>
        </table>
    </div>;
}


const AssetComponent = (props: { asset: Asset }) => {
    return <div className={'container-fluid'}>
        {props.asset.placements.map((placement: Placement, index) => <Tab.Container key={index} id="placements">
            <Row>
                <Col sm={3}>
                    <Nav className="flex-column">
                        <Nav.Item style={{display: 'contents'}}>
                            <Nav.Link className={'w100 border-bottom'} eventKey={'placement'}>Placemnet</Nav.Link>
                            <Nav.Link className={'w100 border-bottom'} eventKey={'order'}>Order</Nav.Link>
                            <Nav.Link className={'w100 border-bottom'} eventKey={'events'}>Events</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content style={{
                        maxHeight: '65vh',
                        overflowY: 'auto'
                    }}>
                        <Tab.Pane eventKey={"placement"}>
                            <PlacementComponent placement={placement}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey={"order"}>
                            <OrderComponent placement={placement}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey={"events"}>
                            {placement.event.map((e: Event, index) => {
                                return <>
                                    <h2 className={'text-center'}>{index +1 }</h2>
                                    <EventComponent e={e}/>
                                </>
                            })}
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>)}
    </div>;
}

const BidComponent = (props: { row: IROW }) => {

    return <>
        <Tab.Container id="assets">
            <Row>
                <Col sm={2}>
                    <Nav className="flex-column">
                        {props.row.assets.map((b, index) => <Nav.Item key={index} style={{display: 'contents'}}>
                            <Nav.Link className={'w100 border-bottom'} eventKey={b.id}>
                                {b.name ?? b.id}
                            </Nav.Link>
                        </Nav.Item>)}
                    </Nav>
                </Col>
                <Col sm={10}>
                    <Tab.Content>
                        {props.row.assets.map((a, index) => <Tab.Pane key={index} eventKey={a.id}><AssetComponent asset={a}/></Tab.Pane>)}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>

    </>

}

const TableRowComponent = (props: { b: IROW }) => {
    return <div className="card">
        <div className="table-responsive">
            <table className={"table table-sm table-hover table-striped"}>
                <tbody>
                <tr>
                    <th>Id</th>
                    <td>{props.b.id}</td>
                </tr>
                <tr>
                    <th>Bid created at</th>
                    <td> {new Date(props.b.createdAt).toLocaleString()}</td>
                </tr>
                <tr>
                    <th>Expiration time (hours)</th>
                    <td> {props.b.expirationTime}</td>
                </tr>
                <tr>
                    <th>Minimal Bid</th>
                    <td>{props.b.minimalBid}</td>
                </tr>
                <tr>
                    <th>Maximal Bid</th>
                    <td>{props.b.maximalBid}</td>
                </tr>
                <tr>
                    <th>Out bid</th>
                    <td>{props.b.outbidAmount}</td>
                </tr>
                <tr>
                    <th>Wallet</th>
                    <td colSpan={5}>{props.b.wallet}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>;
}

const ModalTableRowComponent = (props: { show: boolean, showModal: () => void, onAccept: () => void, b: IROW }) => {
    return <Modal
        title={"Show Details"}
        className={"btn btn-text btn-sm float-right"}
        show={props.show}
        showModal={props.showModal}
        onAccept={props.onAccept}
        onCancel={props.onAccept}
    >
        <TableRowComponent b={props.b}/>
    </Modal>;
}

export const TradeHistory = () => {

    const [myBids, setMyBids] = useState<BidWithPlacement | undefined>();
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        bidsController.myBids().then(response => {
            setMyBids(response);
        })
    }, []);

    if (!myBids) {
        return <div>Loading...</div>
    }
    if (myBids.rows.length === 0) {
        return <div>No bids</div>
    }
    return <div>
        <h2 className={'text-center'}>Bids</h2>
        <Tab.Container id="bids">
            <Row>
                <Col sm={3}>
                    <Nav className="flex-column">
                        {myBids.rows.map((b,index )=> <Nav.Item key={index} style={{display: 'contents'}}>
                            <Nav.Link className={'w100 text-center border-bottom'} eventKey={b.id}>
                                {b.id}-
                                <ModalTableRowComponent
                                    show={modalShow}
                                    showModal={() => setModalShow(true)}
                                    onAccept={() => setModalShow(false)}
                                    b={b}
                                />
                            </Nav.Link>
                        </Nav.Item>)}
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        {myBids.rows.map((b, index) => <Tab.Pane key={index} eventKey={b.id}>
                            <BidComponent row={b}/>
                        </Tab.Pane>)}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    </div>
}
