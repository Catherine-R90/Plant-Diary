import TableRow from "./TableRow";
import { nanoid } from "nanoid";

export default function Table(props) {
    const body = props.body;
    return (
        <table>
            <tbody>
                {body.map(row => 
                    <TableRow
                        row={row}
                        key={"row-"+nanoid()}
                    />
                )}
            </tbody>
        </table>
    )
}