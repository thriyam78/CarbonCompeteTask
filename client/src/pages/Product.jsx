import React, { useEffect, useState } from "react"
import Container from "../components/Container"
import axios from "axios"
import { baseURL } from "../services/baseUrl"
import { toast } from "react-hot-toast"
import ProductTable from "../components/products/ProductTable"
import { Link } from "react-router-dom"
import Loading from "../components/Loading"

export default function Product(){

    const [allProducts, setAllProducts] = useState([])
    const  [admin,setAdmin]=useState(false)
    const [userToken,setUserToken]=useState("")
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`${baseURL}/product/allProducts`)
            
                if (data && data?.product) {
                    setAllProducts(data?.product);
                }
                setIsLoading(false);
            } catch (error) {
                toast.error(error?.response?.data?.message || "Something went wrong");
            }
        }

        fetchProducts();

        const { user ,token} = JSON.parse(localStorage.getItem("carboncompete"));
        if(token){
          setUserToken(token)
        }
        if (user.roles === "admin") {
            setAdmin(true);
        }
    }, [])

    return (
        <>
            <div className="p-10 mx-auto  bg-[#9DEAD8] text-black text-center flex flex-1 gap-10"><p className="text-5xl"> Carbon Compete</p>{admin && (<p className="p-2 rounded-xl bg-indigo-500 py-auto"><Link to={`/admin/${userToken}`}>Admin Edit</Link></p>)}</div>
            {isLoading ? (
          <Loading isLoading={isLoading} className={"my-20"} />
        ) : (
            <Container>
                
                <ProductTable products={allProducts} />
            </Container>
        )}</>
    )
}
