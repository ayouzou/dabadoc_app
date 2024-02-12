import React from "react";
export type User = {
    id: string;
    email: string;
    city:string;
    street:string;
    token: string;
    username:string
} | null;

export type Session = {
    isAuthenticated: boolean;
    user: User;
};

export type SessionProviderProps = {
    children: React.ReactNode;
};