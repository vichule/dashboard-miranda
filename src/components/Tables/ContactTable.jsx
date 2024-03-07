import { TdText } from './StyledTable'

export const ContactTable = ({ data }) => {



    return(
        <>
            {data.map((json) => (

                    <tr key={json.id}>
                        <td>
                            <h2>{json.date}</h2>
                            <p>#{json.id}</p>
                            </td>
                        <td>
                            <h2>{json.first_name} {json.last_name}</h2>
                            <p>{json.email}</p>
                            <p>{json.phone}</p>
                        </td>
                        <td>
                            <h2>{json.subject}</h2>
                            <TdText>{json.message}</TdText>
                        </td>
                        <td>
                            <button>Publish</button>
                            <button>Archive</button>
                        </td>
                    </tr>

            ))}
        </>
    )
}