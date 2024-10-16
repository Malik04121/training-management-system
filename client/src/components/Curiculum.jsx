// import React, { useState } from "react";

// const modules = [
//   {
//     title: "Module 1: Review of Endpoint Configuration Manager Concepts",
//     content: "Content for Module 1: Review of Endpoint Configuration Manager Concepts."
//   },
//   {
//     title: "Module 2: Managing Resources",
//     content: "Content for Module 2: Managing Resources."
//   },
//   {
//     title: "Module 3: Working with Clients",
//     content: "Content for Module 3: Working with Clients."
//   },
//   {
//     title: "Module 4: Distributing Software",
//     content: "Content for Module 4: Distributing Software."
//   },
//   {
//     title: "Module 5: Updating Systems with WSUS and ECM",
//     content: `
//       This module explains how to use the PowerShell commands to create and configure 
//       the integration of ECM and WSUS using a Software Update Point. It also describes 
//       how to create and modify Software Update Groups and Automatic Deployment Rules. 
//       Cmdlets are also used to manage Deployment Packages and their associated Deployments.
      
//       • Integrating Configuration Manager and WSUS
//       • Managing Updates through Software Update Groups
//       • Creating and Deploying Update Packages
//       • Working with Automatic Deployment Rules

//       Lab: Using Configuration Manager Commands to Manage Software Updates
      
//       After completing this module, students will be able to:
//       • Prepare the Environment for Software Updates
//       • Deploy Updates
//       • Create an Automatic Deployment Rule
//     `
//   }
// ];

// const Curriculum = () => {
//   const [openModule, setOpenModule] = useState(null);

//   const toggleModule = (index) => {
//     setOpenModule(openModule === index ? null : index);
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Curriculum</h1>
//       <div className="space-y-4">
//         {modules.map((module, index) => (
//           <div key={index}>
//             <button
//               onClick={() => toggleModule(index)}
//               className="w-full text-left bg-gray-100 p-4 rounded-lg shadow-md font-semibold text-lg 
//                          flex justify-between items-center focus:outline-none"
//             >
//               {module.title}
//               <span>{openModule === index ? "-" : "+"}</span>
//             </button>
//             {openModule === index && (
//               <div className="bg-white p-4 mt-2 rounded-lg shadow-md text-gray-700">
//                 <p>{module.content}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Curriculum;


import React, { useState } from "react";

const Curriculum = ({ modules }) => {
  const [openModule, setOpenModule] = useState(null);

  const toggleModule = (index) => {
    setOpenModule(openModule === index ? null : index);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-darkGrey">Curriculum</h2>
      <div className="space-y-4">
        {modules?.map((module, index) => (
          <div key={index}>
            <button
              onClick={() => toggleModule(index)}
              className="w-full text-left bg-lightGrey p-4 rounded-lg shadow-md font-semibold text-lg 
                         flex justify-between items-center focus:outline-none hover:bg-primary hover:text-white transition-all duration-300"
            >
              {module.title}
              <span>{openModule === index ? "-" : "+"}</span>
            </button>
            {openModule === index && (
              <div className="bg-white p-4 mt-2 rounded-lg shadow-md text-gray-700">
                <p>{module.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Curriculum;
