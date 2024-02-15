import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return(
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <Link style={{'marginTop': '30px', 'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}} to='/'>Back to main page</Link>
        </div>
    )
}

export default Page404;