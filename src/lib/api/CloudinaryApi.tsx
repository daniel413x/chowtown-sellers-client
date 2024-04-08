import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { CLOUDINARY_ROUTE } from "../consts";

const API_BASE_URL = `${import.meta.env.VITE_APP_API_URL}/${CLOUDINARY_ROUTE}`;

export const useUploadToCloudinary = () => {
  const { getAccessTokenSilently } = useAuth0();
  const uploadToCloudinaryReq = async (img: File) => {
    const formData = new FormData();
    formData.append("file", img);
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    if (!res.ok) {
      throw new Error("failed to create manager");
    }
    const { url } = await res.json();
    return url;
  };
  const {
    mutateAsync: uploadToCloudinary, isLoading, isError, isSuccess,
  } = useMutation(uploadToCloudinaryReq);
  return {
    uploadToCloudinary, isLoading, isError, isSuccess,
  };
};
