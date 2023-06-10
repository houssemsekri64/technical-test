import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="bg-gray-900">
      <nav className="bg-gray-700">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <span className="flex ">
            <span className="self-center text-2xl font-semibold text-white">
              Dashboard
            </span>
          </span>
          <div className="flex items-center">
            <Link
              href={"/logout"}
              className="text-md text-blue-500 hover:underline"
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center h-screen  text-white">
        <div className=" rounded-lg shadow-md p-6 bg-gray-800">
          <p className="text-blue-500">Welcome to your dashboard!</p>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
            <ul className="list-disc pl-6">
              <li>Completed task A</li>
              <li>Started working on project X</li>
              <li>Met with client Y</li>
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2 text-blue-500">Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-600 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                <p>500</p>
              </div>
              <div className="bg-gray-600 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Revenue</h3>
                <p>$10,000</p>
              </div>
              <div className="bg-gray-600 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Tasks Completed</h3>
                <p>100</p>
              </div>
              <div className="bg-gray-600 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Projects</h3>
                <p>20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
