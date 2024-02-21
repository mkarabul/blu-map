import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Option({ icon, header, context, link }) {
  return (
    <div className="mb-4">
      <Link href={link}>
        <div className="block border p-2 rounded-lg shadow hover:bg-gray-50 transition duration-150 ease-in-out">
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon
              icon={icon}
              style={{ width: "50px", height: "50px" }}
              className="text-primary"
            />
            <div>
              <h2 className="text-xl font-medium mb-1">{header}</h2>
              <h1 className="text-l font-medium">{context}</h1>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
