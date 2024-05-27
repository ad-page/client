import { useReducer, useEffect } from 'react';
import axios from 'axios';

const initialFormState = {
  name: '',
  category: '',
  price: '',
  description: '',
  images: '',
  categories: [],
  userId: localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData'))._id
    : 'none',
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'SET_PRICE':
      return { ...state, price: action.payload };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload };
    case 'SET_IMAGES':
      return { ...state, images: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

export const CreateAdForm = ({ setCreateAd }) => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories');
        dispatch({ type: 'SET_CATEGORIES', payload: res.data });
        if (res.data.length > 0) {
          dispatch({ type: 'SET_CATEGORY', payload: res.data[0].name });
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCreateAd({
      name: state.name,
      category: state.category,
      price: state.price,
      description: state.description,
      user: state.userId,
      images: state.images,
    });

    alert("new Ad created");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <label htmlFor="">Choose a Category</label>
        <select
          onChange={(e) =>
            dispatch({ type: 'SET_CATEGORY', payload: e.target.value })
          }
          required
        >
          {state.categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="">Enter a Name</label>
        <input
          type="text"
          value={state.name}
          onChange={(e) =>
            dispatch({ type: 'SET_NAME', payload: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label htmlFor="">Enter a Price</label>
        <input
          type="number"
          value={state.price}
          onChange={(e) =>
            dispatch({ type: 'SET_PRICE', payload: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label htmlFor="">Enter a Description</label>
        <textarea
          value={state.description}
          onChange={(e) =>
            dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label htmlFor="">Enter an Image url</label>
        <input
          type="text"
          value={state.images}
          onChange={(e) =>
            dispatch({ type: 'SET_IMAGES', payload: e.target.value })
          }
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
