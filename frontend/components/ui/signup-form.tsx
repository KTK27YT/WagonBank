"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { MultiStepLoader as Loader } from '@/components/ui/multi-step-loader';
import { IconSquareRoundedX } from '@tabler/icons-react';
import axios from 'axios';
import { BACKEND_URL } from '@/components/data/config';
import AlertDialogComponent from '@/components/ui/alert-dialog-component';
import { setUserTokenSession } from '@/components/Auth/auth';


// TODO create the login flow

const loadingStates = [
  { text: "Contacting Jotoro" },
  { text: "Creating your stand" },
  { text: "Creating your card" },
  { text: "Logging in" },
];

import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface formDataProps {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: string;
  cardDesign: string;
}

export default function SignupForm() {
  const searchParams = useSearchParams();
  const cardDesignFromURL = searchParams.get('cardDesign');

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
    cardDesign: cardDesignFromURL || "",
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(false);
  const [index_loader, setIndexLoader] = useState(0);
  const [user_tokens, setUserToken] = useState<string | null>(null);
  const [errortext, setErrorText] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);


  useEffect(() => {
    if (user_tokens !== null) {
      console.log('Updated user_token:', user_tokens);
    }
  }, [user_tokens]);

  useEffect(() => {
    const cardDesign = searchParams.get('cardDesign');
    if (cardDesign) {
      setFormData((prevData) => ({
        ...prevData,
        cardDesign,
      }));
    }
  }, [searchParams]);


  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);
    setErrorText(null);
    setUserToken(null);

    try {

      // Step 1: Ping the server
      setIndexLoader(0);
      console.log("pinging server");
      try {
        await pingServer();
      } catch (error) {
        console.error('Error during multi-step process:', error);
        setIsAlertOpen(true);
        setLoading(false);
        return;
      }

      // Step 2: Create user account
      setIndexLoader(1);
      console.log("creating user account");
      try {
        const response_data = await createUserAccount(formData);
        console.log(response_data.token);
        setUserToken(response_data.token);
      } catch (error) {
        console.error('Error during multi-step process:', error);
        setIsAlertOpen(true);
        setLoading(false);
        return;
      }




    } catch (error) {
      console.error('Error during multi-step process:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user_tokens) {
      // Step 3: Create card
      setIndexLoader(2);
      console.log("creating card");
      console.log(user_tokens);
      createCard(user_tokens)
        .then(() => {
          // Step 4: Log in and redirect to dashboard
          setIndexLoader(3);
          console.log("logging in");
          return loginUser();
        })
        .then(() => {
          setIndexLoader(4);
          console.log("redirecting");
          setUserTokenSession(user_tokens);
          window.location.href = '/dashboard';
        })
        .catch((error) => {
          console.error('Error during multi-step process:', error);
          setIsAlertOpen(true);
          setLoading(false);
        });
    }
  }, [user_tokens]);

  const pingServer = async () => {
    axios.get(`${BACKEND_URL}/ping`)
      .then((response) => {
        console.log("we pinging")
        return Promise.resolve(response.data.message);
      })
      .catch(function (error) {
        setErrorText('Failed to contact the server. Please try again later. More Details: ' + error);
        console.log(error);
        throw error;
      });
  };


  const createUserAccount = async (formData: formDataProps) => {
    const usercreatedata = {
      first_name: formData.firstname,
      last_name: formData.lastname,
      email: formData.email,
      password: formData.password,
      gender: formData.gender
    }
    try {
      const response = await axios.post(`${BACKEND_URL}/users/createuser`, usercreatedata, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data.token);

      console.log(response.data);

      await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 second delay Its so stupid how long react hooks take to update
      return response.data;
    } catch (error) {
      const errorMessage = (error as any).response.data.error_message;
      const errorCode = (error as any).response.data.error_code;
      setErrorText(errorMessage + " " + errorCode + " " + error);
      throw error;
    }
  };

  const createCard = async (usertoken: string) => {
    //Mapping the card design to the card design Images
    const cardDesignImages: { [key: string]: string } = {
      "Jotoro Kujo": "/jotoro-pattern.png",
      "Kira Yoshikage": "/kira-pattern.png",
      "Bucciarati Bruno": "/bucciarati-pattern.png"
    };
    const cardDesign = formData.cardDesign;
    const cardDesignImage = cardDesignImages[cardDesign];

    const createcarddata = {
      user_token: usertoken,
      thermalColor: cardDesign,
      imageName: cardDesignImage,
    }
    try {
      const response = await axios.post(`${BACKEND_URL}/cards/createcard`, createcarddata, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage = (error as any).response.data.error_message;
      const errorCode = (error as any).response.data.error_code;
      setErrorText(errorMessage + " " + errorCode + " " + error);
      throw error;
    }
  };

  const loginUser = async () => {
    const loginuserdata = {
      email: formData.email,
      password: formData.password,
    }
    try {
      const response = await axios.post(`${BACKEND_URL}/users/login`, loginuserdata, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      console.log(response.data.user.token);
      setUserToken(response.data.user.token);
      return response.data;
    } catch (error) {
      const errorMessage = (error as any).response.data.error_message;
      const errorCode = (error as any).response.data.error_code;
      setErrorText(errorMessage + " " + errorCode + " " + error);
      throw error;
    }

  };

  const handleErrorAction = () => {
    // Define what happens when the user confirms the error
    console.log("User confirmed the error");
    setIsAlertOpen(false); // Close the alert dialog
  };

  const handleErrorCancel = () => {
    // Define what happens when the user cancels the error dialog
    console.log("User canceled the error dialog");
    setIsAlertOpen(false); // Close the alert dialog
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "tween", duration: 0.5, delay: 2.5, ease: "easeInOut" }}

    >
      <AlertDialogComponent
        isOpen={isAlertOpen}
        onclose={() => setIsAlertOpen(false)}
        onCancel={() => setIsAlertOpen(false)}
        title="An Error Occurred"
        description={errortext || ""}
        cancelText="Dismiss"
        onAction={handleErrorAction}
      />
      <div className="z-50 my-auto max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input ">

        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to WagonBank
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          start your bizzare financial journey with us
        </p>

        <form className="my-8 z-50" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" placeholder="Jotaro" value={formData.firstname}
                onChange={handleChange("firstname")} type="text" className="z-60" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" placeholder="Kujo" value={formData.lastname}
                onChange={handleChange("lastname")} type="text" />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="jotarokujo@dolphin.com" value={formData.email}
              onChange={handleChange("email")} type="email" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" value={formData.password}
              onChange={handleChange("password")} type="password" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={handleSelectChange("gender")}>
              <SelectTrigger>
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M">Male</SelectItem>
                <SelectItem value="F">Female</SelectItem>
              </SelectContent>
            </Select>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="CardDesign">Card Design</Label>
            <Select value={formData.cardDesign} onValueChange={handleSelectChange("cardDesign")}>
              <SelectTrigger>
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Jotoro Kujo">Jotoro Kujo</SelectItem>
                <SelectItem value="Kira Yoshikage">Kira Yoshikage</SelectItem>
                <SelectItem value="Bucciarati Bruno">Bucciarati Bruno</SelectItem>
              </SelectContent>
            </Select>
          </LabelInputContainer>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />


        </form>
        <Loader loadingStates={loadingStates} loading={loading} duration={1000000} index_loader={index_loader} />


      </div>
    </motion.div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
