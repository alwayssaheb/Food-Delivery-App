import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../utilis/cartSlice';

const Itemlist = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div>
      {items?.map(item => (
        <div key={item.card.info.id} className="p-2 m-2 border-b-2 border-gray-200 flex justify-between">
          <div className="w-9/12">
            <div className="font-bold text-lg">{item.card.info.name}</div>
            <div className="text-sm">₹{item.card.info.price / 100}</div>
            <p className="text-xs text-gray-500">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4 relative">
            {item.card.info.imageId && (
              <img
                className="w-full rounded-md"
                src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${item.card.info.imageId}`}
                alt={item.card.info.name}
              />
            )}
            <button 
              className="absolute bottom-0 mx-auto p-1 bg-white text-green-600 rounded-md border border-gray-300 font-bold text-sm left-0 right-0 w-20"
              onClick={() => handleAddItem(item)}
            >
              ADD +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Itemlist;