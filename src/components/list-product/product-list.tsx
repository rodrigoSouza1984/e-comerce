"use client"

import styled from "styled-components"
import { ProductCard } from "../product-card/product-card-component"
import { useProductContext } from "@/hooks/products/use-products-context"
import { useEffect, useRef, useState } from "react"
import { ProductService } from "@/services/products/product.service"
import { useProductPaginationContext } from "@/hooks/products/use-product-pagination-context"
import { PaginationNoLibProduct } from "./products-pagination/pagination-noLib-product"
import PaginationWithLibProduct from "./products-pagination/pagination-withLib-companys-product"
import NumericPagination from "./products-pagination/pagination-withLib-users-numeric-product"
import SimplePagination from "./products-pagination/pagination-withLib-simple-product"
import AdvancedPagination from "./products-pagination/pagination-withLib-advanced-products"
import { SelectChangeEvent } from "@mui/material"
import CustomPagination from "./products-pagination/pagination-withLib-tipo-MercadoLivre"
import InfiniteScroll from "./products-pagination/scroll-pagination-product"
import { categorysFilter } from "@/hooks/products/use-categorys-context"
import InfiniteScrollComponent from "./products-pagination/scroll-pagination-product"

interface ProductsListProps {
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
height: 100%; /* Adicionando altura de 100% para garantir que o Container ocupe todo o espaço disponível */
background-color: var(--custom-purple-classifield); 
`

const ListContainer = styled.div`
    display: grid;   
    justify-content: center; /* Centralizando horizontalmente */
    align-items: center; /* Centralizando verticalmente */ 
    grid-template-columns: repeat(1, minmax(20%, 1fr));
    grid-gap: 20px;    
    width: 100%;
    max-width: 100%;   
    background-color: var(--custom-purple-classifield);
    margin-top: 0px;    

    @media (min-width: ${props => props.theme.celPhoneBreakPointSmaller}){//aki        
        grid-template-columns: repeat(2, minmax(20%, 1fr));
        grid-gap: 20px;       
    }
    
    @media (min-width: ${props => props.theme.celPhoneBreakPoint}){//aki       
        grid-template-columns: repeat(3, minmax(5%, 1fr));
        grid-gap: 20px; 
        margin-top: 10px;        
    }
    
    @media (min-width: ${props => props.theme.smallerTabletBreakPoint}){//aki
        grid-template-columns: repeat(3, minmax(15%, 1fr));
        grid-gap: 30px;
        margin-top: 20px;        
    }

    @media (min-width: ${props => props.theme.tabletBreakPoint}){//aki
        grid-template-columns: repeat(3, minmax(20%, 1fr));
        grid-gap: 30px;
        margin-top: 20px;        
    }    
`

//fixo 4 na tela -> grid-template-columns: repeat(4, 256px);

export function ProductList(props: ProductsListProps) {
    const primeiroRender = useRef(true);
    const [scroll, setScroll] = useState(false)

    const { productList, setProductList, quantityTotalProduct, setQuantityTotalProduct } = useProductContext()
    const { getAllProducts } = ProductService();
    const { categoryType, setCategoryType } = categorysFilter()
    const {
        page,
        setPage,
        quantityItensByPage,
        totalPages,
        setTotalPages,
        currentPage,
        setCurrentPage
    } = useProductPaginationContext()

    const handleClick = (pageNumber: any) => {
        setCurrentPage(pageNumber);
        setPage(pageNumber)

        console.log(totalPages, 888, quantityItensByPage)
    };

    useEffect(() => {
        if (primeiroRender.current) {
            console.log(1, productList.length)
            primeiroRender.current = false;
            return;
        }

        getAllProducts()                  

        console.log(totalPages, 888, quantityItensByPage, 888, page, 6667, quantityTotalProduct, 88888888, Math.ceil(Number(quantityTotalProduct) / Number(quantityItensByPage)))
    }, [categoryType]);

    useEffect(() => {
        console.log(totalPages, 'scroll useefect 1')
        if (!scroll) {            
            return;
        }

        getAllProducts(undefined, undefined, true)   

        setScroll(false)

        console.log('scroll useefect')
    }, [page]);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
        setCurrentPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
        const newRowsPerPage = parseInt(event.target.value as string, 10);
        setPage(0);
        setCurrentPage(1);
        setTotalPages(Math.ceil(totalPages / newRowsPerPage));
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        setCurrentPage(newPage + 1);
    };

    const fetchMoreData = async () => {          
        console.log(totalPages, 'scrollllllll 1', page, '123456', quantityTotalProduct, 4444, Math.ceil(Number(quantityTotalProduct) / Number(quantityItensByPage)))
        if(page > totalPages){            
            return
        }
        setScroll(true)
        console.log('scrollllllll', page)
        setPage(page + 1);        
      };

    return (
        <Container>
            <ListContainer>
                {productList?.map((product: any) => <ProductCard
                    key={product.id}
                    product={product}
                />)}
            </ListContainer>

            {/* <PaginationNoLibProduct
                handleClick={handleClick}
                currentPage={currentPage}
                totalPages={totalPages}
                quantityItensByPage={quantityItensByPage}
                page={page}
            /> */}

            {/* <PaginationWithLibProduct
                count={totalPages * quantityItensByPage} // total de itens
                page={page}
                rowsPerPage={quantityItensByPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}

            {/* <NumericPagination
                count={totalPages * quantityItensByPage} // total de itens
                page={page}
                rowsPerPage={quantityItensByPage}
                onPageChange={handleChangePage}                
            /> */}

            {/* <SimplePagination
                count={totalPages * quantityItensByPage} // total de itens
                page={page}
                rowsPerPage={quantityItensByPage}
                onPageChange={handleChangePage}
            /> */}


            {/* <AdvancedPagination
                count={totalPages * quantityItensByPage} // total de itens
                page={page}
                rowsPerPage={quantityItensByPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}

            {/* <CustomPagination
                count={totalPages * quantityItensByPage} // total de itens
                page={page}
                rowsPerPage={quantityItensByPage}
                onPageChange={handlePageChange}
            /> */}

            <InfiniteScrollComponent fetchMoreData={fetchMoreData} />

        </Container>
    )
}