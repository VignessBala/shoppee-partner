import React, { useRef, useState } from "react";
import { Icons } from "../../constants/icons";
import Header from "../Header";
import "./styles/ShoppingList.css";

const ShoppingList = ({ shoppingLists, setShoppingLists }) => {
  const [listName, setListName] = useState("");
  const [itemInputs, setItemInputs] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const listNameInputRef = useRef(null);
  const itemInputRef = useRef(null);

  const itemsPerPage = 10;

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
      quantity: 0,
    };

    const isItemNameValid = validateField(
      `itemName-${listId}`,
      itemName,
      "Item name cannot be empty"
    );
    const isQuantityValid = validateField(
      `quantity-${listId}`,
      quantity,
      "Quantity must be at least 1"
    );

    if (!isItemNameValid || !isQuantityValid) return;

    if (editingItem && editingItem.listId === listId) {
      handleSaveEditItem(listId, editingItem.id, itemName, quantity);
      return;
    }

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
      [listId]: { itemName: "", quantity: 0 },
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
    setValidationErrors({});
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
    setCurrentPage(1);
  };

  const openForm = () => {
    setIsFormOpen(true);
    setTimeout(() => {
      if (listNameInputRef.current) {
        listNameInputRef.current.focus();
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
  const highlightSearch = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "i"); // Match the query, case-insensitive
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="text-[#cc3366] font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      {/* <Header headerName="Shopping List" /> */}
      <button
        className="fixed top-4 right-4 border border-[#cc3366] text-[#cc3366] bg-transparent px-4 py-2 rounded hover:bg-[#cc3366] hover:text-white transition-colors duration-300"
        onClick={openForm}
      >
        Add List
      </button>
      <div className="search-bar-container fixed top-16 mx-auto p-2 border rounded flex items-center z-10">
        <img src={Icons.searchIcon} alt="Search" className="w-5 h-5 mr-2" />
        <input
          className="search-bar flex-grow p-2 border rounded focus-visible:outline-none focus:border-[#cc3366]"
          type="text"
          placeholder="Search lists..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="w-80 h-full bg-white p-6 flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Add New List</h2>
            <input
              ref={listNameInputRef}
              className="border p-2 rounded mb-4"
              type="text"
              placeholder="List Name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            {validationErrors.listName && (
              <p className="text-red-500 text-sm">
                {validationErrors.listName}
              </p>
            )}
            <div className="flex justify-between">
              <button
                className="border border-[#cc3366] text-[#cc3366] px-4 py-2 rounded-[10px] hover:bg-[#cc3366] hover:text-white transition duration-300"
                onClick={handleAddList}
              >
                Save
              </button>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded-[10px] border border-red-500 hover:bg-transparent hover:text-red-500 transition duration-300"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-24 overflow-auto max-h-[520px] md:max-h-[520px] max-h-[480px] bg-white shadow-md rounded">
        <div className="table-container">
          <table className="table-auto w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">List Number</th>
                <th className="px-4 py-2">List Name</th>
                <th className="px-4 py-2">Items</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLists.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center italic text-gray-500 py-4"
                  >
                    No results found
                  </td>
                </tr>
              ) : (
                paginatedLists.map((list, index) => (
                  <tr key={list.id} className="border-b">
                    <td data-label="List Number" className="px-4 py-2">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td data-label="List Name" className="px-4 py-2">
                      {highlightSearch(list.name, searchQuery)}
                    </td>
                    <td data-label="Items" className="px-4 py-2">
                      <div>
                        <div className="mb-2 flex flex-col space-y-1">
                          <input
                            ref={
                              editingItem?.listId === list.id
                                ? itemInputRef
                                : null
                            }
                            className="border p-1 rounded w-25"
                            type="text"
                            placeholder="Item Name"
                            value={
                              editingItem?.listId === list.id && editingItem?.id
                                ? editingItem.name
                                : itemInputs[list.id]?.itemName || ""
                            }
                            onChange={(e) =>
                              editingItem?.listId === list.id && editingItem?.id
                                ? setEditingItem((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                  }))
                                : handleInputChange(
                                    list.id,
                                    "itemName",
                                    e.target.value
                                  )
                            }
                          />
                          {validationErrors[`itemName-${list.id}`] && (
                            <small className="text-red-500 text-xs italic mt-1">
                              {validationErrors[`itemName-${list.id}`]}
                            </small>
                          )}
                        </div>

                        <div className="mb-2 flex flex-col space-y-1">
                          <input
                            className="border p-1 rounded w-25"
                            type="number"
                            placeholder="Quantity"
                            value={
                              editingItem?.listId === list.id && editingItem?.id
                                ? editingItem.quantity || ""
                                : itemInputs[list.id]?.quantity || ""
                            }
                            onChange={(e) =>
                              editingItem?.listId === list.id && editingItem?.id
                                ? setEditingItem((prev) => ({
                                    ...prev,
                                    quantity: e.target.value,
                                  }))
                                : handleInputChange(
                                    list.id,
                                    "quantity",
                                    e.target.value
                                  )
                            }
                          />
                          {validationErrors[`quantity-${list.id}`] && (
                            <small className="text-red-500 text-xs italic mt-1">
                              {validationErrors[`quantity-${list.id}`]}
                            </small>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            className={
                              "border border-[#cc3366] text-[#cc3366] bg-transparent hover:bg-[#cc3366] hover:text-white px-2 rounded transition-colors duration-300"
                            }
                            onClick={() => {
                              if (
                                editingItem?.listId === list.id &&
                                editingItem?.id
                              ) {
                                handleSaveEditItem(
                                  list.id,
                                  editingItem.id,
                                  editingItem.name,
                                  editingItem.quantity
                                );
                              } else {
                                handleAddItem(list.id);
                              }
                            }}
                          >
                            {editingItem?.listId === list.id && editingItem?.id
                              ? "Update"
                              : "Add Item"}
                          </button>

                          {editingItem?.listId === list.id &&
                            editingItem?.id && (
                              <button
                                className="bg-red-500 text-white px-2 rounded border border-red-500 hover:bg-transparent hover:text-red-500 transition duration-300"
                                onClick={() => setEditingItem(null)}
                              >
                                Cancel
                              </button>
                            )}
                        </div>

                        {list.items.length === 0 ? (
                          <p className="text-gray-500 italic">No items</p>
                        ) : (
                          <ul className="list-disc w-full mt-5">
                            {list.items.map((item) => (
                              <li
                                key={item.id}
                                className="flex justify-between items-center mb-2 p-2 border rounded w-full"
                              >
                                <div className="flex items-center flex-grow">
                                  <input
                                    type="checkbox"
                                    checked={item.bought}
                                    onChange={() =>
                                      toggleBought(list.id, item.id)
                                    }
                                    className="mr-4 custom-checkbox"
                                  />
                                  <span
                                    className={`${
                                      item.bought
                                        ? "line-through text-gray-500 flex-grow"
                                        : "text-black flex-grow"
                                    }`}
                                  >
                                    "{item.name} ({item.quantity})"
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2 justify-end">
                                  <button
                                    className="p-2 hover:bg-green-100 rounded"
                                    onClick={() => {
                                      setEditingItem({
                                        id: item.id,
                                        listId: list.id,
                                        name: item.name,
                                        quantity: item.quantity,
                                      });
                                      setTimeout(() => {
                                        if (itemInputRef.current) {
                                          itemInputRef.current.scrollIntoView({
                                            behavior: "smooth",
                                          });
                                          itemInputRef.current.focus();
                                        }
                                      }, 0);
                                    }}
                                  >
                                    <img
                                      src={Icons.editIcon}
                                      alt="Edit"
                                      className="w-5 h-5"
                                    />
                                  </button>
                                  <button
                                    className="p-2 hover:bg-red-100 rounded"
                                    onClick={() =>
                                      handleDeleteItem(list.id, item.id)
                                    }
                                  >
                                    <img
                                      src={Icons.deleteIcon}
                                      alt="Delete"
                                      className="w-5 h-5"
                                    />
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </td>
                    <td data-label="Actions" className="px-4 py-2">
                      <button
                        className=" text-white px-2 rounded hover:bg-red-100"
                        onClick={() => handleDeleteList(list.id)}
                      >
                        <img
                          src={Icons.deleteIcon}
                          alt="Delete"
                          className="w-4 h-4"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 border rounded ${
              currentPage === index + 1
                ? "border border-[#cc3366] bg-[#cc3366] text-white hover:bg-transparent hover:text-[#cc3366]"
                : "border border-[#cc3366] text-[#cc3366] bg-transparent hover:bg-[#cc3366] hover:text-white px-2 rounded transition-colors duration-300"
            }`}
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
