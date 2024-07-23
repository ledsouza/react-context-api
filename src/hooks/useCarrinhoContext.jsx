import { useContext } from "react";
import { CarrinhoContext } from "@/contexts/CarrinhoContext";

import { ADD_PRODUTO, REMOVE_PRODUTO, UPDATE_QUANTIDADE } from "../reducers/carrinhoReducer";

export const useCarrinhoContext = () => {
    const { carrinho, dispatch, quantidade, valorTotal } = useContext(CarrinhoContext);

    const addProdutoAction = (novoProduto) => ({
        type: ADD_PRODUTO,
        payload: novoProduto,
    });

    const removeProdutoAction = (produtoId) => ({
        type: REMOVE_PRODUTO,
        payload: produtoId,
    });

    const updateProdutoAction = (produtoId, quantidade) => ({
        type: UPDATE_QUANTIDADE,
        payload: { produtoId, quantidade },
    });

    function adicionarProduto(novoProduto) {
        dispatch(addProdutoAction(novoProduto));
    }

    function removerProduto(id) {
        const produto = carrinho.find((item) => item.id === id);

        if (produto && produto.quantidade > 1) {
            dispatch(updateProdutoAction(id, produto.quantidade - 1));
        } else {
            dispatch(removeProdutoAction(id));
        }
    }

    function removerProdutoCarrinho(id) {
        dispatch(removeProdutoAction(id));
    }

    return {
        carrinho,
        adicionarProduto,
        removerProduto,
        removerProdutoCarrinho,
        valorTotal,
        quantidade,
    };
};
