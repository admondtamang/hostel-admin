import api from '@particles/helper/api';
import { convertJsonToFormData } from '@particles/helper/jsonToFormData';

interface ICreateVettedCandidate {
  email: string;
  password: string;
  fullName: string;
  currentRole: string;
  skills: string[];
  yearOfExperience: number;
  resumeFile: File;
  profileImage: File;
}

export const useMutationCreateCandidate = () => {
  const postRecommendation = async (dataPost: ICreateVettedCandidate) => {
    const baseURL = import.meta.env.VITE_BACKEND_HOST;

    try {
      await api.patch(
        baseURL + '/userProfiles/upload-vetted-candidate',
        convertJsonToFormData({
          fullName: dataPost.fullName,
          email: dataPost.email,
          role: 'candidate',
          file_cv: dataPost.resumeFile,
          file_profile: dataPost.profileImage,
          isVetted: true,
          profile: JSON.stringify({
            yearOfExperience: dataPost.yearOfExperience,
            skills: dataPost.skills,
            roleDescription: dataPost.currentRole,
          }),
        }),
      );

      return 'Data Updated Successfully!';
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  return postRecommendation;
};

export default useMutationCreateCandidate;
