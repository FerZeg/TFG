import DatosRestaurante from "../../components/DatosRestaurante/DatosRestaurante";
import Personal from "../../components/Personal/Personal";
import Mesas from "../../components/Mesas/Mesas";

export default function Admin() {
    return (
        <section id="admin">
            <DatosRestaurante />
            <Personal />
            <Mesas />
        </section>
    )
}