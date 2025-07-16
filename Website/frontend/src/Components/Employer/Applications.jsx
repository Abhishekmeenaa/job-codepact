
import { useEffect, useState } from "react";
import axiosInstance from '../../config/axios'


// const applicants = [
//   {
//     id: 1,
//     name: "Rahul Sharma",
//     email: "rahul.sharma@example.com",
//     jobTitle: "Security Guard",
//     resume: "#",
//     status: "Pending",
//   },
//   {
//     id: 2,
//     name: "Priya Mehta",
//     email: "priya.mehta@example.com",
//     jobTitle: "Chef",
//     resume: "#",
//     status: "Approved",
//   },
//   {
//     id: 3,
//     name: "Amit Verma",
//     email: "amit.verma@example.com",
//     jobTitle: "Electrician",
//     resume: "#",
//     status: "Rejected",
//   },
//   {
//     id: 4,
//     name: "Rani Gupta",
//     email: "rani.gupta@example.com",
//     jobTitle: "Office Boy",
//     resume: "#",
//     status: "Pending",
//   },
// ];

const Applications = () => {

  const [applicants, setapplicants] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);


  useEffect(() => {
    const init = async () => {
      try {
        const res = await axiosInstance.get("/user/all");
        setapplicants(res.data.users)
        console.log(res)
      } catch (error) {

      }
    }


    init()
  }, [])

  const viewHandler = async (userId) => {
    try {
      if (!userId) {
        throw new Error("No user ID provided");
      }

      const userString = localStorage.getItem("user");
      if (!userString) {
        throw new Error("User not found in localStorage");
      }

      const user = JSON.parse(userString);
      const employerId = user?.id;


      if (!employerId) {
        throw new Error("Employer ID not found");
      }

      const res = await axiosInstance.post("/employee/view-user-profile", {
        employerId,
        userId
      });
      console.log(res,"KKKK")
      if (res.data.success) {
        return res.data.user; // Return the user data
      } else {
        throw new Error(res.data.message || "Failed to fetch user");
      }
    } catch (error) {
      console.error("Error in viewHandler:", error);
      throw error; // Re-throw to handle in the calling function
    }
  };





  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Job Applications</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Applicant Name
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Email
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Skill
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Resume
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {applicants.map((applicant) => (
              <tr key={applicant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {applicant.name}
                </td>
                {/* <td className="px-6 py-4 text-gray-700">{applicant.phone}</td> */}
                <td className="px-6 py-4 text-gray-700">{applicant.Skill || "Worker"}</td>
                {/* <td className="px-6 py-4">
                  <a
                    href={applicant.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Resume
                  </a>
                </td> */}
                <td className="px-6 py-4">
                  {/* <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      applicant.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : applicant.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {applicant.status}
                  </span> */}
                </td>
                <button
                  onClick={async () => {
                    try {
                      // Get user ID with fallbacks
                      const userId = applicant._id || applicant.user?._id || applicant.id;

                      if (!userId) {
                        throw new Error("Could not find user ID in applicant data");
                      }

                      // Call API first
                      const userData = await viewHandler(userId);

                      // Update state and show popup only if API call succeeds
                      setSelectedUserId(userId);
                      // setUserDetails(userData); // If you're using this
                      setShowPopup(true);

                    } catch (error) {
                      console.error("Error viewing user details:", error);
                      alert(error.message || "Failed to load user details");
                    }
                  }}
                  className="px-3 py-1 mt-2 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                >
                  View Detail
                </button>

              </tr>
            ))}
            {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                  <h2 className="text-lg font-semibold mb-4">User Details</h2>
                  <p>User ID: {selectedUserId}</p>

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setShowPopup(false)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applications;
