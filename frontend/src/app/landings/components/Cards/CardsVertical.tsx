import './cardsVertical.scss'

export interface Card {
    title?: string
    body: string
    footer?: JSX.Element | JSX.Element[] | string;
    className?: string
}

export interface CardsProps {
    cards: Card[]
}

export const CardsVertical = ({cards}: CardsProps) => {
    return (
        <div className={'row'}>
            {cards.map((card, index) =>
                <div className="col-md-4">
                    <div>
                        {card.title &&
                            <h1 className={`card-title ${card.className}`}>{card.title}</h1>}
                        <div className="card-content">
                            <h2 style={{textAlign: 'justify'}}>{card.body}</h2>
                        </div>
                        {card.footer && <div className={'card-footer-custom'}>
                            {card.footer}
                        </div>
                        }
                    </div>

                </div>)}
        </div>
    )
}