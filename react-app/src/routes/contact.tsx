type ContactProps = {
  message: string;
};

function Contact(props: ContactProps) {
  return <h2>{props.message}</h2>;
}

export default Contact;