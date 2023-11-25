import axios from "lib/axios";
import useSWR from "swr";

export const useUser = () => {
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const { mutate } = useSWR(
    "/api/user",
    () =>
      axios
        .get("/api/user")
        .then((res) => res.data)
        .catch((error) => {
          if (!error.response.status) throw error;
        }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  const store = async ({ setErrors, onClose, ...props }) => {
    await csrf();
    setErrors([]);
    axios
      .post("/api/users", props)
      .then(() => {
        mutate();
        onClose();
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
      });
  };

  const update = async ({ setErrors, id, onClose, ...props }) => {
    await csrf();
    setErrors([]);
    axios
      .put(`/api/users/${id}`, props)
      .then(() => {
        mutate();
        onClose();
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
      });
  };

  const destroy = async ({ id, onClose }) => {
    await csrf();
    axios
      .delete(`/api/users/${id}`)
      .then(() => {
        mutate();
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    store,
    update,
    destroy,
  };
};
