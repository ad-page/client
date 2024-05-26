import { useState, useEffect } from 'react';
import axios from 'axios';

export const CreateAdForm = ({ setCreateAd }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState('');
  const [categories, setCategories] = useState([]);
  const userId = useState(
    localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))._id
      : 'none'
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories');
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCreateAd({
      name: name,
      category: category,
      price: price,
      description: description,
      user: userId,
      images: images,
    });

    alert('new Ad created');
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex w-full justify-evenly rounded-b-2xl bg-slate-500 p-4"
    >
      <div>
        <label htmlFor="">Choose a Category</label>
        <select onChange={(e) => setCategory(e.target.value)} required>
          {categories.map((category) => (
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-1/2 rounded-lg text-center"
          required
        />
      </div>
      <div>
        <label htmlFor="">Enter a Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-1/4 rounded-lg text-center"
          required
        />
      </div>
      <div>
        <label htmlFor="">Enter a Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-1/4 rounded-lg text-center"
          required
        />
      </div>
      <div>
        <label htmlFor="">Enter image url</label>
        <input
          type="text"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          className="w-1/4 rounded-lg text-center"
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
