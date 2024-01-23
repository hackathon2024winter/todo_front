// import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

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

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-3 mb-3">Contact</h2>
      <input 
        className="border-2 border-gray-300 focus:border-blue-500 rounded-md p-2 outline-none focus:ring-1 focus:ring-blue-500"
        type="text" onChange={handleChange} value={paramsValue}></input>
    </div>
  );
}

export default Contact;