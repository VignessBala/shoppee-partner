import React, { useRef, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import "./styles/ShoppingList.css";

const ShoppingList = ({ shoppingLists, setShoppingLists }) => {
  const [listName, setListName] = useState("");
  const [itemInputs, setItemInputs] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const listNameInputRef = useRef(null); // Ref for the List Name input field

  const itemsPerPage = 10; // Number of lists per page

  const handleDeleteList = (listId) => {
    setShoppingLists(shoppingLists.filter((list) => list.id !== listId));
  };

  const validateField = (fieldName, value, errorMessage) => {
    if (!value || value.trim() === "") {
      setValidationErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
      return false;
    }
    setValidationErrors((prev) => ({ ...prev, [fieldName]: "" }));
    return true;
  };

  const handleAddList = () => {
    if (!validateField("listName", listName, "List name cannot be empty"))
      return;

    setShoppingLists([
      ...shoppingLists,
      { id: Date.now(), name: listName, items: [] },
    ]);
    setListName("");
    setIsFormOpen(false);
  };

  const handleAddItem = (listId) => {
    const { itemName, quantity } = itemInputs[listId] || {
      itemName: "",
      quantity: 1,
    };

    if (
      !validateField(
        `itemName-${listId}`,
        itemName,
        "Item name cannot be empty"
      ) ||
      !validateField(
        `quantity-${listId}`,
        quantity,
        "Quantity must be at least 1"
      )
    )
      return;

    const updatedLists = shoppingLists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          items: [
            ...list.items,
            {
              id: Date.now(),
              name: itemName,
              quantity: parseInt(quantity, 10),
              bought: false,
            },
          ],
        };
      }
      return list;
    });

    setShoppingLists(updatedLists);
    setItemInputs((prev) => ({
      ...prev,
      [listId]: { itemName: "", quantity: 1 },
    }));
  };

  const handleSaveEditItem = (listId, itemId, newName, newQuantity) => {
    if (
      !validateField(
        `editItemName-${itemId}`,
        newName,
        "Item name cannot be empty"
      ) ||
      !validateField(
        `editQuantity-${itemId}`,
        newQuantity,
        "Quantity must be at least 1"
      )
    )
      return;

    const updatedLists = shoppingLists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map((item) =>
            item.id === itemId
              ? { ...item, name: newName, quantity: parseInt(newQuantity, 10) }
              : item
          ),
        };
      }
      return list;
    });

    setShoppingLists(updatedLists);
    setEditingItem(null);
  };

  const handleDeleteItem = (listId, itemId) => {
    const updatedLists = shoppingLists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.filter((item) => item.id !== itemId),
        };
      }
      return list;
    });

    setShoppingLists(updatedLists);
  };

  const toggleBought = (listId, itemId) => {
    const updatedLists = shoppingLists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map((item) =>
            item.id === itemId ? { ...item, bought: !item.bought } : item
          ),
        };
      }
      return list;
    });

    setShoppingLists(updatedLists);
  };

  const handleInputChange = (listId, field, value) => {
    setItemInputs((prev) => ({
      ...prev,
      [listId]: { ...prev[listId], [field]: value },
    }));
    setValidationErrors((prev) => ({ ...prev, [`${field}-${listId}`]: "" }));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(1); // Reset to the first page on search
  };
  const openForm = () => {
    setIsFormOpen(true);
    setTimeout(() => {
      if (listNameInputRef.current) {
        listNameInputRef.current.focus(); // Automatically focus the input field
      }
    }, 0);
  };

  const filteredLists = shoppingLists.filter((list) =>
    list.name.toLowerCase().includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredLists.length / itemsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedLists = filteredLists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="shopping-list">
      <button className="add-list-button" onClick={openForm}>
        Add List
      </button>

      <input
        className="search-bar"
        type="text"
        placeholder="Search lists..."
        value={searchQuery}
        onChange={handleSearch}
      />

      {isFormOpen && (
        <div className="overlay">
          <div className="side-form">
            <h2>Add New List</h2>
            <input
              type="text"
              placeholder="List Name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            {validationErrors.listName && (
              <small style={{ color: "red" }}>
                {validationErrors.listName}
              </small>
            )}
            <div className="form-actions">
              <button onClick={handleAddList}>Save</button>
              <button onClick={() => setIsFormOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className={`table-container ${isFormOpen ? "disabled" : ""}`}>
        <table>
          <thead>
            <tr>
              <th>List Number</th>
              <th>List Name</th>
              <th>Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLists.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    fontStyle: "italic",
                    color: "gray",
                  }}
                >
                  No results found
                </td>
              </tr>
            ) : (
              paginatedLists.map((list, index) => (
                <tr key={list.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{list.name}</td>
                  <td>
                    <div className="item-input-container">
                      <input
                        type="text"
                        placeholder="Item Name"
                        value={itemInputs[list.id]?.itemName || ""}
                        onChange={(e) =>
                          handleInputChange(list.id, "itemName", e.target.value)
                        }
                      />
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={itemInputs[list.id]?.quantity}
                        onChange={(e) =>
                          handleInputChange(list.id, "quantity", e.target.value)
                        }
                      />
                    </div>
                    <button onClick={() => handleAddItem(list.id)}>
                      Add Item
                    </button>
                    <ul>
                      {list.items.map((item) => (
                        <li
                          key={item.id}
                          style={{
                            textDecoration: item.bought
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {editingItem?.id === item.id ? (
                            <div className="edit-item">
                              <input
                                type="text"
                                defaultValue={item.name}
                                onChange={(e) =>
                                  setEditingItem((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                  }))
                                }
                              />
                              <input
                                type="number"
                                defaultValue={item.quantity}
                                onChange={(e) =>
                                  setEditingItem((prev) => ({
                                    ...prev,
                                    quantity: e.target.value,
                                  }))
                                }
                              />
                              <button
                                onClick={() =>
                                  handleSaveEditItem(
                                    list.id,
                                    item.id,
                                    editingItem.name,
                                    editingItem.quantity
                                  )
                                }
                              >
                                Save
                              </button>
                              <button onClick={() => setEditingItem(null)}>
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <>
                              {item.name} ({item.quantity})
                              <button
                                onClick={() => toggleBought(list.id, item.id)}
                              >
                                {item.bought ? "Unmark" : "Mark as Bought"}
                              </button>
                              <button
                                onClick={() =>
                                  setEditingItem({
                                    id: item.id,
                                    name: item.name,
                                    quantity: item.quantity,
                                  })
                                }
                              >
                                <FaPen />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteItem(list.id, item.id)
                                }
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteList(list.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => changePage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShoppingList;
