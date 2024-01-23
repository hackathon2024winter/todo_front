// import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const products = [
  {
    id: 1,
    product_name: 'iPhone',
    price: 1000,
  },
  {
    id: 2,
    product_name: 'iPad',
    price: 500,
  },
  {
    id: 3,
    product_name: 'iPod',
    price: 40,
  },
  {
    id: 4,
    product_name: 'MacBook',
    price: 2000,
  },
];


function Contact() {
  // const location = useLocation();
  // console.log(location);

  const [searchParams, setSearchParams] = useSearchParams();
  const paramsValue = searchParams.get('product_name') || '';
  console.log(searchParams.get('product_name'));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const product_name = e.target.value;
    if (product_name) {
      setSearchParams({ product_name: e.target.value });
    } else {
      setSearchParams({});
    }
  };

  const searchProducts = () => {
    return products.filter((product) => {
      return product.product_name.includes(
        searchParams.get('product_name') || ''
      );
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-3 mb-3">Contact</h2>
      <input
        className="border-2 border-gray-300 focus:border-blue-500 rounded-md p-2 outline-none focus:ring-1 focus:ring-blue-500"
        type="text" onChange={handleChange} value={paramsValue} />

      <ul className="list-disc pl-5 ml-4">
        {searchProducts().map((product) => (
          <li key={product.id}>
            {product.product_name}/{product.price}
          </li>
        ))}

      </ul>
    </div>
  );
}

export default Contact;