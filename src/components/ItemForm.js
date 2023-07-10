import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { updateItem, addItem } from "../store/items";

const ItemForm = ({ itemId, hideForm }) => {
    const dispatch = useDispatch();
    const { pokemonId } = useParams();
    let item = useSelector((state) => state.items[itemId]);

    const [happiness, setHappiness] = useState(item ? item.happiness : 0);
    const [price, setPrice] = useState(item ? item.price : 0);
    const [name, setName] = useState(item ? item.name : "");
    const [imageUrl, setImageUrl] = useState("");

    const updateName = (e) => setName(e.target.value);
    const updateHappiness = (e) => setHappiness(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateImageUrl = (e) => setImageUrl(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let payload;
        let returnedItem;
        let newItem;

        if (itemId) {
            payload = {
                ...item,
                name,
                happiness,
                price,
            };

            returnedItem = await dispatch(updateItem(payload));
        } else {
            payload = {
                ...item,
                name,
                imageUrl,
                happiness,
                price,
            };

            newItem = await dispatch(addItem(payload, parseInt(pokemonId)));
        }

        if (returnedItem || newItem) {
            hideForm();
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    };

    return (
        <section className="edit-form-holder centered middled">
            <form className="item-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={updateName}
                />
                {!item && (
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={updateImageUrl}
                    />
                )}
                <input
                    type="number"
                    placeholder="Happiness"
                    min="0"
                    max="100"
                    required
                    value={happiness}
                    onChange={updateHappiness}
                />
                <input
                    type="number"
                    placeholder="Price"
                    required
                    value={price}
                    onChange={updatePrice}
                />
                <button type="submit">
                    {itemId ? "Update Item" : "Add Item"}
                </button>
                <button type="button" onClick={handleCancelClick}>
                    Cancel
                </button>
            </form>
        </section>
    );
};

export default ItemForm;
