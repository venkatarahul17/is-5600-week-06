import React, { useState } from "react";
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = ({ data }) => {
  const limit = 10;

  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);
  // Define the products state variable and set it to the default dataset
  const [products, setProducts] = useState(data);

  // Define the handlePrevious function
  const handlePrevious = () => {
    // set the offset to the previous 10 products
    setOffset(offset - 10);
  }

  // Define the handleNext function
  const handleNext = () => {
    // set the offset to the next 10 products
    setOffset(offset + 10);
  }

  // This method will run every time the offset or products state variables change
  // It will return the subset of paginated products
  const getPaginatedProducts = () => {
    return products.slice(offset, offset + limit);
  }

  const filterTags = (tag) => {
    const filtered = data.filter(product => {
      if (!tag) {
        return product
      }
      return product.tags.find(({ title }) => title === tag)
    })

    setOffset(0)
    setProducts(filtered)
  }

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />



      <div className="mt2 mb2">
        {getPaginatedProducts().map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  )
}

export default CardList;