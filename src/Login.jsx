import React, { useEffect, useState } from "react";
import CourseList from "./CourseList";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

const Login = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    const Address = "0xc449C80d06e2639187a5E6e592b8B958Ab95B954";
    const ABI = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "courseId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            indexed: false,
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "creator",
            type: "address",
          },
        ],
        name: "CourseCreated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "courseId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "student",
            type: "address",
          },
        ],
        name: "CourseEnrolled",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "courses",
        outputs: [
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "coursesByCreator",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "coursesByStudent",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_title",
            type: "string",
          },
          {
            internalType: "string",
            name: "_description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_price",
            type: "uint256",
          },
        ],
        name: "createCourse",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "courseId",
            type: "uint256",
          },
        ],
        name: "enroll",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "getCourses",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "price",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "creator",
                type: "address",
              },
              {
                internalType: "address[]",
                name: "enrolledStudents",
                type: "address[]",
              },
            ],
            internalType: "struct Courses.Course[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getCoursesByCreator",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "price",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "creator",
                type: "address",
              },
              {
                internalType: "address[]",
                name: "enrolledStudents",
                type: "address[]",
              },
            ],
            internalType: "struct Courses.Course[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getCoursesByStudent",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "price",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "creator",
                type: "address",
              },
              {
                internalType: "address[]",
                name: "enrolledStudents",
                type: "address[]",
              },
            ],
            internalType: "struct Courses.Course[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      setAccount(accounts[0]);

      let contract;
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      contract = new ethers.Contract(Address, ABI, signer);
      setContract(contract);
    } catch (err) {
      console.log(err);
    }
  };
  // useEffect(() => {
  //   connectWallet();
  // }, []);

  return (
    <div className="container h-screen bg-cover min-w-full flex flex-col items-center justify-center" style={{ backgroundImage: 'url("bgg.png")' }}>
      {console.log(account)}
      {account ? (
        <CourseList contract={contract} />
      ) : (
        <>
                
                <img
    src="metamask-logo-png-transparent.png"
    alt="A descriptive text about the image"
    classNamee="mt-4" // Adjust margin-bottom as needed
    width="150" // Adjust width as needed
    height="100" // Adjust height as needed 
  />
  <img
    src="shadow.png"
    alt="A descriptive text about the image"
    className="mb-4" // Adjust margin-bottom as needed
    width="300" // Adjust width as needed
    height="100" // Adjust height as needed 
  />

          <button
            onClick={connectWallet}
            className="bg-black text-white mb-20 px-4 py-2 rounded-m hover:bg-blue-950 transition duration-300"
            style={{ opacity: 0.7 }}
          >
            Connect with MetaMask
          </button>
        </>
      )}
    </div>
  );
  
};

export default Login;