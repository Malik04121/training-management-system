import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryData,
  errorMessage,
  loadingStatus,
} from "../../redux/slice/categoriesSlice";
import {
  selectError,
  selectLoading,
  userLists,
} from "../../redux/slice/authenticationSlice";
import { moduleData, moduleError, moduleLoading } from "../../redux/slice/moduleSlice";
import { addCourse, courseData } from "../../redux/slice/courseSlice";

const AddCourses = () => {
  const categories = useSelector(categoryData);
  const trainerList = useSelector(userLists);
  const trainerLoading = useSelector(selectLoading);
  const moduleLoader = useSelector(moduleLoading);
  const moduleErrorMessage = useSelector(moduleError);
  //todo:
  const trainerError = useSelector(selectError);
  const moduleList = useSelector(moduleData);
  const dispatch = useDispatch();
  const categoryError = useSelector(errorMessage);
  const categoryLoading = useSelector(loadingStatus);

  const [module,setModule]=useState(moduleList)
  const [courseDetail, setCourseDetail] = useState({
    name: "",
    description: "",
    duration: 0,
    trainers: [],
    category: "",
    modules: [],
    banner:null
  });

  const handleCourseChange = (e) => {
    const { name, value } = e.target;

    let values=e.target.value
    if (name === "trainers") {
        const options = [...e.target.selectedOptions];
         values = options.map(option => option.value);

         
    } 
    if(name==="modules"){
        const options=[...e.target.selectedOptions]
        values = options.map(option => option.value);

        
        
    }
    if(name==="category"){

      const filteredList=moduleList.filter((ele)=>ele.category==e.target.value)

      setModule(filteredList)
    }

      setCourseDetail((prevState) => ({
        ...prevState,
        [name]: values,
      }));
    
  };
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setCourseDetail((prevState) => ({
      ...prevState,
      banner: file, 
    }));
  };
  const handleCourse = (e) => {
    e.preventDefault();

    const formData = new FormData();
  formData.append("name", courseDetail.name);
  formData.append("description", courseDetail.description);
  formData.append("duration", courseDetail.duration);
  formData.append("category", courseDetail.category);

  courseDetail.trainers.forEach((trainer) => {
    formData.append("trainers[]", trainer); 
  });
  courseDetail.modules.forEach((module) => {
    formData.append("modules[]", module); 
  });
 
  if (courseDetail.banner) {
    formData.append("banner", courseDetail.banner); 
  }

    dispatch(addCourse(formData))
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Add Courses</h1>
      <form className="space-y-4" onSubmit={handleCourse}>
        <div>
          <label className="block text-gray-700">Course Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter Course Name"
            name="name"
            value={courseDetail.name}
            onChange={handleCourseChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Course Description</label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter Course description"
            value={courseDetail.description}
            name="description"
            onChange={handleCourseChange}
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700">
            Course Duration (in minutes)
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter Course duration"
            name="duration"
            value={courseDetail.duration}
            onChange={handleCourseChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Select Trainer</label>
          <select
            className="w-full px-4 py-2 border rounded-lg"
            // defaultValue={["john"]}
            onChange={handleCourseChange}
            name="trainers"
            required
            multiple={true}
          >
            {trainerLoading && <p>Loading...</p>}
            {trainerError && <p className="text-red-500">{trainerError}</p>}
            {trainerList?.map((trainer) => (
              <option key={trainer._id} value={trainer._id}>
                {trainer.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Select Category</label>
          <select
            className="w-full px-4 py-2 border rounded-lg"
            value={courseDetail.category}
            onChange={handleCourseChange}
            name="category"
            required
          >
            <option value="">Select a category</option>
            {categoryLoading && <p>Loading...</p>}
            {categoryError && <p className="text-red-500">{categoryError}</p>}
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Select Training Module</label>
          <select
            className="w-full px-4 py-2 border rounded-lg"
            // defaultValue={["john"]}
            onChange={handleCourseChange}
            name="modules"
            required
            multiple={true}
          >
            {moduleLoader && <p>Loading...</p>}
            {moduleErrorMessage && <p className="text-red-500">{moduleErrorMessage}</p>}
            {module?.map((module) => (
              <option key={module._id} value={module._id}>
                {module.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Upload Course Banner</label>
          <input
            type="file"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleBannerChange}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          type="submit"
        >
          Save Category
        </button>
      </form>
    </div>
  );
};

export default AddCourses;
