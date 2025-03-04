import { useState, useEffect } from "react";

import axios from "axios";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProduct = () => {
  const accessKey = useSelector((state) => state.accessKey);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [bestProduct, setBestProduct] = useState(false);
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  // const [photo, setPhoto] = useState("");

  useEffect(() => {
    async function getCategories() {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API}category`,
      });
      setCategories(response.data);
    }
    getCategories();
    // eslint-disable-next-line
  }, []);

  const handleCreate = async (ev) => {
    ev.preventDefault();
    const data = new FormData(ev.target);
    axios
      .post(`${process.env.REACT_APP_API}products`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessKey.accesToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setName("");
        setDescription("");
        setBestProduct(false);
        setStock(0);
        setPrice(0);
        // setPhoto("");
        toast(` El producto ${response.data.name}  fue creado correctamente!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status) {
          alert("ESTE PRODUCTO YA EXISTE, CAMBIE DE NOMBRE ");
        } else {
          console.log(error);
        }
      });
  };

  return (
    <>
      <div className="container p-4">
        <h1 className="mb-4">Ingresa Productos</h1>

        {/* new form  */}
        <div className="container w-80">
          <form
            onSubmit={(ev) => {
              handleCreate(ev);
            }}
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Descripcion
              </label>
              <textarea
                type="text"
                className="form-control"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                name="bestproduct"
                id="bestproduct"
                value={bestProduct}
                checked={bestProduct}
                onChange={(e) => setBestProduct(!bestProduct)}
              />
              <label className="form-check-label" htmlFor="bestproduct">
                Destacado
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="stock" className="form-label">
                Stock
              </label>
              <input
                type="number"
                className="form-control"
                name="stock"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Precio
              </label>
              <input
                type="number"
                className="form-control"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Categoría
              </label>
              <select
                name="categoryId"
                id="categoryId"
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                }}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Foto
              </label>
              <input
                type="file"
                className="form-control"
                name="photo"
                id="photo"
                aria-describedby="emailHelp"
                required
              />
              <div id="emailHelp" className="form-text">
                Elige tu foto en formato (500x500)
              </div>
            </div>

            <button type="submit" className="btn btn-success">
              Crear producto
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default CreateProduct;
