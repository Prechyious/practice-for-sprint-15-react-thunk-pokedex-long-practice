import { useDispatch, useSelector } from "react-redux";
import { pokemonItems, deleteItem } from "../store/items";
import { useEffect, useState } from "react";

const PokemonItems = ({ pokemon, setEditItemId }) => {
    const dispatch = useDispatch();
    const [deleteItemId, setDeleteItemId] = useState(null);

    const items = useSelector((state) => {
        if (!pokemon.items) return null;
        return pokemon.items.map((itemId) => state.items[itemId]);
    });

    useEffect(() => {
        dispatch(pokemonItems(pokemon.id));
    }, [dispatch, pokemon.id, deleteItemId]);

    useEffect(() => {
        if (deleteItemId) {
            dispatch(deleteItem(deleteItemId, pokemon.id));
            setDeleteItemId(null);
        }
    }, [dispatch, deleteItemId, pokemon.id]);

    if (!items) {
        return null;
    }

    return items.map((item) => (
        <tr key={item.id}>
            <td>
                <img
                    className="item-image"
                    alt={item.imageUrl}
                    src={`${item.imageUrl}`}
                />
            </td>
            <td>{item.name}</td>
            <td className="centered">{item.happiness}</td>
            <td className="centered">${item.price}</td>
            {pokemon.captured && (
                <td className="centered">
                    <button onClick={() => setEditItemId(item.id)}>Edit</button>
                </td>
            )}
            {pokemon.captured && (
                <td className="centered">
                    <button onClick={() => setDeleteItemId(item.id)}>
                        Delete
                    </button>
                </td>
            )}
        </tr>
    ));
};

export default PokemonItems;
