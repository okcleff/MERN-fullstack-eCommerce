import { Alert } from "react-bootstrap";

interface MessageProps {
  variant?: string;
  children: React.ReactNode;
}

const Message: React.FC<MessageProps> = ({ variant = "info", children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
