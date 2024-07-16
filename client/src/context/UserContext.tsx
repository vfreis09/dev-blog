import React, { createContext, useContext, useState, ReactNode } from "react";
import { useQuery } from "react-query";

interface User {
  email: string;
  google_id: string;
  id: number;
  name: string;
  picture: string;
}

interface UserContextProps {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  userId: number | null;
  loading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const fetchUser = async (): Promise<{ user: User; isLoggedIn: boolean }> => {
  const response = await fetch("http://localhost:3000/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const { isLoading } = useQuery("user", fetchUser, {
    onSuccess: (data) => {
      if (data.isLoggedIn) {
        setIsLoggedIn(true);
        setUser(data.user);
        setUserId(data.user.id);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setUserId(null);
      }
    },
  });

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        loading: isLoading,
        setUser,
        setIsLoggedIn,
        userId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
