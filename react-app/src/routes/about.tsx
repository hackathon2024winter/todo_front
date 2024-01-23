import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  return (
    <>
      <h2 className="text-2xl font-semibold mt-3 mb-3">About</h2>
      <button
        className="px-4 py-2 m-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
        onClick={() => navigate('/contact?api_key=eimaieU9', { state: "test" })}
      >
        Contact
      </button>
    </>
  );
}

export default About;