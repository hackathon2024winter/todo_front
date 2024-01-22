import { useLocation } from 'react-router-dom';

function Contact() {
  const location = useLocation();
  console.log(location);
  return <h2 className="text-2xl font-semibold mt-3 mb-3">Contact</h2>;
}

export default Contact;