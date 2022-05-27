import './cardsHorizontal.scss'

export interface Card {
    title?: string
    body: string
    footer?: JSX.Element | JSX.Element[] | string;
}

export interface CardsProps {
    cards: Card[]
}

export const CardsHorizontal = ({cards}: CardsProps) => {
    return (
        <div className={'row'}>
            {cards.map((card, index) =>
                <div className=" col-12">
                    <div className="row">
                        {index % 2 === 0 ? (
                            <>
                                <div className="col-md-4">
                                    <div className="dark-square  card  center-content ">
                                        {card.title && <h2 className="card-title">{card.title}</h2>}
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        {card.body && <h2 style={{textAlign: 'justify'}}
                                                          className="card-text  center-content ">{card.body}</h2>}
                                    </div>
                                </div>
                            </>
                        ) : (<>
                            <div className="col-md-8">
                                <div className="card-body">
                                    {card.body && <h2 style={{textAlign: 'justify'}}
                                                      className="card-text  center-content ">{card.body}</h2>}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="dark-square  card  center-content ">
                                    {card.title && <h2 className="card-title ">{card.title}</h2>}
                                </div>
                            </div>
                        </>)}
                    </div>
                </div>)}
        </div>


    )
}