import { nanoid } from "nanoid";

export default function TableRow(props) {
    const row = props.row;

    return (
        <tr>
            {row.map(value =>
                <td key={`date-${nanoid()}`}>{value}</td>,
            )}
        </tr>
    );
}