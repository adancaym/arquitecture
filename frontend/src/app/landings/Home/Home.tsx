import {Hero} from "../../../components/landing/Hero/Hero";
import {Navigation} from "../components/Navigation/Navigation";
import {Card, CardsVertical} from "../components/Cards/CardsVertical";
import {CardsHorizontal} from "../components/Cards/CardsHorizontal";
import './home.scss'
import {Table} from "react-bootstrap";

const cardsVertical: Card[] = [
    {
        title: 'INSIGHTS',
        className: 'text-info',
        body: 'Get the most advanced insights into the NFT space. With the help of our analytics platform you will be able to understand the current  state of the market and identify the best deals available ',
    },
    {
        title: 'TOOLS',
        className: 'text-warning',
        body: 'Our suite of bots will help you take action faster than anyone on the insights you get from our analytics platform. Dynamic and mass bidding, sniping, and whale watching will help you deploy your strategy  ',
    },
    {
        title: 'A.I. (COMING SOON)',
        className: 'text-success',
        body: 'SHVL is currently working on integrating Machine Learning and AI into our bots and platform to come up with real-time NFT valuation, sentiment analysis, and a smart bot that can run entirely by itself ',
    }
]

const cardsHorizontal: Card[] = [
    {
        title: 'DYNAMIC BIDDING BOT',
        body: 'Our Dynamic Bidding Bot is the most advanced bot in the market. Massively Bid by Trait or rarity. Outbid other investors and program the bot to dynamically change the offer price based on floor price. All of this with a great  and fast user interface',
    },
    {
        title: 'SNIPING BOT (COMING SOON)',
        body: 'Snipe the best deals in the market faster than anyone. Our sniping bot automatically buys NFTs based on any criteria set by you such as traits, rarity, and floor prices. ',
    },
    {
        title: 'WHALE WATCH BOT (COMING SOON) ',
        body: 'Our Dynamic Bidding Bot is the most advanced bot in the market. Bid by Trait or rarity. Outbid other investors and program the bot to dynamically change the offer price based on floor price. All of this with a great  and fast user interface',
    },
    {
        title: 'IN DEPTH ANALYTICS (COMING SOON)',
        body: 'Our Dynamic Bidding Bot is the most advanced bot in the market. Bid by Trait or rarity. Outbid other investors and program the bot to dynamically change the offer price based on floor price. All of this with a great  and fast user interface',
    },
    {
        title: 'REAL-TIME NFT PRICE VALUATION (COMING SOON)',
        body: 'Our Dynamic Bidding Bot is the most advanced bot in the market. Bid by Trait or rarity. Outbid other investors and program the bot to dynamically change the offer price based on floor price. All of this with a great  and fast user interface',
    }
]
export const Home = () => {
    return <div className={'home-bg d-grid gap-5'}>
        <Navigation/>
        <Hero>
            <div className="text-center d-grid gap-5">
                <h1>THE MOST SOPHISTICATED NFT TRADING BOT AND ANALYTICS PLATFORM AVAILABLE IN THE MARKET</h1>
                <h2>Grow your NFT portfolio and outperform the market with the next generation of tools and
                    analytics </h2>
                <button className={'btn  btn-outline mx-auto btn-primary'}>GET EARLY ACCESS NOW</button>
                <h1>HOW CAN SHVL BENEFIT YOU ?</h1>
                <h2>By leveraging our tools and platform that work holistically you will<br/> be able to save
                    significant amount of time deploying your <br/>strategy and become profitable trading NFTs</h2>
            </div>

        </Hero>
        <Hero>
            <CardsVertical cards={cardsVertical}/>
            <button className={'btn  btn-outline mx-auto btn-primary'}>GET EARLY ACCESS NOW</button>
        </Hero>
        <Hero>
            <CardsHorizontal cards={cardsHorizontal}/>
            <button className={'btn  btn-outline mx-auto btn-primary'}>GET EARLY ACCESS NOW</button>
        </Hero>
        <Hero>
            <h1 className={''}>
                HOW DOES SHVL COMPARE AGAINST OTHER PROVIDERS?
            </h1>
            <Table responsive striped hover >
                <thead>
                <tr>
                    <th><h2>Provider</h2></th>
                    <th><h2>Price</h2></th>
                    <th><h2>Volume</h2></th>
                    <th><h2>Marketcap</h2></th>
                    <th><h2>Change</h2></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Coinbase</td>
                    <td>$1,000</td>
                    <td>1,000</td>
                    <td> Lorem ipsum dolor sit amet.</td>
                    <td>Lorem ipsum.</td>
                </tr>
                <tr>
                    <td>Coinbase</td>
                    <td>$1,000</td>
                    <td>1,000</td>
                    <td> Lorem ipsum dolor sit amet.</td>
                    <td>Lorem ipsum.</td>
                </tr>
                <tr>
                    <td>Coinbase</td>
                    <td>$1,000</td>
                    <td>1,000</td>
                    <td> Lorem ipsum dolor sit amet.</td>
                    <td>Lorem ipsum.</td>
                </tr>
                <tr>
                    <td>Coinbase</td>
                    <td>$1,000</td>
                    <td>1,000</td>
                    <td> Lorem ipsum dolor sit amet.</td>
                    <td>Lorem ipsum.</td>
                </tr>
                <tr>
                    <td>Coinbase</td>
                    <td>$1,000</td>
                    <td>1,000</td>
                    <td> Lorem ipsum dolor sit amet.</td>
                    <td>Lorem ipsum.</td>
                </tr>
                <tr>
                    <td>Coinbase</td>
                    <td>$1,000</td>
                    <td>1,000</td>
                    <td> Lorem ipsum dolor sit amet.</td>
                    <td>Lorem ipsum.</td>
                </tr>
                <tr>
                    <td>Coinbase</td>
                    <td>$1,000</td>
                    <td>1,000</td>
                    <td> Lorem ipsum dolor sit amet.</td>
                    <td>Lorem ipsum.</td>
                </tr>
                <tr>
                    <td>Coinbase</td>
                    <td>$1,000</td>
                    <td>1,000</td>
                    <td> Lorem ipsum dolor sit amet.</td>
                    <td>Lorem ipsum.</td>
                </tr>
                <tr>
                    <td>Coinbase</td>
                    <td>$1,000</td>
                    <td>1,000</td>
                    <td> Lorem ipsum dolor sit amet.</td>
                    <td>Lorem ipsum.</td>
                </tr>
                <tr>
                    <td>Coinbase</td>
                    <td>$1,000</td>
                    <td>1,000</td>
                    <td> Lorem ipsum dolor sit amet.</td>
                    <td>Lorem ipsum.</td>
                </tr>
                <tr>
                    <td>Coinbase</td>
                    <td>$1,000</td>
                    <td>1,000</td>
                    <td> Lorem ipsum dolor sit amet.</td>
                    <td>Lorem ipsum.</td>
                </tr>
                <tr>
                    <td>Coinbase</td>
                    <td>$1,000</td>
                    <td>1,000</td>
                    <td> Lorem ipsum dolor sit amet.</td>
                    <td>Lorem ipsum.</td>
                </tr>
                <tr>
                    <td>Coinbase</td>
                    <td>$1,000</td>
                    <td>1,000</td>
                    <td> Lorem ipsum dolor sit amet.</td>
                    <td>Lorem ipsum.</td>
                </tr>
                <tr>
                    <td>Coinbase</td>
                    <td>$1,000</td>
                    <td>1,000</td>
                    <td> Lorem ipsum dolor sit amet.</td>
                    <td>Lorem ipsum.</td>
                </tr>
                <tr>
                    <td>Coinbase</td>
                    <td>$1,000</td>
                    <td>1,000</td>
                    <td> Lorem ipsum dolor sit amet.</td>
                    <td>Lorem ipsum.</td>
                </tr>
                <tr>
                    <td>Coinbase</td>
                    <td>$1,000</td>
                    <td>1,000</td>
                    <td> Lorem ipsum dolor sit amet.</td>
                    <td>Lorem ipsum.</td>
                </tr>
                <tr>
                    <td>Coinbase</td>
                    <td>$1,000</td>
                    <td>1,000</td>
                    <td> Lorem ipsum dolor sit amet.</td>
                    <td>Lorem ipsum.</td>
                </tr>
                </tbody>
            </Table>
            <button className={'btn btn-outline  mx-auto btn-primary'}>GET EARLY ACCESS NOW</button>
        </Hero>
        <Hero>
            <h1 className={''}>
                BIDDING BOT DEMO
            </h1>
            <iframe
                height={'300'}
                className={' mx-auto w-100' }
                src="https://www.youtube.com/embed/5Peo-ivmupE"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            <button className={'btn btn-outline  mx-auto btn-primary'}>GET EARLY ACCESS NOW</button>
        </Hero>
    </div>
}