import { useState } from "react";
import axios from "axios";
// import { useSelector } from "react-redux";
import slugify from "slugify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProduct = () => {
  // const user = useSelector((state) => state.user);
  const notify = () => toast("Wow so easy!");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [bestProduct, setBestProduct] = useState(false);
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState("");

  const handleCreate = async (ev) => {
    const response = await axios({
      method: "post",
      url: `http://localhost:3000/products`,
      data: {
        name: name,
        description: description,
        photo: photo,
        stock: stock,
        bestproduct: bestProduct,
        slug: slugify(name.toLowerCase(), { replacement: "-" }),
        price: price,
      },
      // headers:{
      //   Authorization: `Bearer ${user.token}`
      // }
    });

    setName("");
    setDescription("");
    setBestProduct(false);
    setStock(0);
    setPrice(0);
    setPhoto("");
    toast("🦄 El producto fue creado correctamente!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <div className="container">
        <main className="bg-light">
          <h1>Ingresa Productos</h1>
          <table className="table">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Destacados</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Foto</th>
            </tr>
            <tr>
              <td>
                <input
                  className="input"
                  type="text"
                  name="name"
                  id={`${name}name`}
                  // key={`${name}name`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  name="description"
                  id={`${name}description`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  className="input"
                  type="checkbox"
                  name="bestproduct"
                  id={`${name}bestproduct`}
                  value={bestProduct}
                  checked={bestProduct}
                  onChange={(e) => setBestProduct(!bestProduct)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  name="stock"
                  id={`${name}stock`}
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  name="price"
                  id={`${name}price`}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  name="photo"
                  id={`${name}photo`}
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  required
                />
              </td>
            </tr>
          </table>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-success my-4"
              onClick={(ev) => {
                handleCreate(ev);
              }}
            >
              Crear Producto
            </button>
          </div>
        </main>
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
      <ToastContainer />
    </>
  );
};

export default CreateProduct;
