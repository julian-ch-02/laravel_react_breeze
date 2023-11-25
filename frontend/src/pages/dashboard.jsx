import AppLayout from "components/Layouts/AppLayout";
import axios from "lib/axios";
import moment from "moment";
import { useEffect, useState } from "react";
import Add from "./partials/add";
import Delete from "./partials/delete";
import Update from "./partials/update";

const Dashboard = () => {
  const [response, setResponse] = useState();
  const [page, setPage] = useState(1);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    axios
      .get(`/api/users?page=${page}`)
      .then((res) => {
        setResponse(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, addModal, updateModal, deleteModal]);

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => setAddModal(true)}
              >
                Add
              </button>
              {response && response.data.length > 0 ? (
                <div className="block dark:hover:bg-gray-700block bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 p-6">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Created At
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {response.data.map((d, index) => (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          key={index}
                        >
                          <td className="px-6 py-4">{d.name}</td>
                          <td className="px-6 py-4">
                            {moment(d.created_at).format("DD-MM-yyyy")}
                          </td>
                          <td className="px-6 py-4">
                            <div
                              className="inline-flex rounded-md shadow-sm"
                              role="group"
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedUser(d);
                                  setUpdateModal(true);
                                }}
                                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedUser(d);
                                  setDeleteModal(true);
                                }}
                                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {response && (
                    <div
                      className="inline-flex rounded-md shadow-sm"
                      role="group"
                    >
                      <button
                        type="button"
                        disabled={response.prev_page_url ? false : true}
                        onClick={() => setPage(page - 1)}
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        disabled
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                      >
                        {page}
                      </button>
                      <button
                        type="button"
                        disabled={response.next_page_url ? false : true}
                        onClick={() => setPage(page + 1)}
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p>No Data</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {addModal && (
        <Add visible={addModal} onClose={() => setAddModal(false)} />
      )}
      {updateModal && (
        <Update
          visible={updateModal}
          onClose={() => setUpdateModal(false)}
          user={selectedUser}
        />
      )}
      {deleteModal && (
        <Delete
          visible={deleteModal}
          onClose={() => setDeleteModal(false)}
          user={selectedUser}
        />
      )}
    </AppLayout>
  );
};

export default Dashboard;
