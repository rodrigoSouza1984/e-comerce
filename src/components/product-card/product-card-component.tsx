import { formatPrice } from "@/utils/formatted-price"
import styled from "styled-components"

import { useRouter } from "next/navigation";
import { products } from "@/api/database-mock/products";
import { Divider } from "../all-aplication/header/divider";
import { FavoriteHeartIconButton } from "../icons/heart-icon";
import { useState } from "react";
import { useProductContext } from "@/hooks/products/use-products-context";


interface ProductCardProps {    
    product: any   
}

interface ContainerProps {
    $iconcontrol: boolean;
  }

interface ButtonProps {
    $available: boolean;
}

const Card = styled.div`
    display: flex;
    
    flex-direction: column;
    cursor: pointer;

    background: var(--background-easy-gray);
    backdrop-filter: blur(10px);
    border-radius: 0px 0px 4px 4px;    
    height: 100%;

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
    }

    img {        
        height: 200px;

        @media (min-width: 370px){//aki
            height: 180px;
        }

        @media (min-width: ${props => props.theme.celPhoneBreakPoint}){//aki
            height: 200px; 
        }

        @media (min-width: ${props => props.theme.tabletBreakPoint}){//aki            
            height: 300px;
    }
    }

    h3 {
        font-weight: 300;
        font-size: 16px;
        line-height: 150%;
        color: var(--text-dark-2);
    }

    p {
        font-weight: 600;
        font-size: 14px;
        line-height: 150%;
        color: var(--shapes-dark);
    }

    >div {
        display: flex;
        align-items: start;
        justify-content: center;
        flex-direction: column;
        padding: 8px 12px;
        width: 100%;        
    }    
`

const ContainerPriceAndHeart = styled.div<ContainerProps>`
display: flex;
align-items: center;
flex-direction: row;
justify-content: space-between;
width: 100%;

svg {
    fill: ${({ $iconcontrol }) => ($iconcontrol ? 'var(--custom-purple-classifield-with-opacity)' : 'none')};
    stroke: ${({ $iconcontrol }) => ($iconcontrol ? 'none' : 'var(--custom-purple-classifield-with-opacity)')};
    stroke-width: 2;
  }
`


const FooterButton = styled.button<ButtonProps>`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: ${({ $available }) => ($available ? 'green' : 'red')};
    color: white;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;

    &:hover {
        opacity: 0.8;
    }
`;

export function ProductCard(props: any) {
    const { setProduct } = useProductContext()
    const [iconcontrol, seticoncontrol] = useState(true)   

    const price = formatPrice(props.product.price_in_cents)

    const router = useRouter()

    const handleNavigate = () => {
        setProduct(props.product)

        router.push("/pages/product-detail?id=" + props.product.id)
    }

    //console.log(props.product, '88888')    

    return (
        <Card >
            <img src={props.product.coverImage} onClick={handleNavigate}/>
            <div>
                <h3>{props.product.name}</h3>
                <Divider />

                <ContainerPriceAndHeart $iconcontrol={iconcontrol}>
                    <p>{price}</p>
                    <FavoriteHeartIconButton onClick={() => seticoncontrol(!iconcontrol)}/>
                </ContainerPriceAndHeart> 

                <FooterButton
                    $available={props.product.quantity > 0}
                    onClick={handleNavigate}
                >
                    {props.product.quantity > 0 ? "Ver Detalhes" : "Indisponível"}
                </FooterButton>               
            </div>

        </Card>
    )
}