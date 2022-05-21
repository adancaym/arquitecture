import {Card} from "react-bootstrap";
import React from "react";
import {Collection} from "../../../../types";
import {Link} from "react-router-dom";


interface CardCollectionProps {
    collection: Collection
}
export const CardCollection = ({collection}: CardCollectionProps) => {
    return <>
        <Card>
            <Card.Header>
                <h6 className={'text-center mt-5 w-100'}>
                    {collection.name}
                </h6>
            </Card.Header>
            <Card.Body>

                <img style={{
                    maxWidth: '200px',
                }} className={'img-fluid img-thumbnail card-img'} src={collection.image_url} alt={collection.slug}/>
            </Card.Body>
            <Card.Footer>
                <Link to={`/apps/collection/detail/${collection.slug}`}>Details</Link>
            </Card.Footer>
        </Card>
    </>
}