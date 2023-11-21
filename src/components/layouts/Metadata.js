import { Helmet } from "react-helmet-async"
export default function Metdata({title}){
    return (
        <Helmet>
            <title>{`${title} -rsaart`}</title>
        </Helmet>
    )
}