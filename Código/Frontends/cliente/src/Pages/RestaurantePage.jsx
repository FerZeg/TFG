import Navigation from "../components/Navigation/Navigation"
import Main from "../components/Main/Main"

export default function RestaurantePage() {
    /*const { produtos, setProdutos } = useRestauranteContext()
    useEffect(() => {
        fetchProdutos().then(
            data => {
                setProdutos(data)
            }
        )
    }, [setProdutos])*/
    return (
        <div>
            <Navigation />
            <div>   
                <Main />
            </div>
        </div>
    )
}