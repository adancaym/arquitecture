import {Table} from "react-bootstrap";
import styled from "styled-components";

interface TableAssetNameProps {
    assetsName: Array<{ name: string }>
}

const MaxHeigth = styled.div`
  max-height: 20vh;
  overflow-y: scroll;
`
export const TableAssetName = ({assetsName}: TableAssetNameProps) => {
    return <MaxHeigth>
        <Table responsive striped hover size={'sm'}>
            <thead>
            <tr>
                <th>Name</th>
            </tr>
            </thead>
            <tbody>
            {assetsName.map(({name}) => <tr>
                <td>{name}</td>
            </tr>)}
            </tbody>
        </Table>
    </MaxHeigth>
}